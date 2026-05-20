import { useState } from "react";
import LoginForm from "@/components/LoginForm";
import SignUpForm from "@/components/SignUpForm";

export default function ProfilIndex() {
  const [isSignUp, setIsSignUp] = useState(false);

  if (isSignUp) {
    return <SignUpForm onBackPress={() => setIsSignUp(false)} />;
  }

  return <LoginForm onSignUpPress={() => setIsSignUp(true)} />;
}
