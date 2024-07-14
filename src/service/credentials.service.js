import { db } from '@/helper/firebase';
import { collection, query, where, getDocs, startAfter, limit, addDoc,updateDoc,doc, deleteDoc ,serverTimestamp } from 'firebase/firestore';



import bcrypt from 'bcryptjs';

// Adding credentials
const addCredentials = async (mobile, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);  // Hash the password
    const docRef = await addDoc(collection(db, 'credentials'), {
      mobile: mobile,
      password: hashedPassword,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    console.log('Credentials added with ID: ', docRef.id);
    return docRef.id;
  } catch (e) {
    console.error('Error adding credentials: ', e);
    throw new Error('Failed to add credentials');
  }
};





// Deleting credentials
const deleteCredentials = async (credentialId) => {
  try {
    const credentialRef = doc(db, 'credentials', credentialId);
    await deleteDoc(credentialRef);
    console.log('Credentials deleted successfully');
  } catch (e) {
    console.error('Error deleting credentials: ', e);
    throw new Error('Failed to delete credentials');
  }
};

const fetchCredentials = async () => {
  try {
    const countriesQuery = collection(db, 'credentials');
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


// Updating credentials
const updateCredentials = async (credentialId, newPassword) => {
  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);  // Hash the new password
    const credentialRef = doc(db, 'credentials', credentialId);
    await updateDoc(credentialRef, { password: hashedPassword, updatedAt: serverTimestamp() });
    console.log('Credentials updated successfully');
  } catch (e) {
    console.error('Error updating credentials: ', e);
    throw new Error('Failed to update credentials');
  }
};


const signIn = async (mobile, password) => {
  try {
    // Query Firestore for the credentials with the given mobile number
    const credentialsQuery = query(collection(db, 'credentials'), where('mobile', '==', mobile));
    const querySnapshot = await getDocs(credentialsQuery);

    // If no credentials found, return an error
    if (querySnapshot.empty) {
      throw new Error('Invalid mobile number or password');
    }

    // Get the first matching document (there should be only one)
    const credentialDoc = querySnapshot.docs[0];
    const credentialData = credentialDoc.data();

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, credentialData.password);
    if (!isPasswordValid) {
      throw new Error('Invalid mobile number or password');
    }

    // If password is valid, return the user data (excluding the password)
    return {
      id: credentialDoc.id,
      mobile: credentialData.mobile,
    };
  } catch (e) {
    console.error('Error signing in: ', e);
    throw new Error('Failed to sign in');
  }
};

export {
  addCredentials,signIn,deleteCredentials,updateCredentials,fetchCredentials
}