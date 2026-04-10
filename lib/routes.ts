// In your routes.ts file, make sure you have:
export const ROUTE_PATHS = {
    PUBLIC: {
        MAINPAGE: "/",
        ABOUT: "/esports/about-us",
        CONTACT: "/contact-us",
        PRIVACY: "/privacy-policy",
        BLOG: "/blog",
        FEATURES: "esports/features",
        TOURNAMENTNEWS: "/tournament-news",
        NEWSUPDATES: "/news-updates",
        HELPPAGE: "/help",

    },
    ARSHAAPP: {
        DASHBOARD: "/arsha-app/dashboard",
        PROFILE: "/arsha-app/profile",
        TEST: "/test",
        SETTINGS: "/arsha-app/settings",
    },
    AUTH: {
        SIGN_IN: "/arsha-app/sign-in",
        SIGN_UP: "/arsha-app/sign-up",
        FORGOT_PASSWORD: "/forgot-password",
        RESET_PASSWORD: "/reset-password",
    },
} as const;