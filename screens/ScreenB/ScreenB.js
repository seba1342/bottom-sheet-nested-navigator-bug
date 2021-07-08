import React from "react";
import { Button, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function ScreenB() {
  const { navigate } = useNavigation();
  return (
    <View style={{ backgroundColor: "white", flex: 1, paddingVertical: 24 }}>
      <Button onPress={() => navigate("Screen A")} title={"Go to Screen A"} />
    </View>
  );
}
