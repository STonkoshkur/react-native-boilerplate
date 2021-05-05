import React, { FC, useEffect, useCallback, useRef, useMemo } from 'react';
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native';
// components
import Typography from 'src/components/Typography';
import Icon from 'react-native-vector-icons/Ionicons';
// navigation
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// hooks
import { useToast } from 'src/hooks/useToast';
// styling
import { Colors, Spacing } from 'src/styles';
import { useThemeSchema } from 'src/hooks/useThemeShema';

const Toast: FC = () => {
  const { toastConfig, hideToast } = useToast();
  const { colors } = useThemeSchema();
  const { top } = useSafeAreaInsets();

  const opacity = useRef(new Animated.Value(0)).current;

  const fadeIn = useCallback(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 255,
      useNativeDriver: true,
    }).start();
  }, [opacity]);

  const fadeOut = useCallback(() => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 255,
      useNativeDriver: true,
    }).start(() => {
      hideToast();
    });
  }, [opacity, hideToast]);

  useEffect(() => {
    if (!toastConfig) {
      return;
    }

    fadeIn();

    const timer = setTimeout(fadeOut, toastConfig.duration);

    return () => clearTimeout(timer);
  }, [toastConfig, fadeIn, fadeOut]);

  const iconConfig = useMemo(() => {
    const iconVariants = {
      info: {
        iconName: 'information-outline',
        iconColor: colors.primary,
        backgroundColor: colors.background,
      },
      success: {
        iconName: 'checkmark-outline',
        iconColor: colors.alternativeText,
        backgroundColor: colors.primary,
      },
      error: {
        iconName: 'alert-outline',
        iconColor: colors.alternativeText,
        backgroundColor: colors.error,
      },
    };

    const currentIconStyle = toastConfig?.type
      ? iconVariants[toastConfig.type]
      : iconVariants.info;

    return {
      iconName: toastConfig?.icon ?? currentIconStyle.iconName,
      iconColor: toastConfig?.iconColor ?? currentIconStyle.iconColor,
      backgroundColor:
        toastConfig?.accentColor ?? currentIconStyle.backgroundColor,
    };
  }, [
    toastConfig?.type,
    toastConfig?.icon,
    toastConfig?.iconColor,
    toastConfig?.accentColor,
    colors.alternativeText,
    colors.error,
    colors.primary,
    colors.background,
  ]);

  if (!toastConfig) {
    return null;
  }

  const {
    message,
    shouldCloseOnPress,
    backgroundColor,
    borderColor,
    iconSize = 20,
  } = toastConfig;
  const {
    iconColor,
    iconName,
    backgroundColor: iconBackgroundColor,
  } = iconConfig;

  return (
    <Animated.View
      style={[styles.container, { top: top + Spacing.tiny, opacity }]}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={shouldCloseOnPress ? fadeOut : undefined}
        disabled={!shouldCloseOnPress}
        style={[
          styles.toast,
          {
            backgroundColor: backgroundColor ?? colors.card,
            borderColor: borderColor ?? colors.border,
          },
        ]}>
        <View
          style={[
            styles.iconWrapper,
            {
              backgroundColor: iconBackgroundColor,
              width: iconSize * 1.5,
              height: iconSize * 1.5,
              borderRadius: (iconSize * 1.5) / 2,
            },
          ]}>
          <Icon name={iconName} size={iconSize} color={iconColor} />
        </View>
        <Typography numberOfLines={2} ellipsizeMode="tail">
          {message}
        </Typography>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: Spacing.double,
    position: 'absolute',
    top: Spacing.double,
    width: '100%',
  },
  toast: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderColor: Colors.gainsboroGray,
    borderRadius: Spacing.base,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    maxWidth: 350,
    paddingHorizontal: Spacing.medium,
    paddingVertical: Spacing.double,
    width: '100%',
  },
  iconWrapper: {
    alignItems: 'center',
    borderRadius: 15,
    height: 30,
    justifyContent: 'center',
    marginRight: Spacing.medium,
    width: 30,
  },
});

export default Toast;
