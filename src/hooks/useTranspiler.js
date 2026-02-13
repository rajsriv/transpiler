import { useState, useCallback } from 'react';

const TokenType = {
    LET: 'LET',
    PRINT: 'PRINT',
    FUNC: 'FUNC',
    IF: 'IF',
    ELSE: 'ELSE',
    WHILE: 'WHILE',
    FOR: 'FOR',
    IN: 'IN',
    RANGE: 'RANGE',
    IDENTIFIER: 'IDENTIFIER',
    NUMBER: 'NUMBER',
    STRING: 'STRING',
    PLUS: 'PLUS',
    MINUS: 'MINUS',
    MULTIPLY: 'MULTIPLY',
    DIVIDE: 'DIVIDE',
    POWER: 'POWER',
    ASSIGN: 'ASSIGN',
    EQUALS: 'EQUALS',
    NOT_EQUALS: 'NOT_EQUALS',
    LESS_THAN: 'LESS_THAN',
    GREATER_THAN: 'GREATER_THAN',
    LPAREN: 'LPAREN',
    RPAREN: 'RPAREN',
    LBRACE: 'LBRACE',
    RBRACE: 'RBRACE',
    COMMA: 'COMMA',
    NEWLINE: 'NEWLINE',
    EOF: 'EOF',
    COMMENT: 'COMMENT'
};

class Token {
    constructor(type, value, line, column) {
        this.type = type;
        this.value = value;
        this.line = line;
        this.column = column;
    }
}

class Tokenizer {
    constructor(source) {
        this.source = source;
        this.position = 0;
        this.line = 1;
        this.column = 1;
        this.tokens = [];
    }

