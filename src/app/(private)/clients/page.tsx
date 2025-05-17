"use client"


import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import { Plus, Search, MoreHorizontal, Phone, Calendar, Edit, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@radix-ui/react-dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table"

import DashboardLayout from "@/components/ui/DashboardLayout"

interface DashboardLayoutProps {
    children: React.ReactNode
}

const clients = [
    {
        id: 1,
        name: "Maria Silva",
        phone: "(11) 98765-4321",
        email: "maria@example.com",
        lastVisit: "2025-04-03",
        notes: "Prefers gel polish",
    },
    {
        id: 2,
        name: "Ana Oliveira",
        phone: "(11) 91234-5678",
        email: "ana@example.com",
        lastVisit: "2025-04-01",
        notes: "Allergic to acetone",
    },
    {
        id: 3,
        name: "Carla Santos",
        phone: "(11) 99876-5432",
        email: "carla@example.com",
        lastVisit: "2025-03-28",
        notes: "",
    },
    {
        id: 4,
        name: "Juliana Costa",
        phone: "(11) 97654-3210",
        email: "juliana@example.com",
        lastVisit: "2025-03-25",
        notes: "Prefers natural nails",
    },
    {
        id: 5,
        name: "Patricia Lima",
        phone: "(11) 98877-6655",
        email: "patricia@example.com",
        lastVisit: "2025-03-20",
        notes: "Sensitive cuticles",
    },
    {
        id: 6,
        name: "Fernanda Alves",
        phone: "(11) 96655-4433",
        email: "fernanda@example.com",
        lastVisit: "2025-03-15",
        notes: "",
    },
    {
        id: 7,
        name: "Luciana Martins",
        phone: "(11) 99988-7766",
        email: "luciana@example.com",
        lastVisit: "2025-03-10",
        notes: "Likes bright colors",
    },
]

export default function Client() {
    const [searchTerm, setSearchTerm] = useState("")

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone.includes(searchTerm) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )
    return (
        <>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold">Clients</h1>
                <Link href="/clients/new">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> Add Client
                    </Button>
                </Link>
            </div>

            <div className="flex items-center mb-6">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground text-gray-500" />
                    <Input
                        type="search"
                        placeholder="Search clients..."
                        className="pl-8 border-gray-200"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="border rounded-md overflow-x-auto border border-gray-200">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Contact</TableHead>
                            <TableHead className="hidden sm:table-cell">Last Visit</TableHead>
                            <TableHead className="hidden md:table-cell">Notes</TableHead>
                            <TableHead className="w-[100px]">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {clients.length > 0 ? (
                            clients.map((client) => (
                                <TableRow key={client.id}>
                                    <TableCell className="font-medium">{client.name}</TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <div className="flex items-center text-sm">
                                                <Phone className="mr-1 h-3 w-3 text-muted-foreground" />
                                                {client.phone}
                                            </div>
                                            <div className="text-sm text-muted-foreground">{client.email}</div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">
                                        <div className="flex items-center">
                                            <Calendar className="mr-1 h-3 w-3 text-muted-foreground" />
                                            {new Date(client.lastVisit).toLocaleDateString()}
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell max-w-[200px] truncate">
                                        {client.notes || <span className="text-muted-foreground italic">No notes</span>}
                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                    <span className="sr-only">Open menu</span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem asChild>
                                                    <Link href={`/clients/${client.id}`} className="flex items-center">
                                                        <Calendar className="mr-2 h-4 w-4" />
                                                        <span>View History</span>
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild>
                                                    <Link href={`/appointments/new?client=${client.id}`} className="flex items-center">
                                                        <Calendar className="mr-2 h-4 w-4" />
                                                        <span>New Appointment</span>
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild>
                                                    <Link href={`/clients/${client.id}/edit`} className="flex items-center">
                                                        <Edit className="mr-2 h-4 w-4" />
                                                        <span>Edit</span>
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="text-red-600 focus:text-red-600">
                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                    <span>Delete</span>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                    No clients found. Try a different search term or add a new client.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </>
    )
}