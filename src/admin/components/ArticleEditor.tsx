import { useState, useEffect, useRef } from 'react';
import { adminArticleApi, AdminArticle, CreateArticlePayload } from '../services/adminArticleApi';
import { Save, Eye, Send, Image as ImageIcon, X, CheckCircle, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ArticleEditorProps {
  initialData?: AdminArticle | null;
  mode: 'create' | 'edit';
  onSave: (data: Partial<CreateArticlePayload>, isPublish: boolean) => Promise<void>;
}

export default function ArticleEditor({ initialData, mode, onSave }: ArticleEditorProps) {
  const navigate = useNavigate();

  const [title, setTitle] = useState(initialData?.title || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [isSlugEdited, setIsSlugEdited] = useState(!!initialData?.slug);
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [coverImage, setCoverImage] = useState(initialData?.coverImage || '');
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  
  const [categoryId, setCategoryId] = useState(initialData?.category?.id || '');
  const [authorId, setAuthorId] = useState(initialData?.author?.id || '');
  const [categories, setCategories] = useState<{id: string, name: string}[]>([]);
  const [authors, setAuthors] = useState<{id: string, name: string}[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  
  const [tagsInput, setTagsInput] = useState('');
  // @ts-ignore
  const [tags, setTags] = useState<string[]>(initialData?.tags || []);
  const [featured, setFeatured] = useState(initialData?.featured || false);
  const [status, setStatus] = useState<"Draft" | "Published" | "Archived">(initialData?.status || "Draft");

  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);

  useEffect(() => {
    const fetchData = async () => {
  try {
    const [cats, auths] = await Promise.all([
      adminArticleApi.getCategories(),
      adminArticleApi.getAuthors()
    ]);

    console.log("Categories API:", cats);
    console.log("Authors API:", auths);

    setCategories(cats);
    setAuthors(auths);

    if (mode === "create") {
      console.log("First Category:", cats[0]);
      console.log("First Author:", auths[0]);

      if (cats.length > 0) {
        setCategoryId(cats[0].id);
        console.log("Setting categoryId:", cats[0].id);
      }

      if (auths.length > 0) {
        setAuthorId(auths[0].id);
        console.log("Setting authorId:", auths[0].id);
      }
    }
  } catch (err) {
    console.error(err);
  } finally {
    setLoadingData(false);
  }
};

fetchData();
  }, [mode, initialData]);

  // Auto-generate slug
  useEffect(() => {
    if (!isSlugEdited && mode === 'create') {
      const generated = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
      setSlug(generated);
    }
  }, [title, isSlugEdited, mode]);

  useEffect(() => {
    setIsDirty(true);
  }, [title, slug, excerpt, content, coverImage, categoryId, authorId, tags, featured]);

  // Auto-Save Logic (every 30 seconds if form is dirty)
  useEffect(() => {
    if (!title || !excerpt || !content || !isDirty) return; 
    
    const interval = setInterval(() => {
      handleSaveSubmit(true);
    }, 30000);

    return () => clearInterval(interval);
  }, [title, slug, excerpt, content, coverImage, categoryId, authorId, tags, featured, status, isDirty]);

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagsInput.trim()) {
      e.preventDefault();
      if (tags.length >= 10) {
        setError("Maximum of 10 tags allowed.");
        return;
      }
      if (!tags.includes(tagsInput.trim())) {
        setTags([...tags, tagsInput.trim()]);
      }
      setTagsInput('');
      setError(null);
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCoverImageFile(file);
      setCoverImage(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setCoverImage('');
    setCoverImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSlugManualEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSlugEdited(true);
    setSlug(e.target.value);
  };

  const handleSaveSubmit = async (
    isAutoSave = false,
    overrideStatus?: "Draft" | "Published"
  ) => {
    try {
      console.log("STEP 1: Function entered");
      
      console.log("--- DEBUG VALUES ---");
      console.log("title:", title);
      console.log("title.length:", title?.length);
      console.log("slug:", slug);
      console.log("excerpt.length:", excerpt?.length);
      console.log("content.length:", content?.length);
      console.log("categoryId:", categoryId);
      console.log("authorId:", authorId);
      console.log("overrideStatus:", overrideStatus);
      console.log("status:", status);
      console.log("--------------------");

      // Validation
      if (!title || title.length < 10 || title.length > 200) {
        console.log("Validation Failed: Title length is < 10 or > 200");
        if (!isAutoSave) setError("Title must be between 10 and 200 characters.");
        return;
      }

      if (!slug) {
        console.log("Validation Failed: Slug is empty");
        if (!isAutoSave) setError("Slug is required.");
        return;
      }

      if (!excerpt || excerpt.length > 300) {
        console.log("Validation Failed: Excerpt is empty or > 300 characters");
        if (!isAutoSave) setError("Excerpt is required and must be under 300 characters.");
        return;
      }

      if (!content || content.length < 100) {
        console.log("Validation Failed: Content length < 100");
        if (!isAutoSave) setError("Content must be at least 100 characters.");
        return;
      }

      if (!categoryId) {
        console.log("Validation Failed: Category is empty");
        if (!isAutoSave) setError("Category is required.");
        return;
      }

      if (!authorId) {
        console.log("Validation Failed: Author is empty");
        if (!isAutoSave) setError("Author is required.");
        return;
      }

      console.log("STEP 2: Validation passed");

      setIsSaving(true);
      setError(null);
      setSuccess(null);

      let finalImageUrl = coverImage;

      console.log("STEP 3: Image upload");

      if (coverImageFile && !coverImage.startsWith("http")) {
        const { publicUrl } = await adminArticleApi.uploadImage(coverImageFile);
        finalImageUrl = publicUrl;
        setCoverImage(publicUrl);
        setCoverImageFile(null);
      }

      const payload = {
        title,
        slug,
        excerpt,
        content,
        coverImage: finalImageUrl || undefined,
        tags,
        featured,
        status: overrideStatus || status,
        categoryId,
        authorId
      };

      console.log("STEP 4: Payload created");
      console.log(payload);

      console.log("STEP 5: Calling onSave");

      await onSave(payload, !!overrideStatus);

      console.log("STEP 6: API success");

      setLastSaved(new Date());
      setIsDirty(false); // Reset dirty flag
      if (overrideStatus) setStatus(overrideStatus);

      if (!isAutoSave) {
        const msg = overrideStatus === "Published" ? "Article published successfully." : "Article saved successfully.";
        setSuccess(msg);
        
        // Hide success message after 3 seconds
        setTimeout(() => {
          setSuccess(null);
        }, 3000);
      }

      console.log("STEP 7: Finished");

    } catch (error: any) {
      console.error("SAVE ERROR");
      console.error(error);
      if (error) {
        console.error("error.response:", error.response);
        console.error("error.message:", error.message);
        console.error("error.stack:", error.stack);
      }
      setError(error.message || "Failed to save article");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="admin-editor-layout">
      {/* Top Bar */}
      <div className="admin-editor-header">
        <div>
          <h1 className="admin-page-title">{mode === 'create' ? 'Create New Article' : 'Edit Article'}</h1>
          <div className="admin-editor-status">
            {isSaving ? (
              <><Loader2 size={14} className="lucide-spin" /> Saving...</>
            ) : lastSaved ? (
              <><CheckCircle size={14} color="#10b981" /> Last saved {lastSaved.toLocaleTimeString()}</>
            ) : (
              "Not saved yet"
            )}
          </div>
        </div>
        <div className="admin-editor-actions">
          <button className="admin-btn admin-btn-outline" onClick={() => navigate('/admin/articles')} disabled={isSaving}>Cancel</button>
          {initialData?.slug && (
            <a href={`/articles/${initialData.slug}`} target="_blank" rel="noreferrer" className="admin-btn admin-btn-outline">
              <Eye size={16} /> Preview
            </a>
          )}
          <button className="admin-btn admin-btn-outline" onClick={() => handleSaveSubmit(false, "Draft")} disabled={isSaving}>
            <Save size={16} /> Save Draft
          </button>
          <button
  className="admin-btn admin-btn-primary"
  onClick={() => {
      console.log(handleSaveSubmit);

    handleSaveSubmit(false, "Published")
      .then(() => console.log("DONE"))
      .catch((err) => console.error("ERROR", err));
  }}
  disabled={isSaving}
>
  <Send size={16} />
  {mode === "create" ? "Publish" : "Update Article"}
</button>
        </div>
      </div>

      <div className="admin-editor-grid">
        {/* Main Column */}
        <div className="admin-editor-main">
          <input 
            type="text" 
            className="admin-editor-title-input" 
            placeholder="Article Title (10-200 characters)..." 
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px', gap: '8px' }}>
            <span style={{ fontSize: '13px', color: '#94a3b8', whiteSpace: 'nowrap' }}>Slug:</span>
            <input 
              type="text" 
              className="admin-input" 
              style={{ padding: '4px 8px', fontSize: '13px', height: 'auto', flex: 1 }}
              placeholder="article-slug"
              value={slug}
              onChange={handleSlugManualEdit}
            />
          </div>
          
          <div style={{ position: 'relative' }}>
            <textarea 
              className="admin-editor-excerpt-input"
              placeholder="Write a short, engaging excerpt (max 300 characters)..."
              rows={3}
              value={excerpt}
              onChange={e => setExcerpt(e.target.value)}
            />
            <div style={{ position: 'absolute', bottom: '12px', right: '12px', fontSize: '12px', color: excerpt.length > 300 ? '#ef4444' : '#64748b' }}>
              {excerpt.length} / 300
            </div>
          </div>

          {/* Simple Rich Text Toolbar Simulation */}
          <div className="admin-editor-toolbar">
            <button title="Heading 1">H1</button>
            <button title="Heading 2">H2</button>
            <div className="toolbar-divider" />
            <button style={{ fontWeight: 'bold' }} title="Bold">B</button>
            <button style={{ fontStyle: 'italic' }} title="Italic">I</button>
            <button style={{ textDecoration: 'underline' }} title="Underline">U</button>
            <div className="toolbar-divider" />
            <button title="Bullet List">• List</button>
            <button title="Numbered List">1. List</button>
            <button title="Quote">"</button>
            <button title="Code">{"</>"}</button>
            <div className="toolbar-divider" />
            <button title="Link">Link</button>
            <button title="Image">Img</button>
          </div>

          <textarea 
            className="admin-editor-content-input"
            placeholder="Start writing your article (min 100 characters)..."
            value={content}
            onChange={e => setContent(e.target.value)}
          />
          {error && <div style={{ color: '#ef4444', fontSize: '14px', marginTop: '12px', padding: '12px', backgroundColor: 'rgba(239, 68, 68, 0.1)', borderRadius: '6px' }}>{error}</div>}
        </div>

        {/* Sidebar Column */}
        <div className="admin-editor-sidebar">
          {/* Cover Image */}
          <div className="admin-panel">
            <h3 className="admin-panel-title">Cover Image</h3>
            {coverImage ? (
              <div className="admin-image-preview">
                <img src={coverImage} alt="Cover Preview" />
                <button className="admin-image-remove" onClick={removeImage}><X size={16} /></button>
              </div>
            ) : (
              <div className="admin-image-upload" onClick={() => fileInputRef.current?.click()}>
                <ImageIcon size={32} color="#94a3b8" />
                <p>Click to upload image</p>
                <span>Recommended: 1200x630px</span>
              </div>
            )}
            <input 
              type="file" 
              ref={fileInputRef} 
              style={{ display: 'none' }} 
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          {/* Organization */}
          <div className="admin-panel">
            <h3 className="admin-panel-title">Organization</h3>
            
            <div className="admin-form-group">
              <label>Category</label>
              {loadingData ? (
                <div style={{ fontSize: '14px', color: '#94a3b8' }}>Loading categories...</div>
              ) : categories.length === 0 ? (
                <div style={{ fontSize: '14px', color: '#ef4444' }}>No categories available.</div>
              ) : (
                <select 
                  className="admin-select"
                  value={categoryId}
                  onChange={e => setCategoryId(e.target.value)}
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              )}
            </div>

            <div className="admin-form-group">
              <label>Author</label>
              {loadingData ? (
                <div style={{ fontSize: '14px', color: '#94a3b8' }}>Loading authors...</div>
              ) : authors.length === 0 ? (
                <div style={{ fontSize: '14px', color: '#ef4444' }}>No authors available.</div>
              ) : (
                <select 
                  className="admin-select"
                  value={authorId}
                  onChange={e => setAuthorId(e.target.value)}
                >
                  {authors.map(author => (
                    <option key={author.id} value={author.id}>{author.name}</option>
                  ))}
                </select>
              )}
            </div>

            <div className="admin-form-group">
              <label>Tags ({tags.length}/10)</label>
              <div className="admin-tags-container">
                {tags.map(tag => (
                  <span key={tag} className="admin-tag">
                    {tag} <X size={12} onClick={() => removeTag(tag)} style={{ cursor: 'pointer' }} />
                  </span>
                ))}
                {tags.length < 10 && (
                  <input 
                    type="text" 
                    className="admin-tags-input" 
                    placeholder="Add tag + Enter" 
                    value={tagsInput}
                    onChange={e => setTagsInput(e.target.value)}
                    onKeyDown={handleAddTag}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Settings */}
          <div className="admin-panel">
            <h3 className="admin-panel-title">Settings</h3>
            <label className="admin-checkbox-label">
              <input 
                type="checkbox" 
                checked={featured} 
                onChange={e => setFeatured(e.target.checked)} 
              />
              <span className="checkmark"></span>
              Featured Article
            </label>
          </div>
        </div>
      </div>
      
      {/* Toast Notification */}
      {success && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          backgroundColor: '#10b981',
          color: 'white',
          padding: '16px 24px',
          borderRadius: '8px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          zIndex: 9999,
          animation: 'slideUp 0.3s ease-out forwards'
        }}>
          <CheckCircle size={20} />
          <span style={{ fontWeight: 500 }}>{success}</span>
        </div>
      )}

      <style>{`
        .lucide-spin { animation: lucide-spin 2s linear infinite; }
        @keyframes lucide-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
