export interface AuthUser{
    id: string;
    accessToken: string;
    refreshToken: string;
    name: string;
    email: string;
    profilePicUrl: string;
    role: string;
    profileComplete: boolean;
    profileStatus: string;

} 