#!/bin/bash

# Constants
RED_COLOR='\033[0;31m'
ORANGE_COLOR='\033[0;33m'
GREEN_COLOR='\033[0;32m'
CYAN_COLOR='\033[0;36m'
NO_COLOR='\033[0m'

# Check if all needed packages are installed
libs_to_check=(sed perl iconv tr)

for lib in "${libs_to_check[@]}"
do
  if [ "$(which $lib)" == "" ]
  then
    echo "$ORANGE_COLOR[Packages checks warning]: Could not find '$lib' package. Run the command bellow and re-run the renaming command.$NO_COLOR"
    echo ""
    echo "brew install $lib"
    echo ""
    exit 1
  fi
done

# Check if npx is installed. It's needed to call react-native-rename package.
if [ "$(which npx)" == "" ]
then
  echo "$ORANGE_COLOR[Packages checks warning]: Looks like 'npx' package isn't installed. Try to install npx and re-run the renaming command.$NO_COLOR"
  echo ""
  echo "npm install -g npx"
  echo ""
  exit 1
fi

# Helpers
function readJsonValue {  
  VALUE=`grep -m 1 "\"${2}\"" ${1} | sed -E 's/^ *//;s/.*: *"//;s/",?//'`

  if [ ! "$VALUE" ]
  then
    echo "Error: Cannot find \"${2}\" property in ${1}" >&2
    exit 1
  else
    echo $VALUE
  fi
}

function getIOSBundleID {
  cd "ios/"
  VALUE=$(xcodebuild -showBuildSettings | grep PRODUCT_BUNDLE_IDENTIFIER | sed "s/ //g" | sed "s/PRODUCT_BUNDLE_IDENTIFIER//g" | sed "s/=//g")
  cd "../"

  if [ ! "$VALUE" ]
  then
    echo "$ORANGE_COLOR[iOS Bundle ID Warning]: Could not find PRODUCT_BUNDLE_IDENTIFIER in iOS build settings. Default one (com.company.rnboilerplate) will be used instead.$NO_COLOR" >&2
    echo "com.company.rnboilerplate"
  else
    echo $VALUE
  fi
}

function getAndroidPackageName {
  VALUE=$(grep -o 'package="[^"]*"' android/app/src/main/AndroidManifest.xml | sed -E 's/ //;s/package*="//;s/"//')
  if [ ! "$VALUE" ]
  then
    echo "$ORANGE_COLOR[Android Package ID Warning]: Could not find package name in AndroidManifest.xml. Default one (com.company.rnboilerplate) will be used instead.$NO_COLOR" >&2
    echo "com.company.rnboilerplate"
  else
    echo $VALUE
  fi
}

function getPathByPackageName {
  echo $1 | sed -e 's/\./\//g'
}

# Get new app title and bundle id
APP_TITLE=$1
BUNDLE_ID=$2

if [[ ! $APP_TITLE || ! $BUNDLE_ID ]]
then
    echo "${RED_COLOR}[Parameters error]: App Title or Bundle ID is missing$NO_COLOR"
    echo "Usage: rename [newTitle] [newBundleID]"
    echo "Example: yarn rename \"New App Title\" com.new.appname"
    echo

    exit 1
fi

