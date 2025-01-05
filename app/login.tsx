import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import * as Linking from "expo-linking";

export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {
  useWarmUpBrowser();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const router = useRouter(); // Router for manual navigation

  const handleGetStarted = React.useCallback(async () => {
    try {
      const redirectUrl = Linking.createURL("/", {
        scheme: "home-service-mobile-app",
      });

      const { createdSessionId, setActive } = await startOAuthFlow({
        redirectUrl,
      });

      if (createdSessionId) {
        await setActive({ session: createdSessionId }); // Set the session
        console.log("Login successful, session set.");

        // Manually navigate to home after setting the session
        router.replace("/(tabs)/home");
      } else {
        console.log("No session created. Handle MFA or other flows here.");
      }
    } catch (err) {
      console.error("OAuth Error:", JSON.stringify(err, null, 2));
    }
  }, [router]);

  return (
    <View className="items-center">
      <Image
        source={require("../assets/images/login2.png")}
        className="w-[220px] h-[460px]
             object-cover mt-16 rounded-xl "
        style={{ borderWidth: 4, borderColor: "#000", paddingTop: 5 }}
      />
      <View className="p-8 mt-[-20px] bg-blue-500 flex h-full rounded-t-3xl shadow-md">
        <Text className="text-[30px] font-bold text-white">
          Community Marketplace
        </Text>
        <Text className="text-[18px] text-white text-center mt-6">
          Buy Sell Marketplace where you can sell old item and make real money
        </Text>
        <TouchableOpacity
          onPress={handleGetStarted}
          className="p-4 bg-white rounded-full mt-20"
        >
          <Text className="text-blue text-center text-[18px]">Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
