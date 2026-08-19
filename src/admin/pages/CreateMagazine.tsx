import MagazineEditor from '../components/MagazineEditor';
import { adminMagazineApi, CreateMagazinePayload } from '../services/adminMagazineApi';
import { useNavigate } from 'react-router-dom';

export default function CreateMagazine() {
  const navigate = useNavigate();

  const handleSave = async (payload: Partial<CreateMagazinePayload>, isPublish: boolean) => {
    await adminMagazineApi.createMagazine(payload as CreateMagazinePayload);
    
    if (isPublish) {
      setTimeout(() => {
        navigate('/admin/magazines');
      }, 1500);
    }
  };

  return <MagazineEditor mode="create" onSave={handleSave} />;
}
