"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, ChangeEvent } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
    dracula,
    coy,
    a11yDark,
    atomDark,
    coldarkDark,
    nightOwl,
    vscDarkPlus,
    funky,
    darcula,
    holiTheme,
    materialLight,
    materialDark,
    oneLight,
    oneDark,
    synthwave84,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { toPng } from "html-to-image";

type Theme = Record<string, any>;

const themes: Record<string, Theme> = {
    a11yDark,
    atomDark,
    coldarkDark,
    nightOwl,
    vscDarkPlus,
    funky,
    darcula,
    materialLight,
    materialDark,
    oneLight,
    oneDark,
    synthwave84,
    coy,
    holiTheme,
};

const CodeEditor: React.FC = () => {
    const [code, setCode] = useState<string>("");
    const [theme, setTheme] = useState<Theme>(dracula);
    const [language, setLanguage] = useState<string>("javascript");
    const [fontSize, setFontSize] = useState<number>(16);

    const exportAsImage = (): void => {
        const node = document.getElementById("code-preview");
        if (!node) {
            return;
        }

        toPng(node)
            .then((dataUrl) => {
                const link = document.createElement("a");
                link.download = "code.png";
                link.href = dataUrl;
                link.click();
            })
            .catch((err) => {
                console.error("Could not export as image", err);
            });
    };

    const handleThemeChange = (e: ChangeEvent<HTMLSelectElement>): void => {
        setTheme(themes[e.target.value]);
    };

    const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>): void => {
        setLanguage(e.target.value);
    };

    const handleFontSizeChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setFontSize(parseInt(e.target.value, 10) || 16);
    };

    return (
        <div style={{ padding: "20px" }}>
            {/* Input Area */}
            <textarea
                style={{
                    width: "100%",
                    height: "150px",
                    fontSize: `${fontSize}px`,
                    fontFamily: "monospace",
                    marginBottom: "20px",
                }}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Paste your code here..."
            />

            {/* Customization Options */}
            <div style={{ marginBottom: "20px" }}>
                <label>
                    Theme:
                    <select
                        onChange={handleThemeChange}
                        style={{ marginLeft: "10px" }}
                    >
                        {Object.keys(themes).map((themeName) => (
                            <option key={themeName} value={themeName}>
                                {themeName}
                            </option>
                        ))}
                    </select>
                </label>
                <label style={{ marginLeft: "20px" }}>
                    Language:
                    <select onChange={handleLanguageChange}>
                        <option value="javascript">JavaScript</option>
                        <option value="python">Python</option>
                        <option value="html">HTML</option>
                        <option value="c++">C++</option>
                        <option value="java">Java</option>
                        <option value="rust">Rust</option>
                        <option value="go">Go</option>
                    </select>
                </label>
                <label style={{ marginLeft: "20px" }}>
                    Font Size:
                    <input
                        type="number"
                        value={fontSize}
                        onChange={handleFontSizeChange}
                        style={{ width: "50px", marginLeft: "5px" }}
                    />
                </label>
            </div>

            {/* Styled Code Preview */}
            <button onClick={exportAsImage}>Export as Image</button>
            <div id="code-preview">
                <SyntaxHighlighter
                    language={language}
                    style={theme}
                    customStyle={{ fontSize: `${fontSize}px`, borderRadius: "8px" }}
                >
                    {code || "// Your code will appear here..."}
                </SyntaxHighlighter>
            </div>
        </div>
    );
};

export default CodeEditor;
