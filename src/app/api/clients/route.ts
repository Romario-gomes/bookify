import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";


export async function GET() {
    const clients = await prisma.client.findMany();

    return NextResponse.json(clients);
}