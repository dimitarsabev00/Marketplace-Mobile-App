import React from "react";
import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import "../global.css";

const IndexPage = () => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return null; // Optionally, add a loading spinner here
  }

  return isSignedIn ? (
    <Redirect href="/(tabs)/home" />
  ) : (
    <Redirect href="/login" />
  );
};

export default IndexPage;
