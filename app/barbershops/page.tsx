import BarberShopItem from "../_components/BarberShopItem";
import Header from "../_components/Header";
import InputSearch from "../_components/InputSearch";
import { db } from "../_lib/prisma";

interface BarberShopsPageProps {
    searchParams: {
        search?: string
    }
}



const BarberShopsPage = async ({ searchParams }: BarberShopsPageProps) => {
    const barberShops = await db.barbershop.findMany({
        where: {
            name: {
                contains: searchParams?.search,
                mode: "insensitive",
            },
        },
    })

    return (
        <div className="overflow-x-hidden">
            <Header />
            <div className="my-6 px-5">
                <InputSearch />
            </div>

            <div className="px-5">
                <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
                    Resultados para busca &quot;{searchParams?.search}&quot;
                </h2>
                <div className="grid grid-cols-2 gap-4">
                    {barberShops.map((barberShop) => (
                        <BarberShopItem barberShop={barberShop} key={barberShop.id}/>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default BarberShopsPage;