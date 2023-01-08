import AsyncStorage from '@react-native-async-storage/async-storage';
import { SHOW_LOG } from '../constants';

/* get item from storage */
export const getStorage = async ({ key }) => {
    const value = await AsyncStorage.getItem(key);
    return value;
}

/* single removing */
export const removeData = async (key) => {
  try {
      await AsyncStorage.removeItem(key);
      (SHOW_LOG) && console.log(`data ${key} has successfully remove`);
      return true;
  }
  catch(exception) {
      return false;
  }
}