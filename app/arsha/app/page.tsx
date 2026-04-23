import Link from "next/link"

export default function ArshaPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center px-6 text-white" style={{ background: "#0a0a0f" }}>

            {/* Logo */}
            <div
                className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl text-lg font-bold text-white"
                style={{ background: "#7F77DD" }}
            >
                AE
            </div>

            {/* Heading */}
            <h1 className="mb-3 text-center text-4xl font-bold tracking-tight">
                Welcome to{" "}
                <span style={{ color: "#7F77DD" }}>Arsha App</span>
            </h1>

            <p className="mb-2 max-w-lg text-center text-base" style={{ color: "rgba(255,255,255,0.5)" }}>
                The competitive esports platform for serious players. Build your
                professional profile, compete in tournaments, and connect with elite
                teams across Valorant, Apex Legends, and more.
            </p>

            {/* Feature pills */}
            <div className="mb-10 mt-6 flex flex-wrap justify-center gap-2">
                {["Player profiles", "Clip sharing", "tournaments", "Team finder", "Live feed"].map(f => (
                    <span
                        key={f}
                        className="rounded-full px-3 py-1 text-xs font-medium"
                        style={{
                            background: "rgba(127,119,221,0.12)",
                            color: "#a49ef0",
                            border: "0.5px solid rgba(127,119,221,0.25)",
                        }}
                    >
            {f}
          </span>
                ))}
            </div>

            {/* CTAs */}
            <div className="flex gap-3">
                <Link
                    href="/arsha/sign-up"
                    className="rounded-lg px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                    style={{ background: "#7F77DD" }}
                >
                    Get started
                </Link>
                <Link
                    href="/arsha/sign-in"
                    className="rounded-lg px-6 py-2.5 text-sm font-medium transition-colors"
                    style={{
                        background: "rgba(127,119,221,0.1)",
                        color: "rgba(255,255,255,0.7)",
                        border: "0.5px solid rgba(127,119,221,0.25)",
                    }}
                >
                    Sign in
                </Link>
            </div>

            {/* Back to main site */}
            <Link
                href="/"
                className="mt-10 text-xs transition-colors hover:underline"
                style={{ color: "rgba(255,255,255,0.25)" }}
            >
                ← Back to Arsha Esports
            </Link>

        </div>
    )
}