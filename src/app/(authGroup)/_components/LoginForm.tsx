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
import { LoginAction } from "../_actions/authAction"
import { toast } from "sonner"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"
import { useSearchParams } from "next/navigation"


const loginSchema = z
    .object({
        email: z
            .string()
            .min(1, "Email is required")
            .email("Invalid email address"),
        password: z
            .string()
            .min(6, "Password must be at least 6 characters long"),
    })

export type LoginFormValues = z.infer<typeof loginSchema>

export function LoginForm({ ...props }: React.ComponentProps<typeof Card>) {
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get("redirectTo") ?? ""
    const [state, formAction, isPending] = React.useActionState(LoginAction.bind(null, redirectTo), false);
    const [showPassword, setShowPassword] = React.useState(false)


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        mode: "onBlur",
        reValidateMode: "onChange",
        defaultValues: {
            email: "",
            password: "",
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


    function onSubmit(data: LoginFormValues) {
        React.startTransition(() => { formAction(data) })
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


                        {/* Email Field */}
                        <Field data-invalid={!!errors.email}>
                            <FieldLabel htmlFor="email">Email</FieldLabel>
                            <Input
                                {...register("email")}
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                aria-invalid={!!errors.email}
                                disabled={isPending}
                            />
                            {errors.email && <FieldError errors={[errors.email]} />}
                        </Field>

                        {/* Password Field */}
                        <Field data-invalid={!!errors.password}>
                            <FieldLabel htmlFor="password">Password</FieldLabel>
                            <div className="relative">
                                <Input
                                    {...register("password")}
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    aria-invalid={!!errors.password}
                                    disabled={isPending}
                                    className="pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                    tabIndex={-1}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {errors.password && <FieldError errors={[errors.password]} />}
                        </Field>


                        {/* Form Buttons */}
                        <FieldGroup>
                            <Field>
                                <Button type="submit" disabled={isPending}>
                                    {isPending ? "Logging in..." : "Login"}
                                </Button>

                                <FieldDescription className="px-6 text-center">
                                    Don&apos;t Have an Account? <Link href="/register" className="text-primary">Register</Link>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    )
}