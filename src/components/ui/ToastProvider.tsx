'use client'

import { cn } from '@/lib/utils'
import * as Toast from '@radix-ui/react-toast'
import { X } from "lucide-react";
import { cva } from 'class-variance-authority'
import { createContext, useContext, useState, ReactNode } from 'react'

type ToastType = {
  title: string
  description?: string
  type?: 'default' | 'danger' | 'success'
}

type ToastContextType = {
  showToast: (toast: ToastType) => void
}

const ToastVariants = cva(
  "text-white px-4 py-3 rounded-md shadow-lg fixed bottom-4 right-4",
  {
    variants: {
      variant: {
        default: "bg-gray-600",
        danger: "bg-red-600",
        success: "bg-green-500",
      }
    }
  }
)

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) throw new Error('useToast must be used within ToastProvider')
  return context
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const [toast, setToast] = useState<ToastType>({ title: '', description: '' })

  const showToast = ({ title, description, type='default' }: ToastType) => {
    setToast({ title, description, type })
    setOpen(false)
    setTimeout(() => setOpen(true), 10)
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      <Toast.Provider swipeDirection="up">
        {children}
        <Toast.Root
          open={open}
          onOpenChange={setOpen}
          className={cn(ToastVariants({ variant: toast.type }))}
        >
          <div className='flex justify-between'>
            <Toast.Title className="font-bold">{toast.title}</Toast.Title>
            <Toast.Action altText='Fechar' > <X size={20} /> </Toast.Action>
          </div>
          {toast.description && (
            <>
            <Toast.Description className="text-sm mt-1">{toast.description}</Toast.Description>
            </>
          )}
        </Toast.Root>
        <Toast.Viewport className="fixed bottom-0 right-0 flex flex-col p-4 gap-2 w-[300px] max-w-full z-50 outline-none" />
      </Toast.Provider>
    </ToastContext.Provider>
  )
}
