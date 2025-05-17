import DashboardLayout from "@/components/ui/DashboardLayout";

export default function PrivateLayout({
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