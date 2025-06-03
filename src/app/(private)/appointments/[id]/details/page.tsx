"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Separator } from "@/components/ui/Separator"
import { Alert, AlertDescription } from "@/components/ui/Alert"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/AlertDialog"
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  Scissors,
  CreditCard,
  MoreHorizontal,
  Edit,
  CheckCircle,
  XCircle,
  Trash2,
  Loader2,
  AlertCircle,
  FileText,
} from "lucide-react"
import DashboardLayout from "@/components/ui/DashboardLayout"

// Mock appointment data - in a real app, this would come from your database
const mockAppointment = {
  id: "1",
  date: "2025-04-15T14:00:00",
  status: "scheduled" as const,
  price: 50.0,
  notes: "Regular customer, prefers gel polish",
  createdAt: "2025-04-10T10:30:00",
  client: {
    id: "1",
    name: "Maria Silva",
    email: "maria@example.com",
    phone: "(11) 98765-4321",
    notes: "Prefers gel polish, allergic to acetone",
  },
  service: {
    id: "2",
    name: "Gel Manicure",
    price: 50.0,
    duration: 45,
    category: "Manicure",
    description: "Professional gel manicure with long-lasting finish",
  },
  payment: {
    id: "1",
    amount: 50.0,
    method: "credit_card" as const,
    status: "completed" as const,
    date: "2025-04-15T14:45:00",
  },
}

type AppointmentStatus = "scheduled" | "completed" | "cancelled" | "no_show"
type PaymentMethod = "cash" | "credit_card" | "debit_card" | "pix"
type PaymentStatus = "pending" | "completed" | "refunded" | "failed"

