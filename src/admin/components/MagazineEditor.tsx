import { useState, useRef } from 'react';
import { adminMagazineApi, AdminMagazine, CreateMagazinePayload } from '../services/adminMagazineApi';
import { Save, Eye, Send, Image as ImageIcon, X, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface MagazineEditorProps {
  initialData?: AdminMagazine | null;
  mode: 'create' | 'edit';
  onSave: (data: Partial<CreateMagazinePayload>, isPublish: boolean) => Promise<void>;
}

export default function MagazineEditor({ initialData, mode, onSave }: MagazineEditorProps) {
  const navigate = useNavigate();

  const [title, setTitle] = useState(initialData?.title || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [isSlugEdited, setIsSlugEdited] = useState(!!initialData?.slug);
  const [description, setDescription] = useState(initialData?.description || '');
  const [volume, setVolume] = useState(initialData?.volume || '');
  const [issueNumber, setIssueNumber] = useState(initialData?.issueNumber || '');
  const [pdfUrl, setPdfUrl] = useState(initialData?.pdfUrl || '');
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [isUploadingPdf, setIsUploadingPdf] = useState(false);
  
  const [coverImage, setCoverImage] = useState(initialData?.coverImage || '');
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  
  const [tagsInput, setTagsInput] = useState('');
  const [tags, setTags] = useState<string[]>(initialData?.tags || []);
  const [featured, setFeatured] = useState(initialData?.featured || false);
  const [status, setStatus] = useState<"Draft" | "Published" | "Archived">(initialData?.status || "Draft");

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSlugManualEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSlugEdited(true);
    setSlug(e.target.value);
  };

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

  const handleSaveSubmit = async (overrideStatus?: "Draft" | "Published") => {
    try {
      if (!title || title.length < 3) {
        setError("Title must be at least 3 characters.");
        return;
      }

      if (!description || description.length < 10) {
        setError("Description must be at least 10 characters.");
        return;
      }

      setIsSaving(true);
      setError(null);

      let finalImageUrl = coverImage;
      let finalPdfUrl = pdfUrl;

      if (coverImageFile && !coverImage.startsWith("http")) {
        const { publicUrl } = await adminMagazineApi.uploadImage(coverImageFile);
        finalImageUrl = publicUrl;
        setCoverImage(publicUrl);
        setCoverImageFile(null);
      }

      const payload: Partial<CreateMagazinePayload> = {
        title,
        slug: isSlugEdited ? slug : undefined,
        description,
        volume: volume || undefined,
        issueNumber: issueNumber || undefined,
        pdfUrl: finalPdfUrl || undefined,
        coverImage: finalImageUrl || undefined,
        tags,
        featured,
        status: overrideStatus || status,
      };

      await onSave(payload, !!overrideStatus);

      if (overrideStatus) {
        setStatus(overrideStatus);
      }
    } catch (err: any) {
      setError(err.message || "Failed to save magazine.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="admin-editor-layout">
      {/* Top Bar */}
      <div className="admin-editor-header">
        <div>
          <h1 className="admin-page-title">{mode === 'create' ? 'Create New Magazine' : 'Edit Magazine'}</h1>
        </div>
        <div className="admin-editor-actions">
          <button className="admin-btn admin-btn-outline" onClick={() => navigate('/admin/magazines')} disabled={isSaving}>Cancel</button>
          {initialData?.slug && (
            <a href={`/magazines/${initialData.slug}`} target="_blank" rel="noreferrer" className="admin-btn admin-btn-outline">
              <Eye size={16} /> Preview
            </a>
          )}
          <button className="admin-btn admin-btn-outline" onClick={() => handleSaveSubmit("Draft")} disabled={isSaving}>
            <Save size={16} /> Save Draft
          </button>
          <button
            className="admin-btn admin-btn-primary"
            onClick={() => handleSaveSubmit("Published")}
            disabled={isSaving}
          >
            {isSaving ? <Loader2 size={16} className="lucide-spin" /> : <Send size={16} />}
            {mode === "create" ? "Publish" : "Update Magazine"}
          </button>
        </div>
      </div>

      <div className="admin-editor-grid">
        {/* Main Column */}
        <div className="admin-editor-main">
          <div className="admin-form-group">
            <label>Magazine Title</label>
            <input 
              type="text" 
              className="admin-input" 
              placeholder="e.g. ASTRO Monthly - August 2026" 
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>

          <div className="admin-form-group" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '13px', color: '#94a3b8', whiteSpace: 'nowrap' }}>Slug (Optional):</span>
            <input 
              type="text" 
              className="admin-input" 
              style={{ padding: '4px 8px', fontSize: '13px', height: 'auto', flex: 1 }}
              placeholder="auto-generated-if-empty"
              value={slug}
              onChange={handleSlugManualEdit}
            />
          </div>
          
          <div className="admin-form-group">
            <label>Description</label>
            <textarea 
              className="admin-input"
              placeholder="Write a compelling description for this magazine issue..."
              rows={5}
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="admin-form-group">
              <label>Volume (Optional)</label>
              <input 
                type="text" 
                className="admin-input" 
                placeholder="e.g. 1" 
                value={volume}
                onChange={e => setVolume(e.target.value)}
              />
            </div>
            <div className="admin-form-group">
              <label>Issue Number (Optional)</label>
              <input 
                type="text" 
                className="admin-input" 
                placeholder="e.g. 8" 
                value={issueNumber}
                onChange={e => setIssueNumber(e.target.value)}
              />
            </div>
          </div>

          <div className="admin-form-group">
            <label>Magazine PDF</label>
            <div style={{ borderTop: '1px solid #334155', paddingTop: '16px', marginTop: '4px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                
                {/* Upload Section */}
                <div 
                  className="admin-pdf-upload-box" 
                  style={{ 
                    border: '2px dashed #334155', 
                    borderRadius: '8px', 
                    padding: '24px', 
                    textAlign: 'center',
                    cursor: 'pointer',
                    backgroundColor: 'rgba(51, 65, 85, 0.1)',
                    transition: 'all 0.2s ease'
                  }}
                  onClick={() => !isUploadingPdf && document.getElementById('pdf-upload-immediate')?.click()}
                >
                  {isUploadingPdf ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                      <Loader2 size={24} className="lucide-spin" color="#10b981" />
                      <span style={{ color: '#10b981', fontWeight: 500 }}>Uploading...</span>
                    </div>
                  ) : pdfUrl && pdfFile ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                      <div style={{ color: '#10b981', fontWeight: 500 }}>PDF uploaded successfully</div>
                      <div style={{ fontSize: '13px', color: '#94a3b8' }}>Selected: {pdfFile.name}</div>
                      <button 
                        className="admin-btn admin-btn-outline" 
                        style={{ marginTop: '8px', padding: '4px 12px', fontSize: '13px' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          document.getElementById('pdf-upload-immediate')?.click();
                        }}
                      >
                        Replace PDF
                      </button>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                      <button 
                        className="admin-btn admin-btn-outline" 
                        style={{ pointerEvents: 'none' }}
                      >
                        Upload PDF
                      </button>
                      <span style={{ fontSize: '13px', color: '#94a3b8' }}>Click to choose a PDF file (Max 50MB)</span>
                    </div>
                  )}
                  <input 
                    id="pdf-upload-immediate"
                    type="file" 
                    accept="application/pdf"
                    style={{ display: 'none' }}
                    onChange={async (e) => {
                      if (e.target.files && e.target.files[0]) {
                        const file = e.target.files[0];
                        
                        // Validation
                        if (file.type !== 'application/pdf') {
                          setError("Please select a valid PDF file.");
                          return;
                        }
                        if (file.size > 50 * 1024 * 1024) {
                          setError("PDF file must be less than 50MB.");
                          return;
                        }

                        setError(null);
                        setPdfFile(file);
                        setIsUploadingPdf(true);

                        try {
                          const { publicUrl } = await adminMagazineApi.uploadPdf(file);
                          setPdfUrl(publicUrl);
                        } catch (err: any) {
                          setError(err.message || "Failed to upload PDF.");
                          setPdfFile(null);
                        } finally {
                          setIsUploadingPdf(false);
                          // Reset input so the same file can be selected again if needed
                          if (e.target) e.target.value = '';
                        }
                      }
                    }}
                  />
                </div>

                <div style={{ textAlign: 'center', color: '#94a3b8', fontSize: '14px', fontWeight: 500 }}>
                  OR
                </div>

                {/* URL Section */}
                <div>
                  <label style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '4px', display: 'block' }}>PDF URL (Optional)</label>
                  <input 
                    type="text" 
                    className="admin-input" 
                    placeholder="https://.../magazine.pdf" 
                    value={pdfUrl}
                    onChange={e => {
                      setPdfUrl(e.target.value);
                      if (pdfFile) setPdfFile(null); // Clear file tracking if they manually edit the URL
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {error && <div style={{ color: '#ef4444', fontSize: '14px', marginTop: '12px', padding: '12px', backgroundColor: 'rgba(239, 68, 68, 0.1)', borderRadius: '6px' }}>{error}</div>}
        </div>

        {/* Sidebar Column */}
        <div className="admin-editor-sidebar">
          {/* Cover Image */}
          <div className="admin-panel">
            <h3 className="admin-panel-title">Cover Image</h3>
            {coverImage ? (
              <div className="admin-image-preview">
                <img src={coverImage} alt="Cover Preview" style={{ objectFit: 'cover' }} />
                <button className="admin-image-remove" onClick={removeImage}><X size={16} /></button>
              </div>
            ) : (
              <div className="admin-image-upload" onClick={() => fileInputRef.current?.click()}>
                <ImageIcon size={32} color="#94a3b8" />
                <p>Click to upload image</p>
                <span>Recommended: 800x1200px (Portrait)</span>
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
              Featured Magazine
            </label>
          </div>
        </div>
      </div>
      
      <style>{`
        .lucide-spin { animation: lucide-spin 2s linear infinite; }
        @keyframes lucide-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
