import { useCallback } from 'react';
import { StatusBar } from 'react-native';
// utils
import EnvConfig from 'react-native-config';
import InAppBrowser from 'react-native-inappbrowser-reborn';

export const useAgreementsModals = () => {
  const showAgreementDocsPage = useCallback(
    async (agreementDoc: 'termsConditions' | 'privacyPolicy') => {
      const urlsToOpen = {
        termsConditions: EnvConfig.TERMS_AND_CONDITIONS_URL,
        privacyPolicy: EnvConfig.PRIVACY_POLICY_URL,
      };

      /*
       * Show in-app browser with T&C or Policy page
       *
       * Based on https://www.npmjs.com/package/react-native-inappbrowser-reborn
       */
      try {
        if ((await InAppBrowser.isAvailable()) && urlsToOpen[agreementDoc]) {
          const oldStatusBarStyle = StatusBar.pushStackEntry({
            barStyle: 'light-content',
            animated: false,
          });

          await InAppBrowser.open(urlsToOpen[agreementDoc], {
            // ios config
            animated: true,
            modalEnabled: true,
            modalPresentationStyle: 'pageSheet',

            // Android config
            showTitle: true,
            enableDefaultShare: true,
          });

          StatusBar.popStackEntry(oldStatusBarStyle);
        }
      } catch {}
    },
    [],
  );

  return {
    showTermsAndConditionsModal: () => {
      showAgreementDocsPage('termsConditions');
    },
    showPrivacyPolicyModal: () => {
      showAgreementDocsPage('privacyPolicy');
    },
  };
};
