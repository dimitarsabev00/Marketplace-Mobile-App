import {
  View,
  Text,
  Image,
  ScrollView,
  Linking,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { useUser } from "@clerk/clerk-expo";
import {
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useLocalSearchParams, useRouter, Stack } from "expo-router";

export default function ProductDetails() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const { user } = useUser();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (params && params.product) {
      setProduct(JSON.parse(params.product)); // Ensure product is parsed if passed as a string
    }
  }, [params]);

  

  const sendEmailMessage = () => {
    if (!product) return;
    const subject = "Regarding " + product.title;
    const body =
      "Hi " + product.userName + ",\n\nI am interested in this product.";
    Linking.openURL(
      `mailto:${product.userEmail}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`
    );
  };

  const deleteUserPost = () => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this post?",
      [
        {
          text: "Yes",
          onPress: () => deleteFromFirestore(),
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]
    );
  };

  const deleteFromFirestore = async () => {
    if (!product) return;
    try {
      const q = query(
        collection(db, "UserPost"),
        where("title", "==", product.title)
      );
      const snapshot = await getDocs(q);
      snapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
        console.log("Post deleted successfully");
        router.back(); // Navigate back after deletion
      });
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  if (!product) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Loading product details...</Text>
      </View>
    );
  }

  return (
    <>
      
      <ScrollView className="bg-white">
        <Image
          source={{ uri: product.image }}
          className="h-[320px] w-full"
          resizeMode="cover"
        />

        <View className="m-5">
          <Text className="text-[24px] font-bold">{product.title}</Text>
          <View className="items-baseline">
            <Text className="bg-blue-200 p-1 mt-2 px-2 rounded-full text-blue-500">
              {product.category}
            </Text>
          </View>
          <Text className="mt-3 font-bold text-[20px]">Description</Text>
          <Text className="text-[17px] text-gray-500">{product.desc}</Text>
        </View>

        {/* User Info */}
        <View className="p-3 flex flex-row items-center gap-3 bg-blue-100 border-gray-400">
          <Image
            source={{ uri: product.userImage }}
            className="w-12 h-12 rounded-full"
          />
          <View>
            <Text className="font-bold text-[18px]">{product.userName}</Text>
            <Text className="text-gray-500">{product.userEmail}</Text>
          </View>
        </View>

        {user?.primaryEmailAddress.emailAddress === product.userEmail ? (
          <TouchableOpacity
            onPress={deleteUserPost}
            className="z-40 bg-red-500 rounded-full p-4 m-2"
          >
            <Text className="text-center text-white">Delete Post</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={sendEmailMessage}
            className="z-40 bg-blue-500 rounded-full p-4 m-2"
          >
            <Text className="text-center text-white">Send Message</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </>
  );
}
