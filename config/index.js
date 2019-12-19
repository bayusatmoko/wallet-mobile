import { Platform } from 'react-native';

const DEFAULT_BASE_URL = 'https://7653f94d.ngrok.io';
const ANDROID_BASE_URL = 'https://7653f94d.ngrok.io';

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
