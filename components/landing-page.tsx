"use client";

import {
  ArrowRight,
  Award,
  BookOpen,
  Building2,
  Check,
  ChevronRight,
  Download,
  GraduationCap,
  Home,
  Laptop,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Play,
  Quote,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  UserRound,
  Users,
  X,
  Zap,
} from "lucide-react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const navItems = [
  ["Features", "features"],
  ["Students", "students"],
  ["Parents", "parents"],
  ["Tutors", "tutors"],
  ["Institutes", "institutes"],
  ["FAQ", "faq"],
  ["Contact", "contact"],
];

const apkDownloadUrl =
  "https://github.com/AyushRoy911/TutorSetu/releases/download/v1.0/TutorSetu.apk";
const apkDownloadProps = {
  href: apkDownloadUrl,
  download: "TutorSetu.apk",
};

const trustBadges = [
  { label: "Verified Tutors", icon: ShieldCheck },
  { label: "Safe Platform", icon: Check },
  { label: "Direct Chat", icon: MessageCircle },
  { label: "Home & Online Classes", icon: Laptop },
];

const stats = [
  { value: 150000, suffix: "+", label: "Students" },
  { value: 25000, suffix: "+", label: "Tutors" },
  { value: 250, suffix: "+", label: "Institutes" },
  { value: 95, suffix: "%", label: "Satisfaction" },
];

const features = [
  {
    title: "One-Time Tutor",
    description: "Book focused sessions for doubts, exams, projects, and quick revision.",
    icon: Zap,
  },
  {
    title: "Monthly Tutor",
    description: "Build consistency with recurring classes, progress support, and flexible plans.",
    icon: BookOpen,
  },
  {
    title: "Home Tuition",
    description: "Learn at home with trusted nearby tutors and clear parent communication.",
    icon: Home,
  },
  {
    title: "Online Classes",
    description: "Connect beyond distance with live online learning and direct chat.",
    icon: Laptop,
  },
  {
    title: "Verified Tutors",
    description: "Profiles, reviews, and verification signals help families choose confidently.",
    icon: ShieldCheck,
  },
  {
    title: "Direct Chat",
    description: "Students, parents, tutors, and institutes connect without confusing middle steps.",
    icon: MessageCircle,
  },
];

const paths = [
  { label: "I Am A Student", href: "students", icon: GraduationCap },
  { label: "I Am A Parent", href: "parents", icon: Users },
  { label: "I Want To Teach", href: "tutors", icon: UserRound },
  { label: "I Own A Coaching Institute", href: "institutes", icon: Building2 },
];

const subjects = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "Hindi",
  "Computer Science",
  "Economics",
  "Accounts",
  "Competitive Exams",
  "Languages",
  "Arts",
  "Music",
  "Dance",
];

const testimonials = [
  {
    role: "Student",
    quote: "I found a maths tutor near my home before my board exam revision started.",
    name: "Aarav, Class 10",
    rating: 5,
  },
  {
    role: "Parent",
    quote: "The tutor profile, reviews, and direct chat made the decision much easier.",
    name: "Mrs. Sharma",
    rating: 5,
  },
  {
    role: "Tutor",
    quote: "TutorSetu helped me get both one-time classes and monthly home tuition leads.",
    name: "Neha, Science Tutor",
    rating: 5,
  },
  {
    role: "Institute",
    quote: "We can present our courses, photos, ratings, and inquiries in one place.",
    name: "BrightPath Coaching",
    rating: 5,
  },
];

const faqs = [
  {
    group: "Student FAQ",
    q: "Can I book both one-time and monthly tutors?",
    a: "Yes. TutorSetu is designed for quick one-time sessions as well as regular monthly tuition for long-term learning.",
  },
  {
    group: "Parent FAQ",
    q: "How does TutorSetu build trust for families?",
    a: "Families can review tutor profiles, ratings, verification signals, subjects, class modes, and direct communication before choosing.",
  },
  {
    group: "Tutor FAQ",
    q: "How can a tutor start earning?",
    a: "Tutors register, complete profile and verification details, list subjects and class modes, then connect with interested students and parents.",
  },
  {
    group: "Institute FAQ",
    q: "Can coaching centers promote admissions?",
    a: "Institutes can showcase their profile, gallery, courses, reviews, and student inquiries, with lead management and analytics planned.",
  },
];

