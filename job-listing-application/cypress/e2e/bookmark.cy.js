Cypress.on("uncaught:exception", (err) => {
  // Cypress and React Hydrating the document don't get along
  // for some unknown reason. Hopefully, we figure out why eventually
  // so we can remove this.
  // https://github.com/remix-run/remix/issues/4822#issuecomment-1679195650
  // https://github.com/cypress-io/cypress/issues/27204
  if (
    /hydrat/i.test(err.message) ||
    /Minified React error #418/.test(err.message) ||
    /Minified React error #423/.test(err.message)
  ) {
    return false
  }
})

const mockJobs = [{
  id: "65509e9353a7667de6ef5a60",
  title: "Volunteer Software Development Mentor",
  description: "Join A2SV (Africa to Silicon Valley) as a Volunteer Software Development Mentor...",
  responsibilities: "Conduct one-on-one or group mentorship sessions...",
  requirements: "Proficiency in a variety of programming languages...",
  idealCandidate: "The ideal candidate possesses a blend of technical expertise...",
  categories: [
    "Education Access and Quality Improvement",
    "Youth Empowerment and Development"
  ],
  opType: "inPerson",
  startDate: new Date("2006-01-02T15:04:05.999Z"),
  endDate: new Date("2006-01-02T15:04:05.999Z"),
  deadline: new Date("2006-01-02T15:04:05.999Z"),
  location: [
    "Addis Ababa"
  ],
  requiredSkills: [
    "Accountant"
  ],
  whenAndWhere: "Abrehot Library, Addis Ababa, Ethiopia",
  orgID: "65509e3f53a7667de6ef5a5b",
  datePosted: new Date("2024-07-17T11:09:29.135Z"),
  status: "open",
  applicantsCount: 6,
  viewsCount: 12004,
  orgName: "Africa to Silicon Valley",
  logoUrl: "https://res.cloudinary.com/dtt1wnvfb/image/upload/v1701954159/photo_2023-12-07%2016.02.23.jpeg.jpg",
  isBookmarked: false,
  isRolling: false,
  questions: "",
  perksAndBenefits: "",
  createdAt: new Date("0001-01-01T00:00:00Z"),
  updatedAt: new Date("0001-01-01T00:00:00Z"),
  orgPrimaryPhone: "+251987654321",
  orgEmail: "lensa@a2sv.org",
  average_rating: 0,
  total_reviews: 0
}]


describe('Bookmarking Job Post', () => {
  beforeEach( () => {
    cy.visit('http://localhost:3000/signin');

    // Intercept the sign-in POST request
    cy.intercept('POST', 'api/auth/callback/sign-in', {
      statusCode: 200,
      body: {
        data: { name: "John Doe", email: "john.doe@gmail.com", accessToken: "Hello" }
      }
    }).as('signinRequest');

    // Fill in the form and submit
    cy.get('input[name="email"]').type('john.doe@gmail.com');
    cy.get('input[name="password"]').type('123456');
    cy.get('button[type="submit"]').click();

    // Wait for the sign-in request to complete
    cy.wait('@signinRequest');

    // Now intercept the session request after sign-in
    cy.intercept('GET', '/api/auth/session', {
      statusCode: 200,
      body: {
        user: {
          name: 'John Doe',
          email: 'john.doe@gmail.com',
          accessToken: "john doe's token"
        },
        expires: new Date(Date.now() + 86400000).toISOString(), // Session expiration
      },
    }).as('sessionRequest');

    // Verify that the user is redirected to the landing page
    cy.url().should('include', '/landing');

    // Wait for the session request to complete
    cy.wait('@sessionRequest');
  });
    
  
    it('should bookmark and unbookmark a job post', () => {

      cy.intercept('POST', '**/bookmarks/*', { statusCode: 200, body: {} }).as('createBookmark');
      cy.intercept('DELETE', '**/bookmarks/*', { statusCode: 200, body: {} }).as('deleteBookmark');
      cy.intercept('GET', '**/opportunities/search', { statusCode: 200, body: {data: mockJobs} }).as('getOpporunities');
     
      cy.url().should('include', '/landing');

      cy.get('[data-testid="joblist"]').click();
      cy.wait('@getOpporunities')

      // Find the job card and click the bookmark icon
      cy.get('[data-testid="bookmark-icon"]').first().click();
  
      // Wait for the API call to complete
      cy.wait('@createBookmark');
  
      // Verify that the bookmark icon has changed to the unbookmark icon
      cy.get('[data-testid="unbookmark-icon"]').should('be.visible');

      cy.wait(2000)

      cy.get('[data-testid="bookmark-link"]').first().click();
      cy.get("Volunteer Software Development Mentor").should('be.visible')

      // Find the job card and click the unbookmark icon
      cy.get('[data-testid="unbookmark-icon"]').first().click();
  
      // Wait for the API call to complete
      cy.wait('@deleteBookmark');
  
      // Verify that the unbookmark icon has changed back to the bookmark icon
      cy.get('[data-testid="bookmark-icon"]').should('be.visible');
    });
  
    
  });
  