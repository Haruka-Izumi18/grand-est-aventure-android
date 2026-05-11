import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { authClient } from "@/lib/auth-client";
import { globalStyles } from '@/styles/global';
import { router } from "expo-router";


export default function SignUp() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async () => {
        const { error } = await authClient.signUp.email({
                email,
                password,
                name
        })
        if (error) {
          console.log("Error", error);
        } else {
          router.push('/');
        }
    };

    return (
      <View style={globalStyles.screen}>
        <Text style={globalStyles.title}>Inscris-toi pour commencer l’aventure !</Text>
        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={setName}
          style={globalStyles.input}
        />
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
            handleSubmit();
          }}
          style={[globalStyles.button, {marginTop: 20}]}
        >
          <Text style={globalStyles.buttonText}>Inscription</Text>
        </TouchableOpacity>
      </View>
    );
}
