import React, { FC, memo } from 'react';
// types
import { IconProps as VectorIconProps } from 'react-native-vector-icons/Icon';
// utils
import { getIconFamily, IconFamilyType } from './utils/getIconFamily';

export type IconProps = VectorIconProps & {
  fontFamily?: IconFamilyType;
};

const Icon: FC<IconProps> = ({
  fontFamily = 'MaterialCommunityIcons',
  ...props
}) => {
  const IconComponent = getIconFamily(fontFamily);

  return <IconComponent {...props} />;
};

export default memo(Icon);
