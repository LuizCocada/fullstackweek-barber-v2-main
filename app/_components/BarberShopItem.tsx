import Image from "next/image";
import { Barbershop } from "@prisma/client";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { StarIcon } from "lucide-react";
import Link from "next/link";

interface BarberShopItemProps {
    barberShop: Barbershop
}


const BarberShopItem = ({ barberShop }: BarberShopItemProps) => {
    return (
        <Card className="min-w-[167px] rounded-2xl">
            <CardContent className="p-0 px-1 pt-1">

                <div className="relative h-[159px] w-full">
                    <Image fill className="object-cover rounded-2xl" src={barberShop.imageUrl} alt={barberShop.name} />

                    <Badge className="absolute top-2 left-2" variant="secondary">
                        <StarIcon className="text-primary fill-primary" size={12} />
                        <p className="pl-1 text-xs font-semibold">5,0</p>
                    </Badge>
                </div>

                <div className="px-1 py-3">
                    <h3 className="font-semibold truncate">{barberShop.name}</h3>
                    <p className="text-sm text-gray-400 truncate">{barberShop.address}</p>
                    <Link href={`/barbershops/${barberShop.id}`}>
                        <Button className="w-full mt-3" variant="secondary">
                            Reservar
                        </Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
}

export default BarberShopItem