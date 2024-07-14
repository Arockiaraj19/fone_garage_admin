// hooks/useUserData.js
import { useEffect, useState } from 'react';


const useUserData = () => {
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Check if user data exists in local storage
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
          console.log("what is the user result");
          console.log(JSON.parse(storedUserData));
          setUserData(JSON.parse(storedUserData));
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setIsLoading(false);
      }
    };

    fetchUserData();

  }, []);

  return { userData, isLoading };
};

export default useUserData;
