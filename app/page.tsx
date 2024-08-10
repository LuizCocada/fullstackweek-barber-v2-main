import Image from "next/image"
import Header from "./_components/Header"
import { Button } from "./_components/ui/button"
import { SearchIcon } from "lucide-react"
import { Input } from "./_components/ui/input"
import { Card, CardContent } from "./_components/ui/card"
import { Badge } from "./_components/ui/badge"
import { Avatar, AvatarImage } from "./_components/ui/avatar"
import { db } from "./_lib/prisma"
import BarberShopItem from "./_components/BarberShopItem"
import {quickSearchOptions} from "./_constants/search"

const Home = async () => {

  const barberShops = await db.barbershop.findMany({})
  const barberShopPopular = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    }
  })

  return( 
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
            <Button className="flex items-center gap-1 rounded-2xl" variant="secondary">
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
              <Image src="/BannerAgende.png" fill className="object-cover rounded-xl" alt={"banner de agendamento"}/> 
          </div>

          {/* AGENDAMENTO => Booking */}
          {/* FAZER COMPONENTE DE AGENDAMENTO */}
          <h2 className="text-xs font-bold text-gray-400 mt-5">
            AGENDAMENTOS
          </h2>

          <div>
            <Card className="mt-6">
              <CardContent className="flex justify-between p-0">
                <div className="flex flex-col gap-2 py-5 pl-5">
                  <Badge className="w-fit">Confirmado</Badge>
                  <h3 className="font-semibold">Corte de Cabelo</h3>

                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png"/>
                    </Avatar>
                    <p className="text-sm">Vintage Barber</p>
                  </div>
                </div>

                <div className="flex flex-col justify-center items-center px-5 border-l">
                  <p className="text-sm">Agosto</p>
                  <p className="text-2xl">05</p>
                  <p className="text-sm">20:00</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <h2 className="text-xs font-bold text-gray-400 mt-6 pb-5">
            RECOMENDADOS
          </h2>

          <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
            {barberShops.map((barberShop) => (
              <BarberShopItem key={barberShop.id} barberShop={barberShop}/>
            ))}
          </div>
          

          <h2 className="text-xs font-bold text-gray-400 mt-6 pb-5">
            POPULARES
          </h2>

          <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
            {barberShopPopular.map((barberShop) => (
              <BarberShopItem key={barberShop.id} barberShop={barberShop}/>
            ))}
          </div>
        </div>

        <footer>
          <Card>
            <CardContent className="items-center px-5 py-6">
              <p className="text-sm text-gray-400">© 2023 Copyright <span className="font-semibold">FSW Barber</span></p>
            </CardContent>
          </Card>
        </footer>
  
    </div>
    
  )
}

export default Home
