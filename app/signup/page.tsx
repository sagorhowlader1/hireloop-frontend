import { AuthForm } from "@/components/site/auth/auth-form"
import { AuthShell } from "@/components/site/auth/auth-shell"

export const metadata = {
  title: "Sign Up — HireLoop",
}

export default function SignupPage() {
  return (
    <AuthShell>
      <AuthForm mode="signup" />
    </AuthShell>
  )
}
