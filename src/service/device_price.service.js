import { db } from '@/helper/firebase';
import { collection, query, where, getDocs, startAfter, limit, addDoc,updateDoc,doc, deleteDoc  } from 'firebase/firestore';
// Adding a brand model size
const addDevicePrice = async (brandModelSizeData) => {
  try {
    const docRef = await addDoc(collection(db, 'devicePrices'), brandModelSizeData);
    console.log('Brand model size added with ID: ', docRef.id);
    return docRef.id;
  } catch (e) {
    console.error('Error adding brand model size: ', e);
    throw new Error('Failed to add brand model size');
  }
};

const fetchDevicePrices = async (id) => {
  try {
   let devicePricesQuery = collection(db, 'devicePrices');
    devicePricesQuery= query(devicePricesQuery, where('brandModelSizeId', '==',id));
    const querySnapshot = await getDocs(devicePricesQuery);

    const devicePrices = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return devicePrices;
  } catch (e) {
    console.error('Error fetching brand model sizes: ', e);
    throw new Error('Failed to fetch brand model sizes');
  }
};

const updateDevicePrice = async (brandModelSizeId, newData) => {
  try {
    const brandModelSizeRef = doc(db, 'devicePrices', brandModelSizeId);
    await updateDoc(brandModelSizeRef, newData);
    console.log('Brand model size updated successfully');
  } catch (e) {
    console.error('Error updating brand model size: ', e);
    throw new Error('Failed to update brand model size');
  }
};

const deleteDevicePrice = async (brandModelSizeId) => {
  try {
    const brandModelSizeRef = doc(db, 'devicePrices', brandModelSizeId);
    await deleteDoc(brandModelSizeRef);
    console.log('Brand model size deleted successfully');
  } catch (e) {
    console.error('Error deleting brand model size: ', e);
    throw new Error('Failed to delete brand model size');
  }
};

export {
  addDevicePrice,fetchDevicePrices,updateDevicePrice,deleteDevicePrice
}