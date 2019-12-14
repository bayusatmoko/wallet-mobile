import { Platform } from 'react-native';

const DEFAULT_BASE_URL = 'http://localhost:3001';
const ANDROID_BASE_URL = 'http://172.20.10.6:3001';

export const PLATFORM = {
  ANDROID: 'android'
};

export const getBaseURL = () => {
  if (Platform.OS === PLATFORM.ANDROID) {
    return ANDROID_BASE_URL;
  }
  return DEFAULT_BASE_URL;
};
