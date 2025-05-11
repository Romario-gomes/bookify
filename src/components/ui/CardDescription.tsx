import { ReactElement } from "react";

type CardProps = {
    children: string;
    className?: string;
}

export default function CardDescription({ children, className }: CardProps) {
    return (
        <div className={`text-sm text-muted-foreground ${className}`}>
            {children}
        </div>
    )
}


