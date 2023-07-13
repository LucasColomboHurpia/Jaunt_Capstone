import { View } from 'react-native';
import { RFValue } from "react-native-responsive-fontsize";

const typeVariant = {
    margin: "margin",
    padding: "padding"
}

const positionVariant = {
  top: "Top",
  left: "Left",
  right: "Right",
  bottom: "Bottom",
  horizontal: "Horizontal",
  vertical: "Vertical",
};

const getVariant = (type, position, customSize) => {
    const property = `${typeVariant[type]}${positionVariant[position]}`;
    return {[property] : RFValue(customSize) };
};

export default Spacer = ({ type, position, customSize, children }) => {
  const variant = getVariant(type, position, customSize);
  console.log(variant)
  return <View style={variant}>{children}</View>;
};
