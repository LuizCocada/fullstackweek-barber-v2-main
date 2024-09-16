import { getServerSession } from "next-auth"
import Header from "../_components/Header"
import { authOptions } from "../_lib/authOptions"
import { db } from "../_lib/prisma"
import { equal } from "assert"
import { notFound } from "next/navigation"
import BookingItem from "../_components/BookingItem"
import { addDays } from "date-fns"

const Bookings = async () => {

    const session = await getServerSession(authOptions) //usuario logado.
    if (!session?.user) {
        return notFound()//TODO: mostrar popUp de login
    }

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

    const CanceledBookings = await db.booking.findMany({
        where: {
            userId: (session?.user as any).id,
            date: {
                lte: new Date() //filtrando apenas os agendamentos que as dadas sao menores que o dia, mes e hora de hoje.
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

    return (
        <>
            <Header />
            <div className="p-5 space-y-6">

                <h2 className="font-bold text-xl">Agendamentos</h2>

                <div className="space-y-3">
                {ConfirmedBookings.length > 0 && (
                        <>
                            <p className="text-sm text-gray-400">
                                CONFIRMADOS
                            </p>
                            {ConfirmedBookings.map((booking) => (
                                <BookingItem key={booking.id} booking={booking} /> //ou passamos service={booking.service} e recebemos em BookingItem service como prop.
                            ))}
                        </>
                    )}
                </div>

                <div className="space-y-3">
                    {CanceledBookings.length > 0 && (
                        <>
                            <p className="text-sm text-gray-400">
                                FINALIZADOS
                            </p>
                            {CanceledBookings.map((booking) => (
                                <BookingItem key={booking.id} booking={booking} /> //ou passamos service={booking.service} e recebemos em BookingItem service como prop.
                            ))}
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default Bookings



// diferença entre usar getServerSession e useSession é que getServerSession é usado no lado do servidor
// enquanto o useSession no lado do client.