import { ReactElement } from "react";

type CardProps = {
    children: string;
    className?: string;
}

export default function CardTitle({ children, className }: CardProps) {
    return (
        <div className={`text-2xl font-semibold leading-none tracking-tight ${className}`}>
            {children}
        </div>
    )
}


