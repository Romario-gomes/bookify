import { ReactElement, ReactNode } from "react";

type CardProps = {
    children: ReactNode;
    className?: string;
}

export default function Card({ children, className }: CardProps) {
    return (
        <div className={`rounded-lg border border-gray-300 bg-card text-card-foreground shadow-sm ${className}`}>
            {children}
        </div>
    )
}


