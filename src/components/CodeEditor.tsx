"use client";

import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { toPng } from "html-to-image";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";
import { themes } from "@/lib/theme";
import { DownloadIcon, Eye, EyeOff } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
} from "@/components/ui/alert-dialog"
import { WiCloudUp } from "react-icons/wi";


export default function CodeEditor() {
    const [code, setCode] = useState<string>("");
    const [theme, setTheme] = useState<typeof coldarkDark>(coldarkDark);
    const [language, setLanguage] = useState<string>("javascript");
    const [fontSize, setFontSize] = useState<number>(14);
    const [isBackgroundHidden, setIsBackgroundHidden] = useState(false)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [cloudLink, setCloudLink] = useState<string>("")
    const [isCopied, setIsCopied] = useState(false)
    const [gradient, setGradient] = useState<string>("linear-gradient( 109.6deg,  rgba(204,0,0,1) 11.2%, rgba(68,0,0,1) 100.6% )")

    const exportAsImage = () => {
        const node = document.getElementById("code-preview");
        if (!node) {
            return;
        }

        toPng(node, { quality: 0.89 })
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

    const uploadToCloud = async () => {
        const node = document.getElementById("code-preview");
        if (!node) {
            return;
        }

        try {
            const dataUrl = await toPng(node);
            const blob = await fetch(dataUrl).then((res) => res.blob());

            const formData = new FormData();
            formData.append("file", blob);
            formData.append("upload_preset", "codify_preset");

            const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
                method: "POST",
                body: formData,
            });

            const result = await response.json();
            if (response.ok) {
                setCloudLink(result.secure_url);
                setIsDialogOpen(true);
            } else {
                console.error("Image upload failed:", result);
            }
        } catch (err) {
            console.error("Could not export as image or upload to Cloud", err);
        }
    };

    const handleBackgroundHidden = () => {
        setIsBackgroundHidden(!isBackgroundHidden)
    }

    const copyToClipboard = () => {
        setIsCopied(true)
        navigator.clipboard.writeText(cloudLink);
        setTimeout(() => setIsCopied(false), 1000);
    };

    return (
        <div className="flex flex-col gap-6 min-h-[90vh] items-center pb-4 justify-center dark:text-white max-sm:px-2">
            <AlertDialog open={isDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogDescription>{cloudLink}</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={copyToClipboard}>{isCopied ? 'Copied' : 'Copy'}</AlertDialogCancel>
                        <AlertDialogCancel onClick={() => setIsDialogOpen(false)}>Close</AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <div className="w-full max-w-4xl space-y-4 max-sm:space-y-4 mb-[-15px]">
                <Textarea
                    className="w-full h-40 p-4 rounded-md border dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none border-black dark:border-white bg-[#111827] text-white"
                    value={code}
                    onChange={(e) =>
                        setCode(e.target.value)
                    }
                    placeholder="Paste your code here..."

                />

                <div className="flex flex-wrap gap-4 max-sm:gap-2 items-center justify-between max-sm:justify-start pb-2">
                    <div className="flex items-center gap-2">
                        <Select
                            onValueChange={(value: string) => {
                                setTheme(themes[value]);
                            }}
                        >
                            <SelectTrigger className="w-fit text-xs text-center border-black dark:border-white">
                                <SelectValue placeholder="Select Theme" className="text-center" />
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
                        <Select
                            onValueChange={(value: string) => {
                                setLanguage(value);
                            }}
                        >
                            <SelectTrigger className="w-fit h-fit text-xs border-black dark:border-white">
                                <SelectValue placeholder="Select Language" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="javascript">JavaScript</SelectItem>
                                <SelectItem value="python">Python</SelectItem>
                                <SelectItem value="html">HTML</SelectItem>
                                <SelectItem value="css">CSS</SelectItem>
                                <SelectItem value="java">Java</SelectItem>
                                <SelectItem value="rust">Rust</SelectItem>
                                <SelectItem value="go">Go</SelectItem>
                                <SelectItem value="bash">C++</SelectItem>
                                <SelectItem value="c++">Bash</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex items-center gap-2">
                        <Select
                            onValueChange={(value: string) => {
                                setGradient(value);
                            }}
                        >
                            <SelectTrigger className="border-black dark:border-white">
                                <SelectValue placeholder="Select Gradient" />
                            </SelectTrigger>
                            <SelectContent>
                                {
                                    gradientArray.map((item, index) => (
                                        <SelectItem key={index} value={item}>
                                            <div className="w-5 h-5 rounded-full" style={{ background: item }}></div>
                                        </SelectItem>
                                    ))
                                }
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex items-center gap-2">
                        <Input
                            type="number"
                            value={fontSize}
                            onChange={(e) =>
                                setFontSize(parseInt(e.target.value, 10) || 16)
                            }
                            className="w-20 text-center h-8 font-xs border-black dark:border-white"
                        />
                    </div>

                </div>
                <div className="flex justify-end gap-3 max-sm:gap-2">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button onClick={handleBackgroundHidden} className="h-7 bg-transparent border border-black dark:border-white text-black hover:bg-gray-200 dark:hover:bg-gray-900 dark:text-white">
                                    {
                                        isBackgroundHidden ? <EyeOff className="!h-3 !w-3" /> : <Eye className="!h-3 !w-3" />
                                    }
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                {
                                    isBackgroundHidden ? <p>Show Background</p> : <p>Hide Background</p>
                                }
                            </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button onClick={exportAsImage} className="h-7 bg-transparent border border-black dark:border-white text-black hover:bg-gray-200 dark:hover:bg-gray-900 dark:text-white">
                                    <DownloadIcon className="!h-3 !w-3" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Download Image</p>
                            </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button onClick={uploadToCloud} className="h-7 bg-transparent border border-black dark:border-white text-black hover:bg-gray-200 dark:hover:bg-gray-900 dark:text-white">
                                    <WiCloudUp />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Get URL</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>

            <div
                id="code-preview"
                className={`w-fit min-w-[20vw] max-sm:w-full py-8 px-10 max-sm:px-2 max-sm:p-2 shadow-lg ${isBackgroundHidden ? '!bg-none shadow-none' : ''
                    }`}
                style={{ background: gradient }}
            >
                <div className="relative">
                    <div className="flex items-center space-x-2 mt-1 absolute left-3 top-2 z-10">
                        <span className="w-[9px] h-[9px] max-sm:w-2 max-sm:h-2 rounded-full bg-red-500"></span>
                        <span className="w-[9px] h-[9px] max-sm:w-2 max-sm:h-2 rounded-full bg-yellow-500"></span>
                        <span className="w-[9px] h-[9px] max-sm:w-2 max-sm:h-2 rounded-full bg-green-500"></span>
                    </div>

                    <SyntaxHighlighter
                        language={language}
                        style={theme}
                        customStyle={{
                            fontSize: `${fontSize}px`,
                            borderRadius: "8px",
                            padding: '45px 35px 30px 13px',
                            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.4), 0 6px 20px 0 rgba(0, 0, 0, 0.4)',
                            overflow: 'hidden',
                            opacity: 0.85
                        }}
                        wrapLongLines
                        showLineNumbers
                    >
                        {code || `import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`}
                    </SyntaxHighlighter>
                </div>
            </div>
        </div>
    );
};

const gradientArray = [
    "linear-gradient( 109.6deg,  rgba(204,0,0,1) 11.2%, rgba(68,0,0,1) 100.6% )",
    "linear-gradient( 177.5deg,  rgba(255,200,42,1) 28.3%, rgba(202,32,132,1) 79.8% )",
    "radial-gradient( circle 297px at 8% 45%,  rgba(245,234,176,1) 0%, rgba(133,239,212,1) 100.7% )",
    "radial-gradient( circle farthest-corner at 10% 20%,  rgba(56,207,191,1) 0%, rgba(10,70,147,1) 90.2% )",
    // "linear-gradient( 109.6deg,  rgba(204,0,0,1) 11.2%, rgba(68,0,0,1) 100.6% )",
]
