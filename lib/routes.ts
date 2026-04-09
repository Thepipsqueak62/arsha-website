// In your routes.ts file, make sure you have:
export const ROUTE_PATHS = {
    PUBLIC: {
        MAINPAGE: "/",
        ABOUT: "/about-us",
        CONTACT: "/contact-us",
        PRIVACY: "/privacy-policy",
        BLOG: "/blog",
        FEATURES: "/features",
        TOURNAMENTNEWS: "/tournament-news",
        NEWSUPDATES: "/news-updates",

    },
    APP: {
        DASHBOARD: "/dashboard",
        PROFILE: "/profile",
        TEST: "/test",
        SETTINGS: "/settings",
    },
    AUTH: {
        SIGN_IN: "/signin",
        SIGN_UP: "/sign-up",
        FORGOT_PASSWORD: "/forgot-password",
        RESET_PASSWORD: "/reset-password",
    },
} as const;