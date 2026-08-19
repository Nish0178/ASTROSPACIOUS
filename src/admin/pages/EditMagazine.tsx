import { useLocation, useNavigate, useParams } from 'react-router-dom';
import MagazineEditor from '../components/MagazineEditor';
import { adminMagazineApi, CreateMagazinePayload } from '../services/adminMagazineApi';
import { useEffect, useState } from 'react';

export default function EditMagazine() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  // If we navigated from the list, we might have passed the magazine in state
  const [magazine, setMagazine] = useState<any>(location.state?.magazine || null);

  useEffect(() => {
    if (!magazine && id) {
      // If no state was passed, we'd theoretically fetch it.
      // For now, we assume we have it via state since the list passes it.
      // If we wanted to fetch by ID, we'd need a getMagazineById in adminMagazineApi.
      // But the current API design mostly uses list. 
      // A fallback could be implemented if necessary.
    }
  }, [id, magazine]);

  const handleSave = async (payload: Partial<CreateMagazinePayload>, isPublish: boolean) => {
    if (!id) return;
    await adminMagazineApi.updateMagazine(id, payload);
    
    if (isPublish) {
      setTimeout(() => {
        navigate('/admin/magazines');
      }, 1500);
    }
  };

  if (!magazine) return <div style={{ color: 'white', padding: '40px' }}>Loading or Magazine not found...</div>;

  return <MagazineEditor mode="edit" initialData={magazine} onSave={handleSave} />;
}
