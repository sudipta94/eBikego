import firebase from '@react-native-firebase/app';
import database from '@react-native-firebase/database';

export const userRef = database(firebase.app());
