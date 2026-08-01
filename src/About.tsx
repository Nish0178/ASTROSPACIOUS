import React, { useState } from "react";
import SpaceBg from "./Extra/Space-bg";
import { motion } from "framer-motion";

import './css/base.css';
import './css/About.css';

// --- Framer Motion Variants ---
const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.15 }
    }
};

const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 70, damping: 20 } }
};

const scaleVariant = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 80, damping: 20 } }
};

// --- Data Arrays ---

const whatWeDoCards = [
    { title: "Research Projects", desc: "Collaborate on innovative space research and scientific exploration.", icon: "🚀" },
    { title: "Space Exploration", desc: "Pushing the boundaries of student-led space initiatives.", icon: "🛰" },
    { title: "Educational Programs", desc: "Accessible astronomy resources and expert-led sessions.", icon: "🎓" },
    { title: "Community Building", desc: "Connecting passionate space enthusiasts worldwide.", icon: "🌍" },
    { title: "Astronomy Resources", desc: "Curated learning materials for all skill levels.", icon: "📚" },
    { title: "Workshops & Events", desc: "Interactive sessions to enhance practical knowledge.", icon: "🎤" }
];

const coreValues = [
    { title: "Innovation", icon: "💡" },
    { title: "Collaboration", icon: "🤝" },
    { title: "Accessibility", icon: "🔓" },
    { title: "Scientific Thinking", icon: "🔬" },
    { title: "Leadership", icon: "⭐" },
    { title: "Curiosity", icon: "🔭" }
];

const programCards = [
    { title: "Research Programs", desc: "Deep dive into astronomical data and publish findings." },
    { title: "Internships", desc: "Gain hands-on experience with industry mentors." },
    { title: "Workshops", desc: "Skill-building sessions on astrophysics and rocketry." },
    { title: "Webinars", desc: "Learn directly from space industry professionals." },
    { title: "Community Events", desc: "Global networking and stargazing meetups." },
    { title: "Open Source Projects", desc: "Contribute to space-tech software and tools." }
];

const leadership = [
    { name: "Nishant Trivedi", role: "Head Developer", desc: "Architecting the digital future of Astrospacious.", img: "", linkedin: "https://www.linkedin.com/in/nishant-trivedi-363ba3249/" },
    { name: "Anvita Srivastava", role: "Founder", desc: "Visionary leader passionate about democratizing space education.", img: "", linkedin: "https://www.linkedin.com/in/anvita-srivastava-311b86325/" },
    { name: "Vivaan", role: "Head Marketing", desc: "Spreading the cosmic vision to a global audience.", img: "", linkedin: "https://www.linkedin.com/company/astrospacious/" }
];

