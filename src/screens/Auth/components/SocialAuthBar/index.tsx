import React, { FC, useMemo, useCallback } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from 'react-native';
// api
import api from 'src/services/api';
// store
import { useDispatch } from 'react-redux';
import { updateAuthToken } from 'src/store/modules/auth';
// components
import Icon from 'react-native-vector-icons/Ionicons';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-community/google-signin';
// types
import { SocialEnum } from 'src/enums/SocialEnum';
// styling
import { Colors } from 'src/styles';
import { useThemeSchema } from 'src/hooks/useThemeShema';

GoogleSignin.configure({
  scopes: ['email', 'profile'],
  webClientId:
    '862096405891-80m7mdva2ss1jkmrtb5avll61na228bb.apps.googleusercontent.com',
  offlineAccess: true, // access Google API on behalf of the user from API side
});

type SocialAuthBarProps = {
  buttonSize?: number;
  iconSize?: number;
  style?: StyleProp<ViewStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
};

const SocialAuthBar: FC<SocialAuthBarProps> = ({
  buttonSize = 50,
  iconSize,
  style,
  buttonStyle,
}) => {
  const dispatch = useDispatch();
  const { dark: isDarkTheme } = useThemeSchema();

  const signInWithGoogle = useCallback(async () => {
    try {
      await GoogleSignin.hasPlayServices();

      const isSignedIn = await GoogleSignin.isSignedIn();

      if (isSignedIn) {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
      }

      await GoogleSignin.signIn();
      const { idToken } = await GoogleSignin.getTokens();

      const loginData = await api.auth.socialSignIn({
        tokens: {
          token1: idToken,
        },
        socialType: SocialEnum.Google,
      });

      dispatch(updateAuthToken(loginData.token));
    } catch (error) {
      // TODO: add alerts for error cases
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  }, [dispatch]);

  const socials = useMemo(
    () => [
      {
        name: 'google',
        icon: 'logo-google',
        backgroundColor: Colors.google,
        action: signInWithGoogle,
      },
      {
        name: 'facebook',
        icon: 'logo-facebook',
        backgroundColor: Colors.facebook,
      },
      {
        name: 'twitter',
        icon: 'logo-twitter',
        backgroundColor: Colors.twitter,
      },
      {
        name: 'apple',
        icon: 'ios-logo-apple',
        backgroundColor: isDarkTheme ? Colors.white : Colors.apple,
        color: isDarkTheme ? Colors.apple : Colors.white,
      },
    ],
    [isDarkTheme, signInWithGoogle],
  );

  return (
    <View style={[styles.container, style]}>
      {socials.map(({ name, icon, backgroundColor, color, action }) => (
        <TouchableOpacity
          key={name}
          activeOpacity={0.7}
          onPress={action}
          style={[
            styles.socialButton,
            !action && styles.disabledButton,
            buttonStyle,
            {
              width: buttonSize,
              height: buttonSize,
              borderRadius: buttonSize / 2,
              backgroundColor,
            },
          ]}
          disabled={!action}>
          <Icon
            name={icon}
            color={color ?? Colors.white}
            size={iconSize ?? buttonSize * 0.5}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 32,
  },
  socialButton: {
    alignItems: 'center',
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    marginHorizontal: 8,
    width: 40,
  },
  disabledButton: {
    opacity: 0.6,
  },
});

export default SocialAuthBar;
