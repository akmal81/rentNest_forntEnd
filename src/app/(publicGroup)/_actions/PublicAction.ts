"use server"

import { PropertyDetails, SinglePropertyApiResponse } from "@/types";

const backendApi = process.env.NEXT_PUBLIC_BACKEND_API_URL


export const getFeaturedPost = async () => {

    const res = await fetch(`${backendApi}/api/properties?isFeatured=true`, {
        cache: "force-cache",
        next: {
            revalidate: 60 * 60 * 24
        }
    })

    const result = await res.json();


    return result?.data?.data

}


export const getPropertyDetails = async (id: string): Promise<PropertyDetails | null> => {

    try {
        const res = await fetch(`${backendApi}/api/properties/${id}`, {
            cache: "force-cache",
            next: {
                revalidate: 60 * 60 * 24
            }
        })
        const result:SinglePropertyApiResponse = await res.json();

        return result?.data?.propertyDetails


    } catch (error) {
        console.error("Error fetching property:", error);
        return null;
    }


}


