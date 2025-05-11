import { ReactElement } from "react";

type CardProps = {
    children: ReactElement;
    className?: string;
}

export default function CardHeader({ children, className }: CardProps) {
    return (
        <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>
            {children}
        </div>
    )
}


