import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session || !session.user.companyId) {
    return new Response("Unauthorized", { status: 401 });
    }

    const services = await prisma.service.findMany({
        where: {
            companyId: session.user.companyId,
        }
    });

    return NextResponse.json(services);
}