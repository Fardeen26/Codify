"use client"

import Link from "next/link"

export default function Header() {
    return (
        <header className="fixed top-0 w-full p-4 backdrop-blur-md bg-black/10 z-50">
            <nav className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-r from-purple-400 to-pink-600"></div>
                    <span className="dark:text-white text-black font-semibold">Codify</span>
                </div>
                <div className="dark:text-gray-300 text-black text-sm flex items-center space-x-2">
                    <p>Made with ❤️ by</p>
                    <Link
                        href={'https://fardeen.tech'}
                        target="_blank"
                        className="dark:text-white text-black hover:text-purple-400 transition-colors underline"
                    >
                        Fardeen
                    </Link>
                </div>
            </nav>
        </header>
    )
}