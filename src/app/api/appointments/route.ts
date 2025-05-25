import { prisma } from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    const appointments = await prisma.appointment.findMany({
        include: {
            client: true,
            user: true,
            service: true,
        }
    });

    return NextResponse.json(appointments);
}

export async function POST(req: NextRequest) {
    const { clientId, serviceId, date, price, notes } = await req.json();
    const appointment = await prisma.appointment.create({
        data: {
            clientId,
            serviceId,
            date,  
            price,
            notes,
            userId: '052fd01b-58ce-46fa-9117-a103baa39a12',
        },
    });

    return NextResponse.json(appointment);
}