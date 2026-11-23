"use client";

import { useState } from "react";
import { Search, Clock, Trophy, Flame, ChevronRight, Shield, Swords } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// ── Types ────────────────────────────────────────────────────────────────────


// ── Page ─────────────────────────────────────────────────────────────────────

export default function TournamentMatchesPage() {



    return (
        <div className="min-h-screen bg-[#080b12] text-white">
            <span className={"text-8xl justify-center flex"}>⚠️</span>
            <div className={"py-9 pt-9 flex justify-center text-3xl font-bold"}>PAGE IN DEVELOPMENT</div>

            <header className="bg-[#080b12] text-white text-4xl">Welcome to Tournament Page</header>
            <div className={"pt-9"}>All Active and Upcoming tournaments will be posted here.</div>
            <div className={"font-bold underline"}>you may sign up to tournaments through your dashboard.</div>
        </div>
    );
}