export default function AppointmentDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const [appointment, setAppointment] = useState<typeof mockAppointment | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)

  // Load appointment data
  useEffect(() => {
    async function loadAppointment() {
      try {
        // In a real app, this would be an API call
        // const appointment = await fetch(`/api/appointments/${params.id}`).then(res => res.json())

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Use mock data for now
        setAppointment(mockAppointment)
      } catch (err) {
        setError("Failed to load appointment details")
      } finally {
        setIsLoading(false)
      }
    }

    loadAppointment()
  }, [params.id])

  const getStatusBadge = (status: AppointmentStatus) => {
    switch (status) {
      case "scheduled":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            <Calendar className="mr-1 h-3 w-3" />
            Scheduled
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle className="mr-1 h-3 w-3" />
            Completed
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
            <XCircle className="mr-1 h-3 w-3" />
            Cancelled
          </Badge>
        )
      case "no_show":
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-100">
            <AlertCircle className="mr-1 h-3 w-3" />
            No Show
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPaymentMethodLabel = (method: PaymentMethod) => {
    switch (method) {
      case "cash":
        return "Cash"
      case "credit_card":
        return "Credit Card"
      case "debit_card":
        return "Debit Card"
      case "pix":
        return "PIX"
      default:
        return method
    }
  }

  const getPaymentStatusBadge = (status: PaymentStatus) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
            Paid
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            Pending
          </Badge>
        )
      case "refunded":
        return (
          <Badge variant="outline" className="bg-purple-100 text-purple-800 hover:bg-purple-100">
            Refunded
          </Badge>
        )
      case "failed":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
            Failed
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price)
  }

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString)
    return {
      date: date.toLocaleDateString("pt-BR", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      time: date.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    }
  }

  const handleStatusUpdate = async (newStatus: AppointmentStatus) => {
    setIsUpdating(true)
    try {
      // In a real app, this would be an API call
      console.log(`Updating appointment ${params.id} status to ${newStatus}`)

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update local state
      if (appointment) {
        setAppointment({ ...appointment })
      }
    } catch (err) {
      setError("Failed to update appointment status")
    } finally {
      setIsUpdating(false)
    }
  }

  const handleDelete = async () => {
    setIsUpdating(true)
    try {
      // In a real app, this would be an API call
      console.log(`Deleting appointment ${params.id}`)

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Redirect to appointments list
      router.push("/appointments")
    } catch (err) {
      setError("Failed to delete appointment")
      setIsUpdating(false)
    }
  }

  if (isLoading) {
    return (
      <>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex items-center space-x-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Carregando detalhes do pedido...</span>
          </div>
        </div>
      </>
    )
  }

  if (error || !appointment) {
    return (
    <>
        <div className="flex items-center mb-6">
          <Link href="/appointments" className="mr-4">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold">Detalhes do pedido</h1>
        </div>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error || "Appointment not found"}</AlertDescription>
        </Alert>
      </>
    )
  }

  const appointmentDateTime = formatDateTime(appointment.date)

  return (
     <>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Link href="/appointments" className="mr-4">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Detalhes do pedido</h1>
            <p className="text-muted-foreground">
              {appointmentDateTime.date} at {appointmentDateTime.time}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {getStatusBadge(appointment.status)}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" disabled={isUpdating}>
                {isUpdating ? <Loader2 className="h-4 w-4 animate-spin" /> : <MoreHorizontal className="h-4 w-4" />}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/appointments/${appointment.id}/edit`} className="flex items-center">
                  <Edit className="mr-2 h-4 w-4" />
                  <span>Editar</span>
                </Link>
              </DropdownMenuItem>
              {appointment.status === "scheduled" && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleStatusUpdate("completed")}>
                    <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                    <span>Finalizar</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleStatusUpdate("cancelled")}>
                    <XCircle className="mr-2 h-4 w-4 text-red-600" />
                    <span>Cancelar</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleStatusUpdate("no_show")}>
                    <AlertCircle className="mr-2 h-4 w-4 text-gray-600" />
                    <span>Esconder</span>
                  </DropdownMenuItem>
                </>
              )}
              <DropdownMenuSeparator />
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <Trash2 className="mr-2 h-4 w-4 text-red-600" />
                    <span className="text-red-600">Excluir</span>
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Tem certeza que deseja excluir?</AlertDialogTitle>
                    <AlertDialogDescription>
                     Esta ação não pode ser desfeita. Isso excluirá permanentemente o agendamento e removerá todos os
dados associados.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
                      Excluir
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        {/* Main appointment details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Appointment Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                Informações do atendimento
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="mr-2 h-4 w-4" />
                    Data
                  </div>
                  <p className="font-medium">{appointmentDateTime.date}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-2 h-4 w-4" />
                    Horário
                  </div>
                  <p className="font-medium">{appointmentDateTime.time}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Preço
                  </div>
                  <p className="font-medium text-lg">{formatPrice(appointment.price)}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-2 h-4 w-4" />
                    Duração
                  </div>
                  <p className="font-medium">{appointment.service.duration} minutes</p>
                </div>
              </div>

              {appointment.notes && (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <FileText className="mr-2 h-4 w-4" />
                      Detalhes
                    </div>
                    <p className="text-sm bg-gray-50 p-3 rounded-md">{appointment.notes}</p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Service Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Scissors className="mr-2 h-5 w-5" />
                Detalhes do serviço
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h3 className="font-semibold text-lg">{appointment.service.name}</h3>
                  <Badge variant="outline" className="text-xs">
                    {appointment.service.category}
                  </Badge>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-lg">{formatPrice(appointment.service.price)}</p>
                  <p className="text-sm text-muted-foreground">{appointment.service.duration} min</p>
                </div>
              </div>
              {appointment.service.description && (
                <p className="text-sm text-muted-foreground">{appointment.service.description}</p>
              )}
            </CardContent>
          </Card>

          {/* Payment Information */}
          {appointment.payment && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="mr-2 h-5 w-5" />
                  Informação do pagamento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Preço
                    </div>
                    <p className="font-medium text-lg">{formatPrice(appointment.payment.amount)}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Método de pagamento
                    </div>
                    <p className="font-medium">{getPaymentMethodLabel(appointment.payment.method)}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-muted-foreground">Status</div>
                    <div>{getPaymentStatusBadge(appointment.payment.status)}</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="mr-2 h-4 w-4" />
                      Data do pagamento
                    </div>
                    <p className="font-medium">{new Date(appointment.payment.date).toLocaleDateString("pt-BR")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Client information sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                Informações do cliente
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-lg">{appointment.client.name}</h3>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-center">
                    <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{appointment.client.phone}</span>
                  </div>
                  {appointment.client.email && (
                    <div className="flex items-center">
                      <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{appointment.client.email}</span>
                    </div>
                  )}
                </div>

                {appointment.client.notes && (
                  <>
                    <Separator />
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <FileText className="mr-2 h-4 w-4" />
                        Anotações do cliente
                      </div>
                      <p className="text-sm bg-gray-50 p-3 rounded-md">{appointment.client.notes}</p>
                    </div>
                  </>
                )}
              </div>

              <Separator />

              <div className="space-y-2">
                <Link href={`/clients/${appointment.client.id}`}>
                  <Button variant="outline" size="sm" className="w-full">
                    Ver perfil
                  </Button>
                </Link>
                <Link href={`/appointments/new?client=${appointment.client.id}`}>
                  <Button variant="outline" size="sm" className="w-full mt-2">
                    Novo agendamento
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          {appointment.status === "scheduled" && (
            <Card>
              <CardHeader>
                <CardTitle>Ações rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  onClick={() => handleStatusUpdate("completed")}
                  disabled={isUpdating}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Finalizar agendamento
                </Button>
                <Button
                  onClick={() => handleStatusUpdate("cancelled")}
                  disabled={isUpdating}
                  variant="outline"
                  className="w-full text-red-600 border-red-600 hover:bg-red-50"
                >
                  <XCircle className="mr-2 h-4 w-4" />
                  Cancelar agendamento
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
     </>
  )
}