const screenshotTabs = [
  {
    title: "Student Home",
    subtitle: "Real TutorSetu student dashboard",
    icon: Search,
    accent: "from-blue-500 to-cyan-400",
    image: "/screenshots/student-home.png",
    alt: "TutorSetu Student home screen showing active quests, top experts, and learning portal navigation",
  },
  {
    title: "Tutor Profile",
    subtitle: "Real verified tutor profile",
    icon: Star,
    accent: "from-violet-500 to-blue-500",
    image: "/screenshots/tutor-profile.png",
    alt: "TutorSetu tutor profile screen showing verified Ayush physics tutor details, ratings, availability, and booking tabs",
  },
  {
    title: "Institute Page",
    subtitle: "Dashboard and inquiries",
    icon: Building2,
    accent: "from-sky-500 to-indigo-500",
    image: "/screenshots/institute-home.png",
    alt: "TutorSetu institute homepage screen showing BrightPath Academy dashboard, leads, admissions, courses, and recent student inquiries",
  },
];

const contacts = [
  { label: "WhatsApp", value: "+919110012448", icon: MessageCircle },
  { label: "Phone", value: "+919110012448", icon: Phone },
  { label: "Email", value: "tutorsetusupport@gmail.com", icon: Mail },
  { label: "India", value: "Students, parents, tutors, institutes", icon: MapPin },
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let frame = 0;
    const frames = 70;
    const timer = window.setInterval(() => {
      frame += 1;
      const eased = 1 - Math.pow(1 - frame / frames, 3);
      setCount(Math.round(value * eased));
      if (frame >= frames) window.clearInterval(timer);
    }, 18);
    return () => window.clearInterval(timer);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {count.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

function SectionHeader({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55 }}
      className="mx-auto max-w-3xl text-center"
    >
      <p className="mb-3 text-sm font-bold uppercase text-blue-600">{eyebrow}</p>
      <h2 className="text-3xl font-bold text-slate-950 md:text-5xl">{title}</h2>
      <p className="mt-5 text-base leading-8 text-slate-600 md:text-lg">{text}</p>
    </motion.div>
  );
}

