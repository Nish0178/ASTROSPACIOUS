import React, { useState } from "react";
import SpaceBg from "./Extra/Space-bg";
import { motion } from "framer-motion";
import { Variants } from "framer-motion";



import './css/base.css';
import './css/About.css';

// --- Framer Motion Variants ---
const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.15 }
    }
};


const fadeUpVariant: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 70, damping: 20 } }
};

const scaleVariant: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 80, damping: 20 } }
};

// --- Data Arrays ---

const whatWeDoCards = [
    { title: "Research Projects", desc: "Collaborate on innovative space research and scientific exploration.", icon: "🚀" },
    { title: "Community Building", desc: "Connecting passionate space enthusiasts worldwide.", icon: "🌍" },
    { title: "Astronomy Resources", desc: "Curated learning materials for all skill levels.", icon: "📚" },
    { title: "Workshops & Events", desc: "Interactive sessions to enhance practical knowledge.", icon: "🎤" }
];



const programCards = [
    { title: "Research Programs", desc: "Deep dive into astronomical data and publish findings." },
    { title: "Internships", desc: "Gain hands-on experience with industry mentors." },
    { title: "Workshops", desc: "Skill-building sessions on astrophysics and rocketry." },
    { title: "Webinars", desc: "Learn directly from space industry professionals." },
    { title: "Community Events", desc: "Global networking and stargazing meetups." },
    { title: "Open Source Projects", desc: "Contribute to space-tech software and tools." }
];








function About() {
    const handleScrollToDiscover = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        document.getElementById('who-we-are')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <main className="about-page-wrapper">
            <SpaceBg />

            {/* 1. HERO SECTION */}
            <section className="about-hero">
                <motion.div className="about-hero-content" variants={staggerContainer} initial="hidden" animate="show">
                    <motion.img variants={fadeUpVariant} src="/images/astrospacious-logo.png" alt="Astrospacious" className="hero-logo" />
                    <motion.h1 variants={fadeUpVariant} className="hero-title">
                        Empowering the Next Generation<br />of Space Explorers
                    </motion.h1>
                    <motion.p variants={fadeUpVariant} className="hero-description">
                        Astrospacious is a global student-led space research and education organization committed to making astronomy and space science accessible through innovation, collaboration, research, and hands-on learning.
                    </motion.p>
                    <motion.div variants={fadeUpVariant} className="hero-buttons">
                        <a href="#who-we-are" onClick={handleScrollToDiscover} className="primary-btn">Explore Our Journey</a>
                        <a href="/contact" className="secondary-btn">Join Community</a>
                    </motion.div>
                    <motion.a variants={fadeUpVariant} href="#who-we-are" onClick={handleScrollToDiscover} className="scroll-indicator">
                        <span>↓</span>
                        <p>Scroll to Discover</p>
                    </motion.a>
                </motion.div>
            </section>

            {/* 3. WHO WE ARE */}
            <section id="who-we-are" className="about-section who-we-are">
                <motion.div className="who-container" variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
                    <motion.div className="who-left" variants={fadeUpVariant}>
                        <h2 className="section-title gradient-text align-left">Who We Are</h2>
                    </motion.div>
                    <motion.div className="who-right" variants={fadeUpVariant}>
                        <p>Astrospacious was created with a simple mission: to make space science more accessible to students around the world. We believe curiosity should never be limited by geography, resources, or opportunity. Through research projects, educational initiatives, internships, and a global community, we inspire students to explore astronomy and space science together.</p>
                        <br />
                        <p>Today, Astrospacious has grown into a community of 1,000+ students across 6 continents and has successfully mentored 35+ interns. Founded by Anvita Srivastava, Astrospacious continues to empower the next generation of space enthusiasts through collaboration, curiosity, and innovation.</p>
                    </motion.div>
                </motion.div>
            </section>

            {/* 4. OUR IMPACT */}
            <section className="about-section impact-section">
                <motion.h2 className="section-title gradient-text" variants={fadeUpVariant} initial="hidden" whileInView="show" viewport={{ once: true }}>Our Impact</motion.h2>
                <motion.div className="impact-grid" variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
                    <motion.div variants={scaleVariant} className="impact-card glass-card"><h2>1000+</h2><p>Community Members</p></motion.div>
                    <motion.div variants={scaleVariant} className="impact-card glass-card"><h2>6</h2><p>Continents</p></motion.div>
                    <motion.div variants={scaleVariant} className="impact-card glass-card"><h2>35+</h2><p>Interns Mentored</p></motion.div>
                    <motion.div variants={scaleVariant} className="impact-card glass-card"><h2>50+</h2><p>Research Projects</p></motion.div>

                </motion.div>
            </section>

            {/* 5. WHAT WE DO */}
            <section className="about-section what-we-do">
                <motion.h2 className="section-title gradient-text" variants={fadeUpVariant} initial="hidden" whileInView="show" viewport={{ once: true }}>What We Do</motion.h2>
                <motion.div className="feature-grid" variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
                    {whatWeDoCards.map((card, idx) => (
                        <motion.div key={idx} variants={fadeUpVariant} className="feature-card glass-card">
                            <div className="feature-icon">{card.icon}</div>
                            <h3>{card.title}</h3>
                            <p>{card.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </section>



            {/* 7. PROGRAMS */}
            <section className="about-section programs-section">
                <motion.h2 className="section-title gradient-text" variants={fadeUpVariant} initial="hidden" whileInView="show" viewport={{ once: true }}>Programs</motion.h2>
                <motion.div className="feature-grid" variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
                    {programCards.map((card, idx) => (
                        <motion.div key={idx} variants={fadeUpVariant} className="feature-card glass-card">
                            <h3>{card.title}</h3>
                            <p>{card.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </section>







            {/* 12. FINAL CALL TO ACTION */}
            <section className="about-section cta-section">
                <motion.div className="cta-container glass-card" variants={fadeUpVariant} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
                    <h2 className="section-title gradient-text">Join the Future of Space Exploration</h2>
                    <p>Become part of a global movement dedicated to understanding the cosmos. Whether you're a student, researcher, or enthusiast, there's a place for you here.</p>
                    <div className="cta-buttons">
                        <a href="/contact" className="primary-btn">Join Community</a>
                        <a href="/contact" className="secondary-btn outline">Become a Volunteer</a>
                        <a href="#about-story" className="secondary-btn outline">Explore Programs</a>
                    </div>
                </motion.div>
            </section>

        </main>
    );
}

export default About;
