"use server"

import { PropertyDetails, QueryProps, SinglePropertyApiResponse } from "@/types";

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
            next: {

                tags: [`property-${id}`],

            }
        })
        const result: SinglePropertyApiResponse = await res.json();

        return result?.data?.propertyDetails


    } catch (error) {
        console.error("Error fetching property:", error);
        return null;
    }


}


export const getAllPublicProperties = async (
    { query }: { query?: { [key: string]: string | string[] | undefined } }
) => {

    try {

        const params = new URLSearchParams();

        if (query && query?.searchTerm) {
            params.set("searchTerm", query.searchTerm as string)
        }
        if (query && query?.location) {
            params.set("location", query.location as string)
        }
        if (query && query?.priceRange) {
            params.set("priceRange", query.priceRange as string)
        }
        if (query && query?.type) {
            params.set("type", query.type as string)
        }

        if (query?.amenities || Array.isArray(query?.amenities)) {
            params.set("amenities", query?.amenities as string)
        }

        const res = await fetch(`${backendApi}/api/properties?${params.toString()}`, {
            headers: {},
            cache: "force-cache",
            next: {
                revalidate: 60 * 60 * 6,
                tags: ["all-properties"]
            }
        })

        const result = await res.json();

        // console.log(result?.data?.data, "actions");
        return result?.data?.data

    } catch (error) {
        return null
    }

}

