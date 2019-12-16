import { Platform } from 'react-native';

const DEFAULT_BASE_URL = 'http://localhost:3000';
const ANDROID_BASE_URL = 'http://10.0.2.2:3000';

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
