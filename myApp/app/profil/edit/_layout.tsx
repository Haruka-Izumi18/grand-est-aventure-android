import { Stack } from "expo-router";

export default function EditLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="address"
        options={{
          presentation: "modal",
          headerShown: false,
        }}
      />
    </Stack>
  );
}