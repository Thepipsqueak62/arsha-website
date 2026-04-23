"use client"

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
    FaMapMarkerAlt,
    FaPhone,
    FaEnvelope,
    FaClock,
    FaPaperPlane,
    FaTrophy,
    FaUsers,
    FaGamepad,
    FaCompactDisc,
    FaTwitch,
    FaTwitter,
    FaYoutube,
    FaInstagram,
    FaDiscord,
    FaGlobe,
    FaCalendarAlt,
    FaHeadset,
    FaStar,
    FaMedal
} from 'react-icons/fa';
import { GiSwordman } from 'react-icons/gi';
import { MdSportsEsports } from 'react-icons/md';

const ContactUs = () => {
    // Animation variants
    const fadeInUp = {
        initial: { y: 60, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: { duration: 0.6, ease: "easeOut" }
    };

    const staggerContainer = {
        animate: {
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const slideInLeft = {
        initial: { x: -60, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        transition: { duration: 0.6, ease: "easeOut" }
    };

    const slideInRight = {
        initial: { x: 60, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        transition: { duration: 0.6, ease: "easeOut" }
    };

    // Custom hook for intersection observer
    const useAnimatedSection = (threshold = 0.1) => {
        const [ref, inView] = useInView({
            triggerOnce: true,
            threshold: threshold,
        });
        return { ref, inView };
    };

    const { ref: heroRef, inView: heroInView } = useAnimatedSection();
    const { ref: contactRef, inView: contactInView } = useAnimatedSection();
    const { ref: formRef, inView: formInView } = useAnimatedSection();

    const contactInfo = [
        {
            icon: FaMapMarkerAlt,
            title: "esports Arena",
            details: ["123 Championship Blvd", "Los Angeles, CA 90001", "United States"],
            description: "Visit our state-of-the-art gaming facility"
        },
        {
            icon: FaPhone,
            title: "Contact Numbers",
            details: ["+1 (888) ESP-ORTS", "+1 (555) 123-4567"],
            description: "24/7 Hotline for urgent matters"
        },
        {
            icon: FaEnvelope,
            title: "Email Us",
            details: ["pro@esportscompany.com", "sponsors@esportscompany.com", "support@esportscompany.com"],
            description: "Response within 2-4 hours"
        },
        {
            icon: FaClock,
            title: "Business Hours",
            details: ["Monday - Friday: 10:00 - 22:00", "Saturday - Sunday: 12:00 - 20:00"],
            description: "Tournament support available 24/7"
        }
    ];

    const socialLinks = [
        { icon: FaTwitch, name: "Twitch", handle: "@EsportsCompany", color: "hover:text-purple-500" },
        { icon: FaTwitter, name: "Twitter", handle: "@EsportsCo", color: "hover:text-blue-400" },
        { icon: FaYoutube, name: "YouTube", handle: "EsportsCompany", color: "hover:text-red-600" },
        { icon: FaInstagram, name: "Instagram", handle: "@esports.company", color: "hover:text-pink-500" },
        { icon: FaDiscord, name: "Discord", handle: "discord.gg/esports", color: "hover:text-indigo-500" }
    ];

    const teams = [
        { name: "Valorant Pro Team", game: "Valorant", players: 5, achievements: "2x National Champions", icon: GiSwordman },
        { name: "CS2 Elite", game: "Counter-Strike 2", players: 5, achievements: "3x Regional Winners", icon: GiSwordman },
        { name: "League of Legends", game: "LoL", players: 5, achievements: "Worlds 2024 Qualifiers", icon: MdSportsEsports },
        { name: "Mobile Legends", game: "MLBB", players: 5, achievements: "M5 Wildcard Finalists", icon: FaGamepad }
    ];

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Add your form submission logic here
        console.log("Form submitted");
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative py-20 lg:py-28 bg-gradient-to-br from-primary/10 via-background to-primary/5 overflow-hidden">
                <motion.div
                    ref={heroRef}
                    initial="initial"
                    animate={heroInView ? "animate" : "initial"}
                    variants={staggerContainer}
                    className="container mx-auto px-6 lg:px-8"
                >
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div variants={fadeInUp}>
                            <Badge variant="secondary" className="mb-6 gap-2">
                                <FaGamepad className="w-3 h-3" />
                                Get In Touch
                            </Badge>
                        </motion.div>
                        <motion.h1
                            variants={fadeInUp}
                            className="text-4xl lg:text-6xl font-bold tracking-tight mb-6"
                        >
                            Join the
                            <span className="block bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                                Esports Revolution
                            </span>
                        </motion.h1>
                        <motion.p
                            variants={fadeInUp}
                            className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto"
                        >
                            Ready to take your competitive gaming to the next level? Whether you're a pro player,
                            aspiring talent, or potential sponsor, we're here to connect, compete, and conquer together.
                        </motion.p>
                    </div>
                </motion.div>

                {/* Gaming-themed Background Elements */}
                <motion.div
                    initial={{ opacity: 0, rotate: 0 }}
                    animate={{ opacity: 1, rotate: 360 }}
                    transition={{ delay: 1, duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-10 right-10 w-72 h-72 bg-primary/10 rounded-full mix-blend-multiply filter blur-xl opacity-70"
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2, duration: 1 }}
                    className="absolute bottom-10 left-10 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-xl opacity-70"
                />
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border-4 border-primary/10 rounded-full"
                />
            </section>

            {/* Contact Info & Form Section */}
            <section className="py-20">
                <motion.div
                    ref={contactRef}
                    initial="initial"
                    animate={contactInView ? "animate" : "initial"}
                    variants={staggerContainer}
                    className="container mx-auto px-6 lg:px-8"
                >
                    <div className="grid lg:grid-cols-2 gap-16">
                        {/* Contact Information */}
                        <motion.div variants={slideInLeft}>
                            <div className="space-y-8">
                                <div>
                                    <Badge variant="outline" className="mb-4 gap-2">
                                        <FaCompactDisc className="w-3 h-3" />
                                        Contact Information
                                    </Badge>
                                    <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-6">
                                        Connect with our esports team
                                    </h2>
                                    <p className="text-muted-foreground leading-relaxed">
                                        Whether you're looking to join a team, sponsor an event, or need tournament support,
                                        our dedicated esports specialists are ready to assist you.
                                    </p>
                                </div>

                                <div className="space-y-6">
                                    {contactInfo.map((item, index) => (
                                        <motion.div
                                            key={index}
                                            whileHover={{ x: 8 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <Card className="border-border hover:border-primary/30 transition-colors">
                                                <CardContent className="p-6">
                                                    <div className="flex items-start gap-4">
                                                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                                                            <item.icon className="w-6 h-6" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <h3 className="font-semibold mb-2">{item.title}</h3>
                                                            <div className="space-y-1 mb-2">
                                                                {item.details.map((detail, idx) => (
                                                                    <p key={idx} className="text-sm text-muted-foreground">
                                                                        {detail}
                                                                    </p>
                                                                ))}
                                                            </div>
                                                            <p className="text-xs text-primary">{item.description}</p>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Social Media Section */}
                                <div className="pt-6">
                                    <h3 className="font-semibold mb-4">Follow Our Esports Journey</h3>
                                    <div className="flex flex-wrap gap-3">
                                        {socialLinks.map((social, index) => (
                                            <motion.a
                                                key={index}
                                                href="#"
                                                whileHover={{ scale: 1.1, y: -2 }}
                                                className={`p-3 bg-muted rounded-lg transition-all duration-300 ${social.color}`}
                                            >
                                                <social.icon className="w-5 h-5" />
                                            </motion.a>
                                        ))}
                                    </div>
                                    <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                                        <p className="text-sm text-muted-foreground">
                                            <strong className="text-foreground">Join our Discord:</strong> discord.gg/esportscompany
                                        </p>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            <strong className="text-foreground">Follow us:</strong> @EsportsCompany on all platforms
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Contact Form */}
                        <motion.div variants={slideInRight}>
                            <Card className="border-border">
                                <CardContent className="p-8">
                                    <div className="mb-8">
                                        <Badge variant="outline" className="mb-4 gap-2">
                                            <FaTrophy className="w-3 h-3" />
                                            Send us a message
                                        </Badge>
                                        <h3 className="text-2xl font-bold tracking-tight mb-2">
                                            Join the competitive scene
                                        </h3>
                                        <p className="text-muted-foreground">
                                            Fill out the form and our esports team will get back to you within 2-4 hours.
                                        </p>
                                    </div>

                                    <motion.form
                                        ref={formRef}
                                        initial="initial"
                                        animate={formInView ? "animate" : "initial"}
                                        variants={staggerContainer}
                                        onSubmit={handleSubmit}
                                        className="space-y-6"
                                    >
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <motion.div variants={fadeInUp} className="space-y-2">
                                                <Label htmlFor="firstName">First Name</Label>
                                                <Input
                                                    id="firstName"
                                                    placeholder="Your first name"
                                                    className="focus:border-primary"
                                                    required
                                                />
                                            </motion.div>
                                            <motion.div variants={fadeInUp} className="space-y-2">
                                                <Label htmlFor="lastName">Last Name</Label>
                                                <Input
                                                    id="lastName"
                                                    placeholder="Your last name"
                                                    className="focus:border-primary"
                                                    required
                                                />
                                            </motion.div>
                                        </div>

                                        <motion.div variants={fadeInUp} className="space-y-2">
                                            <Label htmlFor="email">Email Address</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="proplayer@example.com"
                                                className="focus:border-primary"
                                                required
                                            />
                                        </motion.div>

                                        <motion.div variants={fadeInUp} className="space-y-2">
                                            <Label htmlFor="gamertag">Gamertag / IGN</Label>
                                            <Input
                                                id="gamertag"
                                                placeholder="Your in-game name"
                                                className="focus:border-primary"
                                            />
                                        </motion.div>

                                        <motion.div variants={fadeInUp} className="space-y-2">
                                            <Label htmlFor="inquiryType">Inquiry Type</Label>
                                            <select
                                                id="inquiryType"
                                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                <option>Select an option</option>
                                                <option>Player Recruitment</option>
                                                <option>Sponsorship Opportunities</option>
                                                <option>Tournament Registration</option>
                                                <option>Media & Press</option>
                                                <option>General Support</option>
                                            </select>
                                        </motion.div>

                                        <motion.div variants={fadeInUp} className="space-y-2">
                                            <Label htmlFor="message">Message</Label>
                                            <Textarea
                                                id="message"
                                                placeholder="Tell us about your esports journey, competitive experience, or how we can work together..."
                                                rows={6}
                                                className="resize-none focus:border-primary"
                                                required
                                            />
                                        </motion.div>

                                        <motion.div variants={fadeInUp}>
                                            <Button
                                                type="submit"
                                                size="lg"
                                                className="w-full gap-2"
                                            >
                                                <FaPaperPlane className="w-4 h-4" />
                                                Send Message
                                            </Button>
                                        </motion.div>

                                        <motion.p
                                            variants={fadeInUp}
                                            className="text-xs text-muted-foreground text-center"
                                        >
                                            By submitting this form, you agree to our esports code of conduct and privacy policy.
                                        </motion.p>
                                    </motion.form>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            {/* Pro teams Section */}
            <section className="py-20 bg-muted/30">
                <motion.div
                    initial="initial"
                    whileInView="animate"
                    variants={staggerContainer}
                    viewport={{ once: true }}
                    className="container mx-auto px-6 lg:px-8"
                >
                    <motion.div variants={fadeInUp} className="text-center mb-16">
                        <Badge variant="outline" className="mb-4 gap-2">
                            <FaUsers className="w-3 h-3" />
                            Our Pro Teams
                        </Badge>
                        <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">
                            Meet Our Champions
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Join the ranks of our professional esports teams competing at the highest level
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                        {teams.map((team, index) => (
                            <motion.div
                                key={index}
                                variants={fadeInUp}
                                whileHover={{ y: -8 }}
                            >
                                <Card className="border-border hover:border-primary/30 transition-all h-full">
                                    <CardContent className="p-6 text-center">
                                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <team.icon className="w-8 h-8 text-primary" />
                                        </div>
                                        <h3 className="font-semibold mb-2 text-lg">{team.name}</h3>
                                        <p className="text-sm text-muted-foreground mb-2">{team.game}</p>
                                        <p className="text-xs text-primary mb-1">{team.players} Players</p>
                                        <p className="text-xs text-muted-foreground">{team.achievements}</p>
                                        <Button variant="ghost" size="sm" className="mt-4 w-full">
                                            Tryout →
                                        </Button>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* FAQ Section */}
            <section className="py-20">
                <motion.div
                    initial="initial"
                    whileInView="animate"
                    variants={staggerContainer}
                    viewport={{ once: true }}
                    className="container mx-auto px-6 lg:px-8"
                >
                    <motion.div variants={fadeInUp} className="text-center mb-16">
                        <Badge variant="outline" className="mb-4 gap-2">
                            <FaCalendarAlt className="w-3 h-3" />
                            FAQ
                        </Badge>
                        <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">
                            Esports Frequently Asked Questions
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Everything you need to know about competing with us
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {[
                            {
                                question: "How can I try out for a pro team?",
                                answer: "Fill out our recruitment form with your competitive rank, tournament experience, and gameplay highlights. Our scouts review applications weekly.",
                                icon: FaHeadset
                            },
                            {
                                question: "What games do you support?",
                                answer: "We support major esports titles including Valorant, CS2, League of Legends, Dota 2, Rocket League, and Mobile Legends.",
                                icon: FaGamepad
                            },
                            {
                                question: "Do you offer sponsorship opportunities?",
                                answer: "Yes! We partner with brands for team sponsorships, tournament prizes, and event hosting. Contact our sponsorship team for details.",
                                icon: FaStar
                            },
                            {
                                question: "How often are tournaments held?",
                                answer: "We host weekly ranked tournaments, monthly major events, and quarterly championship series with prize pools up to $100K.",
                                icon: FaTrophy
                            },
                            {
                                question: "What are the requirements for players?",
                                answer: "Requirements vary by game, but typically include rank requirements, age restrictions (16+), and availability for practice sessions.",
                                icon: FaMedal
                            },
                            {
                                question: "Do you have a junior development program?",
                                answer: "Yes! Our Academy Program helps rising talent develop skills, with coaching from pro players and pathways to our main rosters.",
                                icon: FaUsers
                            }
                        ].map((faq, index) => (
                            <motion.div
                                key={index}
                                variants={fadeInUp}
                                whileHover={{ scale: 1.02 }}
                            >
                                <Card className="border-border hover:border-primary/30 transition-colors h-full">
                                    <CardContent className="p-6">
                                        <div className="flex items-start gap-3">
                                            <faq.icon className="w-5 h-5 text-primary mt-0.5" />
                                            <div>
                                                <h3 className="font-semibold mb-3 text-lg">{faq.question}</h3>
                                                <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-primary to-primary/80">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="container mx-auto px-6 lg:px-8 text-center"
                >
                    <motion.div
                        variants={fadeInUp}
                        className="max-w-2xl mx-auto"
                    >
                        <FaGamepad className="w-16 h-16 text-primary-foreground/80 mx-auto mb-6" />
                        <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-6">
                            Ready to Go Pro?
                        </h2>
                        <p className="text-xl text-primary-foreground/80 mb-8">
                            Join our community of elite players, compete in professional tournaments,
                            and take your esports career to the next level.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Button size="lg" variant="secondary" className="gap-2">
                                    <FaDiscord className="w-4 h-4" />
                                    Join Our Discord
                                </Button>
                            </motion.div>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Button size="lg" variant="outline" className="text-primary-foreground border-primary-foreground/20 hover:bg-primary-foreground/10">
                                    View Tournament Schedule
                                </Button>
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>
            </section>
        </div>
    );
};

export default ContactUs;