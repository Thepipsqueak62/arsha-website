// In your routes.ts file, make sure you have:
export const ROUTE_PATHS = {
    PUBLIC: {
        MAINPAGE: "/",
        ABOUT: "/about-us",
        CONTACT: "/contact-us",
        PRIVACY: "/privacy-policy",
        NEWSUPDATES: "/news-updates",
        TOURNAMENTS: "/arsha/tournaments",
        TEAMS: "/arsha/esports-teams",
        STREAMS: "/arsha/streams",

    },
    ARSHAAPP: {
        DASHBOARD: "/arsha/app/dashboard",
        PROFILE: "/arsha/app/profile",
        SETTINGS: "/arsha/app/settings",
        TEAM: "/arsha/app/team-management",

    },
    AUTH: {
        SIGN_IN: "/arsha/sign-in",
        SIGN_UP: "/arsha/sign-up",
        FORGOT_PASSWORD: "/forgot-password",
        RESET_PASSWORD: "/reset-password",
    },
} as const;