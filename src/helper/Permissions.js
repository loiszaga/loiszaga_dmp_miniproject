import { Platform, Alert, Linking } from 'react-native';
import { check, RESULTS, requestMultiple, PERMISSIONS, openSettings, checkMultiple } from 'react-native-permissions';
import { CAMERA_PERMISSIONS, GALLERY_PERMISSIONS, LOCATION_PERMISSIONS, SHOW_LOG, STORAGE_PERMISSIONS } from '../constants';

/* function that contains all permissions for supporting this app */
export const listPermissions = (permission) => {
    let permissions = [];
    switch (permission) {
        case CAMERA_PERMISSIONS:
            permissions = (Platform.OS === 'android') ? [PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] : [PERMISSIONS.IOS.CAMERA];
            break;
        case GALLERY_PERMISSIONS:
            permissions = (Platform.OS === 'android') ? [PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] : [PERMISSIONS.IOS.PHOTO_LIBRARY];
            break;
        case STORAGE_PERMISSIONS:
            permissions = (Platform.OS === 'android') && [PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE, PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE];
            break;
        case LOCATION_PERMISSIONS:
            permissions = (Platform.OS === 'android') ? [PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION, PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] : [PERMISSIONS.IOS.LOCATION_ALWAYS, PERMISSIONS.IOS.LOCATION_WHEN_IN_USE];
            break;
        default:
            break;
    }

    return permissions;
}

// check the permissions
export const checkForPermissions = async (permission) => {
    // Call our permission service and check for permissions
    const isPermissionGranted = await checkMultiplePermissions(listPermissions(permission));
    return isPermissionGranted;
}

// This function can be used anywhere as it supports multiple permissions.
// It'll checks for permissions
export const checkMultiplePermissions = async (permissions) => {
    let isPermissionGranted = false;
    const statuses = await requestMultiple(permissions);
    for (var index in permissions) {
        if (statuses[permissions[index]] === RESULTS.GRANTED) {
            isPermissionGranted = true;
        }else if (statuses[permissions[index]] === RESULTS.DENIED) {
            isPermissionGranted = false;
        }else if ((Platform.OS === 'ios') && statuses[permissions[index]] === RESULTS.LIMITED) {
            isPermissionGranted = true;
        } else {
            isPermissionGranted = false;
            break;
        }
    }
    return isPermissionGranted;
}

/* request permissions */
export const requestMultiplePermissions = (permission, translations) => {
    // get list permissions
    let permissions = listPermissions(permission);

    requestMultiple(permissions).then((res) => {
        let blocked_counter = 0;
        for (var index in permissions) {
          switch (res[permissions[index]]) {
              case RESULTS.GRANTED:
                  (SHOW_LOG) && console.log(`permission ${permission} is ${res[permissions[index]]}`);
                  break;
              case RESULTS.DENIED:
                  (SHOW_LOG) && console.log(`permission ${permission} is ${res[permissions[index]]}`);
                  break;
              case RESULTS.BLOCKED:
                  blocked_counter++;
                  (SHOW_LOG) && console.log(`permission ${permission} is ${res[permissions[index]]}`);
                  (blocked_counter === 1) && openPermissionsSettings(permission, translations);
                  break;
              case RESULTS.UNAVAILABLE:
                  (SHOW_LOG) && console.log(`permission ${permission} is ${res[permissions[index]]}`);
                  break;
              default:
                  (SHOW_LOG) && console.log(`permission ${permission} is ${res[permissions[index]]}`);
                  break;
          }
        }
    });
}

/* permissions alert */
export const openPermissionsSettings = (permission, translations) => {
    // Show an alert in case permission was not granted
    Alert.alert(
      translations('common:title_alert_permissions'),
      `${translations('common:enable_permissions')} : ${(permission == 'camera') ? ((Platform.OS === 'android') && 'camera and storage') : permission}`,
      [
        { text  : 'Cancel', style : 'cancel' },
        { text    : translations('common:open_settings'),
          onPress : () => {(Platform.OS == 'android')
                    ? Linking.openSettings()
                    : openSettings().catch(() => console.warn('cannot open settings'));
          }
        }
      ],
      { cancelable: false }
    );
}

// In case you want to check a single permission
export async function checkPermission(permission) {
    let isPermissionGranted = '';
    const result = await check(permission);
    switch (result) {
        case RESULTS.GRANTED:
          isPermissionGranted = result;
          break;
        case RESULTS.DENIED:
          isPermissionGranted = result;
          break;
        case RESULTS.BLOCKED:
          isPermissionGranted = result;
          break;
        case RESULTS.UNAVAILABLE:
          isPermissionGranted = result;
          break;
    }
    return isPermissionGranted;
}