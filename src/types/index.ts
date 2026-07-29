export interface UserProfile {
    id: string;
    profilePhoto?: string | null;
    bio?: string | null;
    phoneNumber?: string | null;
    userId: string;
    createdAt: string;
    updatedAt: string;
}

type ActiveStatus = {
    status: 'ACTIVE' | 'BLOCK'
}
type Roles = {
    role: 'TENANT' | 'LANDLORD' | 'ADMIN'
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
    success: true,
    statusCode: number,
    message: string,
    data: {
        accessToken: string,
        refreshToken: string
    }
}




export type MyProfileData = {
    id: string
    name: string,
    email: string,
    status: ActiveStatus,
    role: Roles,
    createdAt: string,
    updatedAt: string,
    profile: {
        id: string,
        profilePhoto?: string,
        bio?: string,
        phoneNumber?: string,
        userId: string,
        createdAt: string,
        updatedAt: string
    }

}

export type MyProfileResponse = {
    success: boolean,
    statusCode: number,
    message: string,
    data: {
        myProfile: MyProfileData
    }
}





export interface IUser {
    success: boolean,
    message: string,
    data:{
        myProfile:{
            id: string
    name: string,
    email: string,
    status: ActiveStatus,
    role: Roles,
    createdAt: string,
    updatedAt: string,
    profile: {
        id: string,
        profilePhoto?: string,
        bio?: string,
        phoneNumber?: string,
        userId: string,
        createdAt: string,
        updatedAt: string
    }
        }
    }
}

export type NavbarProps = {
    user: IUser 
}