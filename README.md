# react-native-boilerplate

React Native boilerplate with mostly used features.

## Map

[Implemented features](#implemented-features)

[To do list](#to-do-features)

[Predefined commands on package.json](#predefined-commands-on-packagejson)

[Getting Started](#getting-started)

[Running on Android](#running-on-android)

[Running on iOS](#running-on-ios)

[E2E Testing](#e2e-testing)

## Implemented features:

- TS template :white_check_mark:
- ESlint and Prettier integration :white_check_mark:
- Pre-commit hook with eslint and TS compiling checks :white_check_mark:
- React navigation: bottoms tabs and nested stack navigators with TS support :white_check_mark:
- RN vector icons :white_check_mark:
- SVG support ([react-native-svg](https://github.com/react-native-svg/react-native-svg), [react-native-svg-transformer](https://github.com/kristerkari/react-native-svg-transformer)) :white_check_mark:
- Style theming with dark-mode support based on system theme settings ([reactnavigation themes](https://reactnavigation.org/docs/themes), [react-native-appearance](https://github.com/expo/react-native-appearance)) :white_check_mark:
- Multi-language localization ([i18next](https://www.i18next.com), [react-native-localize](https://github.com/zoontek/react-native-localize)). Add english and spanish translations :white_check_mark:
- Redux-toolkit auth module with redux-persist integration :white_check_mark:
- [Hook-forms](https://react-hook-form.com/) integration with TS types and validation examples :white_check_mark:
- Auth flow: sign in, sign up, reset password, log out :white_check_mark:
- End-2-end tests :white_check_mark:

## To do features:

- Predefined commands on package.json for dependencies instalment
- Social in-app auth (Google, FB, Twitter, Apple);
- Mostly-used components example implementation (like avatar, typography, form controls, etc);
- User profile page;
- Unit tests;
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

## E2E Testing

For E2E testing used [Detox](https://github.com/wix/Detox).

### Running tests for iOS

#### Install the latest version of [Homebrew](http://brew.sh)

Homebrew is a package manager for macOS, we'll need it to install other command line tools.

To ensure everything needed for Homebrew tool installation is installed, run

```sh
xcode-select --install
```

> Tip: Verify it works by typing in `brew -h` in a terminal to output list of available commands

#### Install [applesimutils](https://github.com/wix/AppleSimulatorUtils)

A collection of utils for Apple simulators, Detox uses it to communicate with the simulator.

```sh
brew tap wix/brew
brew install applesimutils
```

> Tip: Verify it works by typing in `applesimutils` in a terminal to output the tool help screen

Build:

```bash
SIMULATOR_NAME="iPhone 12" yarn test:e2e-build-ios
```

Run:

```bash
SIMULATOR_NAME="iPhone 12" yarn test:e2e-run-ios
```

### Running Tests for Android

By default Detox will try run Android Simulator with name `Pixel_2_API_29`, but if you want use another simulator name, by pass it via env variable `SIMULATOR_NAME="ANDROID SIMULATOR NAME"`

Build:

```bash
SIMULATOR_NAME="Pixel_2_API_29" yarn test:e2e-build-android
```

Run:

```bash
SIMULATOR_NAME="Pixel_2_API_29" yarn test:e2e-run-android
```
