import React, { useState } from "react";
import SpaceBg from "./Extra/Space-bg";

import './css/base.css';
import './css/About.css';

const cards = [
    {
        title: "Research Projects",
        content:
            "Collaborate on innovative space research, scientific exploration, and student-led initiatives that transform ideas into impactful discoveries."
    },
    {
        title: "Educational Programs",
        content:
            "Access webinars, workshops, learning resources, and expert-led sessions designed to make astronomy and space science accessible to everyone."
    },
    {
        title: "Community Events",
        content:
            "Join global events, networking sessions, competitions, and collaborative activities that connect passionate space enthusiasts worldwide."
    }
];

const leadership = [
    {
        name: "Anvita Srivastava",
        role: "Founder",
        img: "https://via.placeholder.com/160/0a0f23/ffffff?text=Anvita",
        linkedin: "https://linkedin.com/"
    },
    {
        name: "Nishant trivedi",
        role: "Head Developer",
        img: "https://via.placeholder.com/160/0a0f23/ffffff?text=Nishant",
        linkedin: "https://linkedin.com/"
    },
    {
        name: "Vivaan",
        role: "Head Marketing",
        img: "https://via.placeholder.com/160/0a0f23/ffffff?text=Vivaan",
        linkedin: "https://linkedin.com/"
    }
];

    

function About() {
    const [activeIndex, setActiveIndex] = useState(1);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
        const x = e.clientX - rect.left;
        const segmentWidth = rect.width / cards.length;
        const newIndex = Math.floor(x / segmentWidth);
        setActiveIndex(newIndex);
    }

    const handleScrollToDiscover = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        document.getElementById('about-content')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <main className="about-page-wrapper">
       <SpaceBg />

<section className="about-hero">
    <div className="about-hero-content fade-up animate-delay-1">

        <img
            src="/images/astrospacious-logo.jpeg"
            alt="Astrospacious"
            className="hero-logo fade-up animate-delay-2"
        />

               <h1 className="hero-title fade-up animate-delay-3">
            Empowering the Next Generation
            <br />
            of Space Explorers
        </h1>

        <p className="hero-description fade-up animate-delay-4">
            Astrospacious is a global student-led space research and education
            organization committed to making astronomy and space science
            accessible through innovation, collaboration, research,
            and hands-on learning.
        </p>

        <div className="hero-buttons fade-up animate-delay-5">

            <a href="#about-content" onClick={handleScrollToDiscover} className="primary-btn">
                Explore Our Journey
            </a>

            <a href="/contact" className="secondary-btn">
                Join Community
            </a>

        </div>

        <a href="#about-content" onClick={handleScrollToDiscover} className="scroll-indicator fade-up animate-delay-6">

            <span>↓</span>

            <p>Scroll to Discover</p>
        </a>

    </div>

</section>

<section id="about-content" className="about-section"></section>

            <section className="info centered">

    <div className="inner">

        <h2 className="about-heading">
            About Astrospacious
        </h2>

        <div className="about-text-container">
            <p className="about-text">
                Astrospacious is a global student-led space research and education organization dedicated to making space more accessible for everyone. Through research projects, educational initiatives, events, and engaging space content, we inspire curiosity, encourage innovation, and empower the next generation of space enthusiasts.
            </p>

            <p className="about-text">
                Today, Astrospacious is a growing community of <strong>1,000+ members across 6 continents</strong> and has successfully mentored <strong>35+ interns</strong>. Founded by <strong>Anvita Srivastava</strong>, Astrospacious continues to bring together passionate young minds who believe in learning, collaboration, and shaping the future of space exploration.
            </p>
        </div>

    </div>

</section>
<section className="impact-section">

    <h1 className="gradient-text centered">
        Our Impact
    </h1>

    <div className="impact-grid">

        <div className="impact-card">
            <h2>1000+</h2>
            <p>Community Members</p>
        </div>

        <div className="impact-card">
            <h2>6</h2>
            <p>Continents</p>
        </div>

        <div className="impact-card">
            <h2>35+</h2>
            <p>Interns Mentored</p>
        </div>

        <div className="impact-card">
            <h2>Anvita Srivastava</h2>
            <p>Founder</p>
        </div>

    </div>

</section>
            <div className="Hover-Board margin-vertical" onMouseMove={handleMouseMove}>
                {cards.map((card, index) => {
                    let className = "card";

                    if (index === activeIndex) {
                        className += " active";

                        if (index === 0) className += " leftmost";
                        else if (index === cards.length - 1) className += " rightmost";
                    }
                    else if (index < activeIndex) className += " left inactive";
                    else if (index > activeIndex) className += " right inactive";

                    return (
                        <div key={card.title} className={className}>
                            <h2 className="card-title">{card.title}</h2>
                            <p className="card-content">{card.content}</p>
                        </div>
                    )
                })}
            </div>

            <br className="margin-vertical" />

            <h1 className="gradient-text textclip centered margin-vertical">
    Meet our team
</h1>

<div className="team">
    <div className="Heads margin-vertical">
        {leadership.map((member, index) => (
            <a key={member.name} href={member.linkedin} target="_blank" rel="noreferrer" className="centered member-card">
                <div className="member-image-wrapper">
                    <img
                        className="image glow glow-hover"
                        src={member.img}
                        alt={member.name}
                    />
                    <div className="linkedin-icon">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                    </div>
                </div>
                <h2 className="name">{member.name}</h2>
                <p className="role">{member.role}</p>
            </a>
        ))}
    </div>
</div>

<br className="margin-vertical" />

            <section className="mission-vision">
                <div className="mission">
                    <h1 className="gradient-text centered">Our Mission</h1>
                    <h2>
                        To inspire and educate students about astronomy and space science through interactive webinars, workshops, and community events.
                    </h2>
                </div>
                <div className="vision">
                    <h1 className="gradient-text centered">Our Vision</h1>
                    <h2>
                        To become a leading platform that connects space enthusiasts worldwide and fosters a passion for exploring the universe.
                    </h2>
                </div>
            </section>


        </main>
    )
}

export default About;
