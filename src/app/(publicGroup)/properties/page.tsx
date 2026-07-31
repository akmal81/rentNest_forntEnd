import React, { Suspense } from 'react'
import { getAllPublicProperties, getPropertyCategory } from '../_actions/PublicAction'
import { PropertySkeleton } from '../_components/properySkeleton'
import { ProperyList } from '../_components/ProperyList';
import { PropertySearchBar } from '../_components/SearchBar';
import {AmenitiesFilter2, LocationFilter, PriceRangeFilter, PropertyTypeFilter, ResetFilter } from '../_components/PropertyFilter';
import { LocalcategorArray } from '../_config/LocalCategories';


export default async function AllPropertyPage({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}) {

  const query = await searchParams
  const properties = await getAllPublicProperties({ query })
  const categories = await getPropertyCategory();

  // if(!categories){
  //   categories = LocalcategorArray
  // }


  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <div>
        <h1 className="text-2xl font-semibold">Available Properties</h1>
        <p className="text-sm text-muted-foreground">
          Exclusive Properties For Rental.
        </p>
      </div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between lg:items-center">



        <div className='flex gap-2 text-muted-foreground'>
          <div><PropertyTypeFilter categories = {categories} /></div>
          <div>
            <LocationFilter />
          </div>
          <div>
            <AmenitiesFilter2 />

          </div>
          <div><PriceRangeFilter /></div>
          <div><ResetFilter/></div>
        </div>
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
