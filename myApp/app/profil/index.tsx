import { useState } from "react";
import LoginForm from "@/components/LoginForm";
import SignUpForm from "@/components/SignUpForm";
import { authClient } from "@/lib/auth-client";
import Profil from "./profil";

export default function ProfilIndex() {
  const [isSignUp, setIsSignUp] = useState(false);
  const { data: session } = authClient.useSession();

  // Connecté → page profil
  if (session?.user) {
    return <Profil />;
  }

  // Pas connecté → login ou inscription
  if (isSignUp) {
    return <SignUpForm onBackPress={() => setIsSignUp(false)} />;
  }

  return <LoginForm onSignUpPress={() => setIsSignUp(true)} />;
}