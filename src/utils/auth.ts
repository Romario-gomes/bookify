"use client";

import { signIn } from "next-auth/react";


export const login = async () => {
    await signIn("github", { redirectTo: "/" });
};
