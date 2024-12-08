/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
    coy,
    coldarkDark,
    nightOwl,
    vscDarkPlus,
    materialLight,
    materialDark,
    oneLight,
    oneDark,
    synthwave84,
    twilight,
    solarizedlight,
    duotoneSpace,
    duotoneForest,
    coldarkCold
} from "react-syntax-highlighter/dist/esm/styles/prism";
//  
import { toPng } from "html-to-image";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";

const themes: Record<string, any> = {
    coldarkDark,
    nightOwl,
    vscDarkPlus,
    materialLight,
    materialDark,
    oneLight,
    oneDark,
    synthwave84,
    coy,
    twilight,
    solarizedlight,
    duotoneSpace,
    duotoneForest,
    coldarkCold
};

const CodeEditor: React.FC = () => {
    const [code, setCode] = useState<string>("");
    const [theme, setTheme] = useState<typeof vscDarkPlus>(vscDarkPlus);
    const [language, setLanguage] = useState<string>("javascript");
    const [fontSize, setFontSize] = useState<number>(16);
    const [backgroundColor, setBackgroundColor] = useState<string>("#ffffff");
    const [isBackgroundHidden, setIsBackgroundHidden] = useState(false)

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

    const handleBackgroundHidden = () => {
        setIsBackgroundHidden(!isBackgroundHidden)
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen flex flex-col gap-6 items-center justify-center">
            <div className="w-full max-w-4xl space-y-4">
                <Textarea
                    className="w-full h-40 p-4 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono text-gray-800"
                    value={code}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                        setCode(e.target.value)
                    }
                    placeholder="Paste your code here..."

                />

                <div className="flex flex-wrap gap-4 items-center justify-between">
                    <div className="flex items-center gap-2">
                        <label className="text-sm font-medium text-gray-600">Theme:</label>
                        <Select
                            onValueChange={(value: string) => {
                                setTheme(themes[value]);
                            }}
                        >
                            <SelectTrigger className="w-40">
                                <SelectValue placeholder="Select Theme" />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.keys(themes).map((themeName) => (
                                    <SelectItem key={themeName} value={themeName}>
                                        {themeName}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex items-center gap-2">
                        <label className="text-sm font-medium text-gray-600">
                            Language:
                        </label>
                        <Select
                            onValueChange={(value: string) => {
                                setLanguage(value);
                            }}
                        >
                            <SelectTrigger className="w-40">
                                <SelectValue placeholder="Select Language" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="javascript">JavaScript</SelectItem>
                                <SelectItem value="python">Python</SelectItem>
                                <SelectItem value="html">HTML</SelectItem>
                                <SelectItem value="c++">C++</SelectItem>
                                <SelectItem value="java">Java</SelectItem>
                                <SelectItem value="rust">Rust</SelectItem>
                                <SelectItem value="go">Go</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex items-center gap-2">
                        <label className="text-sm font-medium text-gray-600">
                            Background:
                        </label>
                        <input
                            type="color"
                            value={backgroundColor}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setBackgroundColor(e.target.value)
                            }
                            className="w-10 h-10 border rounded-md cursor-pointer"
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <label className="text-sm font-medium text-gray-600">
                            Font Size:
                        </label>
                        <Input
                            type="number"
                            value={fontSize}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setFontSize(parseInt(e.target.value, 10) || 16)
                            }
                            className="w-20"
                        />
                    </div>

                    <Button onClick={handleBackgroundHidden}>
                        {
                            isBackgroundHidden ? 'Add Background' : 'Hide Background'
                        }
                    </Button>

                    <Button onClick={exportAsImage} className="ml-auto">
                        Export as Image
                    </Button>
                </div>
            </div>

            <div
                id="code-preview"
                className={`w-full max-w-4xl p-4 rounded-md border border-gray-200 shadow-lg ${isBackgroundHidden ? '!bg-transparent shadow-none border-none' : ''}`}
                style={{ backgroundColor }}
            >
                <SyntaxHighlighter
                    language={language}
                    style={theme}
                    customStyle={{
                        fontSize: `${fontSize}px`,
                        borderRadius: "8px",
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                        overflow: "hidden",
                        display: "block",
                    }}
                >
                    {code || "// Your code will appear here..."}
                </SyntaxHighlighter>
            </div>



        </div>
    );
};

export default CodeEditor;
