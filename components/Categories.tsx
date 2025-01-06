import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";

export default function Categories({ categoryList }) {
  return (
    <View className="mt-3">
      <Text className="font-bold text-[20px]">Categories</Text>
      <FlatList
        data={categoryList}
        numColumns={4}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/(tabs)/home/category-products-list",
                params: {
                  category: item.name,
                },
              })
            }
            className="flex-1 items-center 
            justify-center p-2 border-[1px] border-blue-200 
            m-1 h-[80px] rounded-lg bg-blue-50 "
          >
            <Image source={{ uri: item.icon }} className="w-[35px] h-[35px] " />
            <Text className="text-[12px] mt-1">{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
