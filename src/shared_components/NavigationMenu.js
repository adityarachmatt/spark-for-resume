import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

const NavigationMenu = () => {
  return (
    <View>
      <Text>NavigationMenu</Text>
      <Pressable>
        <Text>LeftButton</Text>
      </Pressable>
      <View>
        <Pressable>
          <Text>LeftMiddleButton</Text>
        </Pressable>
        <Pressable>
          <Text>RightMiddleButton</Text>
        </Pressable>
      </View>
      <Pressable>
        <Text>RightButton</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({});
