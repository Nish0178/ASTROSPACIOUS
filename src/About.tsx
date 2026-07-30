import React, { useState } from "react";
import Space_bg from "./Extra/Space-bg.tsx";

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
        img: ""
    },
    {
        name: "Nishant trivedi",
        role: "Head Developer",
        img: ""
    },
    {
        name: "Vivaan",
        role: "Head Marketing",
        img: ""
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

    return (
        <main>
       <Space_bg />

<section className="about-hero">

    <div className="about-hero-content">

        <span className="hero-tag">
            ABOUT ASTROSPACIOUS
        </span>

        <h1 className="hero-title">
            Inspiring the Next Generation of Space Explorers
        </h1>

        <p className="hero-description">
            Astrospacious is a global student-led space research and education
            organization dedicated to making astronomy and space science more
            accessible through innovation, collaboration, and hands-on learning.
        </p>

    </div>

</section>

            <section className="info centered">

    <div className="inner">

        <h2 className="about-heading">
            About Astrospacious
        </h2>

        <p className="about-text">
            Astrospacious is a global student-led space research and education organization dedicated to making space more accessible for everyone. Through research projects, educational initiatives, events, and engaging space content, we inspire curiosity, encourage innovation, and empower the next generation of space enthusiasts.
        </p>

        <p className="about-text">
            Today, Astrospacious is a growing community of <strong>1,000+ members across 6 continents</strong> and has successfully mentored <strong>35+ interns</strong>. Founded by <strong>Anvita Srivastava</strong>, Astrospacious continues to bring together passionate young minds who believe in learning, collaboration, and shaping the future of space exploration.
        </p>

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
                        <div key={index} className={className}>
                            <h2 className="card-title">{card.title}</h2>
                            <p className="card-content">{card.content}</p>
                        </div>
                    )
                })}
            </div>

            <br className="margin-vertical"></br>

            <h1 className="gradient textclip centered margin-vertical">Meet our team</h1>
            <div className="team">
                <div className="Heads margin-vertical">
                    {team.heads.map((member, index) => (
                        <div key={index} className="centered">
                            <img className="image glow glow-hover"></img>
                            <h2 className="name">{member.name}</h2>
                            <p className="role">{member.role}</p>
                        </div>
                    ))}
                </div>
                <div className="Members margin-vertical">
                    {team.members.map((member, index) => (
                        <div key={index} className="centered">
                            <img className="image glow glow-hover"></img>
                            <h2 className="name">{member.name}</h2>
                            <p className="role">{member.role}</p>
                        </div>
                    ))}
                </div>
            </div>

            <br className="margin-vertical"></br>

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
