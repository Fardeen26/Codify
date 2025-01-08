"use client"

import { useGradient } from "@/hooks/useGradient";
import { Select, SelectValue, SelectContent, SelectItem, SelectTrigger } from "./ui/select";
import { gradientArray } from "@/constants/gradient";
import { themes } from "@/lib/theme";
import { useTheme } from "@/hooks/useTheme";
import { useLanguage } from "@/hooks/useLanguage";
import { Input } from "./ui/input";
import { useFontSize } from "@/hooks/useFontSize";
import { Label } from "./ui/label";
import { Switch } from "@/components/ui/switch"
import { useBackground } from "@/hooks/useBackground";
import uploadToCloud from "@/utils/uploadToCloud";
import exportAsImage from "@/utils/exportAsImage";
import { useCodePreview } from "@/hooks/useCodePreview";
import PopupDialog from "./PopupDialog";
import { useState } from "react";
import { Button } from "./ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { useDarkMode } from "@/hooks/useDarkMode";


export default function Dock() {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [cloudLink, setCloudLink] = useState<string>("")
    const [isCopied, setIsCopied] = useState(false)
    const { gradient, setGradient } = useGradient();
    const { setTheme } = useTheme();
    const { setLanguage } = useLanguage();
    const { fontSize, setFontSize } = useFontSize();
    const { isBackgroundHidden, setIsBackgroundHidden } = useBackground();
    const { getPreviewRef } = useCodePreview();
    const { isDarkMode, toggleDarkMode } = useDarkMode();

    const handleExportImage = () => {
        const node = getPreviewRef();
        if (node) {
            exportAsImage(node);
        }
    };

    const handleUploadToCloud = async () => {
        const node = getPreviewRef();
        if (node) {
            try {
                const url = await uploadToCloud(node);
                setCloudLink(url);
                setIsDialogOpen(true);
            } catch (err) {
                console.error("Upload failed:", err);
            }
        }
    };

    return (
        <section className="fixed bottom-0 w-full max-sm:overflow-x-auto flex justify-center">
            <div className="flex justify-center w-fit min-w-[40vw] max-sm:min-w-full max-sm:w-full max-sm:justify-start">
                <div className="flex items-center h-20 px-10 rounded-t-xl bg-white text-black bg-opacity-10 backdrop-blur-lg border dark:border-white/20 dark:shadow-none dark:text-white">
                    <PopupDialog
                        setIsCopied={setIsCopied}
                        isCopied={isCopied}
                        cloudLink={cloudLink}
                        isDialogOpen={isDialogOpen}
                        setIsDialogOpen={setIsDialogOpen}
                    />
                    <div className="flex items-center gap-12 max-sm:gap-6">
                        <div className="space-y-1">
                            <Label className="text-xs" htmlFor="gradient">Gradient</Label>
                            <Select
                                onValueChange={(value: string) => {
                                    setGradient(value);
                                }}
                            >
                                <SelectTrigger className="border-black dark:border-white space-x-2 w-16 h-6 flex items-center justify-center">
                                    <div className="w-4 h-4 rounded-full" style={{ background: gradient }}></div>
                                </SelectTrigger>
                                <SelectContent className="!w-48">
                                    {
                                        gradientArray.map((item: { name: string; gradient: string; }, index: number) => (
                                            <SelectItem
                                                key={index}
                                                value={item.gradient}
                                                className="flex items-center gap-2 whitespace-nowrap relative"
                                            >
                                                <div className="min-w-[20px] h-5 rounded-full shrink-0" style={{ background: item.gradient }}>
                                                    <span className="absolute ml-7 text-xs inline-block">{item.name}</span>
                                                </div>
                                            </SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-1">
                            <Label className="text-xs" htmlFor="theme">Theme</Label>
                            <Select
                                onValueChange={(value: string) => {
                                    setTheme(themes[value]);
                                }}
                            >
                                <SelectTrigger className="w-28 h-6 text-xs text-center border-black dark:border-white">
                                    <SelectValue placeholder="ColdarkDark" className="text-center" />
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
                        <div className="space-y-1">
                            <Label className="text-xs" htmlFor="language">Language</Label>
                            <Select
                                onValueChange={(value: string) => {
                                    setLanguage(value);
                                }}
                            >
                                <SelectTrigger className="w-[100px] h-6 text-xs border-black dark:border-white">
                                    <SelectValue placeholder="JavaScript" />
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
                        <div className="space-y-1">
                            <Label className="text-xs" htmlFor="fontSize">Font Size</Label>
                            <Input
                                type="number"
                                value={fontSize}
                                onChange={(e) =>
                                    setFontSize(parseInt(e.target.value, 10) || 16)
                                }
                                className="w-16 text-center h-6 font-xs border-black dark:border-white"
                            />
                        </div>
                        <div className="space-y-1 flex flex-col mb-[-5px]">
                            <Label className="text-xs">Export</Label>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="px-3 py-1 text-xs h-6 bg-transparent border-black dark:border-white">
                                        Export
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem onClick={handleExportImage}>
                                        Download Image
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={handleUploadToCloud}>
                                        Get URL
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <div className="space-y-1 flex flex-col">
                            <Label className="text-xs" htmlFor="darkMode">Background</Label>
                            <Switch checked={isBackgroundHidden} onCheckedChange={setIsBackgroundHidden} className="dark:data-[state=checked]:bg-blue-500" />
                        </div>
                        <div className="space-y-1 flex flex-col">
                            <Label className="text-xs" htmlFor="darkMode">Dark Mode</Label>
                            <Switch checked={isDarkMode} onCheckedChange={toggleDarkMode} className="data-[state=checked]:bg-blue-500 data-[state=unchecked]:bg-black" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}