"use client"

import { DarkModeContext } from "@/context/darkModeContext";
import { ReactNode, useEffect, useState } from "react";

interface DarkModeProviderProps {
    children: ReactNode;
}

const DarkModeProvider: React.FC<DarkModeProviderProps> = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState<boolean | null>(false);

    useEffect(() => {
        const storedPreference = localStorage.getItem("theme");
        const prefersDarkMode = storedPreference === "dark";

        setIsDarkMode(prefersDarkMode);

        if (prefersDarkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }

        document.documentElement.style.overflowY = 'auto';
    }, []);

    const toggleDarkMode = () => {
        setIsDarkMode((prev) => {
            const newValue = !prev;
            localStorage.setItem("theme", newValue ? "dark" : "light");
            document.documentElement.classList.toggle("dark", newValue);
            return newValue;
        });
    };

    if (isDarkMode === null) {
        return null;
    }

    return (
        <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
};

export default DarkModeProvider;