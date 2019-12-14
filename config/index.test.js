import { Platform } from 'react-native';
import { getBaseURL, PLATFORM } from './index';

describe('Config', () => {
  describe('BASE_URL', () => {
    it('should return base url with localhost form when the platform is iOS', () => {
      const expectedURL = 'http://localhost:3000';

      expect(getBaseURL()).toEqual(expectedURL);
    });

    it('should return base url with localhost form when the platform is android', () => {
      Platform.OS = PLATFORM.ANDROID;
      const expectedURL = 'http://172.20.10.6:3000';

      expect(getBaseURL()).toEqual(expectedURL);
    });
  });
});
