import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { add } from 'date-fns';

import FirebaseContext from './context';
import { firebaseConfig } from '../config/config';

const secondaryApp = firebase.initializeApp(firebaseConfig, 'Secondary');

// Create new order document
export const createOrderDocument = async (orderData, additionalData) => {
  const { customer, order, total, createdBy } = orderData;

  const { id, activeTab, tabAmount, orders } = customer;

  const userRef = firestore.doc(`users/${id}`);

  const snapshot = await userRef.get();

  if (snapshot.exists) {
    // Create new order
    const createdAt = new Date();

    if (!activeTab) {
      // Create new tab
      const startDate = createdAt;
      const dueDate = add(startDate, { months: 1 });

      console.log(customer);

      try {
        await userRef.update({
          orders: [
            {
              items: order,
              total,
              createdAt,
              createdBy
            }
          ],
          startDate,
          dueDate,
          activeTab: true,
          tabAmount: total
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      // Update existing tab
      try {
        await userRef.update({
          orders: [
            ...orders,
            {
              items: order,
              total,
              createdAt,
              createdBy
            }
          ],
          tabAmount: tabAmount + total
        });
      } catch (error) {}
    }
  }

  return userRef;
};

// Create user with firebase auth
export const createNewUser = (email, password) => {
  return secondaryApp
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(({ user }) => {
      secondaryApp.auth().signOut();
      return user;
    });
};

// Saving new user or updating existing user in Firestore
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    // Create new user
    const { displayName, handle, role, telephone, email, createdBy } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        handle,
        role,
        telephone,
        email,
        orders: [],
        activeTab: false,
        startDate: null,
        dueDate: null,
        tabAmount: 0,
        seybrewTab: 0,
        createdBy,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log(error.message);
    }
  } else {
    // Update user
    const lastLoggedIn = new Date();

    try {
      await userRef.update({
        lastLoggedIn
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  return userRef;
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Export Auth and Firestore services
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export { FirebaseContext };

// Google OAuth set up
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

// Export signInWithGoogle method
export const signInWithGoogle = () => auth.signInWithPopup(provider);

// Firebase default export
export default firebase;
