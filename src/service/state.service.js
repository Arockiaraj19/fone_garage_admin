import { db } from '@/helper/firebase';
import { collection, query, where, getDocs, startAfter, limit, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
const addState = async (stateData) => {
  try {
    const docRef = await addDoc(collection(db, 'states'), stateData);
    console.log('State added with ID: ', docRef.id);
    return docRef.id;
  } catch (e) {
    console.error('Error adding state: ', e);
    throw new Error('Failed to add state');
  }
};


const fetchStates = async (id) => {
  try {
    let statesQuery = collection(db, 'states');
    statesQuery = query(statesQuery, where('countryId', '==', id));
    const querySnapshot = await getDocs(statesQuery);

    const states = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return states;
  } catch (e) {
    console.error('Error fetching states: ', e);
    throw new Error('Failed to fetch states');
  }
};

const updateState = async (stateId, newData) => {
  try {
    const stateRef = doc(db, 'states', stateId);
    await updateDoc(stateRef, newData);
    console.log('State updated successfully');
  } catch (e) {
    console.error('Error updating state: ', e);
    throw new Error('Failed to update state');
  }
};


const deleteState = async (stateId) => {
  try {
    const stateRef = doc(db, 'states', stateId);
    await deleteDoc(stateRef);
    console.log('State deleted successfully');
  } catch (e) {
    console.error('Error deleting state: ', e);
    throw new Error('Failed to delete state');
  }
};


export {
  deleteState, updateState, addState, fetchStates
}