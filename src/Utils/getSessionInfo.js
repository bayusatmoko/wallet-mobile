import SInfo from 'react-native-sensitive-info';

const getSessionInfo = async () => {
  const token = await SInfo.getItem(getSessionInfo.KEY_TOKEN, {});
  const userId = await SInfo.getItem(getSessionInfo.KEY_USER_ID, {});
  const walletId = await SInfo.getItem(getSessionInfo.KEY_WALLET_ID, {});
  return { token, userId, walletId };
};

getSessionInfo.KEY_TOKEN = 'token';
getSessionInfo.KEY_USER_ID = 'userId';
getSessionInfo.KEY_WALLET_ID = 'walletId';

export default getSessionInfo;
