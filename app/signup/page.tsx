"use client"
import { AuthForm } from "@/components/site/auth/auth-form"
import { AuthShell } from "@/components/site/auth/auth-shell"
import { authClient } from "@/lib/auth-client";

// export const metadata = {
//   title: "Sign Up — HireLoop",
// }

export default function SignupPage() {


  const handleSignUp = async () => {
    const { data, error } = await authClient.signUp.email({
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password1234",
      image: "https://example.com/image.png",
      callbackURL: "https://example.com/callback",
    });
    console.log('signup response', data, error)
  }


  return (
    <AuthShell>
      <AuthForm mode="signup" onSubmit={handleSignUp} />
    </AuthShell>
  )
}
