/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                border: "var(--border)",
                input: "var(--input)",
                ring: "var(--ring)",
                background: "var(--background)",
                foreground: "var(--foreground)",
                primary: "rgb(var(--primary-rgb) / <alpha-value>)",
                "primary-foreground": "var(--primary-foreground)",
                secondary: "var(--secondary)",
                "secondary-foreground": "var(--secondary-foreground)",
                destructive: "var(--destructive)",
                "destructive-foreground": "var(--destructive-foreground)",
                muted: "var(--muted)",
                "muted-foreground": "var(--muted-foreground)",
                accent: "var(--accent)",
                "accent-foreground": "var(--accent-foreground)",
                popover: "var(--popover)",
                "popover-foreground": "var(--popover-foreground)",
                card: "var(--card)",
                "card-foreground": "var(--card-foreground)",
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
        },
    },
    plugins: [],
}
