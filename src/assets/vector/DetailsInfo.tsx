import React, { FC } from 'react';
import Svg, { Path } from 'react-native-svg';
// types
import { SVGIconProps } from './types';

type DetailsInfoIconProps = SVGIconProps;

const DetailsInfoIcon: FC<DetailsInfoIconProps> = ({
  size,
  color,
  ...props
}) => {
  return (
    <Svg
      viewBox="0 0 29.535 29.535"
      {...props}
      width={size}
      height={size}
      fill={color}>
      <Path d="M14.768 0C6.611 0 0 6.609 0 14.768c0 8.155 6.611 14.767 14.768 14.767 8.154 0 14.766-6.612 14.766-14.767C29.534 6.609 22.923 0 14.768 0zm0 27.126c-6.83 0-12.361-5.532-12.361-12.359 0-6.828 5.531-12.362 12.361-12.362 6.824 0 12.359 5.535 12.359 12.362.001 6.827-5.535 12.359-12.359 12.359z" />
      <Path d="M16.83 11.143h-4.151v.007h-1.545v2.413h1.545v8.618h-1.64v2.306h1.64v.016h4.151v-.016h1.358v-2.306H16.83zM14.726 9.504c1.395 0 2.24-.928 2.24-2.077-.027-1.172-.846-2.072-2.184-2.072-1.336 0-2.211.899-2.211 2.072-.001 1.149.846 2.077 2.155 2.077z" />
    </Svg>
  );
};

export default DetailsInfoIcon;
