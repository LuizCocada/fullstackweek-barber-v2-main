import MenuContent from "@/app/_components/MenuContent"
import PhoneItem from "@/app/_components/PhoneItem"
import ServiceItem from "@/app/_components/ServiceItem"
import { Button } from "@/app/_components/ui/button"
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet"
import { db } from "@/app/_lib/prisma"
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"


interface BarbershopPageProps {
    params: {
        id: string
    }
}


const BarbershopPage = async ({ params }: BarbershopPageProps) => {


    const barbershop = await db.barbershop.findUnique({
        where: {
            id: params.id
        },
        include: {
            services: true
        }
    })

    if (!barbershop) {
        return notFound()
    }

    return (
        <div>
            <div className="relative w-full h-[250px]">
                <Image
                    src={barbershop?.imageUrl} fill className="object-cover"
                    alt={barbershop.name}
                />

                <Button size="icon" variant="secondary" className="absolute left-4 top-4 rounded-xl" asChild>
                    <Link href="/">
                        <ChevronLeftIcon />
                    </Link>
                </Button>

                <Sheet>
                    <SheetTrigger asChild>
                        <Button className="absolute top-4 right-4 rounded-xl" variant="secondary">
                            <MenuIcon />
                        </Button>
                    </SheetTrigger>

                    <MenuContent />
                </Sheet>


            </div>

            <div className="p-5 border-b border-solid">
                <h1 className="text-xl font-bold mb-3">{barbershop?.name}</h1>
                <div className="mb-2 flex items-center gap-1">
                    <MapPinIcon className="text-primary" size={18} />
                    <p>{barbershop?.address}</p>
                </div>

                <div className="flex items-center gap-1">
                    <StarIcon className="text-primary fill-primary" size={18} />
                    <p>5,0 (899 Avalicações)</p>
                </div>
            </div>

            <div className="p-5 border-b border-solid space-y-3">
                <h2 className="font-bold uppercase text-gray-400">Sobre nós</h2>
                <p className=" text-justify text-sm">{barbershop?.description}</p>
            </div>


            <div className="p-5 space-y-3 border-b border-solid">
                <h2 className="uppercase font-bold text-gray-400">Serviços</h2>
                <div className="space-y-3">
                    {barbershop.services.map(service => <ServiceItem key={service.id} service={service} />)}
                </div>
            </div>

            <div className="p-5 space-y-3">
                {barbershop.phones.map(phone => (
                    <PhoneItem key={phone} phone={phone} />
                ))}
            </div>
        </div>
    )
}

export default BarbershopPage