import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";

// TODO CHANGE THESE TO export const constants = { componentWidth: }
export const componentWidth = Dimensions.get("window").width * 0.9;
export const componentMargin =
  (Dimensions.get("window").width - componentWidth) / 2;

export const colors = StyleSheet.create({
  primaryColor: "#141414",
  secondaryColor: "#ffffff",
  tertiaryColor: "#666",
  accentColor: "#b3e0ff",
  gray2: "#868686",
  gray3: "#404040",
  gray4: "#252525",
  glassyGray4: "rgba(25, 25, 25, 1)",
  appleGreen: "#30D158",
  appleBlue: "#278EFF",
  appleDarkGrey: "#26252A",
  appleGrey: "#8E8D94",
  red: "#FF1616",
});

export const typography = StyleSheet.create({
  largerBold: {
    color: colors.secondaryColor,
    fontFamily: "Inter-Bold",
    fontSize: 20,
  },
  largeBold: {
    color: colors.secondaryColor,
    fontFamily: "Inter-Bold",
    fontSize: 16,
  },
  largeBlackBold: {
    color: colors.primaryColor,
    fontFamily: "Inter-Bold",
    fontSize: 16,
  },
  largeGrey: {
    color: colors.appleGrey,
    fontFamily: "Inter-Regular",
    fontSize: 16,
  },
  large: {
    color: colors.secondaryColor,
    fontFamily: "Inter-Regular",
    fontSize: 16,
  },
  default: {
    color: colors.secondaryColor,
    fontFamily: "Inter-Regular",
  },
  defaultBlack: {
    color: colors.primaryColor,
    fontFamily: "Inter-Regular",
  },
  defaultBold: {
    color: colors.secondaryColor,
    fontFamily: "Inter-Bold",
  },
  defaultGrey: {
    color: "lightgrey",
    fontFamily: "Inter-Regular",
  },
  small: {
    color: colors.secondaryColor,
    fontFamily: "Inter-Regular",
    fontSize: 12,
  },
  smallBold: {
    color: colors.secondaryColor,
    fontFamily: "Inter-Bold",
    fontSize: 12,
  },
  smallBlack: {
    color: colors.primaryColor,
    fontFamily: "Inter-Regular",
    fontSize: 12,
  },
  smallGrey: {
    color: "lightgrey",
    fontFamily: "Inter-Regular",
    fontSize: 12,
  },
});
