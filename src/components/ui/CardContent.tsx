import { ReactElement } from "react";

type CardProps = {
    children: ReactElement;
    className?: string;
}

export default function Card({ children, className }: CardProps) {
    return (
        <div className={`p-6 pt-0 ${className}`}>
            {children}
        </div>
    )
}