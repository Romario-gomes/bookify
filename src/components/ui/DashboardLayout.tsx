"use client"

import Link from "next/link"
import { Button } from "./Button"
import { CalendarDays, LayoutDashboard, LogOut, Menu, Scissors, Users } from "lucide-react"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { SheetContent, Sheet } from "./Sheet"
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar"
import { signOut, useSession } from "next-auth/react"

interface DashboardLayoutProps {
    children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { data: session } = useSession();
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Agendamentos", href: "/appointments", icon: CalendarDays },
    { name: "Clientes", href: "/clients", icon: Users },
    { name: "Serviços", href: "/services", icon: Scissors },
  ]

    const isActive = (path: string) => {
        return pathname === path
    }

    return (
         <div className="flex h-screen bg-gray-50">
      {/* Sidebar for desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow pt-5 overflow-y-auto border-r border-gray-300 bg-white">
          <div className="flex items-center flex-shrink-0 px-4">
            <Link href="/" className="text-xl font-bold text-rose-600">
              Bookify
            </Link>
          </div>
          <div className="mt-8 flex-1 flex flex-col">
            <nav className="flex-1 px-2 pb-4 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      isActive(item.href) ? "bg-rose-50 text-rose-600" : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <Icon
                      className={`mr-3 h-5 w-5 ${
                        isActive(item.href) ? "text-rose-500" : "text-gray-400 group-hover:text-gray-500"
                      }`}
                    />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center cursor-pointer">
                 <Avatar className="h-8 w-8">
                      { session?.user?.image && (
                        <AvatarImage src={session.user.image} alt="User" />
                      )}
                  </Avatar>
                  <div className="ml-3">
                    { session?.user?.name && (
                      <p className="text-sm font-medium text-gray-700">{session.user.name}</p>
                      )}
                    <p className="text-xs font-medium text-gray-500">Ver perfil</p>
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white border rounded-md">
                  <DropdownMenuLabel className="px-2 py-1.5 text-sm font-semibold">Minha Conta</DropdownMenuLabel>
                <DropdownMenuSeparator className="-mx-1 my-1 h-px bg-gray-200" />
                  <DropdownMenuItem className="px-2 py-1.5 text-sm outline-none hover:bg-gray-200" >
                    <Link href="/profile">Perfil</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="px-2 py-1.5 text-sm outline-none hover:bg-gray-200">
                    <Link href="/settings" >Configurações</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="-mx-1 my-1 h-px bg-gray-200" />
                  <DropdownMenuItem className="px-2 py-1.5 flex items-center cursor-pointer text-sm outline-none hover:bg-gray-200" onClick={() => signOut({ callbackUrl: '/sign-in' })}>
                    <LogOut size={16} />
                    <span>Sair</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="left" className="w-64">
          <div className="flex items-center justify-between mb-6">
            <Link href="/" className="text-xl font-bold text-rose-600" onClick={() => setIsMobileMenuOpen(false)}>
              Bookify
            </Link>
          </div>
          <nav className="flex flex-col space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    isActive(item.href) ? "bg-rose-50 text-rose-600" : "text-gray-600 hover:bg-gray-50"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon className={`mr-3 h-5 w-5 ${isActive(item.href) ? "text-rose-500" : "text-gray-400"}`} />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </SheetContent>
      </Sheet>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="relative z-10 flex-shrink-0 flex h-16  border-b border-gray-200">
          <Button variant="ghost" size="icon" className="md:hidden px-4" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu className="h-6 w-6" />
            <span className="sr-only">Open sidebar</span>
          </Button>
          <div className="flex-1 flex justify-end px-4">
            <div className="ml-4 flex items-center md:ml-6">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full  mr-6">
                    <Avatar className="h-8 w-8">
                      { session?.user?.image && (
                        <AvatarImage src={session.user.image} alt="User" />
                      )}
                      <AvatarFallback>US</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white border rounded-md">
                  <DropdownMenuLabel className="px-2 py-1.5 text-sm font-semibold">Minha Conta</DropdownMenuLabel>
                <DropdownMenuSeparator className="-mx-1 my-1 h-px bg-gray-200" />
                  <DropdownMenuItem className="px-2 py-1.5 text-sm outline-none hover:bg-gray-200" >
                    <Link href="/profile">Perfil</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="px-2 py-1.5 text-sm outline-none hover:bg-gray-200">
                    <Link href="/settings" >Configurações</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="-mx-1 my-1 h-px bg-gray-200" />
                  <DropdownMenuItem className="px-2 py-1.5 flex items-center cursor-pointer text-sm outline-none hover:bg-gray-200" onClick={() => signOut({ callbackUrl: '/sign-in' })}>
                    <LogOut size={16} />
                    <span>Sair</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        <main className="flex-1 relative overflow-y-auto focus:outline-none p-4 sm:p-6">{children}</main>
      </div>
    </div>
    )
}