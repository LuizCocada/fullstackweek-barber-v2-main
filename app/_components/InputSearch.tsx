"use client"

import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { title } from "process";

//  search é uma string, trim para nao considerar espaços em branco e minimo de 1 caractere para ser considerado.
const formSchema = z.object({
  title: z.string().trim().min(1, {
    message: "Digite algo para buscar"
  }),
})

const InputSearch = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          title: "",
        },
    })

    const router = useRouter()

    const handleSubmit = (data: z.infer<typeof formSchema>) => {
        router.push(`/barbershops?title=${data.title}`)
    }
    
    return (
        <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="flex gap-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="Buscar barbearia" className="rounded-xl" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="rounded-xl" >
            <SearchIcon />
          </Button>
        </form>
      </Form>
    );
}

export default InputSearch;


//este Search pesquisa so por TITLE e nao por SERVICE, porem em BarberShopsPage, ao clicar nas buscas rapidas ele faz uma filtragem por serviços.


//DESTA FORMA A FUNCAO DE HANDLESUBMIT SO IRA SER EXECUTADA APOS CLICAR NO BOTAO.
// const InputSearch = () => {
//     const [search, setSearch] = useState("")
//     const router = useRouter()

//     const handleSubmit = (event) => {
//         event.preventDefault()
//         router.push(`/barbershops?search=${search}`)
//     }
    
//     return (
//         <form onSubmit={handleSubmit} className="gap-2 flex items-center">
//             <Input placeholder="Busque" value={search} onChange={(e) => setSearch(e.target.value)} />
//             <Button className="rounded" type="submit">
//                 <SearchIcon />
//             </Button>
//         </form>
//     );
// }