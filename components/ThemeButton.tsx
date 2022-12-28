"use client"
import { useTheme } from 'next-themes'
import { SunIcon } from '@heroicons/react/24/solid'
import { MoonIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'

const ThemeButton = () => {
    const [mounted, setMounted] = useState(false)
    const { resolvedTheme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    return (
        <button
            aria-label='Toggle Dark Mode'
            type='button'
            className='flex items-center justify-center p-4 transition-colors'
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
        >
            {resolvedTheme === 'dark' ? (
                <SunIcon className="h-16 w-16 text-orange-300" />
            ) : (
                <MoonIcon className="h-16 w-16 text-slate-800" />
            )}
        </button>
    );
}

export default ThemeButton;