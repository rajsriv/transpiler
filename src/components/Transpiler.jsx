import React, { useState, useEffect } from 'react';
import { useTranspiler } from '../hooks/useTranspiler';

const Transpiler = ({ onTranspile }) => {
    const { pythonCode, error, transpile } = useTranspiler();
    const [source, setSource] = useState(`# Welcome to ToyLang!
# A simple educational programming language

let x = 10
let y = 20
let result = x + y * 2
print result

# Power operation
let squared = x ^ 2
print squared

# Function
func greet(name) {
    print "Hello, " + name
}

greet("World")

# Conditional
if x > 5 {
    print "x is greater than 5"
} else {
    print "x is 5 or less"
}

# Loop
let counter = 0
while counter < 5 {
    print counter
    let counter = counter + 1
}`);

    const examples = [
        `# Fibonacci sequence
let a = 0
let b = 1
let count = 0

while count < 10 {
    print a
    let temp = a + b
    let a = b
    let b = temp
    let count = count + 1
}`,
        `# FizzBuzz-like example
for i in range(1, 16) {
    if i > 10 {
        print i + " is greater than 10"
    } else {
        print i + " is 10 or less"
    }
}`,
        `# Function example
func factorial(n) {
    let result = 1
    let i = 1
    while i < n {
        let result = result * i
        let i = i + 1
    }
    print result
}

factorial(5)
factorial(10)`
    ];

    const [exampleIndex, setExampleIndex] = useState(0);

    const handleLoadExample = () => {
        setSource(examples[exampleIndex]);
        setExampleIndex((exampleIndex + 1) % examples.length);
    };

    const handleTranspile = () => {
        transpile(source);
    };

    useEffect(() => {
        if (onTranspile) {
            onTranspile(source);
        }
    }, [pythonCode]);

    const handleCopy = () => {
        navigator.clipboard.writeText(pythonCode).then(() => {
            const copyBtn = document.getElementById('copyBtn');
            const originalText = copyBtn.innerHTML;
            copyBtn.innerHTML = '<span class="btn-icon">✓</span> Copied!';
            setTimeout(() => {
                copyBtn.innerHTML = originalText;
            }, 2000);
        });
    };

    return (
        <div className="container" id="transpiler">
            <main className="main-content">
                <div className="editor-section">
                    <div className="panel input-panel">
                        <div className="panel-header">
                            <h2>ToyLang Source Code</h2>
                            <div className="panel-actions">
                                <button className="btn btn-secondary" onClick={handleLoadExample}>Load Example</button>
                                <button className="btn btn-primary" onClick={handleTranspile} id="transpileBtn">
                                    <span className="btn-icon">↻</span>
                                    Transpile
                                </button>
                            </div>
                        </div>
                        <div className="panel-body">
                            <textarea
                                value={source}
                                onChange={(e) => setSource(e.target.value)}
                                className="code-editor"
                                spellCheck="false"
                            />
                        </div>
                    </div>

                    <div className="panel output-panel">
                        <div className="panel-header">
                            <h2>Generated Python Code</h2>
                            <div className="panel-actions">
                                <button className="btn btn-secondary" id="copyBtn" onClick={handleCopy}>
                                    <span className="btn-icon">📋</span>
                                    Copy
                                </button>
                            </div>
                        </div>
                        <div className="panel-body">
                            <pre className="code-output" style={{ color: error ? '#ef4444' : 'inherit' }}>
                                {error ? `Error: ${error}` : pythonCode || 'Click "Transpile" to generate Python code...'}
                            </pre>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Transpiler;
