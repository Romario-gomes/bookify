import { prisma } from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
    const data = await req.json();
    const existingCompany = await prisma.company.findFirst({
        where: {
            users: {
            some: {
                email: data.companyEmail,
            },
            },
        },
    });

    if (existingCompany) {
        return NextResponse.json({ message: 'Este email já está vinculado a uma empresa.'}, {
            headers: { "Content-Type": "application/json" },
            status: 400
        });
    }

     const company = await prisma.company.create({
        data: {
            name: data.companyName,
            email: data.companyEmail,
            users: {
                create: {
                name: data.customerName,
                email: data.customerEmail,
                password: await bcrypt.hash(data.customerPassword, 10),
                role: 'OWNER',
                },
            },
        },
    });

    return NextResponse.json(JSON.stringify(company), {
        headers: { "Content-Type": "application/json" },
        status: 201
    });
}