    tokenize() {
        const patterns = [
            { type: TokenType.COMMENT, regex: /#[^\n]*/ },
            { type: TokenType.LET, regex: /\blet\b/ },
            { type: TokenType.PRINT, regex: /\bprint\b/ },
            { type: TokenType.FUNC, regex: /\bfunc\b/ },
            { type: TokenType.IF, regex: /\bif\b/ },
            { type: TokenType.ELSE, regex: /\belse\b/ },
            { type: TokenType.WHILE, regex: /\bwhile\b/ },
            { type: TokenType.FOR, regex: /\bfor\b/ },
            { type: TokenType.IN, regex: /\bin\b/ },
            { type: TokenType.RANGE, regex: /\brange\b/ },
            { type: TokenType.STRING, regex: /"[^"]*"/ },
            { type: TokenType.NUMBER, regex: /\d+\.?\d*/ },
            { type: TokenType.IDENTIFIER, regex: /[a-zA-Z_][a-zA-Z0-9_]*/ },
            { type: TokenType.EQUALS, regex: /==/ },
            { type: TokenType.NOT_EQUALS, regex: /!=/ },
            { type: TokenType.POWER, regex: /\^/ },
            { type: TokenType.PLUS, regex: /\+/ },
            { type: TokenType.MINUS, regex: /-/ },
            { type: TokenType.MULTIPLY, regex: /\*/ },
            { type: TokenType.DIVIDE, regex: /\// },
            { type: TokenType.ASSIGN, regex: /=/ },
            { type: TokenType.LESS_THAN, regex: /</ },
            { type: TokenType.GREATER_THAN, regex: />/ },
            { type: TokenType.LPAREN, regex: /\(/ },
            { type: TokenType.RPAREN, regex: /\)/ },
            { type: TokenType.LBRACE, regex: /\{/ },
            { type: TokenType.RBRACE, regex: /\}/ },
            { type: TokenType.COMMA, regex: /,/ },
            { type: TokenType.NEWLINE, regex: /\n/ }
        ];

        while (this.position < this.source.length) {
            if (/[ \t\r]/.test(this.source[this.position])) {
                this.column++;
                this.position++;
                continue;
            }

            let matched = false;
            for (const pattern of patterns) {
                const regex = new RegExp('^' + pattern.regex.source);
                const match = this.source.slice(this.position).match(regex);

                if (match) {
                    const value = match[0];
                    if (pattern.type === TokenType.COMMENT) {
                        this.position += value.length;
                        this.column += value.length;
                        matched = true;
                        break;
                    }

                    const token = new Token(pattern.type, value, this.line, this.column);
                    this.tokens.push(token);
                    this.position += value.length;

                    if (pattern.type === TokenType.NEWLINE) {
                        this.line++;
                        this.column = 1;
                    } else {
                        this.column += value.length;
                    }

                    matched = true;
                    break;
                }
            }

            if (!matched) {
                throw new Error(`Unexpected character '${this.source[this.position]}' at line ${this.line}, column ${this.column}`);
            }
        }

        this.tokens.push(new Token(TokenType.EOF, null, this.line, this.column));
        return this.tokens;
    }
}

function generatePythonCode(tokens) {
    let output = '# Generated Python code from ToyLang\n';
    output += '# Transpiled by ToyLang Transpiler\n\n';
    
    let indent = 0;
    let i = 0;
    
    while (i < tokens.length) {
        const token = tokens[i];
        if (token.type === TokenType.NEWLINE || token.type === TokenType.EOF) {
            i++;
            continue;
        }
        
        if (token.type === TokenType.LET) {
            i++;
            const varName = tokens[i].value;
            i++; i++;
            output += '    '.repeat(indent) + varName + ' = ';
            while (i < tokens.length && tokens[i].type !== TokenType.NEWLINE && tokens[i].type !== TokenType.EOF) {
                if (tokens[i].type === TokenType.POWER) output += '**';
                else if (tokens[i].type === TokenType.STRING) output += tokens[i].value;
                else if (tokens[i].type === TokenType.IDENTIFIER || tokens[i].type === TokenType.NUMBER) output += tokens[i].value;
                else if ([TokenType.PLUS, TokenType.MINUS, TokenType.MULTIPLY, TokenType.DIVIDE].includes(tokens[i].type)) output += ' ' + tokens[i].value + ' ';
                else if (tokens[i].type === TokenType.LPAREN) output += '(';
                else if (tokens[i].type === TokenType.RPAREN) output += ')';
                i++;
            }
            output += '\n';
        } else if (token.type === TokenType.PRINT) {
            i++;
            output += '    '.repeat(indent) + 'print(';
            while (i < tokens.length && tokens[i].type !== TokenType.NEWLINE && tokens[i].type !== TokenType.EOF) {
                if (tokens[i].type === TokenType.STRING) output += tokens[i].value;
                else if (tokens[i].type === TokenType.IDENTIFIER || tokens[i].type === TokenType.NUMBER) output += tokens[i].value;
                else if (tokens[i].type === TokenType.PLUS) output += ' + ';
                else if (tokens[i].type === TokenType.POWER) output += ' ** ';
                i++;
            }
            output += ')\n';
        } else if (token.type === TokenType.FUNC) {
            i++;
            const funcName = tokens[i].value;
            i++; i++;
            output += '    '.repeat(indent) + 'def ' + funcName + '(';
            const params = [];
            while (tokens[i].type !== TokenType.RPAREN) {
                if (tokens[i].type === TokenType.IDENTIFIER) params.push(tokens[i].value);
                i++;
            }
            output += params.join(', ') + '):\n';
            i++; i++;
            indent++;
        } else if (token.type === TokenType.IF) {
            i++;
            output += '    '.repeat(indent) + 'if ';
            while (i < tokens.length && tokens[i].type !== TokenType.LBRACE) {
                if (tokens[i].type === TokenType.IDENTIFIER || tokens[i].type === TokenType.NUMBER) output += tokens[i].value;
                else if ([TokenType.GREATER_THAN, TokenType.LESS_THAN, TokenType.EQUALS].includes(tokens[i].type)) output += ' ' + tokens[i].value + ' ';
                i++;
            }
            output += ':\n';
            i++;
            indent++;
        } else if (token.type === TokenType.ELSE) {
            indent--;
            output += '    '.repeat(indent) + 'else:\n';
            i++; i++;
            indent++;
        } else if (token.type === TokenType.WHILE) {
            i++;
            output += '    '.repeat(indent) + 'while ';
            while (i < tokens.length && tokens[i].type !== TokenType.LBRACE) {
                if (tokens[i].type === TokenType.IDENTIFIER || tokens[i].type === TokenType.NUMBER) output += tokens[i].value;
                else if ([TokenType.GREATER_THAN, TokenType.LESS_THAN, TokenType.EQUALS].includes(tokens[i].type)) output += ' ' + tokens[i].value + ' ';
                i++;
            }
            output += ':\n';
            i++;
            indent++;
        } else if (token.type === TokenType.FOR) {
            i++;
            const varName = tokens[i].value;
            i++; i++; i++; i++;
            output += '    '.repeat(indent) + 'for ' + varName + ' in range(';
            while (tokens[i].type !== TokenType.RPAREN) {
                if (tokens[i].type === TokenType.NUMBER) output += tokens[i].value;
                else if (tokens[i].type === TokenType.COMMA) output += ', ';
                i++;
            }
            output += '):\n';
            i++; i++;
            indent++;
        } else if (token.type === TokenType.RBRACE) {
            indent--;
            i++;
        } else if (token.type === TokenType.IDENTIFIER && i + 1 < tokens.length && tokens[i + 1].type === TokenType.LPAREN) {
            const funcName = token.value;
            i++; i++;
            output += '    '.repeat(indent) + funcName + '(';
            while (tokens[i].type !== TokenType.RPAREN) {
                if (tokens[i].type === TokenType.STRING || tokens[i].type === TokenType.NUMBER) output += tokens[i].value;
                else if (tokens[i].type === TokenType.COMMA) output += ', ';
                i++;
            }
            output += ')\n';
            i++;
        } else {
            i++;
        }
    }
    return output;
}

export const useTranspiler = () => {
    const [tokens, setTokens] = useState([]);
    const [pythonCode, setPythonCode] = useState('');
    const [error, setError] = useState(null);

    const transpile = useCallback((source) => {
        try {
            setError(null);
            const tokenizer = new Tokenizer(source);
            const tokenList = tokenizer.tokenize();
            setTokens(tokenList);
            
            const code = generatePythonCode(tokenList);
            setPythonCode(code);
        } catch (err) {
            setError(err.message);
            setPythonCode('');
            setTokens([]);
        }
    }, []);

    return { tokens, pythonCode, error, transpile, TokenType };
};
