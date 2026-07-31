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
import { useEffect, useRef, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { IcategoryResponse } from "@/types";



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
    const [price, setPrice] = useState(searchParams.get("priceRange") ?? "");

    const debouncedReference = useRef<ReturnType<typeof setTimeout> | null>(null)


    const handlePriceChange = (value: string | null) => {
        if (value) {
            setPrice(value)
        }

        if (debouncedReference.current) {
            clearTimeout(debouncedReference.current)
        }
        debouncedReference.current = setTimeout(() => {
            // const params = new URLSearchParams();
            const params = new URLSearchParams(searchParams.toString());

            if (value?.trim()) {
                params.set("priceRange", value)
            } else {
                params.delete("priceRange")
            }

            const queryString = params
                .toString()
                .replace(/\+/g, "%20");

            router.replace(`${pathname}?${queryString}`);

        }, 500)
    };

    return (
        <div className="w-fit">
            <Input
                value={price}
                onChange={(e) => handlePriceChange(e.target.value)}
                placeholder="Price Range"
            />
        </div>
    );
}


// export function AmenitiesFilter() {

//     const pathname = usePathname()
//     const router = useRouter()
//     const searchParams = useSearchParams();
//     // const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
//     const selectedAmenities = JSON.parse(
//         searchParams.get("amenities") ?? "[]"
//     );

//     const debouncedReference = useRef<ReturnType<typeof setTimeout> | null>(null)

//     const handleCheckboxChange = (amenity: string, checked: boolean) => {
//         if (debouncedReference.current) {
//             clearTimeout(debouncedReference.current)
//         }
//         debouncedReference.current = setTimeout(() => {

//             let updatedAmenityList: string[];
//             if (checked) {
//                 updatedAmenityList = [...selectedAmenities, amenity];
//             } else {
//                 updatedAmenityList = selectedAmenities.filter((item: string) => item !== amenity);
//             }

//             const params = new URLSearchParams(searchParams.toString());

//             if (updatedAmenityList.length > 0) {
//                 params.set("amenities", JSON.stringify(updatedAmenityList))
//             } else {
//                 params.delete("amenities")

//             }

//             router.replace(`${pathname}?${params}`);
//         }, 500)
//     };

//     return (
//         <Popover>
//             <PopoverTrigger render={<Button variant="outline" className=" justify-between" />}>
//                 {selectedAmenities.length > 0
//                     ? `${selectedAmenities.length} selected`
//                     : "Select Amenities"}
//                 <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
//             </PopoverTrigger>

//             <PopoverContent className=" p-3 max-h-60 overflow-y-auto">
//                 <div className="space-y-2">
//                     {amenities.map((amenity) => (
//                         <div key={amenity} className="flex items-center space-x-2 p-1 hover:bg-muted rounded-md cursor-pointer">
//                             <Checkbox
//                                 id={amenity}
//                                 checked={selectedAmenities.includes(amenity)}
//                                 onCheckedChange={(checked) => handleCheckboxChange(amenity, Boolean(checked))}
//                             />
//                             <Label htmlFor={amenity} className="text-sm font-medium cursor-pointer w-full">
//                                 {amenity}
//                             </Label>
//                         </div>
//                     ))}
//                 </div>
//             </PopoverContent>
//         </Popover>
//     );
// }

export function ResetFilter() {
    const pathname = usePathname()
    const router = useRouter()
    return (
        <Button className="cursor-pointer" onClick={() => router.replace(pathname)}>
            Reset
        </Button>
    );
}






export function PropertyTypeFilter({ categories }: { categories: IcategoryResponse[] }) {

    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams();

    const handleTypeChange = (value: string | null) => {
        // const params = new URLSearchParams();
        const params = new URLSearchParams(searchParams.toString());

        if (value) {
            params.set("type", value)
        } else {
            params.delete("type")
        }
        router.replace(`${pathname}?${params.toString()}`);
    };

    return (
        // <div className="w-full flex items-center justify-between gap-4 max-w-xs space-y-2">
        <Select
            value={searchParams.get("type") ?? ""}
            onValueChange={handleTypeChange}>
            <SelectTrigger>
                <SelectValue placeholder="Select Type" />
            </SelectTrigger>
            <SelectContent>
                {
                    categories.map((category: IcategoryResponse) => (
                        <SelectItem key={category.id} value={category.name}>
                            {category.name.toUpperCase()}
                        </SelectItem>
                    ))
                }
            </SelectContent>
        </Select>
        // </div>
    );
}




// !
export function AmenitiesFilter2() {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    const [selectedAmenities, setSelectedAmenities] = useState<string[]>(() => {
        return JSON.parse(searchParams.get("amenities") ?? "[]");
    });



    const handleCheckboxChange = (amenity: string, checked: boolean) => {
        setSelectedAmenities((prev) => {
            if (checked) {
                if (prev.includes(amenity)) return prev;
                return [...prev, amenity];
            }

            return prev.filter((item) => item !== amenity);
        });
    };

    const handleApply = () => {
        const params = new URLSearchParams(searchParams.toString());

        if (selectedAmenities.length > 0) {
            params.set("amenities", JSON.stringify(selectedAmenities));
        } else {
            params.delete("amenities");
        }

        router.replace(`${pathname}?${params.toString()}`);
    };

    const handleClear = () => {
        setSelectedAmenities([]);

        const params = new URLSearchParams(searchParams.toString());
        params.delete("amenities");

        router.replace(`${pathname}?${params.toString()}`);
    };

    return (
        <Popover>
            <PopoverTrigger
                render={<Button variant="outline" className="justify-between" />}
            >
                {selectedAmenities.length
                    ? `${selectedAmenities.length} selected`
                    : "Select Amenities"}

                <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
            </PopoverTrigger>

            <PopoverContent className="w-64 p-3">
                <div className="space-y-2 max-h-60 overflow-y-auto">
                    {amenities.map((amenity) => (
                        <div
                            key={amenity}
                            className="flex items-center gap-2 rounded-md p-1 hover:bg-muted"
                        >
                            <Checkbox
                                id={amenity}
                                checked={selectedAmenities.includes(amenity)}
                                onCheckedChange={(checked) =>
                                    handleCheckboxChange(amenity, Boolean(checked))
                                }
                            />

                            <Label htmlFor={amenity} className="cursor-pointer flex-1">
                                {amenity}
                            </Label>
                        </div>
                    ))}
                </div>

                <div className="mt-4 flex justify-between gap-2">
                    <Button
                        variant="outline"
                        className="flex-1"
                        onClick={handleClear}
                    >
                        Clear
                    </Button>

                    <Button
                        className="flex-1"
                        onClick={handleApply}
                    >
                        Apply
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    );
}

// !
