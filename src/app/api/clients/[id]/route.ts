import { prisma } from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }>}) {
    const { id } = await context.params;

    const client = await prisma.client.findUnique({
        where: { id }, 
      });
    
      if (!client) {
        return NextResponse.json({ error: "Client not found" }, { status: 404 });
      }
    
      return NextResponse.json(client);
}

/* export async function POST(req: NextRequest, { params }: { params: {id: string} }) {
    const data = await req.json();
    console.log('Data: ', data);
    const client = await prisma.client.findUnique({
        where: { id: params.id }, 
      });
    
      if (!client) {
        return NextResponse.json({ error: "Client not found" }, { status: 404 });
      }

      const updated = await prisma.client.update({
        where: {
            id: params.id
        }, 
        data,
      });

      return NextResponse.json( updated , { status: 201 });
} */