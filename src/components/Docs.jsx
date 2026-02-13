import React from 'react';

const Docs = () => {
    return (
        <div className="reference-section" id="docs">
            <h2 className="section-title">ToyLang Language Reference</h2>
            <div className="reference-grid">
                <div className="reference-card">
                    <h3>Variables</h3>
                    <code>let x = 10</code>
                    <p>Declare variables with the <code>let</code> keyword</p>
                </div>
                <div className="reference-card">
                    <h3>Arithmetic</h3>
                    <code>x + y * 2</code>
                    <p>Operators: <code>+</code> <code>-</code> <code>*</code> <code>/</code> <code>^</code> (power)</p>
                </div>
                <div className="reference-card">
                    <h3>Print</h3>
                    <code>print "Hello"</code>
                    <p>Output values to console</p>
                </div>
                <div className="reference-card">
                    <h3>Functions</h3>
                    <code>func greet(name) { '{ ... }' }</code>
                    <p>Define reusable functions with parameters</p>
                </div>
                <div className="reference-card">
                    <h3>Conditionals</h3>
                    <code>if x &gt; 5 { '{ ... }' } else { '{ ... }' }</code>
                    <p>Comparison: <code>&gt;</code> <code>&lt;</code> <code>==</code> <code>!=</code></p>
                </div>
                <div className="reference-card">
                    <h3>Loops</h3>
                    <code>while x &lt; 10 { '{ ... }' }</code><br />
                    <code>for i in range(5) { '{ ... }' }</code>
                    <p>While and for loop constructs</p>
                </div>
            </div>
            <footer className="footer">
                <p>Compiler design concepts</p>
            </footer>
        </div>
    );
};

export default Docs;
