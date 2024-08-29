import Image from "next/image"
import Header from "./_components/Header"
import { Button } from "./_components/ui/button"
import { SearchIcon } from "lucide-react"
import { Input } from "./_components/ui/input"
import { db } from "./_lib/prisma"
import BarberShopItem from "./_components/BarberShopItem"
import { quickSearchOptions } from "./_constants/search"
import BookingItem from "./_components/BookingItem"

const Home = async () => {

  const barberShops = await db.barbershop.findMany({})
  const barberShopPopular = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    }
  })

  return (
    <div>
      <Header />
      <div className="p-5 pb-10">

        {/* TEXTO */}
        <h2 className="text-xl font-bold">Olá, Luiz</h2>
        <p className="pt-2">Sexta, 2 de Fevereiro</p>

        {/* INPUT E BUSCA */}
        <div className="mt-6 gap-2 flex items-center">
          <Input placeholder="Busque" />
          <Button className="rounded">
            <SearchIcon />
          </Button>
        </div>

        {/* BUSCA RAPIDA */}
        <div className="flex gap-3 mt-6 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map((option) => (
            <Button className="flex items-center gap-1 rounded-2xl" variant="secondary" key={option.title}>
              <Image src={option.imageUrl}
                width={16}
                height={16}
                alt={option.title}
              />
              {option.title}
            </Button>
          ))}

        </div>



        {/* BANNER */}
        <div className="w-full relative h-[150px] mt-6">
          <Image src="/BannerAgende.png" fill className="object-cover rounded-xl" alt={"banner de agendamento"} />
        </div>

        {/* AGENDAMENTO => Booking */}
        <BookingItem />

        <h2 className="text-xs font-bold text-gray-400 mt-6 pb-5">
          RECOMENDADOS
        </h2>

        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barberShops.map((barberShop) => (
            <BarberShopItem key={barberShop.id} barberShop={barberShop} />
          ))}
        </div>


        <h2 className="text-xs font-bold text-gray-400 mt-6 pb-5">
          POPULARES
        </h2>

        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barberShopPopular.map((barberShop) => (
            <BarberShopItem key={barberShop.id} barberShop={barberShop} />
          ))}
        </div>
      </div>
    </div>

  )
}

export default Home
