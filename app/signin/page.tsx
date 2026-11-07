import { AuthForm } from "@/components/site/auth/auth-form"
import { AuthShell } from "@/components/site/auth/auth-shell"

export const metadata = {
  title: "Sign In — HireLoop",
}

export default function LoginPage() {
  return (
    <AuthShell>
      <AuthForm mode="signin" />
    </AuthShell>
  )
}
