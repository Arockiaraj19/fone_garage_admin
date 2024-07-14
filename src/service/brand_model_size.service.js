import { db } from '@/helper/firebase';
import { collection, query, where, getDocs, startAfter, limit, addDoc,updateDoc,doc, deleteDoc  } from 'firebase/firestore';
// Adding a brand model size
const addBrandModelSize = async (brandModelSizeData) => {
  try {
    const docRef = await addDoc(collection(db, 'brandModelSizes'), brandModelSizeData);
    console.log('Brand model size added with ID: ', docRef.id);
    return docRef.id;
  } catch (e) {
    console.error('Error adding brand model size: ', e);
    throw new Error('Failed to add brand model size');
  }
};

const fetchBrandModelSizes = async (id) => {
  try {
   let brandModelSizesQuery = collection(db, 'brandModelSizes');
    brandModelSizesQuery= query(brandModelSizesQuery, where('brandModelId', '==',id));
    const querySnapshot = await getDocs(brandModelSizesQuery);

    const brandModelSizes = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return brandModelSizes;
  } catch (e) {
    console.error('Error fetching brand model sizes: ', e);
    throw new Error('Failed to fetch brand model sizes');
  }
};

const updateBrandModelSize = async (brandModelSizeId, newData) => {
  try {
    const brandModelSizeRef = doc(db, 'brandModelSizes', brandModelSizeId);
    await updateDoc(brandModelSizeRef, newData);
    console.log('Brand model size updated successfully');
  } catch (e) {
    console.error('Error updating brand model size: ', e);
    throw new Error('Failed to update brand model size');
  }
};

const deleteBrandModelSize = async (brandModelSizeId) => {
  try {
    const brandModelSizeRef = doc(db, 'brandModelSizes', brandModelSizeId);
    await deleteDoc(brandModelSizeRef);
    console.log('Brand model size deleted successfully');
  } catch (e) {
    console.error('Error deleting brand model size: ', e);
    throw new Error('Failed to delete brand model size');
  }
};

export {
  addBrandModelSize,fetchBrandModelSizes,updateBrandModelSize,deleteBrandModelSize
}