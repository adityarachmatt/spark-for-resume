import { View, Text, StyleSheet } from "react-native";
import { typography, colors } from "../shared_styles/master_styles";

const Tags = ({ tags }) => {
  const IndividualTag = ({ text }) => {
    return (
      <View style={styles.individualTag}>
        <Text style={typography.smallBlack}>{text}</Text>
      </View>
    );
  };
  return (
    <View style={styles.tags}>
      {tags.map((tag) => (
        <IndividualTag text={tag} key={JSON.stringify(tag)} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  individualTag: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    marginRight: 7,
    borderRadius: 20,
    backgroundColor: colors.secondaryColor,
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

export default Tags;
