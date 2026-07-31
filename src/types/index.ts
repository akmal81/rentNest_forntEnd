import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

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
export type Roles = {
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
    role: string,
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
    data: {
        myProfile: {
            id: string
            name: string,
            email: string,
            status: string,
            role: string,
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
    user?: IUser
}


export type SidebarItems = {
    label: string,
    href: string,
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
}



export interface Property {

    id: string;
    title: string;
    description: string;
    address: string;
    city: string;
    division: string;
    bedRoom: number;
    bathRoom: number;
    squareFeet: number;
    amenities: string[];
    rentAmount: number;
    availablity: string;
    isFeatured: boolean;
    images?: string[];
    category: {
        name: string;
    };
};

export interface IPropertiesProps {
    properties: Property[]
}



// export interface LandlordProfile {
//     phoneNumber: string | null;
// }

// export interface Landlord {
//     name: string;
//     email: string;
//     profile: LandlordProfile | null;
// }

// export interface Category {
//     name: string;
// }

export interface PropertyDetails {
    id: string;
    title: string;
    description: string;
    address: string;
    city: string;
    division: string;
    bedRoom: number;
    bathRoom: number;
    squareFeet: number;
    amenities: string[];
    rentAmount: number;
    availablity: string;
    landlordId: string;
    categoryId: string;
    isDeleted: boolean;
    isFeatured: boolean;
    createdAt: string;
    updatedAt: string;
    images?: string[];
    category: {
        name: string;
    };
    landlord: {
        name: string;
        email: string;
        profile: {
            phoneNumber: string | null;
        };
    }
}

export interface SinglePropertyApiResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: {
        propertyDetails: PropertyDetails;
    };
}


export type QueryProps = {query?:{[key:string]:string | string[]|undefined}}


export interface IcategoryResponse {
    id: string,
    name: string,
    slug: string,
    description: string,
    createdAt: string,
    updatedAt: string,
    _count: { properties: number }
  }
