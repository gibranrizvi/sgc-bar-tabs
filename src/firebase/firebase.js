import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { add } from 'date-fns';

import FirebaseContext from './context';
import { firebaseConfig } from '../config/config';

const secondaryApp = firebase.initializeApp(firebaseConfig, 'Secondary');

// Close an active tab
export const closeTab = async (customer, activeTab, currentUser) => {
  const { id, tabs } = customer;

  const userRef = firestore.doc(`users/${id}`);

  const snapshot = await userRef.get();

  if (snapshot.exists) {
    const updatedTab = {
      ...activeTab,
      active: false,
      closedBy: currentUser,
      closedAt: new Date()
    };

    const updatedTabs = [
      updatedTab,
      ...tabs.filter((tab, index) => index !== 0)
    ];
    const updatedCustomer = {
      ...customer,
      hasActiveTab: false,
      tabs: updatedTabs
    };

    try {
      await userRef.update({ ...updatedCustomer });
    } catch (error) {
      console.log(error);
    }
  }

  return userRef;
};

// Add or remove seybrews
export const addSeybrews = async data => {
  const { customer, seybrewsToAdd } = data;

  if (seybrewsToAdd === 0) {
    return;
  }

  const { id, seybrewTab } = customer;

  const userRef = firestore.doc(`users/${id}`);

  const snapshot = await userRef.get();

  if (snapshot.exists) {
    const createdAt = new Date();

    const updatedSeybrewCount = seybrewTab.count + seybrewsToAdd;
    const seybrewTabOrders = [
      {
        type: 'addition',
        amount: seybrewsToAdd,
        total: updatedSeybrewCount,
        date: createdAt
      },
      ...seybrewTab.orders
    ];

    const updatedSeybrewTab = {
      count: updatedSeybrewCount,
      orders: seybrewTabOrders
    };

    try {
      await userRef.update({
        seybrewTab: updatedSeybrewTab
      });
    } catch (error) {
      console.log(error);
    }

    return userRef;
  }
};

// Create new order document
export const createOrderDocument = async orderData => {
  const { customer, order, total, seybrewOrder, createdBy } = orderData;

  if (order.length === 0 && seybrewOrder === 0) {
    return;
  }

  const { id, tabs, hasActiveTab, seybrewTab } = customer;

  const userRef = firestore.doc(`users/${id}`);

  const snapshot = await userRef.get();

  if (snapshot.exists) {
    const createdAt = new Date();

    const updatedSeybrewCount = seybrewTab.count - seybrewOrder;
    const seybrewTabOrders = [
      {
        type: 'removal',
        amount: seybrewOrder,
        total: updatedSeybrewCount,
        date: createdAt
      },
      ...seybrewTab.orders
    ];
    const updatedSeybrewTab = {
      count: updatedSeybrewCount,
      orders: seybrewTabOrders
    };

    // If order consists of only free seybrews, update only seybrew tab
    if (order.length === 0 && seybrewOrder > 0) {
      try {
        await userRef.update({
          seybrewTab: updatedSeybrewTab
        });
      } catch (error) {
        console.log(error);
      }

      return userRef;
    }

    if (!hasActiveTab) {
      // Create new tab
      const startDate = createdAt;
      const dueDate = add(startDate, { months: 1 });

      try {
        await userRef.update({
          tabs: [
            {
              orders: [{ items: order, total, createdAt, createdBy }],
              startDate,
              dueDate,
              active: true,
              tabAmount: total
            },
            ...tabs
          ],
          hasActiveTab: true,
          seybrewTab: seybrewOrder === 0 ? seybrewTab : updatedSeybrewTab
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      // Update existing tab
      try {
        let updatedTabs = [];

        for (let i = 0; i < tabs.length; i++) {
          if (tabs[i].active) {
            updatedTabs.push({
              ...tabs[i],
              orders: [
                {
                  items: order,
                  total,
                  createdAt,
                  createdBy
                },
                ...tabs[i].orders
              ],
              tabAmount: tabs[i].tabAmount + total
            });
          } else {
            updatedTabs.push(tabs[i]);
          }
        }

        await userRef.update({
          tabs: updatedTabs,
          seybrewTab: seybrewOrder === 0 ? seybrewTab : updatedSeybrewTab
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
        tabs: [],
        hasActiveTab: false,
        seybrewTab: { count: 0, orders: [] },
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
