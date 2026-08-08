import ArticleEditor from '../components/ArticleEditor';
import { adminArticleApi, CreateArticlePayload } from '../services/adminArticleApi';
import { useNavigate } from 'react-router-dom';

export default function CreateArticle() {
  const navigate = useNavigate();

  const handleSave = async (payload: Partial<CreateArticlePayload>, isPublish: boolean) => {
    // createArticle strictly requires categoryId and authorId. 
    // They are validated in ArticleEditor before calling this, but we force type cast here.
    await adminArticleApi.createArticle(payload as CreateArticlePayload);
    
    if (isPublish) {
      setTimeout(() => {
        navigate('/admin/articles');
      }, 1500);
    }
  };

  return <ArticleEditor mode="create" onSave={handleSave} />;
}
