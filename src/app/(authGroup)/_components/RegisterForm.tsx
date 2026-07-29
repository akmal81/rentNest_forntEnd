"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"



import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { RegistarAction } from "../_actions/authAction"
import { toast } from "sonner"
import Link from "next/link"


const registerSchema = z
    .object({
        name: z
            .string()
            .min(1, "Full Name is required")
            .min(2, "Name must be at least 2 characters long"),
        email: z
            .string()
            .min(1, "Email is required")
            .email("Invalid email address"),
        profilePhoto: z
            .string()
            .url("Invalid URL format")
            .nullable()
            .optional(),
        password: z
            .string()
            .min(6, "Password must be at least 6 characters long"),
        confirmPassword: z
            .string()
            .min(1, "Please confirm your password"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"]
    })

export type RegisterFormValues = z.infer<typeof registerSchema>

export function RegisterForm({ ...props }: React.ComponentProps<typeof Card>) {
    const [state, formAction, isPending] = React.useActionState(RegistarAction, null);


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        mode: "onBlur",
        reValidateMode: "onChange",
        defaultValues: {
            name: "",
            email: "",
            profilePhoto:"",
            password: "",
            confirmPassword: "",
        },
    })

    React.useEffect(() => {
        if (state?.message) {
            if (state.success) {
                toast.success(state.message);
            } else {
                toast.error(state.message);
            }
        }
    }, [state]);


    function onSubmit(data: RegisterFormValues) {
        React.startTransition(() => { formAction(data) })

        // more work auto login
    }

    return (
        <Card {...props}>
            <CardHeader>
                <CardTitle className="">Registar</CardTitle>
                <CardDescription>
                    {/*  */}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FieldGroup>
                        {/* Full Name Field */}
                        <Field data-invalid={!!errors.name}>
                            <FieldLabel htmlFor="name">Full Name</FieldLabel>
                            <Input
                                {...register("name")}
                                id="name"
                                type="text"
                                placeholder="John Doe"
                                aria-invalid={!!errors.name}
                            />
                            {errors.name && <FieldError errors={[errors.name]} />}
                        </Field>

                        {/* Email Field */}
                        <Field data-invalid={!!errors.email}>
                            <FieldLabel htmlFor="email">Email</FieldLabel>
                            <Input
                                {...register("email")}
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                aria-invalid={!!errors.email}
                            />
                            {errors.email && <FieldError errors={[errors.email]} />}
                        </Field>

                        {/* Photourl */}
                        <Field data-invalid={!!errors.profilePhoto}>
                            <FieldLabel htmlFor="profilePhoto">Profile Photo</FieldLabel>
                            <Input
                                {...register("profilePhoto")}
                                id="profilePhoto"
                                type="profilePhoto"
                                placeholder="https://www....."
                                aria-invalid={!!errors.profilePhoto}
                            />
                            {errors.profilePhoto && <FieldError errors={[errors.profilePhoto]} />}
                        </Field>

                        {/* Password Field */}
                        <Field data-invalid={!!errors.password}>
                            <FieldLabel htmlFor="password">Password</FieldLabel>
                            <Input
                                {...register("password")}
                                id="password"
                                type="password"
                                aria-invalid={!!errors.password}
                            />
                            <FieldDescription className="text-red-800">Must be at least 6 characters long.</FieldDescription>
                            {errors.password && <FieldError errors={[errors.password]} />}
                        </Field>

                        {/* Confirm Password Field */}
                        <Field data-invalid={!!errors.confirmPassword}>
                            <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
                            <Input
                                {...register("confirmPassword")}
                                id="confirm-password"
                                type="password"
                                aria-invalid={!!errors.confirmPassword}
                            />
                            <FieldDescription>Please confirm your password.</FieldDescription>
                            {errors.confirmPassword && (
                                <FieldError errors={[errors.confirmPassword]} />
                            )}
                        </Field>

                        {/* Form Buttons */}
                        <FieldGroup>
                            <Field>
                                <Button type="submit">
                                    {isPending ? "Registar in progress..." : "Register"}
                                </Button>

                                <FieldDescription className="px-6 text-center">
                                    Already have an account? <Link href="/login" className="text-primary">Login</Link>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    )
}