import { useState, useEffect } from 'react';
import {Owner} from "../repositories/TrustAPI";
import {getOwnerById} from "../repositories/services/querries";

const useOwnerById = (userId: string): Owner | null => {
  const [user, setUser] = useState<Owner | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getOwnerById(userId);
        if (response?.data?.data?.user) {
          setUser(response.data.data.user);
        }
      } catch (err: any) {
        // eslint-disable-next-line no-console
        console.error(err);
      }
    };
    fetchData();
  }, [userId]);

  return user;
};

export default useOwnerById;
