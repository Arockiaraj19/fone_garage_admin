import { db } from '@/helper/firebase';
import { collection, query, where, getDocs, startAfter, limit, addDoc,updateDoc,doc, deleteDoc  } from 'firebase/firestore';


// Adding a user
const addDeviceCondition = async (userData) => {
  try {
    const docRef = await addDoc(collection(db, 'deviceCondition'), userData);
    console.log('User added with ID: ', docRef.id);
    return docRef.id;
  } catch (e) {
    console.error('Error adding user: ', e);
    throw new Error('Failed to add user');
  }
};


// Fetching deviceCondition
const fetchDeviceCondition = async () => {
  try {
    const deviceConditionQuery = collection(db, 'deviceCondition');
    const querySnapshot = await getDocs(deviceConditionQuery);

    const deviceCondition = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return deviceCondition;
  } catch (e) {
    console.error('Error fetching deviceCondition: ', e);
    throw new Error('Failed to fetch deviceCondition');
  }
};


// Updating a user
const updateDeviceCondition = async (userId, newData) => {
  try {
    const userRef = doc(db, 'deviceCondition', userId);
    await updateDoc(userRef, newData);
    console.log('User updated successfully');
  } catch (e) {
    console.error('Error updating user: ', e);
    throw new Error('Failed to update user');
  }
};


// Deleting a user
const deleteDeviceCondition = async (userId) => {
  try {
    const userRef = doc(db, 'deviceCondition', userId);
    await deleteDoc(userRef);
    console.log('User deleted successfully');
  } catch (e) {
    console.error('Error deleting user: ', e);
    throw new Error('Failed to delete user');
  }
};

export {
  addDeviceCondition,fetchDeviceCondition, updateDeviceCondition,deleteDeviceCondition
}