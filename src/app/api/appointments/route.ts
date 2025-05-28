import { prisma } from "@/utils/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session || !session.user.companyId) {
        return new Response("Unauthorized", { status: 401 });
    }

    const appointments = await prisma.appointment.findMany({
        where: {
            companyId: session.user.companyId,
        },
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
            companyId: '3e5b31a7-76d1-4776-b0f9-69176feb9ab2',
            date,
            price,
            notes,
            userId: '052fd01b-58ce-46fa-9117-a103baa39a12',
        },
    });

    return NextResponse.json(appointment);
}