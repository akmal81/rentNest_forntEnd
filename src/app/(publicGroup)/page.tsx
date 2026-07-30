
import { getFeaturedPost } from "./_actions/PublicAction";
import { PropertySkeleton } from "./_components/properySkeleton";
import { Suspense } from "react";
import { ProperyList } from "./_components/ProperyList";



export default async function Home() {

  const properties = await getFeaturedPost();


  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Featured Properties</h1>
          <p className="text-sm text-muted-foreground">
            Exclusive Properties For Rental.
          </p>
        </div>

      </div>
      <Suspense fallback={<PropertySkeleton />}>
        <ProperyList properties={properties} />
      </Suspense>
    </div>
  );
}
