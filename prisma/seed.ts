import { PrismaClient, UserRole, AppointmentStatus } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const SALT_ROUNDS = 10;

async function main() {
  // Hash de senha
  const hashedPassword = await bcrypt.hash('password123', SALT_ROUNDS);

  // Criar empresas
  const company1 = await prisma.company.create({
    data: {
      name: 'Alpha Corp',
      email: 'contact@alphacorp.com',
      phone: '123456789',
      address: 'Rua A, 100',
      website: 'https://alphacorp.com',
      logo: 'https://via.placeholder.com/150?text=Alpha+Corp',
    },
  });

  const company2 = await prisma.company.create({
    data: {
      name: 'Beta Solutions',
      email: 'hello@betasolutions.com',
      phone: '987654321',
      address: 'Avenida B, 200',
      website: 'https://betasolutions.com',
      logo: 'https://via.placeholder.com/150?text=Beta+Solutions',
    },
  });

  // Criar usuários (com senha criptografada)
  const [user1A, user1B] = await Promise.all([
    prisma.user.create({
      data: {
        name: 'Alice Admin',
        email: 'alice@alphacorp.com',
        password: hashedPassword,
        role: 'ADMIN',
        companyId: company1.id,
      },
    }),
    prisma.user.create({
      data: {
        name: 'Bob Staff',
        email: 'bob@alphacorp.com',
        password: hashedPassword,
        role: 'STAFF',
        companyId: company1.id,
      },
    }),
  ]);

  const [user2A, user2B] = await Promise.all([
    prisma.user.create({
      data: {
        name: 'Carol Admin',
        email: 'carol@betasolutions.com',
        password: hashedPassword,
        role: 'ADMIN',
        companyId: company2.id,
      },
    }),
    prisma.user.create({
      data: {
        name: 'Dave Staff',
        email: 'dave@betasolutions.com',
        password: hashedPassword,
        role: 'STAFF',
        companyId: company2.id,
      },
    }),
  ]);

  // Criar clientes
  const client1 = await prisma.client.create({
    data: {
      name: 'Cliente 1',
      phone: '999111222',
      email: 'cliente1@exemplo.com',
      companyId: company1.id,
      userId: user1A.id,
    },
  });

  const client2 = await prisma.client.create({
    data: {
      name: 'Cliente 2',
      phone: '999333444',
      email: 'cliente2@exemplo.com',
      companyId: company2.id,
      userId: user2A.id,
    },
  });

  // Criar serviços
  const service1 = await prisma.service.create({
    data: {
      name: 'Consultoria Alpha',
      price: 150.0,
      duration: 60,
      category: 'Consultoria',
      companyId: company1.id,
      userId: user1B.id,
    },
  });

  const service2 = await prisma.service.create({
    data: {
      name: 'Desenvolvimento Beta',
      price: 200.0,
      duration: 90,
      category: 'Desenvolvimento',
      companyId: company2.id,
      userId: user2B.id,
    },
  });

  // Criar agendamentos
  await prisma.appointment.create({
    data: {
      date: new Date(),
      status: AppointmentStatus.SCHEDULED,
      price: service1.price,
      companyId: company1.id,
      userId: user1B.id,
      clientId: client1.id,
      serviceId: service1.id,
    },
  });

  await prisma.appointment.create({
    data: {
      date: new Date(),
      status: AppointmentStatus.COMPLETED,
      price: service2.price,
      companyId: company2.id,
      userId: user2B.id,
      clientId: client2.id,
      serviceId: service2.id,
    },
  });

  // Criar horários de trabalho
  for (let i = 1; i <= 5; i++) {
    await prisma.workingHours.createMany({
      data: [
        {
          dayOfWeek: i,
          startTime: '09:00',
          endTime: '17:00',
          companyId: company1.id,
          userId: user1B.id,
        },
        {
          dayOfWeek: i,
          startTime: '10:00',
          endTime: '18:00',
          companyId: company2.id,
          userId: user2B.id,
        },
      ],
    });
  }

  console.log('Seed concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
