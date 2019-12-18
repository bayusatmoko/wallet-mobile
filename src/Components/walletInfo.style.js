import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  backgroundWallet: {
    borderRadius: 10
  },
  backgroundImages: {
    height: 250,
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
    marginTop: -40,
    backgroundColor: 'white',
    height: 80,
    width: '90%',
    borderRadius: 20,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
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
    marginRight: 20,
    padding: 10,
    marginTop: -120,
    marginBottom: 50,
    flexDirection: 'column',
    alignSelf: 'flex-end',
    width: 220,
    borderRadius: 10,
    backgroundColor: '#8127fc',
    fontWeight: 'bold',
    fontSize: 30,
    color: 'white'
  },
  payee: {
    marginTop: 7,
    width: 40,
    height: 34
  },
  borderPayee: {
    backgroundColor: 'white',
    width: '90%',
    height: 60,
    alignSelf: 'center',
    borderRadius: 20,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 4,
    shadowOpacity: 1,
    elevation: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10
  },
  textPayee: {
    marginLeft: 30,
    marginTop: 5,
    fontSize: 15,
    fontWeight: 'bold'
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
    padding: '3%',
    color: 'black'
  },
  textType: {
    marginBottom: 5
  },
  inputDescription: {
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    marginBottom: 10,
    fontSize: 20,
    height: 50,
    width: '90%',
    marginTop: 20,
    alignSelf: 'center'
  },
  menuTransfer: {
    alignItems: 'center'
  },
  leftPanel: {
    marginTop: 10,
    paddingLeft: '3%'
  },
  rightPanel: {
    flexDirection: 'row',
    paddingLeft: '3%',
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
    color: 'green',
    marginRight: '2%'
  },
  itemTransactionTransfer: {
    color: 'red',
    marginRight: '2%'
  },
  backgroundError: {
    backgroundColor: 'red',
    alignSelf: 'center',
    width: 300,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 20
  },
  textError: {
    marginTop: 10,
    fontSize: 20,
    textAlign: 'center'
  },
  favouriteIcon: {
    marginTop: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 40,
    height: 40
  },
  input: {
    marginRight: 30,
    marginLeft: 30,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    marginBottom: 10,
    fontSize: 20,
    height: 50
  },
  payeeTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15
  },
  container: {
    width: '80%',
    alignSelf: 'center',
    padding: 20,
    backgroundColor: '#ffacae',
    borderRadius: 10,
    marginTop: 100
  },
  text: {
    color: 'red',
    fontSize: 25,
    alignSelf: 'center'
  }
});

export default styles;
