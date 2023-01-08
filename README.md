# loiszaga_dmp_miniproject

## Only Android
There is no Xcode App on my laptop

### DESCRIPTION
This is a test app created as a requirement of PT Dans Multi Pro.

### INSTALLATION
#### Prerequisites
The prerequisites software that need to be installed were:
- [NodeJS][Nodejs] minimum version 12.
- [JDK (Java Development Kit)][JDK] minimum version 11.
- Android SDK with API 31, or other Android version you want to test (the easiest way: download [Android Studio][Android Studio] and install with recommended settings).
- Android NDK, you can install it inside Android Studio.

#### Create Android Studio AVD (Android Virtual Device) to use the Android Emulator 
In Android Studio, search `AVD Manager` (usually inside three dots menu), then create a new AVD with your emulator preference (or just the default one).

#### Clone Git
Open `terminal (cmd/powershell)` then type:
> git clone https://github.com/loiszaga/loiszaga_dmp_miniproject.git

#### Install NPM (Node Package Manager for Javascript) Dependencies
In root directory of cloned git, run this in `terminal`:
> npm install

If you want to know more about the setup, or using ios, please read the [official docs - setup][RN install].


### DEPLOYMENT
#### Development Mode
In root folder, make sure you already run `npm install`, after that in terminal, run command:
> npm run android

Now an emulator will run the app if you already create an AVD.

If you want to know more about the setup, or using ios, please read the [official docs - setup][RN install].

If you want to run with real device, there are more step to do, please read the [official docs - device][RN debug device].

#### Production Mode
The easiest one is to build an unsigned apk, from root project, type this command in terminal:
> cd android && .\gradlew assembleRelease && cd ..

The apk will appear in `root/android/app/build/outputs/apk/release/apk-release.apk`.

If you want to publish it to the store, read more about [publish to google play store (android)][RN android store] and [publish to apple app store (ios)][RN ios store] in the official docs.


<!-- REFERENCE LINK -->
[RN install]: https://reactnative.dev/docs/0.67/environment-setup
[RN android store]: https://reactnative.dev/docs/0.67/signed-apk-android
[RN ios store]: https://reactnative.dev/docs/0.67/publishing-to-app-store
[RN debug device]: https://reactnative.dev/docs/0.67/running-on-device
[NodeJS]: https://nodejs.org/en/
[JDK]: https://www.oracle.com/java/technologies/downloads/
[Android Studio]: https://developer.android.com/studio
