import { ReactElement, ReactNode } from "react";

type CardProps = {
    children: ReactNode;
    className?: string;
}

export default function CardHeader({ children, className }: CardProps) {
    return (
        <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>
            {children}
        </div>
    )
}


