import React from 'react';

const Hero = () => {
    return (
        <section className="hero-section">
            <div className="hero-content">
                <p className="hero-label">I AM</p>
                <h1 className="hero-title">TOYLANG</h1>
                <p className="hero-subtitle">
                    AN EDUCATIONAL<br />
                    TRANSPILER
                </p>
            </div>

            <div className="scroll-indicator">
                <span className="scroll-text">SCROLL</span>
                <div className="scroll-line"></div>
            </div>

            <div className="social-links">
                <a href="https://github.com/rajsriv" className="social-link" target="_blank" rel="noopener noreferrer">GH</a>
                <a href="https://t.me/RajCodeDump" className="social-link" target="_blank" rel="noopener noreferrer">TG</a>
                <a href="https://www.linkedin.com/in/raj-sriv2005/" className="social-link" target="_blank" rel="noopener noreferrer">LI</a>
            </div>
        </section>
    );
};

export default Hero;
