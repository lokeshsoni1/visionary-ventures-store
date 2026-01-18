import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        electric: {
          DEFAULT: "hsl(var(--electric-blue))",
          50: "hsl(195 100% 95%)",
          100: "hsl(195 100% 90%)",
          200: "hsl(195 100% 80%)",
          300: "hsl(195 100% 70%)",
          400: "hsl(195 100% 60%)",
          500: "hsl(195 100% 50%)",
          600: "hsl(195 100% 40%)",
          700: "hsl(195 100% 30%)",
          800: "hsl(195 100% 20%)",
          900: "hsl(195 100% 10%)",
        },
        cosmic: {
          DEFAULT: "hsl(var(--cosmic-purple))",
          50: "hsl(271 76% 95%)",
          100: "hsl(271 76% 90%)",
          200: "hsl(271 76% 80%)",
          300: "hsl(271 76% 70%)",
          400: "hsl(271 76% 60%)",
          500: "hsl(271 76% 53%)",
          600: "hsl(271 76% 40%)",
          700: "hsl(271 76% 30%)",
          800: "hsl(271 76% 20%)",
          900: "hsl(271 76% 10%)",
        },
        space: {
          DEFAULT: "hsl(var(--deep-space))",
          light: "hsl(240 10% 12%)",
          dark: "hsl(240 10% 2%)",
        },
      },
      fontFamily: {
        display: ["Orbitron", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "calc(var(--radius) + 4px)",
        "2xl": "calc(var(--radius) + 8px)",
        "3xl": "calc(var(--radius) + 16px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "slide-in-left": {
          "0%": { opacity: "0", transform: "translateX(-50px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "slide-in-right": {
          "0%": { opacity: "0", transform: "translateX(50px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px) rotateY(0deg)" },
          "50%": { transform: "translateY(-10px) rotateY(5deg)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 30px hsl(var(--electric-blue) / 0.4)" },
          "50%": { boxShadow: "0 0 60px hsl(var(--electric-blue) / 0.7)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        "rotate-slow": {
          from: { transform: "rotateY(0deg)" },
          to: { transform: "rotateY(360deg)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s ease-out forwards",
        "fade-in-up": "fade-in-up 0.8s ease-out forwards",
        "scale-in": "scale-in 0.5s ease-out forwards",
        "slide-in-left": "slide-in-left 0.6s ease-out forwards",
        "slide-in-right": "slide-in-right 0.6s ease-out forwards",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 8s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        shimmer: "shimmer 3s ease-in-out infinite",
        "rotate-slow": "rotate-slow 20s linear infinite",
        "spin-slow": "spin-slow 30s linear infinite",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-primary": "linear-gradient(135deg, hsl(var(--electric-blue)) 0%, hsl(var(--cosmic-purple)) 100%)",
        "gradient-glow": "radial-gradient(circle, hsl(var(--electric-blue) / 0.3) 0%, transparent 70%)",
      },
      boxShadow: {
        glow: "0 0 40px hsl(var(--electric-blue) / 0.4)",
        "glow-lg": "0 0 60px hsl(var(--electric-blue) / 0.5)",
        "glow-purple": "0 0 40px hsl(var(--cosmic-purple) / 0.4)",
        elevated: "0 25px 50px -12px rgba(0, 0, 0, 0.8)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
