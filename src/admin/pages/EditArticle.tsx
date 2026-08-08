import { useLocation, useParams, useNavigate } from 'react-router-dom';
import ArticleEditor from '../components/ArticleEditor';
import { adminArticleApi, CreateArticlePayload, AdminArticle } from '../services/adminArticleApi';

export default function EditArticle() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const article = location.state?.article as AdminArticle | undefined;

  if (!article) {
    return (
      <div className="admin-blank-slate" style={{ marginTop: '40px' }}>
        <h3>Article Data Lost</h3>
        <p>The editor lost context of the article you were trying to edit.</p>
        <button 
          className="admin-btn admin-btn-primary" 
          onClick={() => navigate('/admin/articles')}
          style={{ marginTop: '16px' }}
        >
          Return to Articles
        </button>
      </div>
    );
  }

  const handleSave = async (payload: Partial<CreateArticlePayload>, isPublish: boolean) => {
    if (!id) throw new Error("Missing article ID");
    await adminArticleApi.updateArticle(id, payload);
    
    // Not forcefully redirecting on update so they can continue editing, 
    // unless they explicitly want to go back.
  };

  return <ArticleEditor mode="edit" initialData={article} onSave={handleSave} />;
}
