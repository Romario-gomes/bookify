import { Card } from "@/components/ui/Card";
import CardContent from "@/components/ui/CardContent";
import CardDescription from "@/components/ui/CardDescription";
import CardFooter from "@/components/ui/CardFooter";
import CardHeader from "@/components/ui/CardHeader";
import CardTitle from "@/components/ui/CardTitle";
import Link from "next/link";

export default function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md p-3">
        <>
        <CardHeader className="p-y-3">
          <>
          <CardTitle className="text-2xl font-bold text-center">
            Create an account
          </CardTitle>
          <CardDescription className="text-center text-gray-600">
            Enter your information to create your NailPro account
          </CardDescription>
          </>
        </CardHeader>

        <CardContent>
          <form className="space-y-4">
            <label className="font-bold">Nome completo</label>
            <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 border border-gray-300 focus:outline-rose-500" placeholder="Digite seu email"></input>
          
            <label className="font-bold">Email</label>
            <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 border border-gray-300 focus:outline-rose-500" placeholder="Digite sua senha"></input>

            <label className="font-bold">Senha</label>
            <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 border border-gray-300 focus:outline-rose-500" placeholder="Digite sua senha"></input>

            <label className="font-bold">Confirmar senha</label>
            <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 border border-gray-300 focus:outline-rose-500" placeholder="Digite sua senha"></input>

            <button className="w-full bg-rose-500 text-white rounded py-2 hover:bg-rose-600 cursor-pointer" type="submit">
              Create Account
            </button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600">
          Already have an account? {" "}
            <Link href="/sign-in" className="text-rose-600 hover:text-rose-800 font-medium">
              Sign in
            </Link>
          </p>
        </CardFooter>
        </>
      </Card>
    </div>
  );
}
