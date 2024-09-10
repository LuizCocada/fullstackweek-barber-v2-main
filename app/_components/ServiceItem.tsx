"use client" //por conta do calendario;

import { Barbershop, BarbershopService, Booking } from "@prisma/client"
import Image from "next/image"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import { Calendar } from "./ui/calendar"
import { ptBR } from "date-fns/locale"
import { useEffect, useState } from "react"
import { addDays, format, min, set } from "date-fns"
import { createBooking } from "../_actions/create-booking"
import { useSession } from "next-auth/react"
import { toast } from "sonner"
import { GetBookings } from "../_actions/get-bookking"


interface ServiceItemProps {
    service: BarbershopService
    barbershop: Pick<Barbershop, 'name'>
}


const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {

    const { data } = useSession()//usuario logado. //gerenciar em pasta api'

    //armazena o boolean para fechado e aberto do sheetBooking
    const [bookingSheetItsOpen, setBookingSheetItsOpen] = useState(false)
    //a cada mudança reseta todos as dependencias.
    //é feito isto para assim que confirmamos a reserva, nao precise recarregar a pagina para resetar as dependencias.
    const HandleBookingSheetOpenChange = () => {
        setSelectedTime(undefined)
        setSelectedDay(undefined)
        setDayBookings([])
        setBookingSheetItsOpen(false)//para fechar quando clicar no x ou fora do sheet
    }

    //armazena o dia selecionado no calendario 
    const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined)
    const handleSelectDay = (date: Date | undefined) => {
        setSelectedDay(date)
    }


    //armazena o horario selecionado
    const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined)
    const handleSelectTime = (time: string) => {
        setSelectedTime(time)
    }

    //armazena os agendamentos do banco conforme o dia selecionado
    const [dayBookings, setDayBookings] = useState<Booking[]>([])//inicialmente vazio
    //toda vez que a dependencia do array mudar, o useEffect fica responsavel por executar a função de busca.
    useEffect(() => {
        const fetch = async () => {
            if (!selectedDay) return //se nao há dia selecionado, saia fora.
            const bookings = await GetBookings({ serviceId: service.id, date: selectedDay }) //pegando o id do agendamento e o dia e fazendo a busca no banco.
            setDayBookings(bookings)
        }
        fetch()
    }, [selectedDay, service.id])

    const timeList = [
        "9:00",
        "9:30",
        "10:00",
        "10:30",
        "11:00",
        "11:30",
        "12:00",
        "14:00",
        "14:30",
        "15:00",
        "15:30",
        "16:00",
        "16:30",
        "17:00",
        "17:30",
        "18:00",
        "18:30",
        "19:00",
    ]

    //lista de agendamentos do dia selecionado.
    const dateBookings = dayBookings.map(dayBooking => dayBooking.date)
    //formatando para hora e minuto para comparar com o timeList
    const horaDiaAgendamento = dateBookings.map((dateBooking) => {
        const parsedDate = new Date(dateBooking)
        return format(parsedDate, 'H:mm')

    })

    const handleCreateBooking = async () => {
        try {

            if (!selectedDay || !selectedTime) return

            //precisamos fazer isso pois inicialmente o selectedDay nao retorna a hora => Tue Sep 24 2024 00:00:00 GMT-0300 (Horário Padrão de Brasília) 
            //necessitando assim, combinar a hora selecionada à o dia selecionado.
            const hour = Number(selectedTime.split(":")[0])
            const minute = Number(selectedTime.split(":")[1])
            //ex: [09 : 00]

            const newDate = set(selectedDay, {
                minutes: minute,
                hours: hour
            })
            //newDate => passando horas e minutos para o dia selecionado


            await createBooking({
                serviceId: service.id,
                userId: (data?.user as any).id,
                date: newDate,
            })

            toast.success("Reserva criada com sucesso!")
        } catch (error) {
            console.log(error)
            toast.error("Error ao criar reserva")
        }
    }



    return (
        <Card className="rounded-xl">
            <CardContent className="flex items-center gap-3 p-3">
                <div className="relative max-h-[110px] min-h-[110px] max-w-[110px] min-w-[110px]">
                    <Image alt={service.name} src={service.imageUrl} fill className="object-cover rounded-lg" />
                </div>

                <div className="space-y-2">
                    <div>
                        <h3 className="font-semibold text-sm">{service.name}</h3>
                        <p className="text-sm text-gray-400">{service.description}</p>
                    </div>

                    <div className="flex items-center justify-between">
                        <p className="text-sm font-bold text-primary">
                            {Intl.NumberFormat("pt-BR", {
                                style: 'currency',
                                currency: 'BRL'
                            }).format(Number(service.price))}
                        </p>
                        <Sheet open={bookingSheetItsOpen} onOpenChange={HandleBookingSheetOpenChange}>
                            <Button className="rounded-xl" variant="secondary" size="sm" onClick={() => setBookingSheetItsOpen(true)}>
                                Reservar
                            </Button>
                            <SheetContent className="overflow-y-auto [&::-webkit-scrollbar]:hidden">
                                <SheetHeader>
                                    <SheetTitle>Fazer Reserva</SheetTitle>
                                </SheetHeader>

                                <div className="border-b border-solid py-5">
                                    <Calendar
                                        mode={"single"}
                                        locale={ptBR}
                                        selected={selectedDay}
                                        onSelect={handleSelectDay}
                                        fromDate={addDays(new Date(), 0)}//nao permite agendar no dia anterior à o presente. 
                                        styles={{
                                            head_cell: {
                                                width: "100%",
                                                textTransform: "capitalize",
                                            },
                                            cell: {
                                                width: "100%",
                                            },
                                            button: {
                                                width: "100%",
                                            },
                                            nav_button_previous: {
                                                width: "32px",
                                                height: "32px",
                                            },
                                            nav_button_next: {
                                                width: "32px",
                                                height: "32px",
                                            },
                                            caption: {
                                                textTransform: "capitalize",
                                            },
                                        }}
                                    //STYLES NESTE CASO APENAS PARA TELAS PEQUENAS, ONDE OCUPA 100% DO ESPAÇO, EM TELAS GRANDES ELE QUEBRA, `POSTERIORMENTE FAZER PARA TELAS GRANDES.`
                                    />
                                </div>


                                {/* map em banco de horario disponiveis e desabilita os horarios já registrados. */}
                                {selectedDay && (
                                    <div className="flex gap-1.5 border-b border-solid py-3 overflow-y-auto [&::-webkit-scrollbar]:hidden">
                                        {timeList
                                            .map((time) =>
                                                <Button key={time} className="rounded-full"
                                                    size={"sm"}
                                                    variant={selectedTime == time ? "default" : "outline"}
                                                    onClick={() => handleSelectTime(time)}
                                                    disabled={horaDiaAgendamento.includes(time)}//se haver agendamento no banco deixa a hora indisponivel
                                                >
                                                    {time}
                                                </Button>
                                            )
                                        }
                                    </div>
                                )}
                                {/* Só rederiza caso tiver 'selectedTime' e tambem verifica se selectedDay nao é nulo para nao ocorrer conflito na formataçao date-fns*/}
                                {selectedTime && selectedDay && (
                                    <div className="py-5 space-y-10">
                                        <Card className="rounded-xl">
                                            <CardContent className="p-3 space-y-2">
                                                <div className="flex items-center justify-between">
                                                    <h2 className="font-bold">{service.name}</h2>
                                                    <p className="text-sm font-bold">
                                                        {Intl.NumberFormat("pt-BR", {
                                                            style: "currency",
                                                            currency: "BRL",
                                                        }).format(Number(service.price))}
                                                    </p>
                                                </div>

                                                <div className="flex items-center justify-between">
                                                    <p className="text-sm text-gray-400">Data</p>
                                                    {/* usando date-fns */}
                                                    <p className="text-sm">
                                                        {format(selectedDay, "d 'de' MMMM", {
                                                            locale: ptBR,
                                                        })}
                                                    </p>
                                                </div>

                                                <div className="flex items-center justify-between">
                                                    <p className="text-sm text-gray-400">Horário</p>
                                                    {/* usando date-fns */}
                                                    <p className="text-sm ">
                                                        {selectedTime}
                                                    </p>
                                                </div>

                                                <div className="flex items-center justify-between">
                                                    <p className="text-sm text-gray-400">Barbearia</p>
                                                    {/* usando date-fns */}
                                                    <p className="text-sm ">
                                                        {barbershop.name}
                                                    </p>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                )}
                                <SheetFooter>
                                    <SheetClose asChild>
                                        <Button
                                            className="w-full rounded-xl"
                                            onClick={(handleCreateBooking)}
                                            disabled={!selectedTime || !selectedDay}
                                        >
                                            Confirmar
                                        </Button>
                                    </SheetClose>
                                </SheetFooter>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default ServiceItem