import { useState } from "react"; 
import { View, Text, TextInput, TouchableOpacity, } from "react-native";
import { authClient } from "@/lib/auth-client";
import { globalStyles } from '@/styles/global';


export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        const {error}= await authClient.signIn.email({
            email,
            password,
        })
        if (error) {
          console.log("Error", error);
        }
    };

    return (
      <View style={globalStyles.screen}>
        <Text style={globalStyles.title}>Connecte-toi pour commencer l’aventure !</Text>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={globalStyles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          style={globalStyles.input}
        />
        <TouchableOpacity
          onPress={() => {
            handleLogin();
          }}
          style={globalStyles.button}
        >
          <Text style={globalStyles.buttonText}>Connexion</Text>
        </TouchableOpacity>
      </View>
    );
}

