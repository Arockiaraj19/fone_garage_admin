import { db } from '@/helper/firebase';
import { collection, query, where, getDocs, startAfter, limit, addDoc,updateDoc,doc, deleteDoc  } from 'firebase/firestore';


// Adding a user
const addUser = async (userData) => {
  try {
    const docRef = await addDoc(collection(db, 'users'), userData);
    console.log('User added with ID: ', docRef.id);
    return docRef.id;
  } catch (e) {
    console.error('Error adding user: ', e);
    throw new Error('Failed to add user');
  }
};


// Fetching users
const fetchUsers = async () => {
  try {
    const usersQuery = collection(db, 'users');
    const querySnapshot = await getDocs(usersQuery);

    const users = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return users;
  } catch (e) {
    console.error('Error fetching users: ', e);
    throw new Error('Failed to fetch users');
  }
};


// Updating a user
const updateUser = async (userId, newData) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, newData);
    console.log('User updated successfully');
  } catch (e) {
    console.error('Error updating user: ', e);
    throw new Error('Failed to update user');
  }
};


// Deleting a user
const deleteUser = async (userId) => {
  try {
    const userRef = doc(db, 'users', userId);
    await deleteDoc(userRef);
    console.log('User deleted successfully');
  } catch (e) {
    console.error('Error deleting user: ', e);
    throw new Error('Failed to delete user');
  }
};