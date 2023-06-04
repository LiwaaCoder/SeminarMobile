import { StyleSheet, Platform, View, SafeAreaView } from "react-native";
import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  style?: View["props"]["style"];
}

const Container = ({ children, style }: ContainerProps) => {
  return (
    <View style={[styles.container, style]}>
      <SafeAreaView />
      {children}
    </View>
  );
};

export default Container;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: Platform.OS == "ios" ? 0 : 40,
  },
});