const galleryImages = [
    { category: "Research", src: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=1000&auto=format&fit=crop" },
    { category: "Events", src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop" },
    { category: "Workshops", src: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?q=80&w=1000&auto=format&fit=crop" },
    { category: "Astronomy Sessions", src: "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?q=80&w=1000&auto=format&fit=crop" },
    { category: "Community Meetups", src: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1000&auto=format&fit=crop" },
    { category: "Competitions", src: "https://images.unsplash.com/photo-1517976487492-5750f3195933?q=80&w=1000&auto=format&fit=crop" }
];

const testimonials = [
    { quote: "Astrospacious completely changed my trajectory. The mentorship and research opportunities are world-class.", name: "Sarah J.", role: "Research Intern", stars: 5 },
    { quote: "The most welcoming and innovative student-led space community I've ever been a part of.", name: "Michael T.", role: "Community Member", stars: 5 },
    { quote: "Their workshops bridge the gap between theoretical astrophysics and real-world application.", name: "Dr. Elena R.", role: "Guest Speaker", stars: 5 }
];

const partners = ["University of Space", "OpenAstronomy", "Stellar Research", "CosmicEdu", "Galaxy Foundation"];


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
                        <p>Astrospacious is a pioneering <strong>student-led</strong> organization operating at the intersection of <strong>research</strong>, <strong>education</strong>, and <strong>innovation</strong>. We believe that <strong>astronomy</strong> and <strong>space science</strong> should be universally accessible.</p>
                        <br />
                        <p>Through global <strong>collaboration</strong> and a relentless drive for discovery, we are uniting the brightest young minds to solve the challenges of tomorrow.</p>
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
                    <motion.div variants={scaleVariant} className="impact-card glass-card"><h2>20+</h2><p>Educational Programs</p></motion.div>
                    <motion.div variants={scaleVariant} className="impact-card glass-card"><h2>100+</h2><p>Workshops & Events</p></motion.div>
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

            {/* 6. OUR CORE VALUES */}
            <section className="about-section core-values">
                <motion.h2 className="section-title gradient-text" variants={fadeUpVariant} initial="hidden" whileInView="show" viewport={{ once: true }}>Our Core Values</motion.h2>
                <motion.div className="values-flex" variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
                    {coreValues.map((val, idx) => (
                        <motion.div key={idx} variants={scaleVariant} className="value-item glass-card">
                            <div className="value-icon">{val.icon}</div>
                            <h4>{val.title}</h4>
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

            {/* 8. MEET THE LEADERSHIP */}
            <section className="about-section leadership-section">
                <motion.h2 className="section-title gradient-text" variants={fadeUpVariant} initial="hidden" whileInView="show" viewport={{ once: true }}>Meet The Leadership</motion.h2>
                <motion.div className="leadership-grid" variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
                    {leadership.map((member, index) => (
                        <motion.a variants={fadeUpVariant} key={index} href={member.linkedin} target="_blank" rel="noreferrer" className="leadership-card glass-card">
                            <div className="member-image-wrapper">
                                {member.img ? (
                                    <img className="image glow" src={member.img} alt={member.name} />
                                ) : (
                                    <div className="avatar-placeholder">{member.name.charAt(0)}</div>
                                )}
                                <div className="linkedin-icon-overlay">
                                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                    </svg>
                                </div>
                            </div>
                            <h3 className="name">{member.name}</h3>
                            <p className="role gradient-text-small">{member.role}</p>
                            <p className="desc">{member.desc}</p>
                        </motion.a>
                    ))}
                </motion.div>
            </section>

            {/* 9. COMMUNITY GALLERY */}
            <section className="about-section gallery-section">
                <motion.h2 className="section-title gradient-text" variants={fadeUpVariant} initial="hidden" whileInView="show" viewport={{ once: true }}>Community Gallery</motion.h2>
                <motion.div className="gallery-grid" variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }}>
                    {galleryImages.map((img, idx) => (
                        <motion.div key={idx} variants={fadeUpVariant} className="gallery-item">
                            <img src={img.src} alt={img.category} loading="lazy" />
                            <div className="gallery-overlay"><span>{img.category}</span></div>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* 10. TESTIMONIALS */}
            <section className="about-section testimonials-section">
                <motion.h2 className="section-title gradient-text" variants={fadeUpVariant} initial="hidden" whileInView="show" viewport={{ once: true }}>Testimonials</motion.h2>
                <div className="testimonials-slider-container">
                    <motion.div className="testimonials-track" variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
                        {testimonials.map((test, idx) => (
                            <motion.div key={idx} variants={fadeUpVariant} className="testimonial-card glass-card">
                                <div className="stars">{"★".repeat(test.stars)}</div>
                                <p className="quote">"{test.quote}"</p>
                                <div className="author">
                                    <h4>{test.name}</h4>
                                    <span>{test.role}</span>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* 11. PARTNERS & COLLABORATORS */}
            <section className="about-section partners-section">
                <motion.h2 className="section-title gradient-text" variants={fadeUpVariant} initial="hidden" whileInView="show" viewport={{ once: true }}>Partners & Collaborators</motion.h2>
                <motion.div className="partners-cloud" variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
                    {partners.map((partner, idx) => (
                        <motion.div key={idx} variants={scaleVariant} className="partner-logo glass-card">
                            <span>{partner}</span>
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
