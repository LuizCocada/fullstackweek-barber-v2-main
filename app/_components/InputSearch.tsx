"use client"

import { icons, SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";

//  search é uma string, trim para nao considerar espaços em branco e minimo de 1 caractere para ser considerado.
const formSchema = z.object({
  search: z.string().trim().min(1, {
    message: "Digite algo para buscar"
  }),
})

const InputSearch = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          search: "",
        },
    })

    const router = useRouter()

    const handleSubmit = (data: z.infer<typeof formSchema>) => {
        console.log(data.search)
        router.push(`/barbershops?search=${data.search}`)
    }
    
    return (
        <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="flex gap-2">
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="Buscar" className="rounded-xl" {...field} />
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