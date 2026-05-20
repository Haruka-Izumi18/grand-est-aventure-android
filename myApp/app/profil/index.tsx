import { useState } from "react";
import { Redirect } from "expo-router";
import LoginForm from "@/components/LoginForm";
import SignUpForm from "@/components/SignUpForm";
import { authClient } from "@/lib/auth-client";

export default function ProfilIndex() {
  const { data: session } = authClient.useSession();
  const [isSignUp, setIsSignUp] = useState(false);

  if (session) {
    return <Redirect href="/profil/user-profil" />;
  }

  if (isSignUp) {
    return <SignUpForm onBackPress={() => setIsSignUp(false)} />;
  }

  return <LoginForm onSignUpPress={() => setIsSignUp(true)} />;
}
