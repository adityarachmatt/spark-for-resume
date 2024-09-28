import {
  Pressable,
  Image,
  View,
  Text,
  FlatList,
  StyleSheet,
} from "react-native";
import { typography } from "../shared_styles/master_styles";

const Members = ({ membersList, invitable }) => {
  //Append an item to membersList to render the invite button
  membersList = ["InviteMemberButton"].concat(membersList);
  const InviteMemberButton = () => {
    return (
      <Pressable
        style={styles.individualMember}
        onPress={() => console.log("pressed invite")}
      >
        <Image
          source={require("../../assets/inviteMember.png")}
          style={styles.chatprofilepic}
        />
        <View style={{ height: 10 }} />
        <Text style={typography.default}>Invite</Text>
      </Pressable>
    );
  };
  const IndividualMember = ({ name }) => {
    return (
      <View style={styles.individualMember}>
        <Image
          source={require("../../assets/joanna.png")}
          style={styles.chatprofilepic}
        />
        <View style={{ height: 10 }} />
        <Text style={typography.default}>{name}</Text>
      </View>
    );
  };
  return (
    <FlatList
      style={styles.members}
      renderItem={({ item }) => {
        if (item === "InviteMemberButton") {
          if (invitable) {
            return <InviteMemberButton />;
          }
          return <View />;
        }
        return <IndividualMember name={item} />;
      }}
      keyExtractor={(item) => item}
      data={membersList}
      horizontal
    />
  );
};

export default Members;

const styles = StyleSheet.create({
  chatprofilepic: {
    height: 50,
    width: 50,
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
