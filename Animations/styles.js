import {StyleSheet } from 'react-native'
import globalStyles from '../../../globalStyles'


const styles = StyleSheet.create({
  button: {
    backgroundColor: 'rgba(123,104,238,0.8)',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    letterSpacing: 0.5,
  },
  bottomContainer: {
    justifyContent: 'center',
    height: globalStyles.HEIGHT / 3.5,
  },
  textInput: {
    height: 50,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 8,
    paddingLeft: 10,
    backgroundColor:'white'
  },
  formButton: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
    backgroundColor:'rgba(124, 104, 238, 0.974)'
  },
  formInputContainer: {
    marginBottom: 70,
    ...StyleSheet.absoluteFill,
    zIndex:-1,
    justifyContent:'center',
  },
  closeButtonContainer: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 1,
    backgroundColor:'white',
    alignItems:'center',
    borderRadius:20,
    top:-20
  },
});

export default styles