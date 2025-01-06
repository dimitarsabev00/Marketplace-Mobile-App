import { Stack } from "expo-router";

export default function AddPostLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "AddPost", headerShown: false }}
      />
    </Stack>
  );
}
