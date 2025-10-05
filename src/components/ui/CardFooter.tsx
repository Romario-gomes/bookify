import { ReactElement } from "react";

type CardProps = {
    children: ReactElement;
    className?: string;
}

export default function CardFooter({ children, className }: CardProps) {
    return (
        <div className={`flex items-center p-6 pt-0 ${className}`}>
            {children}
        </div>
    )
}