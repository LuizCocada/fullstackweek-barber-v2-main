import Image from "next/image"
import Header from "./_components/Header"
import { Button } from "./_components/ui/button"
import { SearchIcon } from "lucide-react"
import { Input } from "./_components/ui/input"

const Home = () => {
  return( 
    <div>
        <Header />
        <div className="p-5">
          <h2 className="text-xl font-bold">Olá, Luiz</h2>
          <p className="pt-2">Sexta, 2 de Fevereiro</p>

          <div className="mt-6 gap-2 flex items-center">
            <Input />
            <Button className="rounded">
              <SearchIcon />
            </Button>
          </div>

          <div className="w-full relative h-[150px] mt-6">
              <Image src="/BannerAgende.png" fill className="object-cover rounded-xl" alt={"banner de agendamento"}/> 
          </div>



        </div>
    </div>
    
  )
}

export default Home
