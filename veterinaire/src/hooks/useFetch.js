import { useState, useEffect } from 'react';
import { useAlert } from '../contexts/AlertContext';

const useFetch = (apiCall, params = null) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { showAlert } = useAlert();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await apiCall(params);
        setData(response.data);
      } catch (err) {
        setError(err);
        showAlert('Erreur de chargement des données', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiCall, params, showAlert]);

  return { data, loading, error };
};

export default useFetch;