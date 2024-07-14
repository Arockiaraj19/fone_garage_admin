import { db } from '@/helper/firebase';
import { collection, query, where, getDocs, startAfter, limit, addDoc,updateDoc,doc, deleteDoc  } from 'firebase/firestore';
const addBrand = async (brandData) => {
  try {
    const docRef = await addDoc(collection(db, 'brands'), brandData);
    console.log('Brand added with ID: ', docRef.id);
    return docRef.id;
  } catch (e) {
    console.error('Error adding brand: ', e);
    throw new Error('Failed to add brand');
  }
};

const fetchBrands = async (typeId) => {
  try {
    let brandsQuery = collection(db, 'brands');
    brandsQuery = query(brandsQuery, where('typeId', '==',typeId));
    const querySnapshot = await getDocs(brandsQuery);

    const brands = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return brands;
  } catch (e) {
    console.error('Error fetching brands: ', e);
    throw new Error('Failed to fetch brands');
  }
};

const updateBrand = async (brandId, newData) => {
  try {
    const brandRef = doc(db, 'brands', brandId);
    await updateDoc(brandRef, newData);
    console.log('Brand updated successfully');
  } catch (e) {
    console.error('Error updating brand: ', e);
    throw new Error('Failed to update brand');
  }
};


const deleteBrand = async (brandId) => {
  try {
    const brandRef = doc(db, 'brands', brandId);
    await deleteDoc(brandRef);
    console.log('Brand deleted successfully');
  } catch (e) {
    console.error('Error deleting brand: ', e);
    throw new Error('Failed to delete brand');
  }
};


export {
  deleteBrand ,updateBrand,fetchBrands,addBrand
}