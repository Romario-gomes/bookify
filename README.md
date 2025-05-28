# 💅 NailPro - Professional Nail Salon Management System

<div align="center">
  <img src="docs/images/logo.png" alt="NailPro Logo" width="120" height="120">
  
  <p align="center">
    <strong>The complete solution for nail salon professionals</strong>
  </p>
  
  <p align="center">
    Streamline your nail business with our comprehensive management platform designed specifically for nail salon owners and professionals.
  </p>

  <p align="center">
    <a href="#features">Features</a> •
    <a href="#demo">Demo</a> •
    <a href="#installation">Installation</a> •
    <a href="#usage">Usage</a> •
    <a href="#contributing">Contributing</a>
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js" alt="Next.js">
    <img src="https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript" alt="TypeScript">
    <img src="https://img.shields.io/badge/Prisma-5-2D3748?style=for-the-badge&logo=prisma" alt="Prisma">
    <img src="https://img.shields.io/badge/Tailwind-3-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS">
  </p>
</div>

---

## 📸 Screenshots

### Dashboard Overview
<img src="docs/images/dashboard.png" alt="Dashboard Overview" width="100%">

### Appointment Management
<img src="docs/images/appointments.png" alt="Appointment Management" width="100%">

### Client Management
<img src="docs/images/clients.png" alt="Client Management" width="100%">

### Service Catalog
<img src="docs/images/services.png" alt="Service Catalog" width="100%">

---

## ✨ Features

### 🏢 **Multi-Company Support**
- **Complete Data Isolation**: Each salon operates independently
- **Custom Branding**: Upload logos and customize company information
- **Role-Based Access**: Owner, Admin, and Staff roles with different permissions
- **Company Settings**: Configurable timezone, currency, and working days

### 👥 **Client Management**
- **Comprehensive Profiles**: Store client contact information and preferences
- **Visit History**: Track all past appointments and services
- **Notes & Preferences**: Record allergies, preferences, and special notes
- **Quick Actions**: Schedule new appointments directly from client profiles

### 📅 **Appointment Scheduling**
- **Interactive Calendar**: Day, week, and month views
- **Real-time Availability**: Prevent double-bookings automatically
- **Status Management**: Track scheduled, completed, cancelled, and no-show appointments
- **Flexible Scheduling**: Easy rescheduling and cancellation options

### 💼 **Service Catalog**
- **Unlimited Services**: Create and manage all your service offerings
- **Pricing & Duration**: Set custom prices and service durations
- **Categories**: Organize services by type (Manicure, Pedicure, Acrylic, etc.)
- **Service Descriptions**: Detailed descriptions for each service

### 💳 **Payment Tracking**
- **Multiple Payment Methods**: Cash, Credit Card, Debit Card, PIX, Bank Transfer
- **Payment Status**: Track pending, completed, refunded, and failed payments
- **Revenue Reports**: Monitor your business performance
- **Payment History**: Complete payment records for each appointment

### ⏰ **Working Hours Management**
- **Flexible Schedules**: Set different hours for each day of the week
- **Staff Schedules**: Individual working hours for each team member
- **Holiday Management**: Easily disable specific days
- **Time Slot Management**: Prevent bookings outside working hours

### 📊 **Analytics & Reports**
- **Business Metrics**: Track appointments, clients, and revenue
- **Performance Insights**: Monitor your salon's growth
- **Client Analytics**: Understand client behavior and preferences
- **Financial Reports**: Revenue tracking and payment analysis

### 🔐 **Security & Privacy**
- **Secure Authentication**: Protected user accounts with encrypted passwords
- **Data Privacy**: Complete data isolation between companies
- **Role-Based Permissions**: Control access based on user roles
- **Secure Data Storage**: All data encrypted and securely stored

---

## 🚀 Demo

