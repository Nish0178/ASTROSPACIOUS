import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./Extra/Nav.tsx";
import Footer from "./Extra/Footer.tsx";
import ArticleDetails from "./ArticleDetails.tsx";
import Magazine from "./Magazine";
import MagazineDetails from "./MagazineDetails";
import MagazineReader from "./pages/MagazineReader";

import ThankYou from "./ThankYou";
import PrivacyPolicy from "./PrivacyPolicy";
import TermsConditions from "./TermsConditions";

import Magazines from "./Magazines.tsx";
import Articles from "./Articles.tsx";
import Contact from "./Contact.tsx";
import Home from "./Home.tsx";
import Careers from "./Careers.tsx";
import About from "./About.tsx";

import TextEdit from "./Dev-Stuff/text-edit.tsx";

// Public Layout Wrapper
const PublicLayout = ({ children }: { children: React.ReactNode }) => (
  <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
    <Nav />
    <div style={{ flex: 1 }}>{children}</div>
    <Footer />
  </div>
);

import AdminLayout from "./admin/layout/AdminLayout";
import Login from "./admin/pages/Login";
import AdminDashboard from "./admin/pages/Dashboard";
import AdminArticles from "./admin/pages/Articles";
import CreateArticle from "./admin/pages/CreateArticle";
import EditArticle from "./admin/pages/EditArticle";
import TrashArticles from "./admin/pages/Trash";
import AdminMagazines from "./admin/pages/Magazines";
import MagazinesTrash from "./admin/pages/MagazinesTrash";
import CreateMagazine from "./admin/pages/CreateMagazine";
import EditMagazine from "./admin/pages/EditMagazine";
import AdminCategories from "./admin/pages/Categories";
import AdminNewsletter from "./admin/pages/Newsletter";
import AdminSubscribers from "./admin/pages/Subscribers";
import AdminMessages from "./admin/pages/Messages";
import AdminMedia from "./admin/pages/Media";
import AdminSettings from "./admin/pages/Settings";
import { AuthProvider } from "./admin/auth/AuthContext";
import ProtectedRoute from "./admin/auth/ProtectedRoute";
import PublicAuthRoute from "./admin/auth/PublicAuthRoute";
import "./admin/styles/admin.css";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Admin Routes - Login */}
          <Route element={<PublicAuthRoute />}>
            <Route path="/admin/login" element={<Login />} />
          </Route>

          {/* Admin Routes - Protected Dashboard */}
          <Route element={<ProtectedRoute />}>
            <Route path="/admin/*" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="articles" element={<AdminArticles />} />
              <Route path="articles/create" element={<CreateArticle />} />
              <Route path="articles/edit/:id" element={<EditArticle />} />
              <Route path="articles/trash" element={<TrashArticles />} />
              <Route path="magazines" element={<AdminMagazines />} />
              <Route path="magazines/create" element={<CreateMagazine />} />
              <Route path="magazines/edit/:id" element={<EditMagazine />} />
              <Route path="magazines/trash" element={<MagazinesTrash />} />
              <Route path="categories" element={<AdminCategories />} />
              <Route path="newsletter" element={<AdminNewsletter />} />
              <Route path="subscribers" element={<AdminSubscribers />} />
              <Route path="messages" element={<AdminMessages />} />
              <Route path="media" element={<AdminMedia />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
          </Route>

          {/* Public Routes */}
          <Route path="/*" element={
            <PublicLayout>
              <Routes>
                {/* Home */}
                <Route path="/" element={<Home />} />

                {/* Articles */}
                <Route path="/Articles" element={<Articles />} />
                <Route path="/articles/:slug" element={<ArticleDetails />} />

                {/* Careers */}
                <Route path="/careers" element={<Careers />} />

                {/* Magazines */}
                <Route path="/Magazines" element={<Magazines />} />
                <Route path="/magazines" element={<Magazine />} />
                <Route path="/magazines/:slug" element={<MagazineDetails />} />
                <Route path="/magazines/:slug/read" element={<MagazineReader />} />

                {/* About */}
                <Route path="/About" element={<About />} />

                {/* Contact */}
                <Route path="/Contact" element={<Contact />} />

                {/* Thank You */}
                <Route path="/thank-you" element={<ThankYou />} />



                {/* Privacy Policy */}
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />

                {/* Terms & Conditions */}
                <Route path="/terms-and-conditions" element={<TermsConditions />} />

                {/* Editor */}
                <Route path="/Write" element={<TextEdit />} />

                {/* 404 */}
                <Route path="*" element={<h1 style={{ textAlign: "center" }}>404</h1>} />
              </Routes>
            </PublicLayout>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}