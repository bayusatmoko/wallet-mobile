import { Platform } from 'react-native';
import { getBaseURL, PLATFORM } from './index';

describe('Config', () => {
  describe('BASE_URL', () => {
    it('should return base url with localhost form when the platform is iOS', () => {
      const expectedURL = 'https://7653f94d.ngrok.io';

      expect(getBaseURL()).toEqual(expectedURL);
    });

    it('should return base url with localhost form when the platform is android', () => {
      Platform.OS = PLATFORM.ANDROID;
      const expectedURL = 'https://7653f94d.ngrok.io';

      expect(getBaseURL()).toEqual(expectedURL);
    });
  });
});
