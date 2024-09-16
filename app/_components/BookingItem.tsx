"use client" //tem Onclick()

import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Prisma } from "@prisma/client"
import { format, isFuture } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import Image from "next/image"
import PhoneItem from "./PhoneItem"
import { Button } from "./ui/button"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog"
import { deleteBooking } from "../_actions/delete-booking"
import { toast } from "sonner"
import { useState } from "react"



interface BookingItemProps { //podemos fazer assim, ou receber o barbershopService como prop de serviceItem(por enquanto)
  booking: Prisma.BookingGetPayload<{
    include: {
      service: {
        include: {
          barbershop: true
        },
      },
    },
  }> 
}

const BookingItem = ({ booking }: BookingItemProps) => {

  const [isSheetOpen, setIsSheetOpen] = useState(false)


  const isConfirmed = isFuture(booking.date)//será confirmado se a data for maior que a ano, mes, dia e hora de hoje.
  
  const handleCancelBooking = async () => {
    try {
      await deleteBooking(booking.id)
      setIsSheetOpen(false)
      toast.success("Reserva cancelada com sucesso!")
    } catch (error) {
      console.log(error)
      toast.error("Error ao cancelar reserva.")
    }
  }

  return (
    <>
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger className="cursor-pointer" asChild>
          <div className="min-w-[100%]">
            <Card className="rounded-3xl">
              <CardContent className="flex justify-between p-0">
                <div className="flex flex-col gap-2 py-5 pl-5">
                  <Badge className="w-fit" variant={isConfirmed ? 'default' : 'outline'}>
                    {isConfirmed ? 'Confirmado' : 'Finalizado'}
                  </Badge>
                  <h3 className="font-semibold">{booking.service.name}</h3>

                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={booking.service.barbershop.imageUrl} />
                    </Avatar>
                    <p className="text-sm">{booking.service.barbershop.name}</p>
                  </div>
                </div>

                <div className="flex flex-col justify-center items-center px-5 border-l">
                  <p className="text-sm">{format(booking.date, 'MMMM', { locale: ptBR })}</p>
                  <p className="text-2xl">{format(booking.date, 'dd', { locale: ptBR })}</p>
                  <p className="text-sm">{format(booking.date, 'HH:mm', { locale: ptBR })}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </SheetTrigger>
        <SheetContent className="min-w-[90%] p-0">
          <SheetHeader className="border-b">
            <SheetTitle className="p-5 items-center">Informações da Reserva</SheetTitle>
          </SheetHeader>


          <div className="p-5 space-y-7">
            <div className="relative h-[180px] w-full flex items-end px-2 pb-5">
              <Image src={"/map.png"} alt={"imagem localidade"} fill className="object-cover rounded-xl" />

              <Card className="z-50 w-full rounded-xl">
                <CardContent className="flex items-center gap-3 px-5 py-3">
                  <Avatar>
                    <AvatarImage src={booking.service.barbershop.imageUrl} />
                  </Avatar>
                  <div>
                    <h2 className="font-bold">
                      {booking.service.barbershop.name}
                    </h2>

                    <p className="text-sm">
                      {booking.service.barbershop.address}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>


            <Badge className="w-fit" variant={isConfirmed ? 'default' : 'outline'}>
              {isConfirmed ? 'Confirmado' : 'Finalizado'}
            </Badge>

            <Card className="rounded-xl">
              <CardContent className="p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <h2 className="font-bold">{booking.service.name}</h2>
                  <p className="text-sm font-bold">
                    {Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(Number(booking.service.price))}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-400">Data</p>
                  {/* usando date-fns */}
                  <p className="text-sm">
                    {format(booking.date, "d 'de' MMMM", {
                      locale: ptBR,
                    })}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-400">Horário</p>
                  {/* usando date-fns */}
                  <p className="text-sm">
                    {format(booking.date, "H:mm")}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-400">Barbearia</p>
                  {/* usando date-fns */}
                  <p className="text-sm ">
                    {booking.service.barbershop.name}
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-5">
              {booking.service.barbershop.phones.map((phone, index) => (
                <PhoneItem phone={phone} key={index} />
              ))}
            </div>

            <SheetFooter>
              <div className="flex items-center gap-3">
                <SheetClose asChild>
                  <Button className="w-full rounded-xl font-semibold" variant={"outline"}>
                    Voltar
                  </Button>
                </SheetClose>


                {isConfirmed
                  ?
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button className="w-full rounded-xl font-semibold" variant={"destructive"}>
                        Cancelar Reserva
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="w-[90%] flex flex-col">
                      <AlertDialogHeader>
                        <AlertDialogTitle>Cancelar Reserva</AlertDialogTitle>
                        <AlertDialogDescription>
                          Tem certeza que deseja cancelar este agendamento?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <div className="flex items-center gap-3">
                          <AlertDialogCancel className="m-0 w-full rounded-xl">
                            Voltar
                          </AlertDialogCancel>
                          <AlertDialogAction
                            className="m-0 w-full rounded-xl"
                            onClick={handleCancelBooking}
                          >
                            Confirmar
                          </AlertDialogAction>
                        </div>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  :
                  <Button className="w-full rounded-xl font-semibold">
                    Avaliar
                  </Button>
                }

              </div>
            </SheetFooter>

          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}

export default BookingItem
