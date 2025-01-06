import { ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs, orderBy } from "firebase/firestore";
import { db } from "@/configs/firebase";
import Header from "@/components/Header";
import Slider from "@/components/Slider";
import Categories from "@/components/Categories";
import LatestItemList from "@/components/LatestItemList";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [sliderList, setSliderList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [latestItemList, setLatestItemList] = useState([]);

  useEffect(() => {
    getSliders();
    getCategoryList();
    getLatestItemList();
  }, []);

  /**
   * Used to Get Sliders for Home Screen
   */
  const getSliders = async () => {
    setSliderList([]);
    const querySnapshot = await getDocs(collection(db, "sliders"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      setSliderList((sliderList) => [...sliderList, doc.data()]);
    });
  };

  /**
   * Used to get Category List
   */
  const getCategoryList = async () => {
    setCategoryList([]);
    const querySnapshot = await getDocs(collection(db, "category"));
    querySnapshot.forEach((doc) => {
      console.log("Docs:", doc.data());
      setCategoryList((categoryList) => [...categoryList, doc.data()]);
    });
  };

  /**
   *
   */
  const getLatestItemList = async () => {
    setLatestItemList([]);
    const querySnapShot = await getDocs(
      collection(db, "userPost"),
      orderBy("createdAt", "desc")
    );
    querySnapShot.forEach((doc) => {
      console.log("Docs", doc.data());
      setLatestItemList((latestItemList) => [...latestItemList, doc.data()]);
    });
  };

  return (
    <SafeAreaView className="py-8 px-6 bg-white flex-1">
      <ScrollView>
        <Header />
        {/* Slider  */}
        <Slider sliderList={sliderList} />
        {/* Category List  */}
        <Categories categoryList={categoryList} />
        {/* Latest Item List   */}
        <LatestItemList
          latestItemList={latestItemList}
          heading={"Latest Items"}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
