import BarberShopItem from "../_components/BarberShopItem";
import Header from "../_components/Header";
import InputSearch from "../_components/InputSearch";
import { db } from "../_lib/prisma";

interface BarberShopsPageProps {
    searchParams: {
        title?: string
        service?: string
    }
}


//ou ele recebe o searchParams do InputSearch atraves de Link de barberShops?title=""
//ou atraves do componente MenuContent atraves do Link para barbershops?service=""
const BarberShopsPage = async ({ searchParams }: BarberShopsPageProps) => {
    const barberShops = await db.barbershop.findMany({
        where: {
            OR: [
                searchParams?.title ? {
                    name: {
                        contains: searchParams?.title,
                        mode: "insensitive",
                    },
                } : {},
                searchParams?.service ? {
                    services: {
                        some: { //O operador some: é utilizado porque você está verificando se algum dos registros na tabela BarbershopService associado à barbearia contém o nome do serviço especificado.
                            name: {
                                contains: searchParams?.service,
                                mode: "insensitive",
                            },
                        },
                    },
                } : {},
            ],
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
                    Resultados para busca &quot;{searchParams?.title || searchParams?.service}&quot;
                </h2>
                <div className="grid grid-cols-2 gap-4">
                    {barberShops.map((barberShop) => (
                        <BarberShopItem barberShop={barberShop} key={barberShop.id} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default BarberShopsPage;


// ESTE PARA BUSCAR NO INPUT PELO SERVIÇO COMO TAMBEM O NOME DA BARBEARIA
// const barberShops2 = await db.barbershop.findMany({
//     where: {
//         OR: [
//             {
//                 name: {
//                     contains: searchParams?.search,
//                     mode: "insensitive",
//                 },
//             },
//             {
//                 services: {
//                     some: {
//                         name: {
//                             contains: searchParams?.search,
//                             mode: "insensitive",
//                         },
//                     },
//                 },
//             },
//         ],
//     },
// })