import { Stack } from "expo-router";

export default function ExploreLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Explore", headerShown: false }}
      />
      <Stack.Screen
        name="product-details"
        options={({ route }) => ({
          title: "Product Details",
          headerStyle: { backgroundColor: "#3b82f6" },
          headerTintColor: "#fff",
        })}
      />
    </Stack>
  );
}
