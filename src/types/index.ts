export interface UserProfile {
    id: string;
    profilePhoto?: string | null;
    bio?: string | null;
    phoneNumber?: string | null;
    userId: string;
    createdAt: string;
    updatedAt: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    status: 'ACTIVE' | 'BLOCK';
    role: 'TENANT' | 'LANDLORD' | 'ADMIN';
    createdAt: string;
    updatedAt: string;
    profile: UserProfile;
}

export interface RegisterResponseData {
    user: User;
}

export interface RegisterApiResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: RegisterResponseData;
}


export type LoginState = {
    success : true,
    statusCode : number,
    message : string,
    data : {
        accessToken : string,
        refreshToken : string
    }
}