import Image from "next/image"
import Header from "./_components/Header"
import { Button } from "./_components/ui/button"
import { db } from "./_lib/prisma"
import BarberShopItem from "./_components/BarberShopItem"
import { quickSearchOptions } from "./_constants/search"
import BookingItem from "./_components/BookingItem"
import InputSearch from "./_components/InputSearch"
import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "./_lib/authOptions"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"




const Home = async () => {
  const session = await getServerSession(authOptions) //usuario logado.

  const barberShops = await db.barbershop.findMany({})
  const barberShopPopular = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    }
  })

  const ConfirmedBookings = await db.booking.findMany({
    where: {
      userId: (session?.user as any).id,
      date: {
        gte: new Date() //filtrando apenas os agendamentos que as dadas sao maiores que o dia, mes e hora de hoje.
      }
    },
    include: {
      service: {//incluindo serviços e barbearias ligadas.
        include: {
          barbershop: true
        },
      },
    },
    orderBy: {
      date: 'asc'
    }
  })


  const formattedDate = format(new Date(), "EE, d 'de' MMMM", { locale: ptBR });

  const CapitalizeFirstStringOfDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

  return (
    <div>
      <Header />
      <div className="p-5 pb-10">

        {/* TEXTO */}
        <h2 className="text-xl font-bold">{session?.user ? `Olá, ${session.user.name}!` : 'Olá, seja bem vindo!'}</h2>
        <p className="pt-2">
          {CapitalizeFirstStringOfDate}
        </p>

        {/* INPUT E BUSCA */}
        <div className="mt-6">
          <InputSearch />
        </div>

        {/* BUSCA RAPIDA */}
        <div className="flex gap-3 mt-6 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map((option) => (
            <Button className="flex items-center gap-1 rounded-2xl" variant="secondary" key={option.title} asChild>
              <Link href={`/barbershops?service=${option.title}`}>
                <Image src={option.imageUrl}
                  width={16}
                  height={16}
                  alt={option.title}
                />
                {option.title}
              </Link>
            </Button>
          ))}

        </div>

        {/* BANNER */}
        <div className="w-full relative h-[150px] mt-6">
          <Image src="/BannerAgende.png" fill className="object-cover rounded-xl" alt={"banner de agendamento"} />
        </div>

        {session?.user &&
          (
            <>
              <h2 className="text-xs font-bold text-gray-400 mt-6 pb-2">
                AGENDAMENTOS
              </h2>

              {ConfirmedBookings.length > 0 ? (
                <div className="flex overflow-x-auto gap-3 [&::-webkit-scrollbar]:hidden">
                  {ConfirmedBookings.map(booking => <BookingItem key={booking.id} booking={booking} />)}
                </div>
              )
                :
                (
                  <div className="p-5">
                    <p className="text-sm text-gray-400">Não há agendamentos por enquanto...</p>
                  </div>
                )}
            </>
          )
        }

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
