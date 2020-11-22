# react-native-boilerplate
React Native boilerplate with mostly used features.

## Map
[Implemented features](#implemented-features)

[To do list](#to-do-features)

[Predefined commands on package.json](#predefined-commands-on-packagejson)

[Getting Started](#getting-started)

[Running on Android](#running-on-android)

[Running on iOS](#running-on-ios)

## Implemented features:
 - TS template :white_check_mark:
 - ESlint and Prettier integration :white_check_mark:
 - Pre-commit hook with eslint and TS compiling checks :white_check_mark:
 - React navigation: bottoms tabs and nested stack navigators with TS support :white_check_mark:
 - RN vector icons :white_check_mark:
 - SVG support ([react-native-svg](https://github.com/react-native-svg/react-native-svg), [react-native-svg-transformer](https://github.com/kristerkari/react-native-svg-transformer)) :white_check_mark:
 - Style theming with dark-mode support based on system theme settings ([reactnavigation themes](https://reactnavigation.org/docs/themes), [react-native-appearance](https://github.com/expo/react-native-appearance)) :white_check_mark:
 - Multi-language localization ([i18next](https://www.i18next.com), [react-native-localize](https://github.com/zoontek/react-native-localize)). Add english and spanish translations :white_check_mark:


## To do features:
- Predefined commands on package.json for dependencies instalment
- Formik or Hook-forms integration with TS types and validation examples;
- Auth flow: sign in, sign up, reset password, auth loading screen for navigation, log out;
- Social in-app auth (Google, FB, Twitter, Apple);
- Redux-toolkit auth module with redux-persist integration;
- Mostly-used components example implementation (like avatar, typography, form controls, etc);
- User profile page;
- Unit tests;
- End-2-end tests;
- CI integration;
- Integration with RN CLI;

## Predefined commands on package.json

- `yarn lint` Runs eslint checks;
- `yarn ts-compile-check` Runs TS compiling checks;


## Getting Started

Environment requirements:

- NodeJS
- Yarn
- [Npx](https://nodejs.dev/learn/the-npx-nodejs-package-runner)
- [CocoaPods](https://cocoapods.org/)

Clone the repository and install the dependencies:
```bash
git clone https://github.com/STonkoshkur/react-native-boilerplate.git
cd react-native-boilerplate/
yarn && npx pod-install
```

## Development

### Running on Android

Connect Android phone with enabled dev mode or run an emulator (if you have already created emulator in Android Studio).

Get list of installed emulators:
```bash
~/Library/Android/sdk/tools/emulator -list-avds
```

Run emulator:
```bash
~/Library/Android/sdk/tools/emulator -avd [emulator name]
```

Run app:
```bash
yarn android
```
Or:
```bash
npx react-native run-android
```

Shake your real device to open development menu or press `CMD+M` if you are using emulator. Or use command to open it:
```bash
adb shell input keyevent 82
```

[Doc: Running on Android device](https://reactnative.dev/docs/running-on-device#1-enable-debugging-over-usb)

### Running on iOS

```bash
yarn ios
```
Or:
```bash
npx react-native run-ios
```

To start not-default simulator, add `--simulator=[simulator name]` flag.

For example:

```bash
yarn ios --simulator="iPhone 12 Pro"
```

Shake your real device to open development menu. Use `CMD+D` or `CMD+CTRL+Z` to open menu on simulator.

[Doc: Running on iOS simulator](https://reactnative.dev/docs/running-on-simulator-ios)

[Doc: Running on real iOS device](https://reactnative.dev/docs/running-on-device#1-plug-in-your-device-via-usb)
