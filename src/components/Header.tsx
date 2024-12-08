"use client"

import { useDarkMode } from "@/hooks/useDarkMode";
import { GithubIcon, MoonStar, SunIcon, Twitter } from "lucide-react";
import Link from "next/link";

export default function Header() {
    const { isDarkMode, toggleDarkMode } = useDarkMode()
    return (
        <header className="p-3 flex justify-end pr-8 pt-6">
            <nav>
                <div className='flex items-center dark:text-white gap-4'>
                    <button onClick={toggleDarkMode}>
                        {isDarkMode ? <MoonStar className='w-[18px] h-[18px] max-sm:w-[14px] max-sm:h-[14px] hover:scale-105 transition-all' /> : <SunIcon className='w-5 h-5 max-sm:w-[15px] max-sm:h-[15px] hover:scale-105 transition-all' />}
                    </button>
                    <Link href={'https://github.com/Fardeen26'} target="_blank">
                        <GithubIcon className="w-[18px] h-[18px] max-sm:w-[14px] max-sm:h-[14px] hover:scale-105 transition-all" />
                    </Link>
                    <Link href={'https://x.com/fardeen14693425'} target="_blank">
                        <Twitter className="w-[18px] h-[18px] max-sm:w-[14px] max-sm:h-[14px] hover:scale-105 transition-all" />
                    </Link>
                </div>
            </nav>
        </header>
    )
}