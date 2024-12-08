"use client";

import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { toPng } from "html-to-image";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";
import { themes } from "@/lib/theme";
import { Label } from "./ui/label";


export default function CodeEditor() {
    const [code, setCode] = useState<string>("");
    const [theme, setTheme] = useState<typeof vscDarkPlus>(vscDarkPlus);
    const [language, setLanguage] = useState<string>("javascript");
    const [fontSize, setFontSize] = useState<number>(16);
    const [backgroundColor, setBackgroundColor] = useState<string>("#ffffff");
    const [isBackgroundHidden, setIsBackgroundHidden] = useState(false)

    const exportAsImage = () => {
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
        <div className="flex flex-col gap-6 min-h-[90vh] items-center pb-4 justify-center dark:text-white max-sm:px-2">
            <div className="w-full max-w-4xl space-y-4 max-sm:space-y-4">
                <Textarea
                    className="w-full h-40 p-4 rounded-md border dark:text-white border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-800"
                    value={code}
                    onChange={(e) =>
                        setCode(e.target.value)
                    }
                    placeholder="Paste your code here..."

                />

                <div className="flex flex-wrap gap-4 max-sm:gap-2 items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Label className="text-[13px]">Theme:</Label>
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
                        <Label className="text-[13px]">Language:</Label>
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
                                <SelectItem value="java">Java</SelectItem>
                                <SelectItem value="rust">Rust</SelectItem>
                                <SelectItem value="go">Go</SelectItem>
                                <SelectItem value="bash">C++</SelectItem>
                                <SelectItem value="c++">Bash</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex items-center gap-2">
                        <Label className="text-[13px]">Background:</Label>
                        <Input
                            type="color"
                            value={backgroundColor}
                            onChange={(e) =>
                                setBackgroundColor(e.target.value)
                            }
                            className="w-16 h-8"
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <Label className="text-[13px]">Font Size:</Label>
                        <Input
                            type="number"
                            value={fontSize}
                            onChange={(e) =>
                                setFontSize(parseInt(e.target.value, 10) || 16)
                            }
                            className="w-16"
                        />
                    </div>

                    <Button onClick={handleBackgroundHidden} className="text-xs h-8 dark:bg-white dark:text-black dark:hover:bg-gray-100">
                        {
                            isBackgroundHidden ? 'Add Background' : 'Hide Background'
                        }
                    </Button>

                    <Button onClick={exportAsImage} className="ml-auto text-xs h-8 dark:bg-white dark:text-black dark:hover:bg-gray-100">
                        Export as Image
                    </Button>
                </div>
            </div>

            <div
                id="code-preview"
                className={`w-full max-w-4xl p-4 rounded-md border border-gray-200 dark:border-none shadow-lg relative ${isBackgroundHidden ? '!bg-transparent shadow-none border-none' : ''
                    }`}
                style={{ backgroundColor }}
            >
                <div className="flex items-center space-x-2 mt-1 absolute top-1 left-5">
                    <span className="w-[10px] h-[10px] rounded-full bg-red-500"></span>
                    <span className="w-[10px] h-[10px] rounded-full bg-yellow-500"></span>
                    <span className="w-[10px] h-[10px] rounded-full bg-green-500"></span>
                </div>

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
