import { Stack } from "expo-router";

export default function ProfileLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Profile", headerShown: false }}
      />
      <Stack.Screen
        name="my-products"
        options={({ route }) => ({
          title: "My Products",
          headerStyle: { backgroundColor: "#3b82f6" },
          headerTintColor: "#fff",
        })}
      />
    </Stack>
  );
}
