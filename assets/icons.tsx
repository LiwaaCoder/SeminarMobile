import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

interface IconProps {
  color?: string;
  size?: number;
}

const FireIcon = ({ color = "orange", size = 25 }: IconProps) => {
  return <FontAwesome5 name="fire" color={color} size={size} />;
};

const LogoutIcon = ({ color = "white", size = 25 }: IconProps) => {
  return <MaterialIcons name="logout" color={color} size={size} />;
};

const ArrowBackIcon = ({ color = "white", size = 25 }: IconProps) => {
  return <Ionicons name="chevron-back" color={color} size={size} />;
};

export { LogoutIcon, FireIcon, ArrowBackIcon };
