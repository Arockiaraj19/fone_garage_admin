import { db } from '@/helper/firebase';
import { collection, query, where, getDocs, startAfter, limit, addDoc,updateDoc,doc, deleteDoc  } from 'firebase/firestore';


const fetchOrders = async () => {
    try {
    let brandModelsQuery = collection(db, 'orders');
    
      const querySnapshot = await getDocs(brandModelsQuery);
  
      const brandModels = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
  
      return brandModels;
    } catch (e) {
      console.error('Error fetching brand models: ', e);
      throw new Error('Failed to fetch brand models');
    }
  };

  const fetchContacts = async () => {
    try {
    let brandModelsQuery = collection(db, 'contacts');
    
      const querySnapshot = await getDocs(brandModelsQuery);
  
      const brandModels = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
  
      return brandModels;
    } catch (e) {
      console.error('Error fetching brand models: ', e);
      throw new Error('Failed to fetch brand models');
    }
  };

  const updateOrder = async (brandModelSizeId, newData) => {
    try {
      const brandModelSizeRef = doc(db, 'orders', brandModelSizeId);
      await updateDoc(brandModelSizeRef, newData);
      console.log('Brand model size updated successfully');
    } catch (e) {
      console.error('Error updating brand model size: ', e);
      throw new Error('Failed to update brand model size');
    }
  };
  const updateContacts = async (brandModelSizeId, newData) => {
    try {
      const brandModelSizeRef = doc(db, 'contacts', brandModelSizeId);
      await updateDoc(brandModelSizeRef, newData);
      console.log('Brand model size updated successfully');
    } catch (e) {
      console.error('Error updating brand model size: ', e);
      throw new Error('Failed to update brand model size');
    }
  };
  
  
  export{
    fetchOrders,fetchContacts,updateOrder,updateContacts
  }