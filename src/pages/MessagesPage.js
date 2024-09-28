import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import {
  componentMargin,
  componentWidth,
} from "../shared_styles/master_styles";
import { colors, typography } from "../shared_styles/master_styles";
import CreateChatIcon from "../shared_components/icons/CreateChatIcon";
import SearchIcon from "../shared_components/icons/SearchIcon";
import Members from "../shared_components/Members";

const DEFAULT_MEMBERS_LIST = ["John", "Adam"];
const DEFAULT_MESSAGES = [
  {
    title: "Aditya",
    time: "12:20pm",
    content:
      "We’re gonna be baking cookies at Shepard tonight. Do you want to come?",
    unread: 2,
  },
  {
    title: "Aditya",
    time: "12:20pm",
    content:
      "We’re gonna be baking cookies at Shepard tonight. Do you want to come?",
    unread: 0,
  },
];

export default function MessagesPage() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "black",
      }}
    >
      <FlatList
        data={DEFAULT_MESSAGES}
        renderItem={({ item }) => <MessagePreview message={item} />}
        ListHeaderComponent={
          <View
            style={{
              borderColor: "white",
              borderBottomWidth: 0.4,
              width: "100%,",
              alignItems: "center",
              marginTop: 30,
            }}
          >
            <View>
              <SearchBar />
              <Members membersList={DEFAULT_MEMBERS_LIST} />
            </View>
          </View>
        }
      />
    </View>
  );
}

const SearchBar = () => {
  return (
    <View
      style={{
        width: componentWidth,
        backgroundColor: colors.appleDarkGrey,
        flexDirection: "row",
        padding: 7,
        borderRadius: 10,
      }}
    >
      <SearchIcon />
      <TextInput
        placeholder="Search"
        placeholderTextColor={colors.appleGrey}
        style={[typography.largeGrey, { marginLeft: 5 }]}
      />
    </View>
  );
};

const MessagePreview = ({ message }) => {
  const { title, time, content, unread } = message;
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Image
        source={require("../../assets/inviteMember.png")}
        style={{
          height: 50,
          width: 50,
          marginLeft: componentMargin,
          marginRight: 10,
        }}
      />
      <View
        style={{
          padding: 10,
          borderBottomWidth: 0.4,
          borderColor: "white",
          flexGrow: 1,
        }}
      >
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            marginBottom: 5,
          }}
        >
          <Text style={typography.largeBold}>{title}</Text>
          <Text style={typography.large}>{time}</Text>
        </View>
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text
            style={[typography.largeGrey, { flexWrap: "wrap", flex: 1 }]}
            numberOfLines={2}
          >
            {content}
          </Text>
          {unread > 0 && (
            <View
              style={{
                height: 20,
                width: 20,
                backgroundColor: colors.appleBlue,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 20,
              }}
            >
              <Text style={[typography.smallBold]}>{unread}</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});
