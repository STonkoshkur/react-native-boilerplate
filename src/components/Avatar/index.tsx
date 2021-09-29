import React, { FC, memo, useMemo, useCallback } from 'react';
import {
  Image,
  View,
  Text,
  StyleSheet,
  StyleProp,
  ImageProps,
  ImageURISource,
  TextStyle,
} from 'react-native';
// styling
import { useThemeSchema } from 'src/hooks/useThemeShema';
import { Colors, Spacing } from 'src/styles';

export enum AvatarSizes {
  small = 34,
  medium = 50,
  large = 75,
  xlarge = 150,
}

export enum AvatarShapes {
  square = 'square',
  rounded = 'rounded',
  circle = 'circle',
}

type AvatarProps = Omit<ImageProps, 'source'> & {
  source: ImageURISource;
  label?: string;
  labelTextStyle?: StyleProp<TextStyle>;
  size?: keyof typeof AvatarSizes | number;
  backgroundColor?: string;
  shape?: keyof typeof AvatarShapes;
};

const Avatar: FC<AvatarProps> = ({
  size: sizeFromProps = AvatarSizes.medium,
  shape = AvatarShapes.circle,
  source,
  label,
  labelTextStyle,
  backgroundColor,
  ...props
}) => {
  const { colors } = useThemeSchema();

  const avatarSize = useMemo(() => {
    const numericValueOfNamedSize =
      typeof sizeFromProps === 'string'
        ? AvatarSizes[sizeFromProps]
        : AvatarSizes.small;

    return typeof sizeFromProps === 'number'
      ? sizeFromProps
      : numericValueOfNamedSize;
  }, [sizeFromProps]);

  const containerStyle = useMemo(() => {
    const roundnessBorderRadius =
      shape === AvatarShapes.rounded
        ? Spacing.medium
        : Math.round(avatarSize / 2);

    return {
      width: avatarSize,
      height: avatarSize,
      borderRadius: shape === AvatarShapes.square ? 0 : roundnessBorderRadius,
    };
  }, [avatarSize, shape]);

  const renderImage = useCallback(
    () =>
      source?.uri ? (
        <Image
          {...props}
          source={source}
          style={[containerStyle, StyleSheet.absoluteFillObject, props.style]}
        />
      ) : null,
    [source, containerStyle, props],
  );

  return (
    <View
      style={[
        styles.placeholderAvatarWrapper,
        containerStyle,
        { backgroundColor: backgroundColor ?? colors.border },
        props.style,
      ]}>
      {!!label && (
        <Text
          style={[
            styles.avatarLabel,
            { fontSize: avatarSize * 0.4 },
            labelTextStyle,
          ]}
          numberOfLines={1}
          ellipsizeMode="tail">
          {label.substring(0, 3) || 'N/A'}
        </Text>
      )}

      {renderImage()}
    </View>
  );
};

const styles = StyleSheet.create({
  placeholderAvatarWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarLabel: {
    color: Colors.white,
    fontSize: 20,
  },
});

export default memo(Avatar);
