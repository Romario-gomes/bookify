"use client"

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Calendar } from "@/components/ui/Calendar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs"

import { Plus, CalendarDays, Users, CreditCard, Scissors, Clock } from "lucide-react";
import Link from "next/link";
import { Client, Prisma, Service } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/ui/ToastProvider";

const upcomingAppointments = [
  { id: 1, client: "Maria Silva", service: "Gel Manicure", date: "2025-04-10T14:00:00", status: "scheduled" },
  { id: 2, client: "Ana Oliveira", service: "Full Set Acrylic", date: "2025-04-10T16:30:00", status: "scheduled" },
  { id: 3, client: "Carla Santos", service: "Pedicure", date: "2025-04-11T10:00:00", status: "scheduled" },
]
type AppointmentWithClient = Prisma.AppointmentGetPayload<{
    include: { client: true, user: true, service: true }
  }>;
export default function Dashboard() {
  const { data: session, status } = useSession();
  const { showToast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [appointments, setAppointments] = useState<AppointmentWithClient[]>([]);
  const [services, setService] = useState<Service[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [stats, setStats] = useState({
    totalAppointments: 0,
    totalClients: 0,
    totalRevenue: 0,
  })

  
  useEffect(() => {
    // In a real app, this would be an API call
    const fetchAppointments = async () => {
      const response = await fetch('/api/appointments');
      const data = await response.json();
      setAppointments(data); 
    };

    const fetchClients = async () => {
      const response = await fetch('/api/clients');
      const data = await response.json();
      setClients(data); 
    };

    const fetchServices = async () => {
      const response = await fetch('/api/services');
      const data = await response.json();
      setService(data); 
    };

    fetchAppointments();
    fetchClients();
    fetchServices();
    setStats({
      totalAppointments: appointments.length,
      totalClients: appointments.length,
      totalRevenue: 3250,
    })
  }, []);

    console.log('Clients: ', clients);
    console.log('Appointments: ', appointments);
    console.log('Services: ', services);

    const totalRevenue = services.reduce((sum, service) => {
      return sum + Number(service.price);
    }, 0)

    return (
      <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Dashboard</h1>
        <Link href="/appointments/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Novo Agendamento
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Agendamentos</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{appointments.length}</div>
            <p className="text-xs text-muted-foreground">Esse mês</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Clientes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clients.length}</div>
            <p className="text-xs text-muted-foreground">Clientes ativos</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Esse mês</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Calendário</CardTitle>
            <CardDescription>Selecione uma data para ver agendamentos</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar mode="single" selected={date} onSelect={setDate} />
          </CardContent>
        </Card>

        {/* Upcoming Appointments */}
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Próximos Compromissos</CardTitle>
              <CardDescription>Sua agenda para os próximos dias</CardDescription>
            </div>
            <Link href="/appointments">
              <Button variant="outline" size="sm">
                Ver todos
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="today">
              <TabsList className="mb-4">
                <TabsTrigger value="today">Hoje</TabsTrigger>
                <TabsTrigger value="tomorrow">Amanhã</TabsTrigger>
                <TabsTrigger value="week">Essa semana</TabsTrigger>
              </TabsList>
              <TabsContent value="today" className="space-y-4">
                {appointments.slice(0, 2).map((appointment) => (
                  <div key={appointment.id} className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{appointment.client.name}</p>
                      <p className="text-sm text-muted-foreground">{appointment.service.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        {new Date(appointment.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                      <p className="text-xs text-muted-foreground capitalize">{appointment.status}</p>
                    </div>
                  </div>
                ))}
              </TabsContent>
              <TabsContent value="tomorrow" className="space-y-4">
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{upcomingAppointments[2].client}</p>
                    <p className="text-sm text-muted-foreground">{upcomingAppointments[2].service}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      {new Date(upcomingAppointments[2].date).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    <p className="text-xs text-muted-foreground capitalize">{upcomingAppointments[2].status}</p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="week" className="space-y-4">
                {appointments.map((appointment) => (
                  <div key={appointment.id} className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{appointment.client.name}</p>
                      <p className="text-sm text-muted-foreground">{appointment.service.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        {new Date(appointment.date).toLocaleDateString()}{" "}
                        {new Date(appointment.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                      <p className="text-xs text-muted-foreground capitalize">{appointment.status}</p>
                    </div>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Recent Clients */}
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Clientes Recentes</CardTitle>
              <CardDescription>Clientes mais recentes atendidos</CardDescription>
            </div>
            <Link href="/clients">
              <Button variant="outline" size="sm">
                Ver todos
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {clients.map((client: Client) => (
                <div key={client.id} className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{client.name}</p>
                    <p className="text-sm text-muted-foreground">{client.phone}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">última visita</p>
                    <p className="text-xs text-muted-foreground">12/05/2025</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Ações rapidas</CardTitle>
            <CardDescription>Tarefas comuns que você pode precisar</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link href="/clients/new">
              <Button variant="outline" className="w-full justify-start mb-2">
                <Users className="mr-2 h-4 w-4" />
                Add Novo Cliente
              </Button>
            </Link>
            <Link href="/services/new">
              <Button variant="outline" className="w-full justify-start  mb-2">
                <Scissors className="mr-2 h-4 w-4" />
                Add Novo serviço
              </Button>
            </Link>
            <Link href="/appointments/new">
              <Button variant="outline" className="w-full justify-start  mb-2">
                <CalendarDays className="mr-2 h-4 w-4" />
                Agendar Pedido
              </Button>
            </Link>
            <Link href="/settings/hours">
              <Button variant="outline" className="w-full justify-start  mb-2">
                <Clock className="mr-2 h-4 w-4" />
                Horário de atendimento
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
      </>

    );
  }
  