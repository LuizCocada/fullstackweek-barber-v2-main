import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Prisma } from "@prisma/client"
import { format, isFuture } from "date-fns"
import { ptBR } from "date-fns/locale"

interface BookingItemProps { //podemos fazer assim, ou receber o barbershopService como prop.
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

  const isConfirmed = isFuture(booking.date)

  return (
    <>
      {/* <h2 className="text-xs font-bold text-gray-400 mt-5">
            AGENDAMENTOS
          </h2> */}

      <div className="min-w-[90%]">
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
    </>
  )
}

export default BookingItem