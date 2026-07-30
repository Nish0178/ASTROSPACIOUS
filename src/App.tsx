import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./Extra/Nav.tsx";
import Footer from "./Extra/Footer.tsx";
import ArticleDetails from "./ArticleDetails.tsx";
import Magazine from "./Magazine";
import MagazineDetails from "./MagazineDetails";

import PrivacyPolicy from "./PrivacyPolicy";
import TermsConditions from "./TermsConditions";

import Magazines from "./Magazines.tsx";
import Articles from "./Articles.tsx";
import Contact from "./Contact.tsx";
import Select from "./Select.tsx";
import Topic from "./Topic.tsx";
import Subject from "./Subject.tsx";
import Home from "./Home.tsx";
import About from "./About.tsx";

import TextEdit from "./Dev-Stuff/text-edit.tsx";

export default function App() {
  return (
    <BrowserRouter>
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Nav />

        <div style={{ flex: 1 }}>
          <Routes>
            {/* Home */}
            <Route path="/" element={<Home />} />

            {/* Articles */}
            <Route path="/Articles" element={<Articles />} />
            <Route path="/articles/:slug" element={<ArticleDetails />} />

            {/* Magazines */}
            <Route path="/Magazines" element={<Magazines />} />
            <Route path="/magazines" element={<Magazine />} />
            <Route
              path="/magazines/:slug"
              element={<MagazineDetails />}
            />

            {/* About */}
            <Route path="/About" element={<About />} />

            {/* Contact */}
            <Route path="/Contact" element={<Contact />} />

            {/* Subjects */}
            <Route path="/Subject" element={<Subject />} />
            <Route
              path="/Topic/:subject/:subtopic"
              element={<Topic />}
            />

            {/* Select */}
            <Route path="/Select" element={<Select />} />

            {/* Privacy Policy */}
            <Route
              path="/privacy-policy"
              element={<PrivacyPolicy />}
            />

            {/* Terms & Conditions */}
            <Route
              path="/terms-and-conditions"
              element={<TermsConditions />}
            />

            {/* Editor */}
            <Route path="/Write" element={<TextEdit />} />

            {/* 404 */}
            <Route
              path="*"
              element={<h1 style={{ textAlign: "center" }}>404</h1>}
            />
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}