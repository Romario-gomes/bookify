import { PrismaClient, AppointmentStatus } from "@prisma/client"
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient()

async function main() {
  console.log("Starting seeding...")

  // Clear existing data
  await prisma.appointment.deleteMany({})
  await prisma.workingHours.deleteMany({})
  await prisma.service.deleteMany({})
  await prisma.client.deleteMany({})
  await prisma.user.deleteMany({})

  console.log("Cleared existing data")

  // Create users (nail professionals)
  const users = await Promise.all([
    prisma.user.create({
      data: {
        name: "Maria Oliveira",
        email: "maria@nailpro.com",
        password: await bcrypt.hash("password123", 10),
      },
    }),
    prisma.user.create({
      data: {
        name: "Ana Silva",
        email: "ana@nailpro.com",
        password: await bcrypt.hash("password123", 10),
      },
    }),
  ])

  console.log(`Created ${users.length} users`)

  // Create services for each user
  const serviceData = [
    { name: "Basic Manicure", price: 35.0, duration: 30, category: "Manicure" },
    { name: "Gel Manicure", price: 50.0, duration: 45, category: "Manicure" },
    { name: "Basic Pedicure", price: 45.0, duration: 45, category: "Pedicure" },
    { name: "Gel Pedicure", price: 60.0, duration: 60, category: "Pedicure" },
    { name: "Full Set Acrylic", price: 80.0, duration: 90, category: "Acrylic" },
    { name: "Acrylic Fill", price: 50.0, duration: 60, category: "Acrylic" },
    { name: "Nail Art (Simple)", price: 10.0, duration: 15, category: "Add-on" },
    { name: "Nail Art (Complex)", price: 25.0, duration: 30, category: "Add-on" },
  ]

  const services = []
  for (const user of users) {
    for (const service of serviceData) {
      services.push(
        await prisma.service.create({
          data: {
            name: service.name,
            price: service.price,
            duration: service.duration,
            category: service.category,
            userId: user.id,
          },
        }),
      )
    }
  }

  console.log(`Created ${services.length} services`)

  // Create clients for each user
  const clientsData = [
    { name: "Carla Santos", email: "carla@example.com", phone: "(11) 99876-5432", notes: "Prefers gel polish" },
    { name: "Juliana Costa", email: "juliana@example.com", phone: "(11) 97654-3210", notes: "Allergic to acetone" },
    { name: "Patricia Lima", email: "patricia@example.com", phone: "(11) 98877-6655", notes: "Prefers natural nails" },
    { name: "Fernanda Alves", email: "fernanda@example.com", phone: "(11) 96655-4433", notes: "Sensitive cuticles" },
    { name: "Luciana Martins", email: "luciana@example.com", phone: "(11) 99988-7766", notes: "Likes bright colors" },
  ]

  const clients = []
  for (const user of users) {
    for (const client of clientsData) {
      clients.push(
        await prisma.client.create({
          data: {
            name: client.name,
            email: client.email,
            phone: client.phone,
            notes: client.notes,
            userId: user.id,
          },
        }),
      )
    }
  }

  console.log(`Created ${clients.length} clients`)

  // Create working hours for each user
  const daysOfWeek = [0, 1, 2, 3, 4, 5, 6] // 0 = Sunday, 1 = Monday, etc.
  const workingHours = []

  for (const user of users) {
    for (const day of daysOfWeek) {
      // Sunday (0) and Saturday (6) have different hours
      const isWeekend = day === 0 || day === 6

      workingHours.push(
        await prisma.workingHours.create({
          data: {
            dayOfWeek: day,
            startTime: isWeekend ? "09:00" : "08:00",
            endTime: isWeekend ? "14:00" : "18:00",
            isEnabled: day !== 0, // Sunday is disabled
            userId: user.id,
          },
        }),
      )
    }
  }

  console.log(`Created ${workingHours.length} working hours records`)

  const today = new Date()
  const appointments = []

  // Helper function to add days to a date
  const addDays = (date: Date, days: number) => {
    const result = new Date(date)
    result.setDate(result.getDate() + days)
    return result
  }

  // Helper function to set time on a date
  const setTime = (date: Date, timeString: string) => {
    const [hours, minutes] = timeString.split(":").map(Number)
    const result = new Date(date)
    result.setHours(hours, minutes, 0, 0)
    return result
  }

  // Create upcoming appointments (scheduled)
  for (let i = 0; i < 5; i++) {
    const user = users[i % users.length]
    const client = clients[(i + 2) % clients.length]
    const service = services[(i + 3) % services.length]

    const appointment = await prisma.appointment.create({
      data: {
        date: setTime(addDays(today, i + 1), "10:00"),
        status: AppointmentStatus.SCHEDULED,
        price: service.price,
        userId: user.id,
        clientId: client.id,
        serviceId: service.id,
      },
    })

    appointments.push(appointment)
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
})
