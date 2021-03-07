const iosSimulatorName = 'iPhone 12';
const androidSimulatorName = 'Pixel_2_API_29';
const simulatorName = process.env.SIMULATOR_NAME;

module.exports = {
  testRunner: 'jest',
  runnerConfig: 'e2e/config.json',
  devices: {
    simulator: {
      type: 'ios.simulator',
      device: {
        type: simulatorName || iosSimulatorName,
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
      build: `xcodebuild -workspace ios/ReactNativeBoilerplate.xcworkspace -scheme ReactNativeBoilerplate -configuration Debug -destination 'platform=iOS Simulator,name=${
        simulatorName || iosSimulatorName
      }' -derivedDataPath ios/build`,
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
