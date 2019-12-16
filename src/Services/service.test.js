import axios from 'axios';
import config from '../../config';
import addTransaction from './addTransaction';
import getUserByEmail from './getUserByEmaill';
import getUserById from './getUserById';
import getWalletByUserId from './getWalletByUserId';
import getLastTransactionsByWalletId from './getLastTransactionsByWalletId';

jest.mock('axios');

describe('Service', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  describe('getUserById', () => {
    it('should return user data when fetch from server', async () => {
      const userInfo = {
        id: 1,
        name: 'Huda',
        phoneNumber: '08237283',
        email: 'huda@gmail.com'
      };

      axios.get.mockResolvedValueOnce({ data: userInfo });

      const response = await getUserById(userInfo.id);

      expect(response.data).toEqual(userInfo);
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalled();
    });
  });

  describe('getUserByEmail', () => {
    it('should return user data when fetch from server', async () => {
      const userInfo = {
        id: 1,
        name: 'Huda',
        phoneNumber: '08237283',
        email: 'huda@gmail.com'
      };

      axios.get.mockResolvedValueOnce({ data: userInfo });

      const response = await getUserByEmail(userInfo.email);

      expect(response.data).toEqual(userInfo);
      expect(axios.get).toHaveBeenCalledTimes(1);
    });
  });

  describe('getWalletByUserId', () => {
    it('should return wallet data when fetch from server by user id', async () => {
      const userId = 1;
      const wallet = {
        id: 1,
        userId: 1,
        name: 'Fariz',
        balance: '500000'
      };

      axios.get.mockResolvedValueOnce({ data: wallet });

      const response = await getWalletByUserId(userId);

      expect(response.data).toEqual(wallet);
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalled();
    });
  });

  describe('getLastTransactionsByWalletId', () => {
    let wallet;
    let lastTransactions;
    beforeEach(() => {
      wallet = {
        id: 1,
        userId: 1,
        name: 'Fariz',
        balance: '500000'
      };
      lastTransactions = [
        {
          id: 1,
          walletId: 1,
          type: 'deposit',
          amount: 7700000,
          description: 'Payslip 2019-11-28',
          receiverWalletId: null,
          createdAt: '2019-11-28T13:26:15.063Z',
          updatedAt: '2019-11-28T13:26:15.063Z'
        },
        {
          id: 2,
          walletId: 1,
          type: 'withdraw',
          amount: 30,
          description: 'Buy Cheeseburger for lunch',
          receiverWalletId: null,
          createdAt: '2019-11-28T13:26:15.063Z',
          updatedAt: '2019-11-28T13:26:15.063Z'
        },
        {
          id: 3,
          walletId: 1,
          type: 'withdraw',
          amount: 100,
          description: 'Dinner at Italian Steak House',
          receiverWalletId: null,
          createdAt: '2019-11-28T13:26:15.063Z',
          updatedAt: '2019-11-28T13:26:15.063Z'
        },
        {
          id: 4,
          walletId: 1,
          type: 'deposit',
          amount: 8800000,
          description: 'Payslip 2019-11-29',
          receiverWalletId: null,
          createdAt: '2019-11-29T13:26:15.063Z',
          updatedAt: '2019-11-29T13:26:15.063Z'
        },
        {
          id: 5,
          walletId: 1,
          type: 'withdraw',
          amount: 40,
          description: 'Buy Big Macs for lunch',
          receiverWalletId: null,
          createdAt: '2019-11-29T13:26:15.063Z',
          updatedAt: '2019-11-29T13:26:15.063Z'
        }
      ];
    });
    it('should return 5 last transactions of wallet when fetch from server by wallet id', async () => {
      axios.get.mockResolvedValueOnce({ data: lastTransactions });

      const response = await getLastTransactionsByWalletId(wallet.id);

      expect(response.data).toEqual(lastTransactions);
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalled();
    });

    it('should return throw error when failing to fetch from server by wallet id', async () => {
      const expectedResult = 'Network Error';
      axios.get.mockRejectedValueOnce(new Error(expectedResult));

      await expect(
        getLastTransactionsByWalletId(wallet.id)
      ).rejects.toThrowError(expectedResult);
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalled();
    });

    it('should send transaction to server', async () => {
      axios.post.mockResolvedValueOnce({ data: lastTransactions[0] });

      await addTransaction(lastTransactions[0]);

      expect(axios.post).toHaveBeenCalledWith(
        `${config.API_URL}/transactions`,
        lastTransactions[0]
      );
    });
  });
});