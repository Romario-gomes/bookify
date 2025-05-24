import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";

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