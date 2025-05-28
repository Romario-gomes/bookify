import { prisma } from "@/utils/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
    const session = await getServerSession(authOptions);
    
        if (!session || !session.user.companyId) {
        return new Response("Unauthorized", { status: 401 });
        }
    

    const clients = await prisma.client.findMany({
        where: {
            companyId: session.user.companyId
        }
    });

    return NextResponse.json(clients);
}