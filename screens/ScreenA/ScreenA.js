import React from "react";
import { Button, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function ScreenA() {
  const { navigate } = useNavigation();
  return (
    <View style={{ backgroundColor: "white", flex: 1, paddingVertical: 24 }}>
      <Button onPress={() => navigate("Screen B")} title={"Go to Screen B"} />
    </View>
  );
}