### Live Demo
🌐 **[Try NailPro Live Demo](https://nailpro-demo.vercel.app)**

### Demo Credentials
\`\`\`
Company: Bella Nails Studio
Email: maria@bellanails.com
Password: password123
\`\`\`

### Demo Features
- ✅ Full appointment management
- ✅ Client and service management
- ✅ Payment tracking
- ✅ Company settings
- ✅ Multi-user support

---

## 🛠️ Tech Stack

### Frontend
- **[Next.js 14](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Beautiful UI components
- **[React Hook Form](https://react-hook-form.com/)** - Form management
- **[Zod](https://zod.dev/)** - Schema validation

### Backend
- **[Prisma](https://www.prisma.io/)** - Database ORM
- **[PostgreSQL](https://www.postgresql.org/)** - Primary database
- **[bcryptjs](https://github.com/dcodeIO/bcrypt.js)** - Password hashing
- **[date-fns](https://date-fns.org/)** - Date manipulation

### Development
- **[ESLint](https://eslint.org/)** - Code linting
- **[Prettier](https://prettier.io/)** - Code formatting
- **[TypeScript](https://www.typescriptlang.org/)** - Type checking

---

## 📦 Installation

### Prerequisites
- **Node.js** 18.0 or higher
- **npm** or **yarn**
- **PostgreSQL** database

### 1. Clone the Repository
\`\`\`bash
git clone https://github.com/yourusername/nailpro.git
cd nailpro
\`\`\`

### 2. Install Dependencies
\`\`\`bash
npm install
# or
yarn install
\`\`\`

### 3. Environment Setup
Create a `.env` file in the root directory:

\`\`\`env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/nailpro"

# NextAuth (if using authentication)
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Optional: File upload (if using cloud storage)
CLOUDINARY_URL="cloudinary://your-cloudinary-url"
\`\`\`

### 4. Database Setup
\`\`\`bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma db push

# Seed the database with sample data
npm run db:seed
\`\`\`

### 5. Start Development Server
\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

Visit `http://localhost:3000` to see your application running!

---

## 🎯 Usage

### Getting Started

1. **Create Your Company**
   - Sign up and create your nail salon profile
   - Upload your logo and set company information
   - Configure your working hours and preferences

2. **Add Your Services**
   - Create your service catalog with prices and durations
   - Organize services by categories
   - Set up service descriptions and details

3. **Manage Clients**
   - Add client information and contact details
   - Record preferences, allergies, and notes
   - Track client visit history

4. **Schedule Appointments**
   - Use the calendar to book appointments
   - Assign services and set prices
   - Track appointment status and payments

### Key Workflows

#### Booking an Appointment
\`\`\`
1. Navigate to Appointments → New Appointment
2. Select client (or create new)
3. Choose service and date/time
4. Add any special notes
5. Confirm booking
\`\`\`

#### Managing Payments
\`\`\`
1. Complete appointment
2. Record payment method and amount
3. Track payment status
4. Generate reports for accounting
\`\`\`

#### Client Management
\`\`\`
1. Add client with contact information
2. Record preferences and notes
3. Track appointment history
4. Schedule follow-up appointments
\`\`\`

---

## 🏗️ Project Structure

\`\`\`
nailpro/
├── app/                    # Next.js App Router pages
│   ├── appointments/       # Appointment management
│   ├── clients/           # Client management
│   ├── services/          # Service management
│   ├── settings/          # Application settings
│   └── dashboard/         # Main dashboard
├── components/            # Reusable UI components
│   ├── ui/               # shadcn/ui components
│   └── dashboard-layout.tsx
├── lib/                   # Utility functions and configurations
│   ├── prisma.ts         # Database client
│   ├── utils.ts          # Helper functions
│   └── company-context.tsx
├── prisma/               # Database schema and migrations
│   ├── schema.prisma     # Database schema
│   └── seed.ts          # Database seeding
├── docs/                 # Documentation and images
└── public/              # Static assets
\`\`\`

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Development Setup
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -m 'Add amazing feature'`
5. Push to the branch: `git push origin feature/amazing-feature`
6. Open a Pull Request

### Contribution Guidelines
- Follow the existing code style and conventions
- Write clear, descriptive commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

### Areas for Contribution
- 🐛 Bug fixes and improvements
- ✨ New features and enhancements
- 📚 Documentation improvements
- 🎨 UI/UX enhancements
- 🧪 Test coverage improvements
- 🌐 Internationalization (i18n)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **[shadcn/ui](https://ui.shadcn.com/)** for the beautiful UI components
- **[Lucide](https://lucide.dev/)** for the icon library
- **[Vercel](https://vercel.com/)** for hosting and deployment
- **[Prisma](https://www.prisma.io/)** for the excellent database toolkit

---

## 📞 Support

### Documentation
- 📖 **[User Guide](docs/user-guide.md)** - Complete user documentation
- 🔧 **[API Reference](docs/api-reference.md)** - API documentation
- 🚀 **[Deployment Guide](docs/deployment.md)** - Deployment instructions

### Community
- 💬 **[Discord Community](https://discord.gg/nailpro)** - Join our community
- 🐛 **[Issue Tracker](https://github.com/yourusername/nailpro/issues)** - Report bugs
- 💡 **[Feature Requests](https://github.com/yourusername/nailpro/discussions)** - Suggest features

### Professional Support
For professional support, custom development, or enterprise features, contact us at:
- 📧 **Email**: support@nailpro.com
- 🌐 **Website**: [www.nailpro.com](https://www.nailpro.com)

---

<div align="center">
  <p>Made with ❤️ for nail salon professionals worldwide</p>
  
  <p>
    <a href="https://github.com/yourusername/nailpro/stargazers">⭐ Star us on GitHub</a> •
    <a href="https://twitter.com/nailpro">🐦 Follow on Twitter</a> •
    <a href="https://www.linkedin.com/company/nailpro">💼 Connect on LinkedIn</a>
  </p>
</div>
\`\`\`

Now let's create the documentation structure with placeholder images:

