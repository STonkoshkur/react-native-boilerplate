import React, { FC } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
} from 'react-native';
// styling
import { useThemeSchema } from 'src/hooks/useThemeShema';
import Colors from 'src/styles/colors';

export enum ButtonTypes {
  primary = 'primary',
  link = 'link',
}

type ButtonProps = TouchableOpacityProps & {
  title: string;
  type?: ButtonTypes;
};

const Button: FC<ButtonProps> = ({
  title,
  type = ButtonTypes.primary,
  ...props
}) => {
  const { colors } = useThemeSchema();

  const typeButtonStyles = {
    [ButtonTypes.primary]: styles.primary,
    [ButtonTypes.link]: styles.link,
  };

  const typeButtonBackgroundColor = {
    [ButtonTypes.primary]: colors.primary,
    [ButtonTypes.link]: undefined,
  };

  const typeButtonTextColor = {
    [ButtonTypes.primary]: Colors.white,
    [ButtonTypes.link]: colors.primary,
  };

  return (
    <TouchableOpacity
      {...props}
      style={[
        styles.container,
        typeButtonStyles[type],
        { backgroundColor: typeButtonBackgroundColor[type] },
        props.disabled && styles.disabledContainer,
        props.style,
      ]}>
      <Text style={[styles.title, { color: typeButtonTextColor[type] }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginLeft: 16,
    marginRight: 16,
    marginTop: 22,
    padding: 14,
  },
  disabledContainer: {
    opacity: 0.6,
  },
  title: {
    fontSize: 16,
    fontWeight: '900',
  },
  primary: {
    borderRadius: 22,
    color: Colors.white,
  },
  link: {},
});

export default Button;
