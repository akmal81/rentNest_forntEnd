"use client"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { amenities } from "../_config/Amenities";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useRef, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ChevronDown, SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";



export function LocationFilter() {

    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams();

    const handleLocationChange = (value: string | null) => {
        // const params = new URLSearchParams();
        const params = new URLSearchParams(searchParams.toString());

        if (value) {
            params.set("location", value)
        } else {
            params.delete("location")
        }
        router.replace(`${pathname}?${params.toString()}`);
    };

    return (
        // <div className="w-full flex items-center justify-between gap-4 max-w-xs space-y-2">
        <Select
            value={searchParams.get("location") ?? ""}
            onValueChange={handleLocationChange}>
            <SelectTrigger>
                <SelectValue placeholder="Select Location" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="Dhaka">Dhaka</SelectItem>
                <SelectItem value="Chittagong">Chittagong</SelectItem>
                <SelectItem value="Rajshahi">Rajshahi</SelectItem>
                <SelectItem value="Khulna">Khulna</SelectItem>
                <SelectItem value="Sylhet">Sylhet</SelectItem>
            </SelectContent>
        </Select>
        // </div>
    );
}


export function PriceRangeFilter() {

    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams();

    const debouncedReference = useRef<ReturnType<typeof setTimeout> | null>(null)

    const handlePriceChange = (value: string | null) => {
        if (debouncedReference.current) {
            clearTimeout(debouncedReference.current)
        }
        debouncedReference.current = setTimeout(() => {
            // const params = new URLSearchParams();
            const params = new URLSearchParams(searchParams.toString());

            if (value) {
                params.set("priceRange", value)
            } else {
                params.delete("priceRange")
            }
            router.replace(`${pathname}?${params.toString()}`);
            console.log(pathname, "pathname");
        }, 500)
    };

    return (
        <div className="">
            <SearchIcon className="
            pointer-events-none
            absolute
            top-1/2
            left-3
            size-4
            -translate-y-1/2
            text-muted-foreground
            "/>
            <Input

                // defaultValue={searchParams.get("priceRange") ? searchParams.get("priceRange")?.toString() : ""}
                value={searchParams.get("priceRange") ?? ""}
                onChange={(e) => handlePriceChange(e.target.value)}
                placeholder="Price Range"
            // className="bg-primary-foreground"
            />
        </div>
    );
}


export function AmenitiesFilter() {

    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams();
    // const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
const selectedAmenities = JSON.parse(
  searchParams.get("amenities") ?? "[]"
);
    const handleCheckboxChange = (amenity: string, checked: boolean) => {

        let updatedAmenityList: string[];
        if (checked) {
            updatedAmenityList = [...selectedAmenities, amenity];
        } else {
            updatedAmenityList = selectedAmenities.filter((item:string) => item !== amenity);
        }
        // setSelectedAmenities(updatedAmenityList);

        // const params = new URLSearchParams();
        const params = new URLSearchParams(searchParams.toString());

        if (updatedAmenityList.length>0) {
            params.set("amenities", JSON.stringify(updatedAmenityList))
        } else {
            params.delete("amenities")
            
        }

        router.replace(`${pathname}?${params}`);

    };

    return (
        <Popover>
            <PopoverTrigger render={<Button variant="outline" className="w-[200px] justify-between" />}>
                {selectedAmenities.length > 0
                    ? `${selectedAmenities.length} selected`
                    : "Select Amenities"}
                <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
            </PopoverTrigger>

            <PopoverContent className=" p-3 max-h-60 overflow-y-auto">
                <div className="space-y-2">
                    {amenities.map((amenity) => (
                        <div key={amenity} className="flex items-center space-x-2 p-1 hover:bg-muted rounded-md cursor-pointer">
                            <Checkbox
                                id={amenity}
                                checked={selectedAmenities.includes(amenity)}
                                onCheckedChange={(checked) => handleCheckboxChange(amenity, Boolean(checked))}
                            />
                            <Label htmlFor={amenity} className="text-sm font-medium cursor-pointer w-full">
                                {amenity}
                            </Label>
                        </div>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    );
}

export function ResetFilter() {
    const pathname = usePathname()
    const router = useRouter()



    return (
        <Button className="cursor-pointer" onClick={()=>router.replace(pathname)}>
            Reset
        </Button>
    );
}


