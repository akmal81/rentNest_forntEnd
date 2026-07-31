import { IPropertiesProps } from "@/types";
import { PropertyCard } from "./ProperyCard";

export async function ProperyList({ properties }: IPropertiesProps) {

//    console.log(properties, "list");
    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {properties ? (
                properties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                ))
            ) : (
                <p className="col-span-full text-center text-muted-foreground py-8">
                    properties found.
                </p>
            )}
        </div>
    );
}