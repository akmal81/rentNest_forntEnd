import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    MapPin,
    Bed,
    Bath,
    Maximize,
    CheckCircle2,
    Mail,
    Phone,
    User,
    Calendar,
} from "lucide-react";
import { PropertyDetails } from "@/types";

interface PropertyDetailsProps {
    property: PropertyDetails;
}

export const PropertyDetailsById = ({ property }: PropertyDetailsProps) => {
    const defaultImage =
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop";
    const imageUrl = property?.images?.[0] || defaultImage;

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
            {/* Top Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Badge className="capitalize">
                            {property?.category?.name || "Apartment"}
                        </Badge>
                        <Badge
                            variant={
                                property?.availablity === "AVAILABLE"
                                    ? "default"
                                    : "destructive"
                            }
                        >
                            {property?.availablity}
                        </Badge>
                        {property?.isFeatured && (
                            <Badge className="bg-amber-500 hover:bg-amber-600 text-white">
                                Featured
                            </Badge>
                        )}
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                        {property?.title}
                    </h1>
                    <p className="text-muted-foreground flex items-center gap-1 mt-1 text-sm">
                        <MapPin className="w-4 h-4 shrink-0 text-primary" />
                        {property?.address}, {property?.city}, {property?.division}
                    </p>
                </div>

                {/* Rent Price */}
                <div className="bg-primary/5 border border-primary/10 p-4 rounded-xl text-left md:text-right">
                    <span className="text-xs text-muted-foreground block font-medium">
                        Rent Amount
                    </span>
                    <span className="text-3xl font-extrabold text-primary">
                        ৳{property?.rentAmount?.toLocaleString()}
                    </span>
                    <span className="text-xs text-muted-foreground"> / month</span>
                </div>
            </div>

            {/* Image Banner */}
            <div className="relative h-[350px] md:h-[480px] w-full rounded-2xl overflow-hidden border border-border bg-muted shadow-sm">
                <Image
                    src={imageUrl}
                    alt={property?.title || "Property Image"}
                    fill
                    priority
                    className="object-cover"
                />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Property Info */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Key Stats */}
                    <Card>
                        <CardContent className="p-6 grid grid-cols-3 gap-4 text-center">
                            <div className="flex flex-col items-center justify-center p-3 bg-muted/40 rounded-lg">
                                <Bed className="w-6 h-6 text-primary mb-1" />
                                <span className="text-lg font-bold">{property?.bedRoom}</span>
                                <span className="text-xs text-muted-foreground">Bedrooms</span>
                            </div>
                            <div className="flex flex-col items-center justify-center p-3 bg-muted/40 rounded-lg">
                                <Bath className="w-6 h-6 text-primary mb-1" />
                                <span className="text-lg font-bold">{property?.bathRoom}</span>
                                <span className="text-xs text-muted-foreground">Bathrooms</span>
                            </div>
                            <div className="flex flex-col items-center justify-center p-3 bg-muted/40 rounded-lg">
                                <Maximize className="w-6 h-6 text-primary mb-1" />
                                <span className="text-lg font-bold">
                                    {property?.squareFeet}
                                </span>
                                <span className="text-xs text-muted-foreground">Sq Feet</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Description */}
                    <div className="space-y-3">
                        <h2 className="text-xl font-semibold">About this property</h2>
                        <p className="text-muted-foreground leading-relaxed text-sm whitespace-pre-line">
                            {property?.description || "No description provided."}
                        </p>
                    </div>

                    {/* Amenities List */}
                    <div className="space-y-3 pt-4 border-t border-border">
                        <h2 className="text-xl font-semibold">Amenities & Features</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {property?.amenities && property.amenities.length > 0 ? (
                                property.amenities.map((amenity, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-2 p-2.5 rounded-lg border border-border bg-card text-xs font-medium"
                                    >
                                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                                        <span>{amenity}</span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-muted-foreground">
                                    No amenities listed.
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column: Landlord Info */}
                <div className="space-y-6">
                    <Card className="sticky top-6">
                        <CardContent className="p-6 space-y-6">
                            <h3 className="text-lg font-semibold border-b border-border pb-3">
                                Contact Landlord
                            </h3>

                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 bg-primary/10 rounded-full text-primary">
                                        <User className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <span className="text-xs text-muted-foreground block">
                                            Landlord Name
                                        </span>
                                        <span className="font-medium text-sm">
                                            {property?.landlord?.name || "Mr. LandLord"}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 bg-primary/10 rounded-full text-primary">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div className="overflow-hidden">
                                        <span className="text-xs text-muted-foreground block">
                                            Email
                                        </span>
                                        <span className="font-medium text-sm truncate block">
                                            {property?.landlord?.email || "N/A"}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 bg-primary/10 rounded-full text-primary">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <span className="text-xs text-muted-foreground block">
                                            Phone Number
                                        </span>
                                        <span className="font-medium text-sm">
                                            {property?.landlord?.profile?.phoneNumber ||
                                                "Not provided"}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <Button className="w-full mt-4" size="lg">
                                Book a Tour / Request Rent
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};