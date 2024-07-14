import { db } from '@/helper/firebase';
import { collection, query, where, getDocs, startAfter, limit, addDoc,updateDoc,doc, deleteDoc  } from 'firebase/firestore';
// Adding a brand model
const addBrandModel = async (brandModelData) => {
  try {
    const docRef = await addDoc(collection(db, 'brandModels'), brandModelData);
    console.log('Brand model added with ID: ', docRef.id);
    return docRef.id;
  } catch (e) {
    console.error('Error adding brand model: ', e);
    throw new Error('Failed to add brand model');
  }
};


// Fetching brand models
const fetchBrandModels = async (id) => {
  try {
  let brandModelsQuery = collection(db, 'brandModels');
    brandModelsQuery = query(brandModelsQuery, where('brandId', '==',id));
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

const updateBrandModel = async (brandModelId, newData) => {
  try {
    const brandModelRef = doc(db, 'brandModels', brandModelId);
    await updateDoc(brandModelRef, newData);
    console.log('Brand model updated successfully');
  } catch (e) {
    console.error('Error updating brand model: ', e);
    throw new Error('Failed to update brand model');
  }
};


const deleteBrandModel = async (brandModelId) => {
  try {
    const brandModelRef = doc(db, 'brandModels', brandModelId);
    await deleteDoc(brandModelRef);
    console.log('Brand model deleted successfully');
  } catch (e) {
    console.error('Error deleting brand model: ', e);
    throw new Error('Failed to delete brand model');
  }
};

export {deleteBrandModel,updateBrandModel,fetchBrandModels,addBrandModel}