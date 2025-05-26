import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    const clients = await prisma.client.findMany({
        where: { companyId: '3e5b31a7-76d1-4776-b0f9-69176feb9ab2' }
    });

    return NextResponse.json(clients);
}