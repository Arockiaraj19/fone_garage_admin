import { db } from '@/helper/firebase';
import { collection, query, where, getDocs, startAfter, limit, addDoc,updateDoc,doc, deleteDoc  } from 'firebase/firestore';


// Adding a device
const addDevice = async (deviceData) => {
  try {
    const docRef = await addDoc(collection(db, 'devices'), deviceData);
    console.log('Device added with ID: ', docRef.id);
    return docRef.id;
  } catch (e) {
    console.error('Error adding device: ', e);
    throw new Error('Failed to add device');
  }
};

const fetchDevices = async () => {
  try {
    const devicesQuery = collection(db, 'devices');
    const querySnapshot = await getDocs(devicesQuery);

    const devices = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return devices;
  } catch (e) {
    console.error('Error fetching devices: ', e);
    throw new Error('Failed to fetch devices');
  }
};



const updateDevice = async (deviceId, newData) => {
  try {
    const deviceRef = doc(db, 'devices', deviceId);
    await updateDoc(deviceRef, newData);
    console.log('Device updated successfully');
  } catch (e) {
    console.error('Error updating device: ', e);
    throw new Error('Failed to update device');
  }
};


const deleteDevice = async (deviceId) => {
  try {
    const deviceRef = doc(db, 'devices', deviceId);
    await deleteDoc(deviceRef);
    console.log('Device deleted successfully');
  } catch (e) {
    console.error('Error deleting device: ', e);
    throw new Error('Failed to delete device');
  }
};