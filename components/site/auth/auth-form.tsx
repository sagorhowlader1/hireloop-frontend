"use client"

import Link from "next/link"
import { useState } from "react"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { authClient } from "@/lib/auth-client"

export type AuthMode = "signin" | "signup"

export type AuthToggle = {
  readonly message: string
  readonly linkLabel: string
  readonly href: string
}

const TOGGLES: Record<AuthMode, AuthToggle> = {
  signin: {
    message: "Don't have an account?",
    linkLabel: "Create a free account",
    href: "/signup",
  },
  signup: {
    message: "Already have an account?",
    linkLabel: "Sign In",
    href: "/signin",
  },
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47a5.57 5.57 0 0 1-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09A11.99 11.99 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.29A7.2 7.2 0 0 1 4.89 12c0-.79.14-1.56.38-2.29V6.62H1.29A11.96 11.96 0 0 0 0 12c0 1.94.47 3.77 1.29 5.38l3.98-3.09Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.69 1.29 6.62l3.98 3.09C6.22 6.86 8.87 4.75 12 4.75Z"
      />
    </svg>
  )
}

export function AuthForm({ mode }: { mode: AuthMode }) {
  const isSignUp = mode === "signup"
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [role, setRole] = useState<"seeker" | "recruiter" | "admin">("seeker")

  const toggle = TOGGLES[mode]

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)

    const formData = new FormData(event.currentTarget)
    const name = String(formData.get("name") ?? "").trim()
    const email = String(formData.get("email") ?? "").trim()
    const password = String(formData.get("password") ?? "")

    // Minimal client-side validation; merge with server rules during auth integration.
    if (isSignUp) {
      if (password.length < 8) {
        setError("Password must be at least 8 characters.")
        return
      }
    }

    // Integrate better-auth here.
    try {
      if (isSignUp) {
        const { error: signUpError } = await authClient.signUp.email({
          name,
          email,
          password,
          role,
        })
        if (signUpError) {
          setError(signUpError.message ?? "Sign up failed. Please try again.")
          return
        }
        console.info("Sign up submitted:", { name, email, role })
        router.push("/")
        // TODO: redirect based on role, e.g. router.push("/dashboard")
      } else {
        const { error: signInError } = await authClient.signIn.email({
          email,
          password,
        })
        if (signInError) {
          setError(signInError.message ?? "Sign in failed. Please try again.")
          return
        }
        console.info("Sign in submitted:", { email })
        router.push("/")
        // TODO: redirect based on role, e.g. router.push("/dashboard")
      }
    } catch (err) {
      setError("Something went wrong. Please try again.")
      console.error(err)
    }
  }

  function handleGoogleSignIn() {
    // TODO: Integrate better-auth social sign-in:
    //   await authClient.signIn.social({ provider: "google" })
    console.info("Google sign-in clicked")
  }

  return (
    <div className="w-full max-w-sm rounded-xl border bg-card/70 p-6 elevation-card">
      <div className="flex flex-col gap-1 text-center">
        <h1 className="font-heading text-xl font-bold text-foreground">
          {isSignUp ? "Create a free account" : "Sign In"}
        </h1>
        <p className="text-sm text-muted-foreground">
          {isSignUp
            ? "Start your job hunt for free — no credit card required."
            : "Welcome back! Enter your details to continue."}
        </p>
      </div>

      {error ? (
        <p
          role="alert"
          className="mt-4 rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive"
        >
          {error}
        </p>
      ) : null}

      <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
        {isSignUp ? (
          <div className="flex flex-col gap-1.5">
            <Label>Joining HireLoop as</Label>
            <RadioGroup
              value={role}
              onValueChange={(value) =>
                setRole(value as "seeker" | "recruiter" | "admin")
              }
              className="mt-2 grid grid-cols-3 gap-2"
            >
              {(
                [
                  { value: "seeker", label: "Seeker" },
                  { value: "recruiter", label: "Recruiter" },
                  { value: "admin", label: "Admin" },
                ] as const
              ).map((option) => (
                <label
                  key={option.value}
                  className="flex cursor-pointer items-center gap-2 rounded-lg border border-input bg-background/40 px-3 py-2 text-sm transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/10"
                >
                  <RadioGroupItem
                    value={option.value}
                    id={`role-${option.value}`}
                  />
                  {option.label}
                </label>
              ))}
            </RadioGroup>
            <input type="hidden" name="role" value={role} />
          </div>
        ) : null}

        {isSignUp ? (
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="name">Full name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              placeholder="Jane Cooper"
              className="h-9 bg-background/40"
            />
          </div>
        ) : null}

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="jane.cooper@example.com"
            className="h-9 bg-background/40"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-start justify-between gap-2">
            <Label htmlFor="password">Password</Label>
            {isSignUp ? null : (
              <Link
                href="/forgot-password"
                className="text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              >
                Forgot password?
              </Link>
            )}
          </div>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete={isSignUp ? "new-password" : "current-password"}
              required
              placeholder={isSignUp ? "At least 8 characters" : "••••••••"}
              className="h-9 bg-background/40 pr-9"
            />
            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute inset-y-0 right-0 flex w-9 cursor-pointer items-center justify-center text-muted-foreground outline-none hover:text-foreground"
            >
              {showPassword ? (
                <EyeOffIcon className="size-4" />
              ) : (
                <EyeIcon className="size-4" />
              )}
            </button>
          </div>
        </div>

        <label
          data-slot="field-label"
          className="flex items-start gap-2.5 text-sm text-muted-foreground"
        >
          <Checkbox name="terms" className="mt-0.5" />
          {isSignUp ? (
            <span className="leading-snug">
              I agree to the{" "}
              <Link
                href="/terms"
                className="text-foreground underline-offset-4 hover:underline"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="text-foreground underline-offset-4 hover:underline"
              >
                Privacy Policy
              </Link>
            </span>
          ) : (
            <span>Keep me signed in on this device</span>
          )}
        </label>

        <Button type="submit" className="w-full" size="lg">
          {isSignUp ? "Create a free account" : "Sign In"}
        </Button>

        <div
          aria-hidden="true"
          className="flex items-center gap-3 text-xs text-muted-foreground"
        >
          <span className="h-px flex-1 bg-border" />
          <span>or</span>
          <span className="h-px flex-1 bg-border" />
        </div>

        <Button
          type="button"
          variant="outline"
          size="lg"
          className="w-full"
          onClick={handleGoogleSignIn}
        >
          <GoogleIcon className="size-4" />
          Continue with Google
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        {toggle.message}{" "}
        <Link
          href={toggle.href}
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          {toggle.linkLabel}
        </Link>
      </p>
    </div>
  )
}
