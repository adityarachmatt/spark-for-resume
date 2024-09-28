import { View, Image } from "react-native";
import { colors } from "../shared_styles/master_styles";

export default StackedImages = ({ images }) => {
  const imageRadius = 12;
  const displacement = imageRadius * 0.5;
  const borderWidth = 3;
  return (
    <View
      style={{
        width: (imageRadius + displacement) * images.length + displacement,
        height: imageRadius * 2,
      }}
    >
      {images.map((element, index) => (
        <Image
          source={require("../../assets/joanna.png")}
          style={{
            position: "absolute",
            left: (imageRadius + displacement) * index - borderWidth,
            height: imageRadius * 2,
            width: imageRadius * 2,
            borderRadius: imageRadius * 2,
            zIndex: 10 - index,
            borderWidth: borderWidth,
            borderColor: colors.primaryColor,
          }}
          key={`${JSON.stringify(element)}`}
        />
      ))}
    </View>
  );
};
