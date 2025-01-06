import { Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/configs/firebase";
import LatestItemList from "@/components/LatestItemList";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ExploreScreen() {
  const [productList, setproductList] = useState([]);

  useEffect(() => {
    getAllProducts();
  }, []);

  /**
   * Used to get All Products
   */
  const getAllProducts = async () => {
    setproductList([]);
    const q = query(collection(db, "userPost"), orderBy("createdAt", "desc"));

    const snapshot = await getDocs(q);
    snapshot.forEach((doc) => {
      setproductList((productList) => [...productList, doc.data()]);
    });
  };

  return (
    <SafeAreaView className="p-5 py-8 bg-white flex-1">
      <ScrollView>
        <Text className="text-[30px] font-bold">Explore More</Text>
        <LatestItemList latestItemList={productList} />
      </ScrollView>
    </SafeAreaView>
  );
}
