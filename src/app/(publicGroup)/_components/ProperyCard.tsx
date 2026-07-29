import React from 'react';
import Image from 'next/image';
import { MapPin, Bed, Bath, Maximize, CheckCircle2, ArrowUpRight } from 'lucide-react';

// Shadcn UI Components
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Property } from '@/types';
import Link from 'next/link';

interface PropertyCardProps {
    property: Property
}

export const PropertyCard = ({ property }: PropertyCardProps) => {

    const defaultImage = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop";
    const imageUrl = property?.images?.[0] || defaultImage;

    return (
        <Card className="group overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between p-0">

            {/* 1. Header with Image & Badges */}
            <CardHeader className="p-0 relative">
                <div className="relative h-52 w-full overflow-hidden bg-muted">
                    <Image
                        src={imageUrl}
                        alt={property?.title || 'Property Image'}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70" />

                    {/* Top Badges using Shadcn Badge */}
                    <div className="absolute top-3 left-3 flex gap-2">
                        {property?.isFeatured && (
                            <Badge className="bg-amber-500 hover:bg-amber-600 text-white border-none shadow-sm">
                                Featured
                            </Badge>
                        )}
                        <Badge variant="secondary" className="capitalize bg-background/80 backdrop-blur-md">
                            {property?.category?.name || 'Property'}
                        </Badge>
                    </div>

                    {/* Rent Price Tag */}
                    <div className="absolute bottom-3 left-3 text-white">
                        <span className="text-xl font-bold">৳{property?.rentAmount?.toLocaleString()}</span>
                        <span className="text-xs text-slate-200"> / month</span>
                    </div>
                </div>
            </CardHeader>

            {/* 2. Content Section */}
            <CardContent className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                    {/* Title */}
                    <h3 className="font-semibold text-base line-clamp-1 group-hover:text-primary transition-colors">
                        {property?.title}
                    </h3>

                    {/* Location */}
                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1 line-clamp-1">
                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                        {property?.address}, {property?.city}
                    </p>

                    {/* Key Amenities Stats */}
                    <div className="grid grid-cols-3 gap-2 py-2.5 my-3 border-y border-border text-xs text-muted-foreground font-medium">
                        <div className="flex items-center gap-1.5">
                            <Bed className="w-4 h-4 text-primary" />
                            <span>{property?.bedRoom} Bed</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Bath className="w-4 h-4 text-primary" />
                            <span>{property?.bathRoom} Bath</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Maximize className="w-4 h-4 text-primary" />
                            <span>{property?.squareFeet} SqFt</span>
                        </div>
                    </div>

                    {/* Amenities Badges Array */}
                    <div className="space-y-1.5">
                        <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                            Amenities
                        </span>
                        <div className="flex flex-wrap gap-1">
                            {property?.amenities && property.amenities.length > 0 ? (
                                property.amenities.slice(0, 3).map((amenity, index) => (
                                    <Badge
                                        key={index}
                                        variant="outline"
                                        className="text-[10px] font-normal py-0 px-2 gap-1 bg-muted/30"
                                    >
                                        <CheckCircle2 className="w-2.5 h-2.5 text-emerald-500" />
                                        {amenity}
                                    </Badge>
                                ))
                            ) : (
                                <span className="text-xs text-muted-foreground">No amenities listed</span>
                            )}

                            {/* Overflow Count */}
                            {(property?.amenities?.length || 0) > 3 && (
                                <Badge variant="secondary" className="text-[10px] py-0 px-1.5 font-semibold">
                                    +{(property?.amenities?.length || 0) - 3} more
                                </Badge>
                            )}
                        </div>
                    </div>
                </div>
            </CardContent>

            {/* 3. Footer Section */}
            <CardFooter className="p-4 pt-0 border-t border-border mt-auto flex items-center justify-between">
                <Badge
                    variant={property?.availablity === 'AVAILABLE' ? 'default' : 'destructive'}
                    className="text-[10px] uppercase"
                >
                    {property?.availablity}
                </Badge>

                <Button variant="ghost" size="sm" className="h-8 text-xs gap-1 hover:bg-primary/5">
                    <Link href={`/properties/${property.id}`}>Details</Link> 
                    <ArrowUpRight className="w-3.5 h-3.5" />
                </Button>
            </CardFooter>

        </Card>
    );
};