const iosSimulatorName = 'iPhone 12';
const iosSimulatorOs = 'iOS 14.5';
const androidSimulatorName = 'Pixel_2_API_29';
const simulatorName = process.env.SIMULATOR_NAME;
const simulatorOs = process.env.SIMULATOR_OS;

module.exports = {
  testRunner: 'jest',
  runnerConfig: 'e2e/config.json',
  devices: {
    simulator: {
      type: 'ios.simulator',
      device: {
        type: simulatorName || iosSimulatorName,
        os: simulatorOs || iosSimulatorOs,
      },
    },
    emulator: {
      type: 'android.emulator',
      device: {
        avdName: simulatorName || androidSimulatorName,
      },
    },
  },
  apps: {
    'ios.debug': {
      type: 'ios.app',
      binaryPath:
        'ios/build/Build/Products/Debug-iphonesimulator/ReactNativeBoilerplate.app',
      build: `set -o pipefail && xcodebuild -workspace ios/ReactNativeBoilerplate.xcworkspace -scheme ReactNativeBoilerplate -configuration Debug -destination id=$(applesimutils --byName "${
        simulatorName || iosSimulatorName
      }" --list | grep 'udid' | sed 's/.*:.*\\"\\(.*\\)\\",/\\1/') -derivedDataPath ios/build -quiet`,
    },
    'android.debug': {
      type: 'android.apk',
      binaryPath: 'android/app/build/outputs/apk/debug/app-debug.apk',
      build:
        'cd android && ./gradlew assembleDebug assembleAndroidTest -DtestBuildType=debug && cd ..',
    },
  },
  configurations: {
    ios: {
      device: 'simulator',
      app: 'ios.debug',
    },
    android: {
      device: 'emulator',
      app: 'android.debug',
    },
  },
};
