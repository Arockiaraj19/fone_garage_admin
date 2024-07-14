import { db } from '@/helper/firebase';
import { collection, query, where, getDocs, startAfter, limit, addDoc,updateDoc,doc, deleteDoc  } from 'firebase/firestore';
// Adding a brand model size
const addCountry = async (countryData) => {
  try {
    const docRef = await addDoc(collection(db, 'countries'), countryData);
    console.log('Country added with ID: ', docRef.id);
    return docRef.id;
  } catch (e) {
    console.error('Error adding country: ', e);
    throw new Error('Failed to add country');
  }
};

const fetchCountries = async () => {
  try {
    const countriesQuery = collection(db, 'countries');
    const querySnapshot = await getDocs(countriesQuery);

    const countries = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return countries;
  } catch (e) {
    console.error('Error fetching countries: ', e);
    throw new Error('Failed to fetch countries');
  }
};

const updateCountry = async (countryId, newData) => {
  try {
    const countryRef = doc(db, 'countries', countryId);
    await updateDoc(countryRef, newData);
    console.log('Country updated successfully');
  } catch (e) {
    console.error('Error updating country: ', e);
    throw new Error('Failed to update country');
  }
};


const deleteCountry = async (countryId) => {
  try {
    const countryRef = doc(db, 'countries', countryId);
    await deleteDoc(countryRef);
    console.log('Country deleted successfully');
  } catch (e) {
    console.error('Error deleting country: ', e);
    throw new Error('Failed to delete country');
  }
};
