"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { Calendar } from "@/components/ui/Calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/Tabs"
import { Badge } from "@/components/ui/Badge"
import { Plus, CalendarIcon, Clock, CheckCircle, XCircle } from "lucide-react"
import { Appointment, Prisma } from "@prisma/client"

// Mock data for demonstration

type AppointmentWithClient = Prisma.AppointmentGetPayload<{
  include: { client: true, user: true, service: true }
}>;

export default function AppointmentsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [appointments, setAppointments] = useState<AppointmentWithClient[]>([]);
  const [view, setView] = useState<"day" | "week" | "month">("day")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  useEffect(() => {
    const fetchAppointments = async () => {
      const response = await fetch('/api/appointments');
      const data = await response.json();
      setAppointments(data);
    };
    
    fetchAppointments();
  }, []);

  // Filter appointments based on selected date and status
  const filteredAppointments = appointments.filter((appointment) => {
    const appointmentDate = new Date(appointment.date)
    const selectedDate = date || new Date()

    // Filter by date based on view
    let dateMatches = false
    if (view === "day") {
      dateMatches =
        appointmentDate.getDate() === selectedDate.getDate() &&
        appointmentDate.getMonth() === selectedDate.getMonth() &&
        appointmentDate.getFullYear() === selectedDate.getFullYear()
    } else if (view === "week") {
      // Get start and end of week for selected date
      const startOfWeek = new Date(selectedDate)
      startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay())
      const endOfWeek = new Date(startOfWeek)
      endOfWeek.setDate(startOfWeek.getDate() + 6)

      dateMatches = appointmentDate >= startOfWeek && appointmentDate <= endOfWeek
    } else if (view === "month") {
      dateMatches =
        appointmentDate.getMonth() === selectedDate.getMonth() &&
        appointmentDate.getFullYear() === selectedDate.getFullYear()
    }

    // Filter by status
    const statusMatches = statusFilter === "all" || appointment.status === statusFilter

    return dateMatches && statusMatches
  })

  // Sort appointments by date
  const sortedAppointments = [...filteredAppointments].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  )


  const getStatusBadge = (status: string) => {
    switch (status) {
      case "scheduled":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            Agendado
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
            Completo
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
            Cancelado
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

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Agendamentos</h1>
        <Link href="/appointments/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Novo Agendamento
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-12">
        {/* Calendar and filters */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Calendário</CardTitle>
            <CardDescription>Selecione uma data para ver agendamentos</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
            <div className="space-y-2">
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="view" className="text-sm font-medium">
                  View
                </label>
                <Tabs value={view} onValueChange={(v) => setView(v as "day" | "week" | "month")}>
                  <TabsList className="grid grid-cols-3">
                    <TabsTrigger value="day">Dia</TabsTrigger>
                    <TabsTrigger value="week">Semana</TabsTrigger>
                    <TabsTrigger value="month">Mês</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="status" className="text-sm font-medium">
                  Status
                </label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="scheduled">Agendado</SelectItem>
                    <SelectItem value="completed">Completo</SelectItem>
                    <SelectItem value="cancelled">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Appointments list */}
        <Card className="lg:col-span-8">
          <CardHeader>
            <CardTitle>
              {view === "day" && date && `Agendamentos para ${date.toLocaleDateString()}`}
              {view === "week" && "Agendamentos da semana"}
              {view === "month" &&
                date &&
                `Agendamentos para ${date.toLocaleString("default", { month: "long", year: "numeric" })}`}
            </CardTitle>
            <CardDescription>
              {filteredAppointments.length} agendamento{filteredAppointments.length !== 1 ? "s" : ""} encontrado
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredAppointments.length > 0 ? (
              <div className="space-y-4">
                {filteredAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex flex-col p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">{appointment.client.name}</h3>
                        <p className="text-sm text-muted-foreground">{appointment.service.name}</p>
                      </div>
                      {getStatusBadge(appointment.status)}
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2 text-sm">
                      <div className="flex items-center">
                        <CalendarIcon className="mr-1 h-3 w-3 text-muted-foreground" />
                        {new Date(appointment.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <Clock className="mr-1 h-3 w-3 text-muted-foreground" />
                        {new Date(appointment.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </div>
                      <div className="flex items-center">
                        <Clock className="mr-1 h-3 w-3 text-muted-foreground" />
                        {appointment.service.duration} min
                      </div>
                      <div className="font-medium ml-auto">{formatPrice(Number(appointment.price))}</div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      <Link href={`/appointments/${appointment.id}/update`}>
                        <Button variant="outline" size="sm">
                          Detalhes
                        </Button>
                      </Link>
                      
                      {appointment.status === "SCHEDULED" && (
                        <>
                          <Link href={`/appointments/${appointment.id}/complete`}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-green-600 border-green-600 hover:bg-green-50"
                            >
                              <CheckCircle className="mr-1 h-3 w-3" />
                              Finalizar
                            </Button>
                          </Link>
                          <Link href={`/appointments/${appointment.id}/cancel`}>
                            <Button variant="outline" size="sm" className="text-red-600 border-red-600 hover:bg-red-50">
                              <XCircle className="mr-1 h-3 w-3" />
                              Cancelar
                            </Button>
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                Nenhum agendamento encontrado com esses filtros.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  )
}
