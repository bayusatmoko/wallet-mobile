import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  backgroundWallet: {
    borderRadius: 10
  },
  backgroundImages: {
    height: 200,
    width: '100%',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40
  },
  textId: {
    position: 'absolute',
    top: 60,
    fontWeight: 'bold',
    paddingLeft: 20,
    fontSize: 20,
    color: 'white'
  },
  textName: {
    position: 'absolute',
    top: 20,
    fontWeight: 'bold',
    paddingLeft: 20,
    fontSize: 30,
    color: 'white'
  },
  borderMenu: {
    position: 'absolute',
    top: 150,
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
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold'
  },
  borderBalance: {
    position: 'absolute',
    top: 90,
    marginLeft: 20,
    paddingLeft: 10,
    width: 160,
    borderRadius: 10,
    backgroundColor: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
    color: 'white'
  }
});

export default styles;
