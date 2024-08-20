import JobCard from '../app/components/JobCard';
import { useCreateBookmarkMutation, useDeleteBookmarkMutation } from '../app/api/apiSlice';
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { SessionProvider } from 'next-auth/react';

jest.mock("next/navigation", () => ({
  useRouter() {
    return { prefetch: () => null };
  }
}));

  const mockJobPost = {
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
  };

jest.mock('../app/api/apiSlice', () => ({
  useCreateBookmarkMutation: jest.fn(),
  useDeleteBookmarkMutation: jest.fn(),
}));

describe('JobCard Component', () => {
  const mockSession = {
    user: {
      accessToken: 'mockAccessToken',
    },
  };

  const mockCreateBookmark = jest.fn();
  const mockDeleteBookmark = jest.fn();

  beforeEach(() => {
    useCreateBookmarkMutation.mockReturnValue([mockCreateBookmark, {  isSuccess: false }]);
    useDeleteBookmarkMutation.mockReturnValue([mockDeleteBookmark, {  isSuccess: false }]);

    render(
      <SessionProvider session={mockSession}>
          <JobCard jobPost={mockJobPost} />
      </SessionProvider>
    );

  });

  it('should render job details correctly', () => {
    

    expect(screen.getByTestId('job-title')).toHaveTextContent(mockJobPost.title);
    expect(screen.getByTestId('org-name-and-location')).toHaveTextContent(mockJobPost.orgName);
    expect(screen.getByTestId('org-name-and-location')).toHaveTextContent(mockJobPost.location);

  });

  it('should call createBookmark when the bookmark icon is clicked', async () => {

    const bookmarkIcon = screen.getByTestId('bookmark-icon');
    fireEvent.click(bookmarkIcon);

    useCreateBookmarkMutation.mockReturnValue([mockCreateBookmark, {  isSuccess: true }]);


    await waitFor(() => {
      expect(mockCreateBookmark).toHaveBeenCalledWith({ eventId: mockJobPost.id, token: 'mockAccessToken' });
    });
    
    expect(mockCreateBookmark.mock.calls.length > 0)

    
  });

  it('should call deleteBookmark when the unbookmark icon is clicked', async () => {
    useCreateBookmarkMutation.mockReturnValue([mockCreateBookmark, {  isSuccess: true }]);
    render(
      <SessionProvider session={mockSession}>
          <JobCard jobPost={mockJobPost} />
      </SessionProvider>
    );

    const unBookmarkIcon = screen.getByTestId('unbookmark-icon');
    fireEvent.click(unBookmarkIcon);

    await waitFor(() => {
      expect(mockDeleteBookmark).toHaveBeenCalledWith({ eventId: mockJobPost.id, token: 'mockAccessToken' });
    });
    expect(mockDeleteBookmark.mock.calls.length > 0)

  });
});

