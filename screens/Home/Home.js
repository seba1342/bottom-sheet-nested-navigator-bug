import "react-native-gesture-handler";
import React, { useCallback, useMemo, useRef } from "react";
import { Button, View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  HeaderBackButton,
  TransitionPresets,
} from "@react-navigation/stack";
import BottomSheet, { TouchableOpacity } from "@gorhom/bottom-sheet";
import ScreenA from "../ScreenA";
import ScreenB from "../ScreenB";

const Stack = createStackNavigator();

const Navigator = () => {
  const screenOptions = useMemo(
    () => ({
      ...TransitionPresets.SlideFromRightIOS,
      headerLeft: ({ onPress, ...props }) => (
        <TouchableOpacity onPress={onPress}>
          <HeaderBackButton {...props} />
        </TouchableOpacity>
      ),
      headerShown: true,
      safeAreaInsets: { top: 0 },
    }),
    []
  );

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator screenOptions={screenOptions} headerMode="screen">
        <Stack.Screen
          name="Screen A"
          component={ScreenA}
          options={{ headerLeft: () => null }}
        />
        <Stack.Screen name="Screen B" component={ScreenB} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function HomeScreen({ navigation }) {
  // hooks
  const bottomSheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);

  // callbacks
  const handleSheetChange = useCallback((index) => {
    // eslint-disable-next-line no-console
    console.log("handleSheetChange", index);
  }, []);
  const handleSnapPress = useCallback((index) => {
    bottomSheetRef.current?.snapTo(index);
  }, []);
  const handleExpandPress = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);
  const handleCollapsePress = useCallback(() => {
    bottomSheetRef.current?.collapse();
  }, []);
  const handleClosePress = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  // renders
  return (
    <View style={styles.container}>
      <Button title="Snap To 90%" onPress={() => handleSnapPress(2)} />
      <Button title="Snap To 50%" onPress={() => handleSnapPress(1)} />
      <Button title="Snap To 25%" onPress={() => handleSnapPress(0)} />
      <Button title="Expand" onPress={handleExpandPress} />
      <Button title="Collapse" onPress={handleCollapsePress} />
      <Button title="Close" onPress={handleClosePress} />
      <Button
        title="Go to details"
        onPress={() => navigation.navigate("Details")}
      />

      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChange}
        style={{ backgroundColor: "white" }}
      >
        <Navigator />
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
