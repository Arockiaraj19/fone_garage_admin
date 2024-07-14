import { db } from '@/helper/firebase';
import { collection, query, where, getDocs, startAfter, limit, addDoc,updateDoc,doc, deleteDoc  } from 'firebase/firestore';
const addDeviceType = async (deviceTypeData) => {
  try {
    const docRef = await addDoc(collection(db, 'deviceTypes'), deviceTypeData);
    console.log('Device type added with ID: ', docRef.id);
    return docRef.id;
  } catch (e) {
    console.error('Error adding device type: ', e);
    throw new Error('Failed to add device type');
  }
};

const fetchDeviceTypes = async () => {
  try {
    const deviceTypesQuery = collection(db, 'deviceTypes');
    const querySnapshot = await getDocs(deviceTypesQuery);

    const deviceTypes = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return deviceTypes;
  } catch (e) {
    console.error('Error fetching device types: ', e);
    throw new Error('Failed to fetch device types');
  }
};


const updateDeviceType = async (deviceTypeId, newData) => {
  try {
    const deviceTypeRef = doc(db, 'deviceTypes', deviceTypeId);
    await updateDoc(deviceTypeRef, newData);
    console.log('Device type updated successfully');
  } catch (e) {
    console.error('Error updating device type: ', e);
    throw new Error('Failed to update device type');
  }
};


const deleteDeviceType = async (deviceTypeId) => {
  try {
    const deviceTypeRef = doc(db, 'deviceTypes', deviceTypeId);
    await deleteDoc(deviceTypeRef);
    console.log('Device type deleted successfully');
  } catch (e) {
    console.error('Error deleting device type: ', e);
    throw new Error('Failed to delete device type');
  }
};

export {
  addDeviceType,fetchDeviceTypes,updateDeviceType,deleteDeviceType
}