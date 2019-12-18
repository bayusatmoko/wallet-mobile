import React from 'react';
import { shallow } from 'enzyme';
import SpendingChart from './SpendingChart';

describe('SpendingChart', () => {
  let wrapper;
  let transactions;
  beforeEach(() => {
    transactions = [
      {
        walletId: 1,
        receiverWalletId: 1,
        type: 'DEPOSIT',
        nominal: 1000,
        description: 'Uang',
        createdAt: '2019-12-13T09:10:31.186Z'
      },
      {
        walletId: 1,
        receiverWalletId: 2,
        type: 'TRANSFER',
        nominal: 500,
        description: 'Uang',
        createdAt: '2019-12-13T09:10:31.186Z'
      },
      {
        walletId: 2,
        receiverWalletId: 1,
        type: 'TRANSFER',
        nominal: 2500,
        description: 'Uang',
        createdAt: '2019-12-13T09:10:31.186Z'
      }
    ];
    wrapper = shallow(<SpendingChart transactions={transactions} />);
  });
  describe('#render', () => {
    it('should render LineChart with data', () => {
      const chart = wrapper.find('PieChart');

      expect(chart.length).toBe(1);
    });

    it('should render LineChart with data from minimum Date', () => {
      wrapper = shallow(
        <SpendingChart transactions={transactions} minDate="2019-12-01" />
      );

      const chart = wrapper.find('PieChart');

      expect(chart.props().data[0].population).toBe(0);
    });
  });
});
