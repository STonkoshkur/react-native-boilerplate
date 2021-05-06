import React, { FC, useCallback, useMemo, useEffect } from 'react';
import {
  View,
  Alert,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
// components
import Card from 'src/components/Card';
import Avatar from 'src/components/Avatar';
import ListItem from 'src/components/ListItem';
import Typography from 'src/components/Typography';
// navigation
import { StackScreenProps } from '@react-navigation/stack';
import { Routes, RootNavigationStackParamsList } from 'src/navigation';
// localization
import { useTranslation } from 'react-i18next';
// api
import api from 'src/services/api';
// store
import { useDispatch, useSelector } from 'react-redux';
import { clearAuth, updateAuthUser } from 'src/store/modules/auth';
// selectors
import { getAuthUserSelector } from 'src/store/modules/auth/selectors';
// utils
import { useAgreementsModals } from 'src/hooks/useAgreementsModals';
import lodashCapitalize from 'lodash/capitalize';
// styling
import { useThemeSchema } from 'src/hooks/useThemeShema';

type SettingsIndexProps = StackScreenProps<
  RootNavigationStackParamsList,
  Routes.SignIn
>;

const SettingsIndex: FC<SettingsIndexProps> = ({ navigation }) => {
  const { t } = useTranslation();
  const { colors } = useThemeSchema();
  const {
    showPrivacyPolicyModal,
    showTermsAndConditionsModal,
  } = useAgreementsModals();

  const dispatch = useDispatch();
  const authProfile = useSelector(getAuthUserSelector);

  const authProviderName = authProfile?.provider;

  // Fetch data and update storred profile
  const refreshAuthProfile = useCallback(async () => {
    try {
      const userProfile = await api.auth.getProfile();

      if (userProfile) {
        dispatch(updateAuthUser(userProfile));
      }
    } catch {}
  }, []);

  useEffect(() => {
    refreshAuthProfile();
  }, []);

  const settingsMenuSections = useMemo(
    () => [
      {
        key: 'generalSection',
        name: t('settings:generalSettings'),
        items: [
          {
            key: 'profileEdit',
            title: t('settings:editProfile'),
            icon: 'person-outline',
            onPress: () => {
              navigation.navigate(Routes.SettingsProfile);
            },
          },
          {
            key: 'changePassword',
            title: t('settings:changePassword'),
            icon: 'lock-closed-outline',
            onPress: () => {
              if (authProviderName === 'email') {
                navigation.navigate(Routes.SettingsChangePassword);
              } else {
                Alert.alert(
                  t('common:denied'),
                  t('settings:changePasswordDenied', {
                    socialName: lodashCapitalize(authProviderName),
                  }),
                );
              }
            },
          },
        ],
      },
      {
        key: 'legalSection',
        name: t('settings:legal'),
        items: [
          {
            key: 'termsConditions',
            title: t('settings:termsAndConditions'),
            icon: 'document-text-outline',
            onPress: showTermsAndConditionsModal,
          },
          {
            key: 'privacyPolicy',
            title: t('settings:privacyPolicy'),
            icon: 'shield-checkmark-outline',
            onPress: showPrivacyPolicyModal,
          },
        ],
      },
    ],
    [
      authProviderName,
      showTermsAndConditionsModal,
      showPrivacyPolicyModal,
      navigation,
      t,
    ],
  );

  const handleUserAccountRemove = useCallback(async () => {
    try {
      await api.auth.delete();
      dispatch(clearAuth());
    } catch {}
  }, []);

  const onAccountRemovePress = useCallback(() => {
    Alert.alert(
      t('settings:removeAccountTitle'),
      t('settings:removeAccountDescription'),
      [
        {
          text: t('common:cancel'),
          style: 'cancel',
        },
        {
          style: 'destructive',
          text: t('settings:removeAccount'),
          onPress: handleUserAccountRemove,
        },
      ],
    );
  }, [t, handleUserAccountRemove]);

  const onLogout = useCallback(() => {
    Alert.alert(t('settings:signOut'), t('settings:signOutDescription'), [
      {
        style: 'destructive',
        text: t('common:logout'),
        onPress: () => dispatch(clearAuth()),
      },
      {
        text: t('common:cancel'),
        style: 'cancel',
      },
    ]);
  }, [dispatch, t]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        testID="settingsScroll"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.contentWrapper}>
        <View>
          {!!authProfile && (
            <View
              style={[
                styles.authHeaderWrapper,
                {
                  backgroundColor: colors.card,
                  borderBottomColor: colors.border,
                },
              ]}>
              <Avatar
                label={authProfile.initials ?? ''}
                source={{
                  uri: authProfile.photo?.path,
                }}
                size="large"
                style={styles.userAvatar}
              />
              <Typography
                testID="settingsFullNameLabel"
                variant="headline"
                weight="bold">
                {authProfile.fullName}
              </Typography>
              <Typography
                testID="settingsEmailLabel"
                variant="subhead"
                appearance="muted">
                {authProfile.email}
              </Typography>
            </View>
          )}

          {settingsMenuSections.map(({ key, name, items: sectionItems }) => (
            <View key={key} style={styles.sectionWrapper}>
              <Typography variant="headline" style={styles.sectionTitle}>
                {name}
              </Typography>
              <Card>
                {sectionItems.map(
                  (
                    { key: itemKey, title, icon, onPress },
                    index,
                    settingsItems,
                  ) => (
                    <ListItem
                      key={itemKey}
                      testID={itemKey}
                      onPress={onPress}
                      bottomDivider={index !== settingsItems.length - 1}>
                      <ListItem.Icon name={icon} />
                      <ListItem.Content>
                        <ListItem.Title>{title}</ListItem.Title>
                      </ListItem.Content>
                      <ListItem.Icon name="chevron-forward" />
                    </ListItem>
                  ),
                )}
              </Card>
            </View>
          ))}
        </View>

        <Card style={styles.sectionWrapper}>
          <ListItem testID="removeAccountButton" onPress={onAccountRemovePress}>
            <ListItem.Icon name="person-remove-outline" color={colors.error} />
            <ListItem.Content>
              <ListItem.Title color={colors.error}>
                {t('settings:removeAccount')}
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>
        </Card>

        <Card style={styles.sectionWrapper}>
          <ListItem testID="logoutButton" onPress={onLogout}>
            <ListItem.Icon name="exit-outline" color={colors.error} />
            <ListItem.Content>
              <ListItem.Title color={colors.error}>
                {t('common:logout')}
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentWrapper: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  authHeaderWrapper: {
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  userAvatar: {
    marginBottom: 16,
  },
  sectionWrapper: {
    margin: 16,
  },
  sectionTitle: {
    marginBottom: 8,
  },
});

export default SettingsIndex;
