import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Home", headerShown: false }}
      />
      <Stack.Screen
        name="category-products-list"
        options={({ route }) => ({
          title: route.params.category,
          headerStyle: { backgroundColor: "#3b82f6" },
          headerTintColor: "#fff",
        })}
      />
    </Stack>
  );
}
