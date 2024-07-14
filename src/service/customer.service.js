import { db } from '@/helper/firebase';
import { collection, query, where, getDocs, startAfter, limit, addDoc,updateDoc,doc, deleteDoc  } from 'firebase/firestore';
// Adding a customer


const addCustomer = async (customerData) => {
    try {
      const docRef = await addDoc(collection(db, 'customers'), customerData);
      console.log('Customer added with ID: ', docRef.id);
      return docRef.id;
    } catch (e) {
      console.error('Error adding customer: ', e);
      throw new Error('Failed to add customer');
    }
  };

  // Fetching customers with pagination and filters
const fetchCustomers = async (pageSize, startAfterDoc = null, filters = {}) => {
    try {
      let customersQuery = collection(db, 'customers');
      
      // Applying filters if provided
      if (filters.status) {
        customersQuery = query(customersQuery, where('status', '==', filters.status));
      }
      
      // Setting pagination
      if (startAfterDoc) {
        customersQuery = query(customersQuery, startAfter(startAfterDoc));
      }
      
      customersQuery = query(customersQuery, limit(pageSize));
      
      const querySnapshot = await getDocs(customersQuery);
      
      const customers = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
  
      return { customers, lastVisible: querySnapshot.docs[querySnapshot.docs.length - 1] };
    } catch (e) {
      console.error('Error fetching customers: ', e);
      throw new Error('Failed to fetch customers');
    }
  };


  // Updating a customer
const updateCustomer = async (customerId, newData) => {
    try {
      const customerRef = doc(db, 'customers', customerId);
      await updateDoc(customerRef, newData);
      console.log('Customer updated successfully');
    } catch (e) {
      console.error('Error updating customer: ', e);
      throw new Error('Failed to update customer');
    }
  };


  const deleteCustomer = async (customerId) => {
    try {
      const customerRef = doc(db, 'customers', customerId);
      await deleteDoc(customerRef);
      console.log('Customer deleted successfully');
    } catch (e) {
      console.error('Error deleting customer: ', e);
      throw new Error('Failed to delete customer');
    }
  };