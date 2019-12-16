import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  backgroundWallet: {
    borderRadius: 10
  },
  backgroundImages: {
    height: 220,
    width: '100%',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40
  },
  textPhone: {
    position: 'absolute',
    top: 110,
    fontWeight: 'bold',
    paddingLeft: 20,
    fontSize: 17,
    color: 'black'
  },
  textName: {
    position: 'absolute',
    top: 70,
    fontWeight: 'bold',
    paddingLeft: 20,
    fontSize: 30,
    color: 'black'
  },
  borderMenu: {
    position: 'absolute',
    top: 170,
    backgroundColor: 'white',
    height: 80,
    width: '90%',
    borderRadius: 20,
    shadowColor: 'black',
    shadowOffset: { width: 0, heigh: 2 },
    shadowRadius: 4,
    shadowOpacity: 1,
    elevation: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'center',
    alignItems: 'center'
  },
  transferImage: {
    width: 50,
    height: 45
  },
  payeeImage: {
    width: 50,
    height: 43
  },
  transactionImage: {
    width: 50,
    height: 43
  },
  textBalance: {
    fontSize: 23,
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  borderBalance: {
    position: 'absolute',
    top: 80,
    left: 170,
    marginLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
    width: 220,
    borderRadius: 10,
    backgroundColor: '#002984',
    fontWeight: 'bold',
    fontSize: 30,
    color: 'white'
  },
  payee: {
    marginTop: 7,
    width: 40,
    height: 34
  },
  menuDeposit: {
    alignItems: 'center',
    marginLeft: 12
  },
  menuPayee: {
    alignItems: 'center',
    marginLeft: 15
  },
  menuTransaction: {
    alignItems: 'center'
  },
  textDate: {
    backgroundColor: 'lightgrey',
    padding: 10,
    color: 'black'
  },
  textType: {
    marginBottom: 5
  },
  inputDescription: {
    marginLeft: 10,
    borderBottomWidth: 1,
    marginBottom: 10,
    marginTop: 30,
    width: '90%'
  },
  menuTransfer: {
    alignItems: 'center'
  },
  leftPanel: {
    marginTop: 10,
    paddingLeft: 10
  },
  rightPanel: {
    flexDirection: 'row',
    paddingLeft: 10,
    marginBottom: 10,
    justifyContent: 'space-between'
  },
  itemTransactionDescription: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 10
  },
  itemTransactionNominal: {
    fontWeight: 'bold',
    fontSize: 16
  },
  itemTransactionDeposit: {
    color: 'green'
  },
  itemTransactionTransfer: {
    color: 'red'
  }
});

export default styles;
