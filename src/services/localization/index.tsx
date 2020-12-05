// localization
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
// resources
import en from 'src/assets/localization/en';
import es from 'src/assets/localization/es';

// constants
const localizationResources = {
  en,
  es,
} as const;

const fallbackLocale: keyof typeof localizationResources = 'en'; // Default fallback locale

/*
 * Device language detector
 *
 * Based on https://www.i18next.com/misc/creating-own-plugins#languagedetector
 */
// TODO: add in-app locale changing
const languageDetector = {
  type: 'languageDetector' as const,
  //   async: true,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  init: (): void => {}, // required property
  detect: (): string => {
    /*
     * Get best language due to the device settings
     *
     * Explanations: https://github.com/zoontek/react-native-localize#findbestavailablelanguage
     */
    const locale = RNLocalize.findBestAvailableLanguage(
      Object.keys(localizationResources),
    );

    return locale?.languageTag ?? fallbackLocale;
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  cacheUserLanguage: (): void => {}, // required property
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(languageDetector) // detect preffered device or app language
  .init({
    /*
     * i18n init configs doc: https://www.i18next.com/overview/configuration-options
     */
    resources: localizationResources, // set localization resources
    fallbackLng: fallbackLocale, // use en if detected lng is not available
    ns: ['common'],
    defaultNS: 'common', // used if not passed to translation function
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
