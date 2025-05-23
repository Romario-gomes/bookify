"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/DropdownMenu"
import { Badge } from "@/components/ui/Badge"
import { Plus, Search, MoreHorizontal, Clock, Edit, Trash2 } from "lucide-react"
import Input from "@/components/ui/Input"

// Mock data for demonstration
const services = [
  { id: 1, name: "Basic Manicure", price: 35.0, duration: 30, category: "Manicure" },
  { id: 2, name: "Gel Manicure", price: 50.0, duration: 45, category: "Manicure" },
  { id: 3, name: "Basic Pedicure", price: 45.0, duration: 45, category: "Pedicure" },
  { id: 4, name: "Gel Pedicure", price: 60.0, duration: 60, category: "Pedicure" },
  { id: 5, name: "Full Set Acrylic", price: 80.0, duration: 90, category: "Acrylic" },
  { id: 6, name: "Acrylic Fill", price: 50.0, duration: 60, category: "Acrylic" },
  { id: 7, name: "Nail Art (Simple)", price: 10.0, duration: 15, category: "Add-on" },
  { id: 8, name: "Nail Art (Complex)", price: 25.0, duration: 30, category: "Add-on" },
]

export default function ServicesPage() {
  const [searchTerm, setSearchTerm] = useState("")

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
            placeholder="Search services..."
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
              <TableHead>Service</TableHead>
              <TableHead className="hidden sm:table-cell">Category</TableHead>
              <TableHead className="hidden sm:table-cell">Duration</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
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
                  <TableCell>{formatPrice(service.price)}</TableCell>
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
                          <Link href={`/services/${service.id}/edit`} className="flex items-center">
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
                  No services found. Try a different search term or add a new service.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
