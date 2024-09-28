import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import {
  componentWidth,
  typography,
  colors,
} from "../shared_styles/master_styles.js";
import Tags from "./Tags.js";
import ThreeDotsIcon from "./icons/ThreeDotsIcon.js";
import StackedImages from "./StackedImages.js";
import ClosedIcon from "./icons/ClosedIcon.js";
import OpenIcon from "./icons/OpenIcon.js";

const USERNAME = "Aditya";

export default function Event({
  eventData,
  leaveEvent,
  joinEvent,
  navigation,
}) {
  const {
    title,
    tags,
    organizer,
    textDescription,
    membersList,
    EventID,
    location,
  } = eventData;
  const isInEvent = membersList.includes(USERNAME);
  return (
    <View
      style={{
        width: componentWidth,
        marginVertical: 30,
        backgroundColor: colors.primaryColor,
      }}
    >
      <Header
        title={title}
        location={location}
        tags={tags}
        organizer={organizer}
        navigation={navigation}
        eventData={eventData}
      />
      <TextDescription textDescription={textDescription} />
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            alignItems: "center",
          }}
        >
          <Visibility visibility="open" />
          <MembersList membersList={membersList} />
        </View>
        {
          isInEvent ? (
            <LeaveButton onPress={() => leaveEvent(EventID, USERNAME)} />
          ) : (
            <JoinButton onPress={() => joinEvent(EventID, USERNAME)} />
          ) /*TODO */
        }
      </View>
    </View>
  );
}

// BRANCH 1

const Header = ({
  title,
  tags,
  organizer,
  location,
  navigation,
  eventData,
}) => {
  return (
    <Pressable
      onPress={() => {
        navigation.navigate("EventDescription", { eventData: eventData });
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 6,
        }}
      >
        <View>
          <View style={{ flexDirection: "row", marginBottom: 4 }}>
            <Text style={typography.largeBold}>{title} • </Text>
            <Text style={typography.large}>{location}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <StackedImages images={[1, 2]} />
            <Text style={[typography.small, { fontSize: 13, marginLeft: 2 }]}>
              Hosted by {organizer}
            </Text>
          </View>
        </View>
        <Pressable>
          <ThreeDotsIcon />
        </Pressable>
      </View>
      <Tags tags={tags} />
    </Pressable>
  );
};

// BRANCH 2

const TextDescription = ({ textDescription }) => {
  const dims = { width: componentWidth, height: componentWidth * 0.6 };
  return (
    <View
      style={{
        marginVertical: 20,
        width: dims.width,
        height: dims.height,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        source={require("../../assets/minecraft-preview.png")}
        style={{
          width: dims.width,
          height: dims.height,
          borderRadius: 10,
          position: "absolute",
        }}
      />
      <View
        style={{
          backgroundColor: colors.secondaryColor,
          padding: 10,
          borderRadius: 10,
          margin: 10,
        }}
      >
        <Text style={typography.defaultBlack}>{textDescription}</Text>
      </View>
    </View>
  );
};

// BRANCH 3

const Visibility = ({ visibility }) => {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
      }}
    >
      {visibility === "closed" && (
        <>
          <ClosedIcon />
          <Text style={[typography.smallBold, { marginTop: 2.75 }]}>
            Closed
          </Text>
        </>
      )}
      {visibility === "open" && (
        <>
          <OpenIcon />
          <Text style={[typography.smallBold, { marginTop: 2.75 }]}>Open</Text>
        </>
      )}
    </View>
  );
};

const MembersList = ({ membersList }) => {
  const renderText = () => {
    if (membersList.length <= 0) {
      return <Text>Error 0 or less members</Text>;
    } else if (membersList.length == 1) {
      return (
        <>
          <Text style={typography.smallBold}>{membersList[0]}</Text>
          <Text style={typography.small}> is here</Text>
        </>
      );
    } else if (membersList.length == 2) {
      return (
        <>
          <Text style={typography.smallBold}>{membersList[0]}</Text>
          <Text style={typography.small}> and </Text>
          <Text style={typography.smallBold}>{membersList[1]}</Text>
          <Text style={typography.small}> are here</Text>
        </>
      );
    } else if (membersList.length == 3) {
      return (
        <>
          <Text style={typography.smallBold}>{membersList[0]}</Text>
          <Text style={typography.small}>, </Text>
          <Text style={typography.smallBold}>{membersList[1]}</Text>
          <Text style={typography.small}> and </Text>
          <Text style={typography.smallBold}>{membersList[2]}</Text>
          <Text style={typography.small}> are here</Text>
        </>
      );
    } else {
      return (
        <>
          <Text style={typography.smallBold}>{membersList[0]}</Text>
          <Text style={typography.small}>, </Text>
          <Text style={typography.smallBold}>{membersList[1]}</Text>
          <Text style={typography.small}>
            {" "}
            and {membersList.length - 2} others are here
          </Text>
        </>
      );
    }
  };
  return (
    <View style={{ justifyContent: "center" }}>
      <StackedImages images={[1, 2]} />
      <View style={{ flexDirection: "row", marginTop: 2 }}>{renderText()}</View>
    </View>
  );
};

const JoinButton = ({ onPress }) => {
  return (
    <Pressable style={styles.joinButton} onPress={onPress}>
      <Text style={typography.largeBlackBold}>Join</Text>
    </Pressable>
  );
};

const LeaveButton = ({ onPress }) => {
  return (
    <Pressable style={styles.joinButton} onPress={onPress}>
      <Text style={typography.largeBlackBold}>Leave</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  headerVerticalSpacing: {
    height: 5,
  },
  individualTag: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    marginRight: 7,
    borderRadius: 20,
    backgroundColor: colors.secondaryColor,
  },
  text: {
    color: colors.secondaryColor,
  },
  joinButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: colors.secondaryColor,
    borderRadius: 10,
  },
});
