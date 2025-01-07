import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useUser } from "@clerk/clerk-expo";
import { useNavigation } from "@react-navigation/native";
import { db } from "@/configs/firebase";
import LatestItemList from "@/components/LatestItemList";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MyProducts() {
  const { user } = useUser();
  const [productList, setProductList] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    user && getUserPost();
  }, [user]);

  useEffect(() => {
    navigation.addListener("focus", (e) => {
      getUserPost();
    });
  }, [navigation]);

  /**
   * Used to get User Post only
   */
  const getUserPost = async () => {
    setProductList([]);
    const q = query(
      collection(db, "userPost"),
      where("userEmail", "==", user?.primaryEmailAddress?.emailAddress)
    );
    const snapshot = await getDocs(q);
    snapshot.forEach((doc) => {
      setProductList((productList) => [...productList, doc.data()]);
    });
  };

  return (
    <SafeAreaView>
      <LatestItemList latestItemList={productList} />
    </SafeAreaView>
  );
}