function AppScreen({ index = 0, compact = false }: { index?: number; compact?: boolean }) {
  const screen = screenshotTabs[index % screenshotTabs.length];
  const Icon = screen.icon;

  if (screen.image) {
    return (
      <div
        className={cn(
          "relative mx-auto w-full max-w-[330px] overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950 p-2 shadow-2xl",
          compact && "max-w-[270px]",
        )}
        aria-label={`${screen.title} real app screenshot`}
      >
        <Image
          src={screen.image}
          alt={screen.alt}
          width={790}
          height={876}
          sizes={compact ? "270px" : "330px"}
          className="h-auto w-full rounded-[1.55rem] bg-white"
          priority={index === 0}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-[280px] rounded-[2.25rem] border border-slate-200 bg-slate-950 p-2 shadow-2xl",
        compact && "max-w-[238px]",
      )}
      aria-label={`${screen.title} app screenshot mockup`}
    >
      <div className="overflow-hidden rounded-[1.8rem] bg-white">
        <div className={cn("h-28 bg-gradient-to-br p-4 text-white", screen.accent)}>
          <div className="flex items-center justify-between">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
              <Icon className="h-5 w-5" />
            </div>
            <div className="rounded-full bg-white/20 px-3 py-1 text-xs">TutorSetu</div>
          </div>
          <p className="mt-5 text-lg font-bold">{screen.title}</p>
          <p className="text-xs text-white/85">{screen.subtitle}</p>
        </div>
        <div className="space-y-3 p-4">
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-2xl bg-blue-100" />
              <div className="flex-1">
                <div className="h-3 w-3/4 rounded-full bg-slate-300" />
                <div className="mt-2 h-2 w-1/2 rounded-full bg-slate-200" />
              </div>
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {["Math", "Home", "Chat", "Rs. 499"].map((item) => (
              <div key={item} className="rounded-2xl bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700">
                {item}
              </div>
            ))}
          </div>
          <div className="rounded-2xl bg-slate-950 p-3 text-white">
            <div className="flex items-center justify-between text-xs">
              <span>Direct chat</span>
              <MessageCircle className="h-4 w-4 text-blue-300" />
            </div>
            <div className="mt-3 h-2 rounded-full bg-white/20">
              <div className="h-2 w-3/4 rounded-full bg-blue-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function GooglePlayBadge() {
  return (
    <a
      {...apkDownloadProps}
      className="inline-flex min-h-14 items-center gap-3 rounded-2xl bg-slate-950 px-4 py-3 text-left text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-blue-950"
      aria-label="Download TutorSetu app"
    >
      <Play className="h-7 w-7 fill-white" />
      <span>
        <span className="block text-[11px] uppercase text-white/70">Download APK</span>
        <span className="block text-base font-bold">TutorSetu App</span>
      </span>
    </a>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-md transition-shadow",
        scrolled && "shadow-sm",
      )}
    >
      <nav className="container flex h-20 items-center justify-between">
        <a href="#" className="flex items-center gap-3" aria-label="TutorSetu home">
          <Image
            src="/tutorsetu-logo.png"
            alt="TutorSetu logo"
            width={44}
            height={44}
            className="h-11 w-11 rounded-2xl shadow-glow"
            priority
          />
          <span className="text-xl font-black text-slate-950">TutorSetu</span>
        </a>
        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map(([label, id]) => (
            <button
              key={id}
              onClick={() => scrollToId(id)}
              className="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-blue-700"
            >
              {label}
            </button>
          ))}
        </div>
        <div className="hidden items-center gap-3 lg:flex">
          <Button asChild>
            <a {...apkDownloadProps}>Download App</a>
          </Button>
        </div>
        <button
          className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-4 mb-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-soft lg:hidden"
        >
          {navItems.map(([label, id]) => (
            <button
              key={id}
              onClick={() => {
                scrollToId(id);
                setOpen(false);
              }}
              className="block w-full rounded-2xl px-4 py-3 text-left font-semibold text-slate-700 hover:bg-slate-50"
            >
              {label}
            </button>
          ))}
          <Button className="mt-3 w-full" asChild>
            <a {...apkDownloadProps}>Download App</a>
          </Button>
        </motion.div>
      )}
    </motion.header>
  );
}

