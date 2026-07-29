import { IPropertiesProps } from "@/types";
import { PropertyCard } from "./ProperyCard";

export async function FeaturedProperyList({ properties }: IPropertiesProps) {

    const featuredProperties = properties
        // ?.filter((item) => item?.isFeatured)
        // ?.slice(0, 4) || [];
        console.log(featuredProperties.length, "list");
    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProperties.length > 0 ? (
                featuredProperties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                ))
            ) : (
                <p className="col-span-full text-center text-muted-foreground py-8">
                    No featured properties found.
                </p>
            )}
        </div>
    );
}