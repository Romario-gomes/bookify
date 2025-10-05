import { prisma } from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }>}) {
  const { id } = await context.params;
  const appointment = await prisma.appointment.findUnique({
    where: { id: id }, 
    include: {
        user: true,
        client: true,
        service: true,
    }
  });

  if (!appointment) {
    return NextResponse.json({ error: "Appointment not found" }, { status: 404 });
  }

  return NextResponse.json(appointment);
}


export async function POST(req: NextRequest, context: { params: Promise<{ id: string }>}) {
  const { status } = await req.json();
  const { id } = await context.params;
  
  const appointment = await prisma.appointment.update({
    where: { id: id },
    data: {
      status,
    }
  })

  return NextResponse.json(appointment);
}