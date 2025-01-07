import { createContext, useState } from "react";

type GradientContextType = {
    gradient: string;
    setGradient: (gradient: string) => void;
};

export const GradientContext = createContext<GradientContextType | undefined>(undefined);

export default function GradientProvider({ children }:
    { children: React.ReactNode }
) {
    const [gradient, setGradient] = useState("radial-gradient( circle farthest-corner at 10% 20%,  rgba(56,207,191,1) 0%, rgba(10,70,147,1) 90.2% )");
    return <GradientContext.Provider value={{ gradient, setGradient }}>{children}</GradientContext.Provider>;
};
