# Adding Dark Mode to your Next.js 13 app using TailwindCSS and Next-themes

Lets face it, dark mode is cool! So lets add it to a basic "hello world" application to see how it is done and then you can re-use the components to achieve the same effect in your larger apps.

This application will use `Next.js v13`, `TailwindCSS` and `Next-themes`.

Follow the steps below to scaffold a basic `Next.js v13` application, add & configure `TailwindCSS` and `next-themes`, then finally add the required components to provide the global theme switch to our application.

1. Create a Next.js 13 app using TypeScript and ESLint, plus enabling the experimental `/app` folder:

    ```ps1
    npx create-next-app@latest --typescript --eslint --experimental-app --use-npm
    ```

2. Follow the prompt to provide a `name` for the app
3. Once everything has been set up, CD in to your app folder:

    ```ps1
    cd <your-app-name>
    ```

4. You can start and test your app by running:

    ```ps1
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see your app.

5. Install `tailwindCss`, `postcss` and `autoprefixer`:

    ```ps1
    npm install -D tailwindcss postcss autoprefixer
    ```

6. Initialize tailwind. This will generate the `tailwind.config.js` and `postcss.config.js` files:

    ```ps1
    npx tailwindcss init -p
    ```

7. Add the following to the `content` node in `tailwind.config.js`:

    ```tsx
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}"
    ],
    ```

    This lets TailwindCSS look at the content paths above to generate the final CSS code.

8. Add the Tailwind directives to your CSS `./app/globals.css` file

    ```css
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    ```

9. Remove all the default styling code from `./app/globals.css`
10. Remove all the default styling code from `./app/page.module.css`
11. Remove all the default content from `./app/page.tsx` and add the following:

    ```tsx
    export default function Home() {
      return (
        <main className="flex flex-col justify-between items-center text-center p-24">
          <div className="font-bold text-4xl m-4">Hello world!</div>
        </main>
      )
    }
    ```

12. Run your app:

    ```ps1
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see your app.

    Make sure you can see the simple `Hello world!` message and that your TailwindCSS styling is working.

13. Install `next-themes` - this package provides the abstractions we need to switch between light and dark themes.

    ```ps1
    npm i next-themes
    ```

14. In your `tailwind.config.js`, set the dark mode property to `class`:

    ```tsx
    module.exports = {
      darkMode: 'class'
    }
    ```

15. Create a new `components` folder.

    We can keep all our reusable components in a separate area away from the application pages and API endpoints.

16. Add a new client-component `AppThemeProvider.tsx` in `./components` folder

    ```tsx
    "use client";
    import React from "react";
    import { ThemeProvider } from "next-themes";

    const AppThemeProvider = ({ children }: { children: React.ReactNode }) => {
        return (
            <ThemeProvider attribute="class">{children}</ThemeProvider>
        );
    }

    export default AppThemeProvider;
    ```

17. Add `AppThemeProvider` to `./app/layout.tsx`:

    ```tsx
    ...
    <body>
      <AppThemeProvider>
        {children}
      </AppThemeProvider>
    </body>
    ...
    ```

18. Install `heroicons` - so that we can make an awesome button that shows a sun or moon depending on the current theme.

    ```ps1
    npm install @heroicons/react
    ```

19. Add a new client-component called `ThemeButton.tsx` to `./components`:

    ```tsx
    "use client"
    import { useTheme } from 'next-themes'
    import { SunIcon } from '@heroicons/react/24/solid'
    import { MoonIcon } from '@heroicons/react/24/solid'
    import { useEffect, useState } from 'react'

    const ThemeButton = () => {
        const [ mounted, setMounted ] = useState(false)
        const { resolvedTheme, setTheme } = useTheme();

        // useEffect only runs on the client, so now we can safely show the UI
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
    ```

    This button is responsible for switching between light and dark themes using the `setTheme` method from `next-themes`.

    Instead of checking the `theme` value we check `resolvedTheme` instead. The `theme` value can be `light`, `dark` or `system`. So when the system preference is set to `system` we don't actually know which theme to use. `resolvedTheme` provides the resolved system preferred theme (`light` or `dark`).

    The selected theme is also persisted in local storage, so it will work across multiple tabs or windows.

20. Add `ThemeButton` to your main / layout page to test:

    ```tsx
    <ThemeButton/>
    ```

21. Run your project and test out the theme switching button.

✅ DONE!
