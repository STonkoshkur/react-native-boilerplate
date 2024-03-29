# react-native-boilerplate

React Native boilerplate with mostly used features.

## Map

[Features](#features)

[Predefined commands on package.json](#predefined-commands-on-packagejson)

[Getting Started](#getting-started)

[Running on Android](#running-on-android)

[Running on iOS](#running-on-ios)

[E2E Testing](#e2e-testing)

## Features

- [x] Auth flow: sign in, sign up, reset password, log out
- [x] Social sign-in ([Google](https://github.com/react-native-google-signin/google-signin), [Facebook](https://github.com/facebook/react-native-fbsdk), [Apple](https://github.com/invertase/react-native-apple-authentication) for iOS and Android)
- [x] React navigation: bottoms tabs and nested stack navigators with TS support
- [x] [Hook-forms](https://react-hook-form.com/) integration with TS types and validation examples
- [x] Mostly-used components example implementation (avatar, typography, media picker, form controls)
- [x] RN vector icons
- [x] SVG support ([react-native-svg](https://github.com/react-native-svg/react-native-svg), [react-native-svg-transformer](https://github.com/kristerkari/react-native-svg-transformer))
- [x] Basic settings page with profile management functionality: view, edit, remove profile; change password
- [x] Style theming with dark-mode support based on system theme settings ([reactnavigation themes](https://reactnavigation.org/docs/themes), [useColorScheme](https://reactnative.dev/docs/usecolorscheme))
- [x] Multi-language localization ([i18next](https://www.i18next.com), [react-native-localize](https://github.com/zoontek/react-native-localize)). Added english and spanish translations
- [x] Redux-toolkit auth module with redux-persist integration
- [x] Environment variables support ([react-native-config](https://github.com/luggit/react-native-config))
- [x] TS template
- [x] ESlint and Prettier integration
- [x] Pre-commit hook with eslint and TS compiling checks
- [x] E2E tests via [Detox](https://github.com/wix/Detox)
- [x] [GithubActions CI](https://github.com/features/actions) integration
- [ ] Firebase push-notifications
- [ ] Integration with RN CLI

## Predefined commands on package.json

- `yarn lint` Runs eslint checks;
- `yarn ts-compile-check` Runs TS compiling checks;
- `yarn rename` Rename application and change package/bundle ids;

## Getting Started

0. Environment requirements:

   - [Node (v12 or newer)](https://nodejs.org/en/)
   - [Yarn](https://yarnpkg.com/). Also, you can use `npm` instead.
   - [Npx](https://nodejs.dev/learn/the-npx-nodejs-package-runner)
   - [Watchman](https://facebook.github.io/watchman/)
   - [CocoaPods](https://cocoapods.org/)

   For more details, see the [setting up the RN development environment doc](https://reactnative.dev/docs/environment-setup)

1. Clone the repository and create the .env file:

   ```bash
   git clone --depth 1 https://github.com/STonkoshkur/react-native-boilerplate.git
   cd react-native-boilerplate/
   cp .env.example .env
   ```

2. Rename application and package/bundle IDs using `yarn rename` command. Example (use your own title and bundle ID):

   ```bash
   yarn rename "App Title" com.appname
   ```

3. Install the dependencies (npm packages and Pods):

   ```bash
   yarn && npx pod-install
   ```

4. Change git remote-url using `git remote set-url <remote_name> <remote_url>` command, like:

   ```bash
   git remote set-url origin https://github.com/Username/project-repo.git
   ```

5. That's all.

## Development

### Running on Android

Connect Android phone with enabled dev mode or run an emulator (if you have already created emulator in Android Studio).

Get list of installed emulators:

```bash
~/Library/Android/sdk/emulator/emulator -list-avds
```

Run emulator:

```bash
~/Library/Android/sdk/emulator/emulator -avd [emulator name]
```

Run app:

```bash
npx react-native run-android
```

Or:

```bash
yarn android
```

Shake your real device to open development menu or press `CMD+M` if you are using emulator. Or use command to open it:

```bash
adb shell input keyevent 82
```

[Doc: Running on Android device](https://reactnative.dev/docs/running-on-device#1-enable-debugging-over-usb)

### Running on iOS

```bash
npx react-native run-ios
```

Or:

```bash
yarn ios
```

To start not-default simulator, add `--simulator=[simulator name]` flag. For example, `yarn ios --simulator="iPhone 12 Pro"`

Shake your real device to open development menu. Use `CMD+D` or `CMD+CTRL+Z` to open menu on simulator.

[Doc: Running on iOS simulator](https://reactnative.dev/docs/running-on-simulator-ios)

[Doc: Running on real iOS device](https://reactnative.dev/docs/running-on-device#1-plug-in-your-device-via-usb)

## E2E Testing

For E2E testing used [Detox](https://github.com/wix/Detox).

### Environment Setup

#### Install Detox Command Line Tools (detox-cli)

```sh
npm install -g detox-cli
```

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
SIMULATOR_NAME="iPhone 12" detox build --configuration ios
```

Run:

```bash
SIMULATOR_NAME="iPhone 12" detox test --configuration ios
```

### Running Tests for Android

By default Detox will try run Android Simulator with name `Pixel_2_API_29`, but if you want use another simulator name, by pass it via env variable `SIMULATOR_NAME="ANDROID SIMULATOR NAME"`

Build:

```bash
SIMULATOR_NAME="Pixel_2_API_29" detox build --configuration android
```

Run:

```bash
SIMULATOR_NAME="Pixel_2_API_29" detox test --configuration android
```
