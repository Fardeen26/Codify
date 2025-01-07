"use client"

import GradientProvider from "@/context/gradientContext";
import DarkModeProvider from "./DarkModeProvider";
import ThemeProvider from "@/context/themeContext";
import LanguageProvider from "@/context/languageContext";
import FontSizeProvider from "@/context/fontSizeContext";
import { BackgroundProvider } from "@/context/backgroundContext";
import { CodePreviewProvider } from "@/context/codePreviewContext";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <GradientProvider>
            <ThemeProvider>
                <LanguageProvider>
                    <FontSizeProvider>
                        <DarkModeProvider>
                            <BackgroundProvider>
                                <CodePreviewProvider>
                                    {children}
                                </CodePreviewProvider>
                            </BackgroundProvider>
                        </DarkModeProvider>
                    </FontSizeProvider>
                </LanguageProvider>
            </ThemeProvider>
        </GradientProvider>
    );
}