NAME=$(echo ${APP_TITLE//[[:blank:]]/} | iconv -t ascii//TRANSLIT | sed -E 's/[^a-zA-Z0-9-]+//g')
SLUG=$(echo $APP_TITLE | iconv -t ascii//TRANSLIT | sed -E 's/ /-/g' | sed -E 's/[~\^]+//g' | sed -E 's/[^a-zA-Z0-9-]+//g' | sed -E 's/^-+\|-+$//g' | sed -E 's/\-+/-/g' | tr A-Z a-z)
PACKAGE_ID_PATH=$(getPathByPackageName $BUNDLE_ID)

# Get current app name, app display name and packages names
CURRENT_APP_NAME=$(readJsonValue "app.json" name)
CURRENT_APP_DISPLAY_NAME=$(readJsonValue "app.json" displayName)
CURRENT_APP_SLUG=$(readJsonValue "package.json" name)
CURRENT_IOS_BUNDLE_ID=$(getIOSBundleID)
CURRENT_ANDROID_PACKAGE_ID=$(getAndroidPackageName)
CURRENT_ANDROID_PACKAGE_ID_PATH=$(getPathByPackageName $CURRENT_ANDROID_PACKAGE_ID)

echo ""
echo "Display app name: ${GREEN_COLOR}$APP_TITLE${NO_COLOR} [current one is ${CYAN_COLOR}$CURRENT_APP_DISPLAY_NAME${NO_COLOR}]"
echo "Application name: ${GREEN_COLOR}$NAME${NO_COLOR} [current one is ${CYAN_COLOR}$CURRENT_APP_NAME${NO_COLOR}]"
echo "Application slug: ${GREEN_COLOR}$SLUG${NO_COLOR} [current one is ${CYAN_COLOR}$CURRENT_APP_SLUG${NO_COLOR}]"
echo "iOS Bundle ID: ${GREEN_COLOR}$BUNDLE_ID${NO_COLOR} [current one is ${CYAN_COLOR}$CURRENT_IOS_BUNDLE_ID${NO_COLOR}]"
echo "Android package ID: ${GREEN_COLOR}$BUNDLE_ID${NO_COLOR} [current one is ${CYAN_COLOR}$CURRENT_ANDROID_PACKAGE_ID${NO_COLOR}]"
echo ""

# Rename packages and names using 'npx react-native-rename'
RenamingResult=$(npx react-native-rename "$NAME" -b "$BUNDLE_ID")
if [[ $RenamingResult = *"not a valid name"* ]]
then
  echo "${RED_COLOR}[react-native-rename command error]: $NO_COLOR"
  echo $RenamingResult
  echo ""
  exit 1
fi

echo "${GREEN_COLOR}Done renaming package by react-native-rename${NO_COLOR}"

# Move android test folder (Detox classes, etc)
if [ "$CURRENT_ANDROID_PACKAGE_ID_PATH" != "$PACKAGE_ID_PATH" ]
then
  mkdir -p "android/app/src/androidTest/java/$PACKAGE_ID_PATH"
  mv android/app/src/androidTest/java/$CURRENT_ANDROID_PACKAGE_ID_PATH/* "android/app/src/androidTest/java/$PACKAGE_ID_PATH/."
  rm -rf android/app/src/androidTest/java/$CURRENT_ANDROID_PACKAGE_ID_PATH

  echo "${GREEN_COLOR}Done moving Android tests${NO_COLOR}"
fi


# Additional files needed to be patched
#
# Theese files couldn't be updated via using react-native-rename
files_to_patch=(
  "android/app/src/main/AndroidManifest.xml"
  "android/app/src/main/res/values/strings.xml"
  "android/app/src/androidTest/java/$PACKAGE_ID_PATH/DetoxTest.java"
  "android/app/proguard-rules.pro"
  "ios/fastlane/Fastfile"
  "ios/$NAME/Info.plist"
  "ios/*.xcodeproj/project.pbxproj"
  "ios/*.xcodeproj/xcshareddata/xcschemes/*.xcscheme"
  "app.json"
  "package.json"
  "detox.config.js"
)

for file in "${files_to_patch[@]}"
do
  if [ -f $file ]
  then
    # echo "Patching $file"
    perl -pi -e "s/$CURRENT_IOS_BUNDLE_ID/$BUNDLE_ID/g" $file
    perl -pi -e "s/$CURRENT_ANDROID_PACKAGE_ID/$BUNDLE_ID/g" $file
    perl -pi -e "s/$CURRENT_APP_DISPLAY_NAME/$APP_TITLE/g" $file
    perl -pi -e "s/$CURRENT_APP_NAME/$NAME/g" $file
    echo "$file ${GREEN_COLOR}MODIFIED$NO_COLOR"
  else
    echo "${ORANGE_COLOR}$file does not match any file(s).$NO_COLOR"
  fi
done

# Update 'name' field in package.json
perl -pi -e "s/\"name\": \"$CURRENT_APP_SLUG\",/\"name\"\: \"$SLUG\",/" package.json
echo "${GREEN_COLOR}Done updating package.json${NO_COLOR}"

# Update iOS Bundle Display Name in Info.plist
perl -pi -e "s/$CURRENT_APP_DISPLAY_NAME/$APP_TITLE/" ios/*/Info.plist

echo "${GREEN_COLOR}APP SUCCESSFULLY RENAMED TO \"$APP_TITLE\"!${NO_COLOR}"
echo
echo "${ORANGE_COLOR}Podfile has been modified, please run \"pod install\" inside ios directory.${NO_COLOR}"
echo "${ORANGE_COLOR}Please make sure to run \"watchman watch-del-all\" and \"yarn start --reset-cache\" before running the app.${NO_COLOR}"
