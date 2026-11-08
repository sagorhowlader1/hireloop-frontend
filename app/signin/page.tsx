'use client';
import { AuthForm } from "@/components/site/auth/auth-form"
import { AuthShell } from "@/components/site/auth/auth-shell"
import { authClient } from "@/lib/auth-client"

// export const metadata = {
//   title: "Sign In — HireLoop",
// }

export default function LoginPage() {

  const heandleSignin = async () => {
    const { data, error } = await authClient.signIn.email({
      email: "john.doe@example.com",
      password: "password1234", 
      rememberMe: true, 
      callbackURL: "/",
    });

    console.log(data, 'signin', error)
  }


  return (
    <AuthShell>
      <AuthForm mode="signin" onSubmit={heandleSignin} />
    </AuthShell>
  )
}
