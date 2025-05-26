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


// Mock data for demonstration
const upcomingAppointments = [
  { id: 1, client: "Maria Silva", service: "Gel Manicure", date: "2025-04-10T14:00:00", status: "scheduled" },
  { id: 2, client: "Ana Oliveira", service: "Full Set Acrylic", date: "2025-04-10T16:30:00", status: "scheduled" },
  { id: 3, client: "Carla Santos", service: "Pedicure", date: "2025-04-11T10:00:00", status: "scheduled" },
]
type AppointmentWithClient = Prisma.AppointmentGetPayload<{
    include: { client: true, user: true, service: true }
  }>;
export default function Dashboard() {
  const { data: session, status } = useSession()
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [appointments, setAppointments] = useState<AppointmentWithClient[]>([]);
  const [services, setService] = useState<Service[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [stats, setStats] = useState({
    totalAppointments: 0,
    totalClients: 0,
    totalRevenue: 0,
  })

  
  console.log('session: ', session);
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

    const totalRevenue = services.reduce((sum, service) => {
      return sum + Number(service.price);
    }, 0)

    return (
      <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Dashboard</h1>
        <Link href="/appointments/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> New Appointment
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Appointments</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{appointments.length}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clients.length}</div>
            <p className="text-xs text-muted-foreground">Active clients</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        {/* Calendar */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
            <CardDescription>Select a date to view appointments</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar mode="single"   className="p-3 border rounded-md border-gray-300" selected={date} onSelect={setDate} />
          </CardContent>
        </Card>

        {/* Upcoming Appointments */}
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Upcoming Appointments</CardTitle>
              <CardDescription>Your schedule for the next few days</CardDescription>
            </div>
            <Link href="/appointments">
              <Button variant="outline" size="sm">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="today">
              <TabsList className="mb-4">
                <TabsTrigger value="today">Today</TabsTrigger>
                <TabsTrigger value="tomorrow">Tomorrow</TabsTrigger>
                <TabsTrigger value="week">This Week</TabsTrigger>
              </TabsList>
              <TabsContent value="today" className="space-y-4">
                {upcomingAppointments.slice(0, 2).map((appointment) => (
                  <div key={appointment.id} className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{appointment.client}</p>
                      <p className="text-sm text-muted-foreground">{appointment.service}</p>
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
                {upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{appointment.client}</p>
                      <p className="text-sm text-muted-foreground">{appointment.service}</p>
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
              <CardTitle>Recent Clients</CardTitle>
              <CardDescription>Your most recently served clients</CardDescription>
            </div>
            <Link href="/clients">
              <Button variant="outline" size="sm">
                View All
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
                    <p className="text-sm">Last visit</p>
                    <p className="text-xs text-muted-foreground">Não Fiz</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks you might need</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link href="/clients/new">
              <Button variant="outline" className="w-full justify-start mb-2">
                <Users className="mr-2 h-4 w-4" />
                Add New Client
              </Button>
            </Link>
            <Link href="/services/new">
              <Button variant="outline" className="w-full justify-start  mb-2">
                <Scissors className="mr-2 h-4 w-4" />
                Add New Service
              </Button>
            </Link>
            <Link href="/appointments/new">
              <Button variant="outline" className="w-full justify-start  mb-2">
                <CalendarDays className="mr-2 h-4 w-4" />
                Schedule Appointment
              </Button>
            </Link>
            <Link href="/settings/hours">
              <Button variant="outline" className="w-full justify-start  mb-2">
                <Clock className="mr-2 h-4 w-4" />
                Set Working Hours
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
      </>

    );
  }
  