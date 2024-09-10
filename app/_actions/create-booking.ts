"use server"

import { revalidatePath } from "next/cache"
import { db } from "../_lib/prisma"

interface createBookingParams{
    userId: string
    serviceId: string
    date: Date
}

export const createBooking = async (params: createBookingParams) => {
    await db.booking.create({
        data: params,
    })
    revalidatePath("/barbershops/[id]") //limpa o cache após criar um agendamento
}
