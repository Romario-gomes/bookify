"use server"

import DashboardLayout from "@/components/ui/DashboardLayout";

export default async function PrivateLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <DashboardLayout>
            { children }
        </DashboardLayout>
    )
}