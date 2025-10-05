"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/DropdownMenu"
import { Badge } from "@/components/ui/Badge"
import { Plus, Search, MoreHorizontal, Clock, Edit, XCircle } from "lucide-react"
import Input from "@/components/ui/Input"
import { Service } from "@prisma/client"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/AlertDialog"

// Mock data for demonstration

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredServices = services.filter(
    (service) =>
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price)
  }

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "manicure":
        return "bg-pink-100 text-pink-800 hover:bg-pink-100"
      case "pedicure":
        return "bg-purple-100 text-purple-800 hover:bg-purple-100"
      case "acrylic":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      case "add-on":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  useEffect(() => {
    const fetchServices = async () => {
      const response = await fetch('api/services');
      const data = await response.json();
      setServices(data);
    }

    fetchServices();
  }, [])

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Services</h1>
        <Link href="/services/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Service
          </Button>
        </Link>
      </div>

      <div className="flex items-center mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Procurar serviços..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="border rounded-md overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Serviço</TableHead>
              <TableHead className="hidden sm:table-cell">Categoria</TableHead>
              <TableHead className="hidden sm:table-cell">Duração</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead className="w-[100px]">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredServices.length > 0 ? (
              filteredServices.map((service) => (
                <TableRow key={service.id}>
                  <TableCell className="font-medium">
                    {service.name}
                    <div className="sm:hidden mt-1">
                      <Badge variant="outline" className={getCategoryColor(service.category)}>
                        {service.category}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge variant="outline" className={getCategoryColor(service.category)}>
                      {service.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <div className="flex items-center">
                      <Clock className="mr-1 h-3 w-3 text-muted-foreground" />
                      {service.duration} min
                    </div>
                  </TableCell>
                  <TableCell>{formatPrice(Number(service.price))}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Abrir menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/services/${service.id}/edit`} className="flex items-center">
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Editar</span>
                          </Link>
                        </DropdownMenuItem>
                        
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                <XCircle className="mr-2 h-4 w-4 text-red-600" />
                                <span className="text-sm text-red-600">Excluir</span>
                              </DropdownMenuItem>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Tem certeza que deseja excluir?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Esta ação não pode ser desfeita. Isso excluirá permanentemente o serviço e removerá todos os
                                  dados associados.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction onClick={() => {console.log()}} className="bg-red-600 hover:bg-red-700">
                                  Excluir
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  Nenhum serviço encontrado. Experimente um termo de pesquisa diferente ou adicione um novo serviço
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
