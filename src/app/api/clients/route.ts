import { prisma } from "@/utils/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
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


export async function POST(req: NextRequest) {
    const data = await req.json();
    console.log('chegou: ', data);
    const clientAlreadyExists = await prisma.client.findFirst({
        where: {
            email: data.email,
        }
    });

    if(clientAlreadyExists) {
        return NextResponse.json({ message: 'Este email já está vinculado a um cliente.'}, {
            headers: { "Content-Type": "application/json" },
            status: 400
        });
    }

    const cliente = await prisma.client.create({
        data: {
            name: data.name,
            phone: data.phone,
            email: data.email,
            companyId: data.companyId,
            userId: data.userId,
            notes: data.notes,
        }
    });

    return NextResponse.json(JSON.stringify(cliente), {
        headers: { "Content-Type": "application/json" },
        status: 201
    });
}


export async function PUT(req: NextRequest) {
    const data = await req.json();
    console.log('Dados: ', data);
    const clientAlreadyExists = await prisma.client.findFirst({
        where: {
            id: data.id,
        }
    });

    if(!clientAlreadyExists) {
        return NextResponse.json({ message: 'Cliente Não encontrado.'}, {
            headers: { "Content-Type": "application/json" },
            status: 404
        });
    }

    const cliente = await prisma.client.update({
        where: {
            id: clientAlreadyExists.id,
        },
        data: {
            name: data.name,
            phone: data.phone,
            email: data.email,
            notes: data.notes,
        }
    });

    return NextResponse.json(JSON.stringify(cliente), {
        headers: { "Content-Type": "application/json" },
        status: 201
    });
}