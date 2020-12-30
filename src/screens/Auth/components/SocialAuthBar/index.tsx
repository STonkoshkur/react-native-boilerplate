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
import { AccessToken, LoginManager } from 'react-native-fbsdk';
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
        // Need to catch revokeAccess() because in some cases
        // it can cause 'RNGoogleSignInError: Error when revoking access' error
        // https://github.com/react-native-google-signin/google-signin/issues/914
        await GoogleSignin.revokeAccess().catch();
        await GoogleSignin.signOut().catch();
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
      if (
        !error.code ||
        ![
          statusCodes.SIGN_IN_CANCELLED,
          statusCodes.IN_PROGRESS,
          statusCodes.PLAY_SERVICES_NOT_AVAILABLE,
        ].includes(error.code)
      ) {
        // TODO: add alerts for error cases
      }
    }
  }, [dispatch]);

  const signInWithFacebook = useCallback(async () => {
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);

      if (!result.isCancelled) {
        const accessData = await AccessToken.getCurrentAccessToken();

        if (accessData) {
          const loginData = await api.auth.socialSignIn({
            tokens: {
              token1: accessData.accessToken,
            },
            socialType: SocialEnum.Facebook,
          });

          dispatch(updateAuthToken(loginData.token));
        }
      }
    } catch {}
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
        action: signInWithFacebook,
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
    [isDarkTheme, signInWithGoogle, signInWithFacebook],
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
