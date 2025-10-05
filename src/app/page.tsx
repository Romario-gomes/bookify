import { Button } from "@/components/ui/Button";
import Link from "next/link";
import Image from "next/image"
import placeholder from '../public/placeholder.svg';

import landing from '../public/landing.png';

import { CalendarDays, Users, Scissors, CreditCard, Clock, Smartphone } from "lucide-react"

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="bg-white border-gray-200 border-b ">
                <div className="container mx-auto  px-4 py-4 flex justify-between items-center">
                    <Link href="/" className="text-2xl font-bold text-rose-600">
                        Bookify
                    </Link>           
                    <div className="flex gap-2">
                        <Link href="/register">
                            <Button variant="secondary" className="inline-flex items-center justify-center rounded-md text-sm border h-10 px-4 py-2 cursor-pointer hover:bg-gray-100">Criar conta</Button>
                        </Link>
                        <Link href="/sign-in">
                            <Button variant="default" className="inline-flex items-center justify-center rounded-md  cursor-pointer">Entrar</Button>
                        </Link>
                    </div>
                </div>
            </header>

            <main className="flex-1">
                <section className="flex justify-center w-full py-6 sm:py-12 md:py-24 lg:py-32 xl:py-48">
                    <div className="container px-4 md:px-6">
                        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                            <div className="relative order-first lg:order-last">
                <div className="absolute inset-0 bg-gradient-to-r from-rose-400 to-pink-600 rounded-3xl blur-3xl opacity-20 transform rotate-6"></div>
                <Image
                  src={landing}
                  width={600}
                  height={400}
                  alt="Professional nail salon workspace"
                  className="relative rounded-3xl shadow-2xl object-cover w-full h-[300px] md:h-[400px]"
                  priority
                />
                <div className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 bg-white rounded-2xl p-3 md:p-4 shadow-xl border">
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center">
                      <CalendarDays className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm md:text-base">45 Pedidos</p>
                      <p className="text-xs md:text-sm text-gray-600">Agendados essa semana</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 md:-top-6 md:-right-6 bg-white rounded-2xl p-3 md:p-4 shadow-xl border">
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
                      <CreditCard className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm md:text-base">R$ 3,250</p>
                      <p className="text-xs md:text-sm text-gray-600">Faturados esse mês</p>
                    </div>
                  </div>
                </div>
              </div>
                            <div className="flex flex-col justify-center space-y-4">
                                <div className="space-y-2">
                                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-6xl/none">
                                       Gerencie seu negócio com facilidade
                                    </h1>
                                    <p className="max-w-[600px] text-muted-foreground md:text-xl">
                                        A plataforma completa para profissionais de unhas autônomos gerenciarem clientes, compromissos e serviços.
                                    </p>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Link href="/register" className="w-full sm:w-auto">
                                        <Button size="lg" variant="default" className="w-full bg-rose-500 text-white rounded p-3 hover:bg-rose-600 cursor-pointer">
                                            Criar conta
                                        </Button>
                                    </Link>
                                    <Link href="#features" className="w-full sm:w-auto">
                                        <Button size="lg" variant="secondary" className="w-full bg-white p-3 border border-gray-200 rounded cursor-pointer">
                                            Saiba mais
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="features" className="py-20">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12">Tudo que você precisa</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                            <FeatureCard
                                icon={<Users className="h-10 w-10 text-rose-500" />}
                                title="Gerênciamento de clientes"
                                description="Acompanhe todas as informações, preferências e histórico de agendamentos dos seus clientes em um só lugar."
                            />
                            <FeatureCard
                                icon={<Scissors className="h-10 w-10 text-rose-500" />}
                                title="Catálogo de serviços"
                                description="Crie e gerencie suas ofertas de serviços com preços e durações personalizáveis."
                            />
                            <FeatureCard
                                icon={<CalendarDays className="h-10 w-10 text-rose-500" />}
                                title="Agendamento de pedidos"
                                description="Agende e gerencie compromissos facilmente com uma interface de calendário intuitiva."
                            />
                          
                            <FeatureCard
                                icon={<Clock className="h-10 w-10 text-rose-500" />}
                                title="Horário de atendimento"
                                description="Defina sua disponibilidade para garantir que os clientes só possam fazer reservas durante seu horário de trabalho."
                            />
                            <FeatureCard
                                icon={<Users className="h-10 w-10 text-rose-500" />}
                                title="Dados Seguros"
                                description="Seus dados são protegidos com autenticação segura e acesso específico do usuário."
                            />
                            <FeatureCard
                                icon={<Smartphone className="h-10 w-10 text-rose-500" />}
                                title="Integrado com WhatsApp"
                                description="Entre em contato facilmente com seus clientes através do whatsApp em poucos cliques"
                            />
                        </div>
                    </div>
                </section>

                <section className="bg-rose-50 py-20">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-6">Pronto para otimizar seu negócio?</h2>
                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        Junte-se a outros profissionais que estão economizando tempo e expandindo seus negócios com a Bookify.
                    </p>
                    <Link href="/register">
                    <Button>Registre-se agora</Button>
                    </Link>
                </div>
                </section>
            </main>
            <footer className="bg-gray-50 border-t border-gray-200 py-8">
                <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                    <p className="text-gray-500">&copy; {new Date().getFullYear()} Bookify. Todos os direitos são reservados.</p>
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