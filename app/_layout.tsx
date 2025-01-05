import React from "react";
import { Stack } from "expo-router";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";

const secureTokenCache = {
  getToken: async (key: string) => {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (err) {
      console.error("Error getting token from SecureStore:", err);
      return null;
    }
  },

  saveToken: async (key: string, value: string) => {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (err) {
      console.error("Error saving token to SecureStore:", err);
    }
  },
};

export default function RootLayout() {
  const publishableKey =
    "pk_test_ZXhvdGljLXBlYWNvY2stMzEuY2xlcmsuYWNjb3VudHMuZGV2JA";

  return (
    <ClerkProvider
      publishableKey={publishableKey}
      tokenCache={secureTokenCache}
    >
      <SignedIn>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </SignedIn>
      <SignedOut>
        <Stack>
          <Stack.Screen name="login" options={{ headerShown: false }} />
        </Stack>
      </SignedOut>
    </ClerkProvider>
  );
}
