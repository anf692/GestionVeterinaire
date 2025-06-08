import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getOwner } from '../services/ownerService';
import OwnerDetail from '../components/owners/OwnerDetail';

export default function OwnerDetailPage() {
  const { id } = useParams();
  const [owner, setOwner] = useState(null);

  useEffect(() => {
    const fetchOwner = async () => {
      try {
        const response = await getOwner(id);
        setOwner(response.data);
      } catch (error) {
        console.error("Erreur de chargement du propriétaire :", error);
      }
    };
    fetchOwner();
  }, [id]);

  return (
    <div className="page-container">
      <OwnerDetail owner={owner} />
    </div>
  );
}