function Hero() {
  const particles = useMemo(
    () =>
      Array.from({ length: 18 }, (_, index) => ({
        left: `${(index * 23) % 100}%`,
        top: `${(index * 31) % 100}%`,
        delay: index * 0.12,
      })),
    [],
  );

  return (
    <section className="hero-grid relative overflow-hidden pt-32">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_15%,rgba(37,99,235,0.16),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(124,58,237,0.12),transparent_26%),linear-gradient(180deg,#fff,rgba(239,246,255,0.8))]" />
      {particles.map((particle) => (
        <motion.span
          key={`${particle.left}-${particle.top}`}
          className="absolute h-1.5 w-1.5 rounded-full bg-blue-400/40"
          style={{ left: particle.left, top: particle.top }}
          animate={{ y: [0, -18, 0], opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, delay: particle.delay }}
        />
      ))}
      <div className="container grid min-h-[760px] items-center gap-14 pb-20 lg:grid-cols-[1.02fr_0.98fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-4 py-2 text-sm font-bold text-blue-700 shadow-sm">
            <Sparkles className="h-4 w-4" />
            India&apos;s learning connection platform
          </div>
          <h1 className="max-w-4xl text-5xl font-black leading-[1.02] text-slate-950 md:text-7xl">
            Find Trusted Tutors Near You
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">
            One-Time Tutors | Monthly Tutors | Home Tuition | Online Classes | Coaching Institutes
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            {trustBadges.map(({ label, icon: Icon }) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm"
              >
                <Icon className="h-4 w-4 text-blue-600" />
                {label}
              </span>
            ))}
          </div>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button size="lg" asChild>
              <a {...apkDownloadProps}>
                Download App <Download className="h-5 w-5" />
              </a>
            </Button>
            <GooglePlayBadge />
          </div>
        </motion.div>
        <motion.div
          className="relative min-h-[560px]"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <div className="absolute inset-x-0 top-16 mx-auto h-80 w-80 rounded-full bg-blue-200/50 blur-3xl" />
          <motion.div
            className="absolute left-0 top-20 hidden rounded-3xl border border-slate-200 bg-white/85 p-4 shadow-soft backdrop-blur md:block"
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            <BookOpen className="mb-3 h-7 w-7 text-blue-600" />
            <p className="text-sm font-bold">CBSE Revision</p>
            <p className="text-xs text-slate-500">One-time session</p>
          </motion.div>
          <motion.div
            className="absolute right-2 top-4 hidden rounded-3xl border border-slate-200 bg-white/85 p-4 shadow-soft backdrop-blur md:block"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 5.5, repeat: Infinity }}
          >
            <GraduationCap className="mb-3 h-7 w-7 text-violet-600" />
            <p className="text-sm font-bold">Verified Tutor</p>
            <p className="text-xs text-slate-500">4.9 rating</p>
          </motion.div>
          <div className="absolute left-1/2 top-6 w-[54%] -translate-x-[92%] rotate-[-8deg] opacity-90 sm:w-[260px]">
            <AppScreen index={1} compact />
          </div>
          <div className="absolute left-1/2 top-0 w-[62%] -translate-x-[28%] rotate-[6deg] sm:w-[310px]">
            <AppScreen index={0} />
          </div>
          <div className="absolute bottom-0 right-0 hidden w-[240px] rotate-[10deg] opacity-95 md:block">
            <AppScreen index={2} compact />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="container -mt-10 relative z-10">
      <div className="grid gap-4 rounded-[2rem] border border-slate-200 bg-white p-4 shadow-soft sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[1.5rem] bg-gradient-to-br from-slate-50 to-blue-50 p-6 text-center"
          >
            <p className="text-4xl font-black text-slate-950">
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
            </p>
            <p className="mt-2 font-semibold text-slate-600">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function FeatureGrid() {
  return (
    <section id="features" className="section-pad container">
      <SectionHeader
        eyebrow="Why TutorSetu"
        title="Everything families and educators need to connect with confidence"
        text="TutorSetu brings discovery, trust, direct communication, flexible class formats, and institute visibility into one clean platform."
      />
      <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {features.map(({ title, description, icon: Icon }) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            whileHover={{ y: -8 }}
            className="group rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm transition hover:border-blue-200 hover:shadow-glow"
          >
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-950">{title}</h3>
            <p className="mt-3 leading-7 text-slate-600">{description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function PathCards() {
  return (
    <section className="bg-gradient-to-b from-white to-blue-50/70 py-20">
      <div className="container">
        <SectionHeader
          eyebrow="Choose Your Path"
          title="Start with the journey that matches you"
          text="Students, parents, tutors, and institutes each get a clear next step inside the TutorSetu ecosystem."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {paths.map(({ label, href, icon: Icon }) => (
            <motion.button
              key={label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              onClick={() => scrollToId(href)}
              className="rounded-[2rem] border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:border-blue-200 hover:shadow-soft"
            >
              <div className="flex items-start justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  <Icon className="h-6 w-6" />
                </span>
                <ChevronRight className="h-5 w-5 text-slate-400" />
              </div>
              <p className="mt-8 text-xl font-bold text-slate-950">{label}</p>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

function AudienceSection({
  id,
  eyebrow,
  title,
  text,
  bullets,
  cta,
  imageIndex,
  reverse,
}: {
  id: string;
  eyebrow: string;
  title: string;
  text: string;
  bullets: string[];
  cta: string;
  imageIndex: number;
  reverse?: boolean;
}) {
  return (
    <section id={id} className="section-pad container scroll-mt-24">
      <div className={cn("grid items-center gap-12 lg:grid-cols-2", reverse && "lg:[&>*:first-child]:order-2")}>
        <motion.div
          initial={{ opacity: 0, x: reverse ? 30 : -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
        >
          <p className="mb-3 text-sm font-bold uppercase text-blue-600">{eyebrow}</p>
          <h2 className="text-3xl font-black text-slate-950 md:text-5xl">{title}</h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">{text}</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {bullets.map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3">
                <Check className="h-5 w-5 shrink-0 text-blue-600" />
                <span className="font-semibold text-slate-700">{item}</span>
              </div>
            ))}
          </div>
          <Button className="mt-8" size="lg" asChild>
            <a {...(cta === "Download App" ? apkDownloadProps : { href: id === "tutors" ? "#contact" : "#download" })}>
              {cta} <ArrowRight className="h-5 w-5" />
            </a>
          </Button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          className="relative"
        >
          <div className="absolute inset-8 rounded-full bg-blue-200/40 blur-3xl" />
          <Card className="relative overflow-hidden bg-gradient-to-br from-white to-blue-50 p-8">
            <AppScreen index={imageIndex} />
            <div className="mt-8 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <Star className="mb-3 h-5 w-5 fill-amber-400 text-amber-400" />
                <p className="text-sm font-bold">Ratings & reviews</p>
              </div>
              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <MessageCircle className="mb-3 h-5 w-5 text-blue-600" />
                <p className="text-sm font-bold">Direct communication</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

function TutorEarnings() {
  return (
    <section className="container pb-24">
      <div className="rounded-[2.5rem] bg-slate-950 p-6 text-white md:p-10">
        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase text-blue-300">Tutor success path</p>
            <h2 className="mt-3 text-3xl font-black md:text-5xl">Turn Your Knowledge Into Income</h2>
            <p className="mt-5 leading-8 text-slate-300">
              Register, verify your profile, set subjects and class modes, then receive student and parent inquiries for one-time teaching, monthly tuition, home classes, and online classes.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {["Rs. 5,000+", "Rs. 15,000+", "Rs. 50,000+"].map((earning, index) => (
              <motion.div
                key={earning}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="rounded-[2rem] border border-white/10 bg-white/10 p-6"
              >
                <p className="text-3xl font-black">{earning}</p>
                <p className="mt-2 text-sm text-slate-300">Potential monthly earnings</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ComparisonSections() {
  const comparisons = [
    {
      title: "One-Time vs Monthly Tutor",
      items: [
        ["One-Time Tutor", "Best for urgent doubts, exam sprints, projects, and topic clarity."],
        ["Monthly Tutor", "Best for steady improvement, habit building, and parent progress support."],
      ],
    },
    {
      title: "Home vs Online Classes",
      items: [
        ["Home Classes", "Personal attention, local tutors, comfortable learning, and parent visibility."],
        ["Online Classes", "Flexible scheduling, wider teacher choice, and learning from any location."],
      ],
    },
  ];

  return (
    <section className="section-pad bg-slate-50">
      <div className="container space-y-10">
        {comparisons.map((comparison) => (
          <div key={comparison.title}>
            <h2 className="mb-5 text-3xl font-black text-slate-950">{comparison.title}</h2>
            <div className="grid gap-5 md:grid-cols-2">
              {comparison.items.map(([title, text]) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                    <Award className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-950">{title}</h3>
                  <p className="mt-3 leading-7 text-slate-600">{text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Subjects() {
  return (
    <section className="section-pad container">
      <SectionHeader
        eyebrow="Subjects We Cover"
        title="From core academics to creative skills"
        text="TutorSetu supports school, college, competitive, language, and arts learning journeys."
      />
      <div className="mt-12 flex flex-wrap justify-center gap-3">
        {subjects.map((subject) => (
          <motion.span
            key={subject}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
            className="rounded-full border border-blue-100 bg-blue-50 px-5 py-3 font-semibold text-blue-700"
          >
            {subject}
          </motion.span>
        ))}
      </div>
    </section>
  );
}

function Stories() {
  const doubled = [...testimonials, ...testimonials];

  return (
    <section className="section-pad overflow-hidden bg-gradient-to-b from-white to-blue-50">
      <div className="container">
        <SectionHeader
          eyebrow="Success Stories"
          title="Built for every side of the education marketplace"
          text="Students learn faster, parents choose with trust, tutors grow income, and institutes increase admissions."
        />
      </div>
      <div className="mask-fade mt-12 overflow-hidden">
        <div className="flex w-max gap-5 animate-marquee px-5">
          {doubled.map((story, index) => (
            <Card key={`${story.name}-${index}`} className="w-[320px] shrink-0 p-6">
              <div className="mb-5 flex items-center justify-between">
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">{story.role}</span>
                <Quote className="h-5 w-5 text-blue-300" />
              </div>
              <p className="min-h-24 leading-7 text-slate-700">{story.quote}</p>
              <div className="mt-5 flex items-center justify-between">
                <p className="font-bold text-slate-950">{story.name}</p>
                <div className="flex">
                  {Array.from({ length: story.rating }).map((_, starIndex) => (
                    <Star key={starIndex} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function Screenshots() {
  const [active, setActive] = useState(0);

  return (
    <section className="section-pad container">
      <SectionHeader
        eyebrow="App Screenshots"
        title="A realistic look at the TutorSetu app experience"
        text="The student screen uses your real TutorSetu screenshot, while the tutor and institute previews remain polished placeholders until those assets are available."
      />
      <div className="mt-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div className="space-y-3">
          {screenshotTabs.map((tab, index) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.title}
                onClick={() => setActive(index)}
                className={cn(
                  "flex w-full items-center gap-4 rounded-3xl border p-4 text-left transition",
                  active === index
                    ? "border-blue-200 bg-blue-50 shadow-sm"
                    : "border-slate-200 bg-white hover:border-blue-100",
                )}
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-sm">
                  <Icon className="h-6 w-6" />
                </span>
                <span>
                  <span className="block font-bold text-slate-950">{tab.title}</span>
                  <span className="block text-sm text-slate-500">{tab.subtitle}</span>
                </span>
              </button>
            );
          })}
        </div>
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[2.5rem] bg-gradient-to-br from-blue-50 to-violet-50 p-8"
        >
          <AppScreen index={active} />
        </motion.div>
      </div>
    </section>
  );
}

function FAQ() {
  return (
    <section id="faq" className="section-pad bg-slate-50 scroll-mt-24">
      <div className="container">
        <SectionHeader
          eyebrow="FAQ"
          title="Answers for students, parents, tutors, and institutes"
          text="Quick clarity before users download the app, join as a tutor, or register an institute."
        />
        <Card className="mx-auto mt-10 max-w-3xl px-6">
          <Accordion type="single" collapsible defaultValue="item-0">
            {faqs.map((faq, index) => (
              <AccordionItem key={faq.q} value={`item-${index}`}>
                <AccordionTrigger>
                  <span>
                    <span className="mr-3 text-sm font-bold text-blue-600">{faq.group}</span>
                    {faq.q}
                  </span>
                </AccordionTrigger>
                <AccordionContent>{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>
      </div>
    </section>
  );
}

function DownloadSection() {
  return (
    <section id="download" className="section-pad container scroll-mt-24">
      <div className="grid overflow-hidden rounded-[2.5rem] bg-slate-950 text-white shadow-soft lg:grid-cols-[1.05fr_0.95fr]">
        <div className="p-8 md:p-12">
          <p className="text-sm font-bold uppercase text-blue-300">Download App</p>
          <h2 className="mt-4 text-4xl font-black md:text-6xl">Start learning, teaching, or growing today</h2>
          <p className="mt-5 max-w-2xl leading-8 text-slate-300">
            Download TutorSetu APK, install it on Android, create your profile, and connect with verified learning opportunities across India.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <a {...apkDownloadProps}>
                Get APK Link <Download className="h-5 w-5" />
              </a>
            </Button>
            <GooglePlayBadge />
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {["Download APK", "Allow install", "Create profile"].map((step, index) => (
              <div key={step} className="rounded-2xl border border-white/10 bg-white/10 p-4">
                <p className="text-sm text-blue-200">Step {index + 1}</p>
                <p className="mt-1 font-bold">{step}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative min-h-[420px] bg-gradient-to-br from-blue-700 to-violet-700 p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.24),transparent_30%)]" />
          <div className="relative mx-auto max-w-[300px]">
            <AppScreen index={0} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="section-pad bg-blue-50/70 scroll-mt-24">
      <div className="container max-w-4xl">
        <div>
          <p className="mb-3 text-sm font-bold uppercase text-blue-600">Contact</p>
          <h2 className="text-4xl font-black text-slate-950 md:text-5xl">Talk to TutorSetu</h2>
          <p className="mt-5 leading-8 text-slate-600">
            Reach out for APK access, tutor onboarding, institute registration, partnerships, or support.
          </p>
          <div className="mt-8 space-y-4">
            {contacts.map(({ label, value, icon: Icon }) => (
              <div key={label} className="flex items-center gap-4 rounded-3xl bg-white p-4 shadow-sm">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  <Icon className="h-6 w-6" />
                </span>
                <span>
                  <span className="block text-sm text-slate-500">{label}</span>
                  <span className="block font-bold text-slate-950">{value}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-slate-950 px-4 pb-24 pt-10 text-white md:pb-10">
      <div className="container flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/tutorsetu-logo.png"
              alt="TutorSetu logo"
              width={40}
              height={40}
              className="h-10 w-10 rounded-2xl"
            />
            <span className="text-xl font-black">TutorSetu</span>
          </div>
          <p className="mt-3 max-w-lg text-sm leading-6 text-slate-400">
            Connecting students, parents, tutors, and coaching institutes across India.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm font-semibold text-slate-300">
          {["About", "Privacy Policy", "Terms", "Contact"].map((link) => (
            <a key={link} href="#contact" className="hover:text-white">
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default function LandingPage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Stats />
      <FeatureGrid />
      <PathCards />
      <AudienceSection
        id="students"
        eyebrow="For Students"
        title="Find the right tutor for every learning moment"
        text="Discover nearby tutors, book one-time doubt sessions, start monthly learning, compare ratings, and choose home tuition or online classes."
        bullets={["Nearby tutors", "One-time sessions", "Monthly learning", "Subjects and reviews", "Home tuition", "Online classes"]}
        cta="Download App"
        imageIndex={0}
      />
      <AudienceSection
        id="parents"
        eyebrow="For Parents"
        title="Trust, safety, and progress support for every child"
        text="TutorSetu helps parents choose verified tutors, compare affordable options, follow ratings, and support learning at home or online."
        bullets={["Verified tutors", "Safe learning", "Affordable options", "Progress support", "Parent testimonials", "Direct chat"]}
        cta="Download App"
        imageIndex={1}
        reverse
      />
      <AudienceSection
        id="tutors"
        eyebrow="Become A Tutor"
        title="Flexible teaching opportunities with real student demand"
        text="Create your profile, complete verification, list subjects, choose online or home classes, and grow through ratings and reviews."
        bullets={["Registration process", "Verification", "Flexible schedule", "Home classes", "Online classes", "Tutor success stories"]}
        cta="Join As Tutor"
        imageIndex={1}
      />
      <TutorEarnings />
      <AudienceSection
        id="institutes"
        eyebrow="For Institutes"
        title="Increase admissions and build your coaching brand"
        text="Promote courses, show a photo gallery, manage inquiries, earn reviews, and prepare for analytics dashboard features."
        bullets={["Institute profile", "Photo gallery", "Student inquiries", "Ratings and reviews", "Lead management", "Analytics coming soon"]}
        cta="Register Institute"
        imageIndex={2}
        reverse
      />
      <ComparisonSections />
      <Subjects />
      <Stories />
      <Screenshots />
      <FAQ />
      <DownloadSection />
      <Contact />
      <Footer />
      <div className="fixed inset-x-4 bottom-4 z-40 md:hidden">
        <Button className="h-14 w-full shadow-glow" asChild>
          <a {...apkDownloadProps}>
            Download TutorSetu App <Download className="h-5 w-5" />
          </a>
        </Button>
      </div>
    </main>
  );
}
