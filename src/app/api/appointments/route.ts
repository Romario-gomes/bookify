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
    const { clientId, serviceId, date, price, time,notes, companyId, userId } = await req.json();
    const appointment = await prisma.appointment.create({
        data: {
            clientId,
            serviceId,
            companyId,
            date,
            time,
            price,
            notes,
            userId,
        },
    });

    return NextResponse.json(appointment);
}