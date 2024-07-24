"use client"
import { axiosPrivate } from '@/helper/axiosPrivate';
import { baseUrl } from '@/helper/constants';

import { useState, useEffect } from 'react';

export default function useApi(url: string, method: string = 'GET', body: any = null) {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const result = await axiosPrivate.get(baseUrl + url);
                setData(result.data??[]);
            } catch (error: any) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();

        // Cleanup function
        return () => { };
    }, [url, method, body]);

    return {setData, data, loading, error };
}
