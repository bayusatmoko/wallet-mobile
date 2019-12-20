import { Platform } from 'react-native';

const DEFAULT_BASE_URL = 'http://phoenix-wallet.herokuapp.com';
const ANDROID_BASE_URL = 'http://phoenix-wallet.herokuapp.com';

export const PLATFORM = {
  ANDROID: 'android'
};

export const getBaseURL = () => {
  if (Platform.OS === PLATFORM.ANDROID) {
    return ANDROID_BASE_URL;
  }
  return DEFAULT_BASE_URL;
};

export default {
  API_URL: getBaseURL()
};
