import React from "react";
import { Redirect } from "expo-router";
import "../global.css";

const IndexPage = () => {
  return <Redirect href="/login" />;
};

export default IndexPage;
