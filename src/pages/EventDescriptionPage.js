import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  ScrollView,
  Pressable,
  FlatList,
  Switch,
} from "react-native";
import {
  componentWidth,
  componentMargin,
  typography,
  colors,
} from "../shared_styles/master_styles.js";
import Members from "../shared_components/Members.js";
import Tags from "../shared_components/Tags.js";
import BackIcon from "../shared_components/icons/BackIcon.js";
import MuteIcon from "../shared_components/icons/MuteIcon.js";
import DirectMessagesIcon from "../shared_components/icons/DirectMessagesIcon.js";
import LeaveIcon from "../shared_components/icons/LeaveIcon.js";
import { BlurView } from "expo-blur";

// Use react native bottom sheet
// https://galaxies.dev/react-native-bottom-sheet
// https://ui.gorhom.dev/components/bottom-sheet/usage
// changed babel as well for react native gesture handler

import BottomSheet, {
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const DEFAULT_SETTINGS = {
  mute: true,
  direct_messages: false,
};

const EventDescriptionPage = ({ navigation, route }) => {
  // TODO ADD BACKEND SYNC TO STATE
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const snapPoints = useMemo(() => ["30.3%", "100%"], []);
  const {
    title,
    tags,
    organizer,
    textDescription,
    membersList,
    EventID,
    location,
  } = route.params.eventData;

  return (
    <GestureHandlerRootView style={styles.container}>
      <Image
        source={require("../../assets/VCDescriptionMap.png")}
        style={styles.map}
      />
      <Header eventData={route.params.eventData} />
      <BottomSheetModalProvider>
        <BottomSheet
          snapPoints={snapPoints}
          backgroundStyle={{ backgroundColor: "transparent" }}
          s
          handleIndicatorStyle={{ backgroundColor: "white" }}
        >
          <BlurView
            style={{
              height: "150%",
              padding: componentMargin,
            }}
            tint="systemThickMaterialDark"
          >
            <Text style={typography.largerBold}>4 people going</Text>
            <Members membersList={membersList} invitable />
            <Text style={[typography.largerBold, { marginVertical: 20 }]}>
              Settings
            </Text>
            <SettingsList settings={settings} setSettings={setSettings} />
          </BlurView>
        </BottomSheet>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

const Header = ({ eventData }) => {
  const {
    title,
    tags,
    organizer,
    textDescription,
    membersList,
    EventID,
    location,
  } = eventData;
  return (
    <View style={styles.headerContainer}>
      <Pressable>
        <BlurView style={styles.headerButton} tint="systemThickMaterialDark">
          <BackIcon />
        </BlurView>
      </Pressable>
      <BlurView style={styles.headerBlock} tint="systemThickMaterialDark">
        <View style={{ paddingLeft: 15 }}>
          <View style={{ flexDirection: "row" }}>
            <Image
              source={require("../../assets/chatprofilepic.png")}
              style={styles.chatprofilepic}
            />
            <View style={{ justifyContent: "space-evenly", paddingLeft: 10 }}>
              <Text style={typography.largeBold}>{title}</Text>
              <Text style={typography.large}>{location}</Text>
            </View>
          </View>
          <View style={{ paddingVertical: 10 }}>
            <Tags tags={tags} />
          </View>
        </View>
        <View style={styles.headerOrganizer}>
          <Text style={typography.default}>Hosted by {organizer}</Text>
        </View>
      </BlurView>
    </View>
  );
};

const ToggleableSettingsRow = ({
  icon,
  settingName,
  isEnabled,
  styleModifier,
  toggle,
}) => {
  return (
    <View style={[styles.settingsRow, styleModifier]}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {iconSwitch(icon)}
        <View style={{ width: 10 }} />
        <Text style={typography.large}>{settingName}</Text>
      </View>
      <Pressable onPress={toggle}>
        <Switch
          trackColor={{ false: "#767577", true: colors.appleGreen }}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggle}
          value={isEnabled}
        />
      </Pressable>
    </View>
  );
};

const PressableSettingsRow = ({
  icon,
  settingName,
  onPress,
  styleModifier,
}) => {
  return (
    <Pressable style={[styles.settingsRow, styleModifier]} onPress={onPress}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {iconSwitch(icon)}
        <View style={{ width: 10 }} />
        <Text style={typography.large}>{settingName}</Text>
      </View>
    </Pressable>
  );
};

const SettingsList = ({ settings, setSettings }) => {
  return (
    <View>
      <ToggleableSettingsRow
        icon="mute"
        settingName="Mute"
        isEnabled={settings.mute}
        styleModifier={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
        toggle={() => {
          setSettings((prevState) => ({ ...prevState, mute: !prevState.mute }));
        }}
      />
      <ToggleableSettingsRow
        icon="direct_messages"
        settingName="Allow direct messages"
        isEnabled={settings.direct_messages}
        toggle={() => {
          setSettings((prevState) => ({
            ...prevState,
            direct_messages: !prevState.direct_messages,
          }));
        }}
      />
      <PressableSettingsRow
        icon="leave"
        settingName="Leave"
        onPress={() => console.log("Pressed leave")}
        styleModifier={{
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          borderBottomWidth: 0,
        }}
      />
    </View>
  );
};

const iconSwitch = (iconName) => {
  switch (iconName) {
    case "mute":
      return <MuteIcon />;
    case "direct_messages":
      return <DirectMessagesIcon />;
    case "leave":
      return <LeaveIcon />;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "grey",
    alignItems: "center",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: componentWidth,
    justifyContent: "space-around",
    position: "absolute",
    marginTop: componentMargin,
  },
  headerButton: {
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderRadius: 40,
  },
  headerBlock: {
    width: componentWidth * 0.8,
    paddingTop: 10,
    overflow: "hidden",
    borderRadius: 10,
  },
  headerOrganizer: {
    borderTopColor: "white",
    borderTopWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  chatprofilepic: {
    height: 50,
    width: 50,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  detailsAndSettings: {
    backgroundColor: "purple",
    width: "100%",
  },
  settingsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.gray4,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "white",
    alignItems: "center",
  },
  attendeesHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.secondaryColor,
  },
  bottomSheetContainer: {
    flex: 1,
  },
  individualTag: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    marginRight: 7,
    borderRadius: 20,
    backgroundColor: colors.secondaryColor,
  },
  members: {
    flexGrow: 0,
  },
  individualMember: {
    paddingVertical: 20,
    paddingRight: 20,
    alignItems: "center",
  },
});

export default EventDescriptionPage;
