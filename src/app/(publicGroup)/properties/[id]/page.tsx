import { Suspense } from "react";
import { getPropertyDetails } from "../../_actions/PublicAction";
import { PropertySkeleton } from "../../_components/properySkeleton";
import { PropertyDetailsById } from "../../_components/PropertyDetails";
import { notFound } from "next/navigation";


export default async function PropertyDetailsPage({ params }: { params: Promise<{ id: string }> }) {

    const { id } = await params;

    const property = await getPropertyDetails(id);

    if (!property) {
        notFound();
    }
    return (
        <div>
            <Suspense fallback={<PropertySkeleton />}>
                <PropertyDetailsById property={property} />
            </Suspense>
        </div>
    )
}
