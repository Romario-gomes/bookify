import { Button } from "@/components/ui/Button";
import Link from "next/link";
import Image from "next/image"
import placeholder from '../public/placeholder.svg';
import { CalendarDays, Users, Scissors, CreditCard, Clock } from "lucide-react"

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="bg-white border-gray-200 border-b ">
                <div className="container mx-auto  px-4 py-4 flex justify-between items-center">
                    <Link href="/" className="text-2xl font-bold text-rose-600">
                        Bookify
                    </Link>
                    <nav className="hidden md:flex gap-6">
                        <Link href="/dashboard" className="text-gray-600 hover:text-rose-600">
                            Dashboard
                        </Link>
                        <Link href="/clients" className="text-gray-600 hover:text-rose-600">
                            Clients
                        </Link>
                        <Link href="/services" className="text-gray-600 hover:text-rose-600">
                            Services
                        </Link>
                        <Link href="/appointments" className="text-gray-600 hover:text-rose-600">
                            Appointments
                        </Link>
                    </nav>
                    <div className="flex gap-2">
                        <Link href="/sign-in">
                            <Button className="inline-flex items-center justify-center rounded-md text-sm border h-10 px-4 py-2 cursor-pointer hover:bg-gray-100">Login</Button>
                        </Link>
                        <Link href="/register">
                            <Button className="inline-flex items-center justify-center rounded-md text-white bg-gray-950 h-10 px-4 py-2 cursor-pointer">Sign Up</Button>
                        </Link>
                    </div>
                </div>
            </header>

            <main className="flex-1">
                <section className="flex justify-center w-full py-6 sm:py-12 md:py-24 lg:py-32 xl:py-48">
                    <div className="container px-4 md:px-6">
                        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                            <Image
                                src={placeholder}
                                width="550"
                                height="550"
                                alt="Hero"
                                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
                            />
                            <div className="flex flex-col justify-center space-y-4">
                                <div className="space-y-2">
                                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-6xl/none">
                                        Manage Your Nail Business with Ease
                                    </h1>
                                    <p className="max-w-[600px] text-muted-foreground md:text-xl">
                                        The all-in-one platform for self-employed nail professionals to manage clients, appointments,
                                        services, and payments.
                                    </p>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Link href="/register" className="w-full sm:w-auto">
                                        <Button className="w-full bg-rose-500 text-white rounded p-3 hover:bg-rose-600 cursor-pointer">
                                            Get Started
                                        </Button>
                                    </Link>
                                    <Link href="#features" className="w-full sm:w-auto">
                                        <Button className="w-full bg-white p-3 border border-gray-200 rounded cursor-pointer">
                                            Learn More
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="features" className="py-20">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12">Everything You Need</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                            <FeatureCard
                                icon={<Users className="h-10 w-10 text-rose-500" />}
                                title="Client Management"
                                description="Keep track of all your clients' information, preferences, and appointment history in one place."
                            />
                            <FeatureCard
                                icon={<Scissors className="h-10 w-10 text-rose-500" />}
                                title="Service Catalog"
                                description="Create and manage your service offerings with customizable prices and durations."
                            />
                            <FeatureCard
                                icon={<CalendarDays className="h-10 w-10 text-rose-500" />}
                                title="Appointment Scheduling"
                                description="Easily schedule and manage appointments with an intuitive calendar interface."
                            />
                            <FeatureCard
                                icon={<CreditCard className="h-10 w-10 text-rose-500" />}
                                title="Payment Tracking"
                                description="Record and track all your payments by appointment, client, or time period."
                            />
                            <FeatureCard
                                icon={<Clock className="h-10 w-10 text-rose-500" />}
                                title="Working Hours"
                                description="Set your availability to ensure clients can only book during your working hours."
                            />
                            <FeatureCard
                                icon={<Users className="h-10 w-10 text-rose-500" />}
                                title="Secure Access"
                                description="Your data is protected with secure authentication and user-specific access."
                            />
                        </div>
                    </div>
                </section>

                <section className="bg-rose-50 py-20">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-6">Ready to Streamline Your Nail Business?</h2>
                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                    Join other nail professionals who are saving time and growing their business with NailPro.
                    </p>
                    <Link href="/register">
                    <Button>Sign Up Now</Button>
                    </Link>
                </div>
                </section>
            </main>
            <footer className="bg-gray-50 border-t border-gray-200 py-8">
                <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                    <p className="text-gray-500">&copy; {new Date().getFullYear()} NailPro. All rights reserved.</p>
                    </div>
                    <div className="flex gap-6">
                    <Link href="/terms" className="text-gray-500 hover:text-rose-600">
                        Terms
                    </Link>
                    <Link href="/privacy" className="text-gray-500 hover:text-rose-600">
                        Privacy
                    </Link>
                    <Link href="/contact" className="text-gray-500 hover:text-rose-600">
                        Contact
                    </Link>
                    </div>
                </div>
                </div>
            </footer>
        </div>
    )
}
function FeatureCard({
    icon,
    title,
    description,
  }: {
    icon: React.ReactNode
    title: string
    description: string
  }) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200  hover:shadow-md transition-shadow">
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    )
  }