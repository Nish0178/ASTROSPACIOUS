import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../css/main.css";

type SubjectType = {
  id: string | number;
  name: string;
  url: string;
  subtopics: string[];
};

function Nav() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setMenuOpen(false);
    setHomeOpen(false);
    setReadOpen(false);

    if (isHomePage) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    navigate("/");
  };

  const [isMobile, setIsMobile] = useState(
  typeof window !== "undefined" ? window.innerWidth <= 768 : false
);

  const [subjects, setSubjects] = useState<SubjectType[]>([]);
  const [showSubjects, setShowSubjects] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [homeOpen, setHomeOpen] = useState(false);
const [readOpen, setReadOpen] = useState(false);

  useEffect(() => {
    let mounted = true;

    fetch('/data/subjects.json')
      .then(res => {
        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
        return res.json();
      })
      .then((data: SubjectType[]) => {
        if (mounted) setSubjects(data);
      })
      .catch(err => console.error('Error loading subjects:', err));

    return () => { mounted = false };
  }, []);

  useEffect(() => {
    const handleResize = () => {
  setIsMobile(window.innerWidth <= 768);

  if (window.innerWidth > 768) {
    setMenuOpen(false);
  }
};
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 🟦 CLICK HANDLER — scroll to section on Subject page
  const scrollToSection = (id: string | number) => {
    window.location.href = `/Subject#section-${id}`;
  };

  return (
    <nav>
      <div className="nav-container">
        <Link 
          to="/" 
          className="navbar-brand" 
          onClick={handleLogoClick}
          aria-label="Go to Home"
          title="ASTROSPACIOUS Home"
        >
          <img src="/logos/logo-small.png" alt="Astrospacious Icon" className="nav-logo-small" />
          <img src="/logos/logo-full.png" alt="Astrospacious Logo" className="nav-logo-full" />
        </Link>

       <div
  className={`menu-btn ${menuOpen ? "active" : ""}`}
  onClick={() => setMenuOpen(!menuOpen)}
>
  <span></span>
  <span></span>
  <span></span>
</div>

        <div className={`nav-links ${menuOpen ? "active" : ""}`}>

  

    <div className={`nav-dropdown ${homeOpen ? "open" : ""}`}>
  <a
    href="/"
    className="dropdown-toggle"
    onClick={(e) => {
      if (isMobile) {
        e.preventDefault();
        setHomeOpen(!homeOpen);
        setReadOpen(false);
      }
    }}
  >
    HOME {isMobile && (homeOpen ? "▲" : "▼")}
  </a>

  <div className="dropdown-menu">
    <a
      href="/About"
      onClick={() => {
        setMenuOpen(false);
        setHomeOpen(false);
      }}
    >
      ABOUT
    </a>

    <a
      href="/Contact"
      onClick={() => {
        setMenuOpen(false);
        setHomeOpen(false);
      }}
    >
      CONTACT US
    </a>
  </div>
</div>

  <div className="nav-dropdown">
    <a href="/Articles" className="dropdown-toggle">READ</a>

    <div className="dropdown-menu">
      <a href="/Articles">ARTICLES</a>
      <a href="/Magazines">MAGAZINES</a>
      <a href="/Subject">EXPLORE SUBJECTS</a>
    </div>
  </div>

  <a href="/Select" className="btn">
    NEW
  </a>

</div>
          {/*
<div
  className="subject-wrapper"
  onMouseEnter={() => setShowSubjects(true)}
  onMouseLeave={() => setShowSubjects(false)}
>
  <a href="/Subject">Subject</a>

  <div className={`NavSubject ${showSubjects ? "visible" : "hidden"}`}>
    {subjects.map(subject => (
      <p
        key={subject.id}
        onClick={() => scrollToSection(subject.id)}
        className="nav-subtopic"
      >
        {subject.name}
      </p>
    ))}
  </div>
</div>
*/}

          
      </div>
    </nav>
  );
}

export default Nav;
