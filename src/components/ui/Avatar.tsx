
import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"

type AvatarProps = {
  children: React.ReactNode;
  className?: string;
}

type AvatarImage = {
  children: React.ReactElement;
  className?: string; 
}
type AvatarFallback = {
  children: React.ReactNode;
  className?: string; 
}

type AvatarImageProps = React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>;

export function Avatar({className, ...children}: AvatarProps) {
  return (
    <AvatarPrimitive.Root
      className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)}
      {...children}
    />
  )
}

export function AvatarImage({className, ...props}: AvatarImageProps)  {
  return (
    <AvatarPrimitive.Image className={cn("aspect-square h-full w-full", className)} {...props} />
  )
}

export function AvatarFallback({className, ...children}: AvatarFallback) {
  return (
    <AvatarPrimitive.Fallback
    className={cn("flex h-full w-full items-center justify-center rounded-full bg-muted", className)}
    {...children}
  />
  )
}
