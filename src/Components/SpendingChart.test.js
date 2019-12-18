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
        createdAt: '2019-12-12T09:10:31.186Z'
      },
      {
        walletId: 2,
        receiverWalletId: 1,
        type: 'TRANSFER',
        nominal: 2500,
        description: 'Uang',
        createdAt: '2019-12-11T09:10:31.186Z'
      }
    ];
    wrapper = shallow(
      <SpendingChart transactions={transactions} walletId={1} />
    );
  });
  describe('#render', () => {
    it('should render LineChart with data', () => {
      wrapper = shallow(
        <SpendingChart
          transactions={transactions}
          minDate="2019-12-10"
          walletId={1}
        />
      );

      const chart = wrapper.find('PieChart');

      expect(chart.length).toBe(1);
    });

    it('should render LineChart with data from minimum Date', () => {
      wrapper = shallow(
        <SpendingChart
          transactions={transactions}
          minDate="2019-12-12"
          walletId={1}
        />
      );

      const chart = wrapper.find('PieChart');

      expect(chart.props().data[0].population).toBe(1000);
      expect(chart.props().data[1].population).toBe(0);
      expect(chart.props().data[2].population).toBe(500);
    });
  });
});
