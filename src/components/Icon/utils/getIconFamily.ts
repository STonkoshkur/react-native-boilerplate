// components
import ZocialIcon from 'react-native-vector-icons/Zocial';
import OcticonIcon from 'react-native-vector-icons/Octicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
// types
import { Icon } from 'react-native-vector-icons/Icon';

export type IconFamilyType =
  | 'AntDesign'
  | 'Entypo'
  | 'EvilIcons'
  | 'Feather'
  | 'FontAwesome'
  | 'FontAwesome5'
  | 'Fontisto'
  | 'Foundation'
  | 'Ionicons'
  | 'MaterialIcons'
  | 'MaterialCommunityIcons'
  | 'Octicons'
  | 'Zocial'
  | 'SimpleLineIcons';

export type CommonIconType = typeof Icon;

// FA5 Icons have another interface
export type FontAwesome5IconType = typeof FontAwesome5Icon;

type IconFamily = CommonIconType | FontAwesome5IconType;

export const getIconFamily = (type: IconFamilyType): IconFamily => {
  switch (type) {
    case 'AntDesign':
      return AntDesignIcon;
    case 'Entypo':
      return EntypoIcon;
    case 'EvilIcons':
      return EvilIcon;
    case 'Feather':
      return FeatherIcon;
    case 'FontAwesome':
      return FontAwesomeIcon;
    case 'FontAwesome5':
      return FontAwesome5Icon;
    case 'Fontisto':
      return FontistoIcon;
    case 'Foundation':
      return FoundationIcon;
    case 'Ionicons':
      return Ionicon;
    case 'MaterialIcons':
      return MaterialIcon;
    case 'MaterialCommunityIcons':
      return MaterialCommunityIcon;
    case 'Octicons':
      return OcticonIcon;
    case 'Zocial':
      return ZocialIcon;
    case 'SimpleLineIcons':
      return SimpleLineIcon;
    default:
      return MaterialCommunityIcon;
  }
};

export default getIconFamily;
