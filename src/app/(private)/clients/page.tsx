"use client"


import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import { Plus, Search, MoreHorizontal, Phone, Calendar, Edit, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@radix-ui/react-dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table"
import { Client } from "@prisma/client"


export default function ClientsPage() {
    const [clients, setClients] = useState<Client[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredClients = clients.filter(
        (client) => {
            return (client.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
            client.phone.toLowerCase().includes(searchTerm.toLowerCase())
        )}
    );

    useEffect(() => {
        const fetchClients = async () => {
        const response = await fetch('/api/clients');
        const data = await response.json();
        setClients(data);
    }   
    fetchClients();

    }, [])

    return (
        <>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold">Clientes</h1>
                <Link href="/clients/new">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> Adicionar Cliente
                    </Button>
                </Link>
            </div>

            <div className="flex items-center mb-6">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground text-gray-500" />
                    <Input
                        type="search"
                        placeholder="Procurar cliente..."
                        className="pl-8 border-gray-200"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="border rounded-md overflow-x-auto border border-gray-200">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nome</TableHead>
                            <TableHead>Contato</TableHead>
                            <TableHead className="hidden sm:table-cell">Última visita</TableHead>
                            <TableHead className="hidden md:table-cell">Anotações</TableHead>
                            <TableHead className="w-[100px]">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredClients.length > 0 ? (
                            filteredClients.map((client) => (
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
                                            Ajustar
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
                                                    <span className="sr-only">Abrir menu</span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="bg-white border rounded-md">
                                                <DropdownMenuItem  className="px-2 py-1.5 text-sm outline-none hover:bg-gray-200">
                                                    <Link href={`/clients/${client.id}`} className="flex items-center">
                                                        <Calendar className="mr-2 h-4 w-4" />
                                                        <span>Histórico</span>
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem  className="px-2 py-1.5 text-sm outline-none hover:bg-gray-200">
                                                    <Link href={`/appointments/new?client=${client.id}`} className="flex items-center">
                                                        <Calendar className="mr-2 h-4 w-4" />
                                                        <span>Novo agendamento</span>
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem  className="px-2 py-1.5 text-sm outline-none hover:bg-gray-200">
                                                    <Link href={`/clients/${client.id}/update`} className="flex items-center">
                                                        <Edit className="mr-2 h-4 w-4" />
                                                        <span>Editar</span>
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="px-2 py-1.5 text-red-600 flex items-center cursor-pointer text-sm outline-none hover:bg-gray-200">
                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                    <span>Excluir</span>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                    Nenhum cliente encontrado. Tente um novo filtro ou adicione um cliente.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </>
    )
}