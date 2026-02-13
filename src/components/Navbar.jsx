import React, { useEffect, useRef, useState } from 'react';

const Navbar = ({ activeSection, setActiveSection }) => {
    const bubbleRef = useRef(null);
    const navLinksRef = useRef([]);

    const updateBubblePosition = () => {
        const activeLink = navLinksRef.current.find(link => link?.getAttribute('data-section') === activeSection);
        if (activeLink && bubbleRef.current) {
            bubbleRef.current.style.width = `${activeLink.offsetWidth}px`;
            bubbleRef.current.style.left = `${activeLink.offsetLeft}px`;
        }
    };

    useEffect(() => {
        updateBubblePosition();
        window.addEventListener('resize', updateBubblePosition);
        return () => window.removeEventListener('resize', updateBubblePosition);
    }, [activeSection]);

    const handleLinkClick = (e, sectionId) => {
        e.preventDefault();
        setActiveSection(sectionId);
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav className="scrolled-navbar" id="scrolledNavbar">
            <div className="navbar-container">
                <div className="navbar-logo"></div>
                <div className="navbar-links">
                    <div className="bubble-indicator" ref={bubbleRef}></div>
                    {['transpiler', 'pipeline', 'docs'].map((section, index) => (
                        <a
                            key={section}
                            href={`#${section}`}
                            className={`navbar-link ${activeSection === section ? 'active' : ''}`}
                            data-section={section}
                            ref={el => navLinksRef.current[index] = el}
                            onClick={(e) => handleLinkClick(e, section)}
                        >
                            {section.charAt(0).toUpperCase() + section.slice(1)}
                        </a>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
