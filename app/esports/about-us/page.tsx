// app/about/layout.tsx
'use client';

import {motion, useInView, useScroll, useTransform, Variants} from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import {
    Trophy,
    Users,
    Target,
    Zap,
    Shield,
    Award,
    Gamepad2,
    TrendingUp,
    Mail,
    MapPin,
    Calendar,
    ChevronRight,
    Sparkles,
    Star,
    Crown,
    ArrowUpRight,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// shadcn components
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

// Professional animation variants
const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            ease: [0.21, 0.47, 0.32, 0.98]
        }
    },
};

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.3,
            ease: "easeOut"
        },
    },
};

const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 1,
            ease: "easeOut"
        }
    },
};

const scaleIn = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.6,
            ease: [0.21, 0.47, 0.32, 0.98]
        }
    },
};

const slideInLeft: Variants = {
    hidden: { opacity: 0, x: -80 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.8,
            ease: [0.21, 0.47, 0.32, 0.98]
        }
    },
};

const slideInRight: Variants = {
    hidden: { opacity: 0, x: 80 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.8,
            ease: [0.21, 0.47, 0.32, 0.98]
        }
    },
};

export default function AboutPage() {
    const ref = useRef(null);
    const heroRef = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    // Parallax scroll effects
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    });
    const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    // Typing effect for hero text
    const [typedText, setTypedText] = useState('');
    const fullText = "Redefining Competitive Gaming";

    useEffect(() => {
        let i = 0;
        const typing = setInterval(() => {
            if (i < fullText.length) {
                setTypedText(fullText.slice(0, i + 1));
                i++;
            } else {
                clearInterval(typing);
            }
        }, 50);
        return () => clearInterval(typing);
    }, []);

    // Team members with professional images
    const teamMembers = [
        {
            name: 'Alex "Vortex" Chen',
            role: 'CEO & Founder',
            bio: 'Former pro player with 5+ years in competitive Valorant.',
            image: '/team/alex.jpg',
            socials: { twitter: '#', linkedin: '#', github: '#' },
            achievements: ['Former Pro Player', 'esports Business Degree'],
        },
        {
            name: 'Sarah "Echo" Williams',
            role: 'Head of Operations',
            bio: 'esports veteran managing teams across League of Legends & CS2.',
            image: '/team/sarah.jpg',
            socials: { twitter: '#', linkedin: '#', github: '#' },
            achievements: ['10+ Years Experience', 'MBA in Sports Management'],
        },
        {
            name: 'Marcus "Blaze" Rodriguez',
            role: 'Performance Director',
            bio: 'Sports psychologist & analyst optimizing player performance.',
            image: '/team/marcus.jpg',
            socials: { twitter: '#', linkedin: '#', github: '#' },
            achievements: ['PhD Psychology', 'Former Olympic Coach'],
        },
        {
            name: 'Jessica "Nova" Kim',
            role: 'Content Lead',
            bio: 'Creating award-winning esports content & storytelling.',
            image: '/team/jessica.jpg',
            socials: { twitter: '#', linkedin: '#', github: '#' },
            achievements: ['Emmy Nominee', '2M+ Subscribers'],
        },
    ];

    // Stats with animations
    const stats = [
        { icon: Trophy, label: 'Tournament Wins', value: '24', suffix: '', gradient: 'from-yellow-500/20 to-orange-500/20' },
        { icon: Users, label: 'Active Players', value: '50+', suffix: '', gradient: 'from-blue-500/20 to-cyan-500/20' },
        { icon: Award, label: 'Championships', value: '8', suffix: '', gradient: 'from-purple-500/20 to-pink-500/20' },
        { icon: TrendingUp, label: 'Global Rank', value: '#12', suffix: '', gradient: 'from-green-500/20 to-emerald-500/20' },
    ];

    // Values data
    const values = [
        {
            icon: Target,
            title: 'Excellence',
            description: 'We push boundaries and strive for perfection in every game, every strategy, every moment.',
            color: 'from-red-500 to-orange-500',
        },
        {
            icon: Users,
            title: 'Community',
            description: 'Building a global family of gamers, creators, and fans who share the passion for competition.',
            color: 'from-blue-500 to-cyan-500',
        },
        {
            icon: Shield,
            title: 'Integrity',
            description: 'Competing with honor, respecting our opponents, and upholding the spirit of esports.',
            color: 'from-green-500 to-emerald-500',
        },
        {
            icon: Zap,
            title: 'Innovation',
            description: 'Embracing cutting-edge tech and analytics to stay ahead of the meta.',
            color: 'from-purple-500 to-pink-500',
        },
    ];

    // Achievements data
    const achievements = [
        {
            year: '2024',
            title: 'World Championship Finalists',
            game: 'Valorant',
            description: 'Top 4 finish at Valorant Champions Tour',
            icon: Crown,
        },
        {
            year: '2023',
            title: 'Regional Champions',
            game: 'League of Legends',
            description: 'Undefeated season in LCS Spring Split',
            icon: Trophy,
        },
        {
            year: '2022',
            title: 'Rookie Team of the Year',
            game: 'CS2',
            description: 'Awarded by esports Awards',
            icon: Star,
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/20 overflow-x-hidden">
            {/* Animated Background Elements */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 -left-4 h-72 w-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-0 -right-4 h-96 w-96 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000" />
                <div className="absolute top-1/2 left-1/2 h-64 w-64 bg-primary/5 rounded-full blur-3xl animate-pulse delay-500" />
            </div>

            {/* Hero Section with Parallax */}
            <section ref={heroRef} className="relative overflow-hidden pt-20 pb-32">
                <motion.div
                    style={{ y: heroY, opacity: heroOpacity }}
                    className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20"
                />
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-5" />

                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                    className="container relative z-10 mx-auto px-4"
                >
                    <div className="mx-auto max-w-5xl text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <Badge variant="outline" className="mb-6 border-primary text-primary px-4 py-1 text-sm backdrop-blur-sm">
                                <Sparkles className="mr-1 h-3 w-3" />
                                Est. 2021
                                <Sparkles className="ml-1 h-3 w-3" />
                            </Badge>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="mb-6 bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-5xl font-bold tracking-tight text-transparent md:text-7xl lg:text-8xl"
                        >
                            {typedText}
                            <motion.span
                                animate={{ opacity: [1, 0] }}
                                transition={{ duration: 0.8, repeat: Infinity }}
                                className="inline-block w-1 h-12 md:h-16 bg-primary ml-2"
                            />
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl"
                        >
                            We&apos;re not just an esports organization — we&apos;re a movement.
                            Building champions, creating content, and shaping the future of
                            competitive gaming.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7, duration: 0.8 }}
                            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
                        >
                            <Button size="lg" asChild className="group relative overflow-hidden">
                                <Link href="/join">
                                    <span className="relative z-10">Join Our Roster</span>
                                    <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </Link>
                            </Button>
                            <Button size="lg" variant="outline" asChild className="group">
                                <Link href="/contact">
                                    Contact Us
                                    <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                </Link>
                            </Button>
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            {/* Stats Section with Counter Animation */}
            <section className="py-20 relative">
                <div className="container mx-auto px-4">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                            >
                                <Card className={`border-border/50 bg-gradient-to-br ${stat.gradient} backdrop-blur-sm text-center transition-all duration-300 hover:shadow-xl hover:border-primary/50`}>
                                    <CardContent className="pt-6">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            whileInView={{ scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                                        >
                                            <stat.icon className="mx-auto mb-4 h-12 w-12 text-primary" />
                                        </motion.div>
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            whileInView={{ opacity: 1 }}
                                            viewport={{ once: true }}
                                            className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
                                        >
                                            {stat.value}
                                        </motion.div>
                                        <div className="text-sm text-muted-foreground mt-2">
                                            {stat.label}
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Story Section with Enhanced Animation */}
            <section ref={ref} className="py-24 relative">
                <div className="container mx-auto px-4">
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate={isInView ? 'visible' : 'hidden'}
                        className="grid items-center gap-16 lg:grid-cols-2"
                    >
                        <motion.div variants={slideInLeft}>
                            <Badge className="mb-4 px-3 py-1">
                                <Sparkles className="mr-1 h-3 w-3" />
                                Our Story
                            </Badge>
                            <h2 className="mb-6 text-4xl font-bold md:text-5xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                                From Dreamers to Champions
                            </h2>
                            <div className="space-y-6 text-muted-foreground">
                                <motion.p variants={fadeInUp}>
                                    Founded in 2021 by former pro player Alex &quot;Vortex&quot;
                                    Chen, Vortex Gaming started as a small collective of
                                    passionate gamers with a big dream. What began in a small
                                    gaming house has evolved into one of the most exciting esports
                                    organizations in the industry.
                                </motion.p>
                                <motion.p variants={fadeInUp}>
                                    Today, we field professional teams across Valorant, League of
                                    Legends, and CS2, while nurturing the next generation of
                                    talent through our academy program. Our state-of-the-art
                                    training facility, sports psychology integration, and
                                    data-driven approach have produced multiple championship
                                    teams and individual award winners.
                                </motion.p>
                                <motion.p variants={fadeInUp}>
                                    But beyond the trophies and titles, we&apos;re committed to
                                    building a positive, inclusive community where every gamer can
                                    thrive. Whether you&apos;re a casual player or aspiring pro,
                                    you have a place in the Vortex family.
                                </motion.p>
                            </div>
                        </motion.div>

                        <motion.div variants={slideInRight} className="relative group">
                            <div className="relative h-[500px] overflow-hidden rounded-2xl shadow-2xl">
                                <Image
                                    src="/about/team-photo.jpg"
                                    alt="Vortex Gaming Team"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
                                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 }}
                                className="absolute -bottom-6 -right-6 bg-background/90 backdrop-blur-sm rounded-lg p-4 shadow-xl border border-border"
                            >
                                <div className="flex items-center gap-3">
                                    <Trophy className="h-8 w-8 text-primary" />
                                    <div>
                                        <div className="font-bold">24 Tournament Wins</div>
                                        <div className="text-sm text-muted-foreground">And counting</div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Our Values Section with 3D Cards */}
            <section className="bg-gradient-to-br from-secondary/20 via-transparent to-primary/5 py-24">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-16 text-center"
                    >
                        <Badge className="mb-4 px-3 py-1">
                            <Star className="mr-1 h-3 w-3" />
                            Our Values
                        </Badge>
                        <h2 className="mb-4 text-4xl font-bold md:text-5xl">
                            What Drives Us
                        </h2>
                        <p className="mx-auto max-w-2xl text-muted-foreground text-lg">
                            The principles that guide everything we do, from training to
                            competition to community building.
                        </p>
                    </motion.div>

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {values.map((value, index) => (
                            <motion.div
                                key={value.title}
                                initial={{ opacity: 0, y: 30, rotateX: -15 }}
                                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                                className="group perspective"
                            >
                                <Card className="h-full border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:border-primary/30 overflow-hidden">
                                    <div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                                    <CardContent className="pt-8 relative">
                                        <motion.div
                                            whileHover={{ rotate: 360 }}
                                            transition={{ duration: 0.6 }}
                                            className="mb-6 inline-block"
                                        >
                                            <div className={`p-3 rounded-2xl bg-gradient-to-br ${value.color} bg-opacity-10`}>
                                                <value.icon className="h-8 w-8 text-primary" />
                                            </div>
                                        </motion.div>
                                        <h3 className="mb-3 text-xl font-semibold">
                                            {value.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            {value.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Achievements Timeline with Better Visuals */}
            <section className="py-24">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-16 text-center"
                    >
                        <Badge className="mb-4 px-3 py-1">
                            <Calendar className="mr-1 h-3 w-3" />
                            Milestones
                        </Badge>
                        <h2 className="mb-4 text-4xl font-bold md:text-5xl">
                            Our Journey So Far
                        </h2>
                        <p className="mx-auto max-w-2xl text-muted-foreground text-lg">
                            Key achievements that have defined our path to greatness.
                        </p>
                    </motion.div>

                    <div className="relative max-w-4xl mx-auto">
                        <div className="absolute left-8 md:left-1/2 h-full w-px bg-gradient-to-b from-primary via-primary/50 to-transparent" />

                        <div className="space-y-12">
                            {achievements.map((achievement, index) => (
                                <motion.div
                                    key={achievement.year}
                                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.2 }}
                                    className={`relative flex flex-col md:flex-row ${
                                        index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                    } items-start md:items-center gap-6`}
                                >
                                    <div className="md:w-1/2" />

                                    <div className="relative md:w-1/2 ml-12 md:ml-0">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            whileInView={{ scale: 1 }}
                                            viewport={{ once: true }}
                                            className="absolute -left-16 md:left-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-lg"
                                        >
                                            <achievement.icon className="h-4 w-4 text-primary-foreground" />
                                        </motion.div>

                                        <Card className="ml-0 md:ml-8 hover:shadow-xl transition-all duration-300 group">
                                            <CardContent className="p-6">
                                                <Badge variant="outline" className="mb-3 border-primary text-primary">
                                                    {achievement.year}
                                                </Badge>
                                                <h3 className="mb-2 text-xl font-bold group-hover:text-primary transition-colors">
                                                    {achievement.title}
                                                </h3>
                                                <p className="mb-3 text-sm font-semibold text-primary">
                                                    {achievement.game}
                                                </p>
                                                <p className="text-muted-foreground">
                                                    {achievement.description}
                                                </p>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section with Social Proof */}
            <section className="bg-gradient-to-t from-secondary/20 via-transparent to-transparent py-24">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-16 text-center"
                    >
                        <Badge className="mb-4 px-3 py-1">
                            <Users className="mr-1 h-3 w-3" />
                            Leadership
                        </Badge>
                        <h2 className="mb-4 text-4xl font-bold md:text-5xl">
                            Meet The Team
                        </h2>
                        <p className="mx-auto max-w-2xl text-muted-foreground text-lg">
                            The visionaries and masterminds behind Vortex Gaming&apos;s success.
                        </p>
                    </motion.div>

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {teamMembers.map((member, index) => (
                            <motion.div
                                key={member.name}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ y: -8 }}
                                className="group"
                            >
                                <Card className="text-center transition-all duration-300 hover:shadow-2xl border-border/50 hover:border-primary/30">
                                    <CardContent className="pt-8">
                                        <motion.div
                                            whileHover={{ scale: 1.05 }}
                                            transition={{ duration: 0.2 }}
                                            className="relative mx-auto mb-4"
                                        >
                                            <Avatar className="h-32 w-32 ring-4 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300">
                                                <AvatarImage src={member.image} alt={member.name} />
                                                <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-xl">
                                                    {member.name
                                                        .split(' ')
                                                        .map((n) => n[0])
                                                        .join('')}
                                                </AvatarFallback>
                                            </Avatar>
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                whileInView={{ scale: 1 }}
                                                className="absolute -bottom-2 -right-2 bg-primary rounded-full p-1.5"
                                            >
                                                <Shield className="h-3 w-3 text-primary-foreground" />
                                            </motion.div>
                                        </motion.div>

                                        <h3 className="mb-1 text-xl font-semibold">
                                            {member.name}
                                        </h3>
                                        <p className="mb-3 text-sm font-medium text-primary">
                                            {member.role}
                                        </p>
                                        <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
                                            {member.bio}
                                        </p>

                                        <div className="flex flex-wrap justify-center gap-2">
                                            {member.achievements.map((achievement, i) => (
                                                <Badge key={i} variant="secondary" className="text-xs">
                                                    {achievement}
                                                </Badge>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Enhanced CTA Section */}
            <section className="py-24">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <Card className="border-primary/20 bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/10 overflow-hidden relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            <CardContent className="py-16 text-center relative">
                                <motion.div
                                    animate={{
                                        y: [0, -10, 0],
                                        rotate: [0, 5, -5, 0]
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        repeatType: "reverse"
                                    }}
                                    className="inline-block"
                                >
                                    <Gamepad2 className="mx-auto mb-6 h-16 w-16 text-primary" />
                                </motion.div>

                                <h2 className="mb-4 text-4xl font-bold md:text-5xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                    Ready to Join the Roster?
                                </h2>
                                <p className="mx-auto mb-8 max-w-2xl text-muted-foreground text-lg">
                                    Whether you&apos;re a pro player, content creator, or passionate
                                    fan — there&apos;s a place for you in the Vortex family.
                                </p>

                                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                                    <Button size="lg" asChild className="group relative overflow-hidden">
                                        <Link href="/tryouts">
                                            <span className="relative z-10">Tryouts Open</span>
                                            <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        </Link>
                                    </Button>
                                    <Button size="lg" variant="outline" asChild className="group">
                                        <Link href="/community">
                                            Join Our Discord
                                            <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                        </Link>
                                    </Button>
                                </div>

                                <div className="mt-8 flex justify-center gap-6 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        <Users className="h-4 w-4" />
                                        <span>5K+ Community Members</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Trophy className="h-4 w-4" />
                                        <span>24 Tournament Wins</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4" />
                                        <span>Global Presence</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}