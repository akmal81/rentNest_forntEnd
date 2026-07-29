"use server"
import { LoginState, RegisterApiResponse } from "@/types";
import { RegisterFormValues } from "../_components/RegisterForm";
import { LoginFormValues } from "../_components/LoginForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt, { JwtPayload } from "jsonwebtoken"


const backendApi = process.env.NEXT_PUBLIC_BACKEND_API_URL

export const RegistarAction = async (prevState: RegisterApiResponse, data: RegisterFormValues) => {

    const payload = {
        name: data.name,
        email: data.email,
        profilePhoto:data.profilePhoto,
        password: data.password
    }
    console.log("Backend URL:", process.env.NEXT_PUBLIC_BACKEND_API_URL);

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });

    const result = await res.json()

    console.log(result);

    return result
}



export const  LoginAction= async (redirectTo : string, prevState: LoginState, data: LoginFormValues) =>{
    const payload = {
        email: data.email,
        password: data.password,
    }
    const res = await fetch(`${backendApi}/api/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    })

    const result = await res.json();

    if (result.success) {
        const cookieStore = await cookies()

        cookieStore.set("accessToken", result.data.accessToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 24,
            sameSite: "lax",
        });
        cookieStore.set("refreshToken", result.data.refreshToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7,
            sameSite: "lax",
        });
    }

    const decodedToken = jwt.decode(result.data.accessToken) as JwtPayload;
    
    if(redirectTo && typeof redirectTo === "string" && redirectTo.startsWith("/") && !redirectTo.startsWith("//")){
            redirect(redirectTo)
        }

    if (decodedToken.role === "TENANT") {
        redirect("/dashboard/tenant");
    } else if (decodedToken.role === "LANDLORD") {
        redirect("/dashboard/landlord");
    } else if (decodedToken.role === "ADMIN") {
        redirect("/dashboard/admin");
    }

    return result

}
