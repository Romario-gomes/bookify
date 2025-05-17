import { ReactElement, ReactNode } from "react";

type CardProps = {
    children: ReactNode;
    className?: string;
}

export default function Card({ children, className }: CardProps) {
    return (
        <div className={`p-6 pt-0 ${className}`}>
            {children}
        </div>
    )
}