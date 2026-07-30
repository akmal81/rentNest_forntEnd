import React, { Suspense } from 'react'
import { getAllPublicProperties } from '../_actions/PublicAction'
import { PropertySkeleton } from '../_components/properySkeleton'
import { ProperyList } from '../_components/ProperyList';
import { PropertySearchBar } from '../_components/SearchBar';

export default async function AllPropertyPage({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}) {

  const query = await searchParams
  const properties = await getAllPublicProperties({ query })

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Available Properties</h1>
          <p className="text-sm text-muted-foreground">
            Exclusive Properties For Rental.
          </p>
        </div>
        add filter options
        <Suspense fallback={<></>}>
          <PropertySearchBar />
        </Suspense>
      </div>
      <Suspense fallback={<PropertySkeleton />}>
        <ProperyList properties={properties} />
      </Suspense>
    </div>
  )
}
