const iosSimulatorName = 'iPhone 11';
const androidSimulatorName = 'Pixel_2_API_29';

module.exports = {
  testRunner: 'jest',
  runnerConfig: 'e2e/config.json',
  configurations: {
    ios: {
      type: 'ios.simulator',
      binaryPath:
        'ios/build/Build/Products/Debug-iphonesimulator/ReactNativeBoilerplate.app',
      build: `xcodebuild -workspace ios/ReactNativeBoilerplate.xcworkspace -scheme ReactNativeBoilerplate -configuration Debug -destination 'platform=iOS Simulator,name=${iosSimulatorName}' -derivedDataPath ios/build`,
      device: {
        type: iosSimulatorName,
      },
    },
    android: {
      type: 'android.emulator',
      binaryPath: 'android/app/build/outputs/apk/debug/app-debug.apk',
      build:
        'cd android && ./gradlew assembleDebug assembleAndroidTest -DtestBuildType=debug && cd ..',
      device: {
        avdName: androidSimulatorName,
      },
    },
  },
};
