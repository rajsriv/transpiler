import React from 'react';

const Pipeline = ({ tokens, pythonCode, error }) => {
    const displayTokens = () => {
        if (!tokens || tokens.length === 0) return <div className="placeholder">Tokens will appear here...</div>;
        const validTokens = tokens.filter(t => t.type !== 'NEWLINE' && t.type !== 'EOF');
        return (
            <>
                {validTokens.slice(0, 20).map((token, index) => (
                    <div key={index} className="token-item">{token.type}: {token.value !== null ? `"${token.value}"` : 'null'}</div>
                ))}
                {validTokens.length > 20 && <div className="placeholder">... and more</div>}
            </>
        );
    };

    const displayAST = () => {
        if (!tokens || tokens.length === 0) return <div className="placeholder">AST will appear here...</div>;
        const statements = tokens.filter(t => 
            ['LET', 'PRINT', 'FUNC', 'IF', 'WHILE', 'FOR'].includes(t.type)
        );
        return (
            <>
                <div className="ast-item">Program Root</div>
                <div className="ast-item">├─ {statements.length} statements</div>
                {statements.slice(0, 5).map((s, index) => (
                    <div key={index} className="ast-item">├─ {s.type} statement</div>
                ))}
                {statements.length > 5 && <div className="placeholder">... and more</div>}
            </>
        );
    };

    const displayCodeGenInfo = () => {
        if (error) return <div className="ast-item" style={{ color: '#ef4444' }}>Error: {error}</div>;
        if (!pythonCode) return <div className="placeholder">Code generation info will appear here...</div>;
        const lines = pythonCode.split('\n').length;
        return (
            <>
                <div className="ast-item">✓ Code generation successful</div>
                <div className="ast-item">Generated {lines} lines of Python</div>
                <div className="ast-item">Converted ToyLang constructs:</div>
                <div className="ast-item">├─ let → variable assignment</div>
                <div className="ast-item">├─ ^ → ** (power operator)</div>
                <div className="ast-item">├─ func → def</div>
                <div className="ast-item">└─ Proper indentation applied</div>
            </>
        );
    };

    return (
        <div className="stages-section" id="pipeline">
            <h2 className="section-title">Compilation Pipeline</h2>
            <div className="stages-grid">
                <div className="stage-card">
                    <div className="stage-number">1</div>
                    <h3 className="stage-title">Tokenization</h3>
                    <p className="stage-description">
                        Breaks source code into tokens using regex patterns.
                        Identifies keywords, operators, literals, and identifiers.
                    </p>
                    <div className="stage-details" id="tokensOutput">
                        {displayTokens()}
                    </div>
                </div>

                <div className="stage-card">
                    <div className="stage-number">2</div>
                    <h3 className="stage-title">Parsing</h3>
                    <p className="stage-description">
                        Builds Abstract Syntax Tree using recursive descent parsing.
                        Handles operator precedence and validates syntax.
                    </p>
                    <div className="stage-details" id="astOutput">
                        {displayAST()}
                    </div>
                </div>

                <div className="stage-card">
                    <div className="stage-number">3</div>
                    <h3 className="stage-title">Code Generation</h3>
                    <p className="stage-description">
                        Traverses AST and emits equivalent Python code.
                        Manages indentation and converts language constructs.
                    </p>
                    <div className="stage-details" id="codegenOutput">
                        {displayCodeGenInfo()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pipeline;
