import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    MapPin,
    MapPinned,
    ScanFace,
    Route,
    Wallet,
    CalendarDays,
    BarChart3,
    Check,
    X,
    ArrowRight,
    Play,
    Shield,
    Star,
    ChevronDown,
    Menu,
    Phone,
    Globe,
    Sparkles,
    Building2,
    Mail
} from 'lucide-react'
import { Button } from '#/components/ui/button'
import { Badge } from '#/components/ui/badge'

// ═══════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════

const features = [
    {
        icon: ScanFace,
        title: 'AI Face Attendance',
        desc: 'Contactless, spoof-proof attendance with face recognition. Works offline, syncs when online. No more buddy punching.',
        bg: 'bg-indigo-50',
        color: 'text-indigo-600',
        highlight: 'AI-powered',
    },
    {
        icon: Route,
        title: 'Live Route Tracking',
        desc: 'Track your field team in real-time. See routes, stops, and time spent at each location. Optimize field operations.',
        bg: 'bg-emerald-50',
        color: 'text-emerald-600',
        highlight: 'Real-time GPS',
    },
    {
        icon: MapPinned,
        title: 'Geofence Zones',
        desc: 'Define work zones with GPS boundaries. Auto-mark attendance when employees enter/exit zones. Get violation alerts.',
        bg: 'bg-amber-50',
        color: 'text-amber-600',
        highlight: 'Location intelligence',
    },
    {
        icon: Wallet,
        title: 'Automated Payroll',
        desc: 'Attendance to salary in one click. Handles overtime, deductions, PF, ESI, TDS. Generates payslips instantly.',
        bg: 'bg-purple-50',
        color: 'text-purple-600',
        highlight: 'Zero manual work',
    },
    {
        icon: CalendarDays,
        title: 'Leave Management',
        desc: 'Employee self-service leave applications, manager approvals, balance tracking, and calendar integration.',
        bg: 'bg-rose-50',
        color: 'text-rose-600',
        highlight: 'Self-service',
    },
    {
        icon: BarChart3,
        title: 'Analytics & Reports',
        desc: 'Attendance trends, department breakdowns, violation reports, payroll summaries — all exportable to Excel/PDF.',
        bg: 'bg-cyan-50',
        color: 'text-cyan-600',
        highlight: 'Insights that matter',
    },
]

const howItWorks = [
    {
        step: '01',
        title: 'Sign up your company',
        desc: 'Create your workspace in 2 minutes. Add departments, shifts, and zones.',
    },
    {
        step: '02',
        title: 'Onboard your team',
        desc: 'Import employees via CSV or add manually. Assign shifts, zones, and roles.',
    },
    {
        step: '03',
        title: 'Start tracking',
        desc: 'Employees mark attendance via face recognition. You see live routes and attendance.',
    },
    {
        step: '04',
        title: 'Run payroll',
        desc: 'One-click payroll at month-end. Auto-calculates everything from attendance data.',
    },
]

const plans = [
    {
        id: 'free',
        name: 'Free',
        tagline: 'For small teams getting started',
        monthlyPrice: 0,
        yearlyPrice: 0,
        maxEmployees: 5,
        popular: false,
        cta: 'Get started free',
        features: [
            { name: 'Up to 5 employees', included: true },
            { name: 'Basic attendance marking', included: true },
            { name: 'Leave management', included: true },
            { name: '1 work zone', included: true },
            { name: 'Basic reports', included: true },
            { name: 'AI face recognition', included: false },
            { name: 'Route tracking', included: false },
            { name: 'Automated payroll', included: false },
            { name: 'Priority support', included: false },
        ],
    },
    {
        id: 'starter',
        name: 'Starter',
        tagline: 'For growing small businesses',
        monthlyPrice: 999,
        yearlyPrice: 9990,
        maxEmployees: 25,
        popular: false,
        cta: 'Start free trial',
        features: [
            { name: 'Up to 25 employees', included: true },
            { name: 'AI face attendance', included: true },
            { name: 'Leave management', included: true },
            { name: '3 work zones', included: true },
            { name: 'Automated payroll', included: true },
            { name: 'Basic reports', included: true },
            { name: 'Route tracking', included: false },
            { name: 'Advanced analytics', included: false },
            { name: 'Priority support', included: false },
        ],
    },
    {
        id: 'pro',
        name: 'Pro',
        tagline: 'Best for field workforce',
        monthlyPrice: 2999,
        yearlyPrice: 29990,
        maxEmployees: 100,
        popular: true,
        cta: 'Start free trial',
        features: [
            { name: 'Up to 100 employees', included: true },
            { name: 'AI face attendance', included: true },
            { name: 'Live route tracking', included: true },
            { name: 'Unlimited zones', included: true },
            { name: 'Automated payroll', included: true },
            { name: 'Advanced analytics', included: true },
            { name: 'Geofence alerts', included: true },
            { name: 'Email support', included: true },
            { name: 'Priority support', included: false },
        ],
    },
    {
        id: 'business',
        name: 'Business',
        tagline: 'For mid-market companies',
        monthlyPrice: 7999,
        yearlyPrice: 79990,
        maxEmployees: 500,
        popular: false,
        cta: 'Start free trial',
        features: [
            { name: 'Up to 500 employees', included: true },
            { name: 'AI face attendance', included: true },
            { name: 'Live route tracking', included: true },
            { name: 'Unlimited zones', included: true },
            { name: 'Automated payroll', included: true },
            { name: 'Advanced analytics', included: true },
            { name: 'Geofence alerts', included: true },
            { name: 'Priority support', included: true },
            { name: 'API access', included: false },
        ],
    },
    {
        id: 'enterprise',
        name: 'Enterprise',
        tagline: 'For large organizations',
        monthlyPrice: null,
        yearlyPrice: null,
        maxEmployees: null,
        popular: false,
        cta: 'Contact sales',
        features: [
            { name: 'Unlimited employees', included: true },
            { name: 'AI face attendance', included: true },
            { name: 'Live route tracking', included: true },
            { name: 'Unlimited zones', included: true },
            { name: 'Automated payroll', included: true },
            { name: 'Advanced analytics', included: true },
            { name: 'Geofence alerts', included: true },
            { name: 'Dedicated support', included: true },
            { name: 'Custom integrations', included: true },
        ],
    },
]

const testimonials = [
    {
        quote: 'Hazir cut our payroll processing time from 3 days to 30 minutes. The face attendance works flawlessly even in rural areas.',
        name: 'Rajesh Kumar',
        role: 'HR Head, Swift Logistics',
        initials: 'RK',
    },
    {
        quote: 'The live route tracking is a game-changer. We finally know where our field team actually is. Saved 20% on fuel costs.',
        name: 'Priya Sharma',
        role: 'Operations Manager, MetroCourier',
        initials: 'PS',
    },
    {
        quote: 'Setup took 1 day. Our 200+ field workers were onboarded without any training. The UI is that simple.',
        name: 'Amit Patel',
        role: 'Founder, GreenField Services',
        initials: 'AP',
    },
]

const faqs = [
    {
        q: 'How does AI face attendance work?',
        a: 'Our AI uses advanced facial recognition that works offline. Employees just look at their phone camera, and attendance is marked in under 2 seconds. It works with masks, glasses, and in low light. Anti-spoofing prevents photo/video fraud.',
    },
    {
        q: 'Does route tracking work without internet?',
        a: 'Yes! The mobile app caches GPS data offline and syncs automatically when the device reconnects. You never lose a single data point.',
    },
    {
        q: 'Is my company data secure?',
        a: 'Absolutely. All data is encrypted in transit (TLS 1.3) and at rest (AES-256). We are ISO 27001 and SOC 2 compliant. Data is stored in Indian data centers. We never share your data with third parties.',
    },
    {
        q: 'Can I import my existing employee data?',
        a: 'Yes, you can import employees via CSV/Excel in bulk. We also support API-based imports and integration with popular HR tools.',
    },
    {
        q: 'What happens after the free trial?',
        a: 'You get full access for 14 days without a credit card. After the trial, you can continue on our Free plan (up to 5 employees) or upgrade to a paid plan. No hidden charges.',
    },
    {
        q: 'Do you offer a mobile app?',
        a: 'Yes! We have native Android and iOS apps for both field employees (mark attendance, track routes) and managers (approvals, live map). Web dashboard is available for admin tasks.',
    },
    {
        q: 'Can I cancel anytime?',
        a: 'Yes. No lock-in, no cancellation fees. You can cancel from your dashboard anytime. We offer a 30-day money-back guarantee on annual plans.',
    },
    {
        q: 'Do you offer discounts for annual billing?',
        a: 'Yes, we offer 2 months free on annual plans — that is a 17% discount. For non-profits and educational institutions, we offer additional discounts. Contact sales for details.',
    },
]

const stats = [
    { value: '500+', label: 'Companies' },
    { value: '50K+', label: 'Employees' },
    { value: '99.9%', label: 'Uptime' },
    { value: '4.8/5', label: 'Customer rating' },
]

// ═══════════════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════════════

function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false)
    const navigate = useNavigate()

    const navLinks = [
        { label: 'Features', href: '#features' },
        { label: 'How it works', href: '#how-it-works' },
        { label: 'Pricing', href: '#pricing' },
        { label: 'FAQ', href: '#faq' },
    ]

    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/60">
            <div className="max-w-7xl mx-auto px-4 lg:px-6">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <a href="#" className="flex items-center gap-2.5">
                        <div className="p-2 rounded-lg bg-indigo-600">
                            <MapPin className="w-4 h-4 text-white" strokeWidth={2.5} />
                        </div>
                        <span className="text-lg font-bold tracking-tight text-slate-900">
                            Hazir
                        </span>
                    </a>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
                            >
                                {link.label}
                            </a>
                        ))}
                    </nav>

                    {/* CTAs */}
                    <div className="hidden md:flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate('/login')}
                            className="text-slate-700 hover:text-slate-900"
                        >
                            Log in
                        </Button>
                        <Button
                            size="sm"
                            onClick={() => navigate('/login')}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white gap-1.5"
                        >
                            Start free trial
                            <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.5} />
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        type="button"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
                        aria-label="Toggle menu"
                    >
                        <Menu className="w-5 h-5" strokeWidth={2} />
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileOpen && (
                    <div className="md:hidden py-4 border-t border-slate-100 space-y-1">
                        {navLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                onClick={() => setMobileOpen(false)}
                                className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
                            >
                                {link.label}
                            </a>
                        ))}
                        <div className="pt-2 space-y-2">
                            <Button
                                variant="outline"
                                className="w-full"
                                onClick={() => navigate('/login')}
                            >
                                Log in
                            </Button>
                            <Button
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                                onClick={() => navigate('/login')}
                            >
                                Start free trial
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </header>
    )
}

function Hero() {
    const navigate = useNavigate()

    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50/40 via-white to-white">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-indigo-100/50 blur-3xl" />
                <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-purple-100/40 blur-3xl" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 lg:px-6 pt-20 pb-24 lg:pt-28 lg:pb-32">
                <div className="max-w-3xl mx-auto text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 mb-6">
                        <Sparkles className="w-3.5 h-3.5 text-indigo-600" strokeWidth={2.5} />
                        <span className="text-xs font-semibold text-indigo-700 tracking-wide">
                            AI-powered workforce management
                        </span>
                    </div>

                    {/* Headline */}
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-[1.1]">
                        Field workforce
                        <br />
                        <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            management, simplified.
                        </span>
                    </h1>

                    {/* Subheadline */}
                    <p className="text-lg text-slate-600 mt-6 max-w-2xl mx-auto leading-relaxed">
                        AI face attendance, live route tracking, automated payroll, and leave management —
                        all in one platform. Built for Indian field teams. Loved by 500+ companies.
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
                        <Button
                            size="lg"
                            onClick={() => navigate('/login')}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2 h-11 px-6 shadow-lg shadow-indigo-500/20"
                        >
                            Start free trial
                            <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="gap-2 h-11 px-6 bg-white"
                        >
                            <Play className="w-4 h-4" strokeWidth={2.5} />
                            Watch demo
                        </Button>
                    </div>

                    {/* Trust signals */}
                    <p className="text-xs text-slate-500 mt-4">
                        No credit card required · 14-day free trial · Cancel anytime
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16 pt-10 border-t border-slate-200">
                        {stats.map((stat) => (
                            <div key={stat.label} className="text-center">
                                <p className="text-3xl font-bold text-slate-900 tracking-tight">
                                    {stat.value}
                                </p>
                                <p className="text-xs text-slate-500 mt-1 font-medium uppercase tracking-wider">
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

function Features() {
    return (
        <section id="features" className="py-20 lg:py-28 bg-white">
            <div className="max-w-7xl mx-auto px-4 lg:px-6">
                {/* Section header */}
                <div className="max-w-2xl mx-auto text-center mb-16">
                    <Badge className="bg-indigo-50 text-indigo-700 border-0 mb-4 text-xs font-semibold tracking-wide">
                        FEATURES
                    </Badge>
                    <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
                        Everything your field team needs
                    </h2>
                    <p className="text-slate-600 mt-4 text-lg leading-relaxed">
                        From attendance to payroll — one platform replaces 5 different tools.
                    </p>
                </div>

                {/* Features grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature) => {
                        const Icon = feature.icon
                        return (
                            <div
                                key={feature.title}
                                className="group p-6 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                            >
                                <div className={`inline-flex p-3 rounded-xl ${feature.bg} mb-4`}>
                                    <Icon className={`w-6 h-6 ${feature.color}`} strokeWidth={2} />
                                </div>
                                <div className="flex items-center gap-2 mb-2">
                                    <h3 className="text-lg font-semibold text-slate-900">
                                        {feature.title}
                                    </h3>
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    {feature.desc}
                                </p>
                                <div className="mt-4">
                                    <span className={`text-[11px] font-semibold uppercase tracking-wider ${feature.color}`}>
                                        {feature.highlight}
                                    </span>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

function HowItWorks() {
    return (
        <section id="how-it-works" className="py-20 lg:py-28 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 lg:px-6">
                <div className="max-w-2xl mx-auto text-center mb-16">
                    <Badge className="bg-emerald-50 text-emerald-700 border-0 mb-4 text-xs font-semibold tracking-wide">
                        HOW IT WORKS
                    </Badge>
                    <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
                        Up and running in 4 simple steps
                    </h2>
                    <p className="text-slate-600 mt-4 text-lg leading-relaxed">
                        Setup takes less than a day. No training required.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {howItWorks.map((step, i) => (
                        <div key={step.step} className="relative">
                            {/* Connector line */}
                            {i < howItWorks.length - 1 && (
                                <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-slate-200 -z-0" />
                            )}

                            <div className="relative bg-white p-6 rounded-2xl border border-slate-200 h-full">
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-600 text-white font-bold text-lg mb-4">
                                    {step.step}
                                </div>
                                <h3 className="text-base font-semibold text-slate-900 mb-2">
                                    {step.title}
                                </h3>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    {step.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

function Pricing() {
    const [billingCycle, setBillingCycle] = useState('monthly')

    return (
        <section id="pricing" className="py-20 lg:py-28 bg-white">
            <div className="max-w-7xl mx-auto px-4 lg:px-6">
                {/* Section header */}
                <div className="max-w-2xl mx-auto text-center mb-12">
                    <Badge className="bg-amber-50 text-amber-700 border-0 mb-4 text-xs font-semibold tracking-wide">
                        PRICING
                    </Badge>
                    <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
                        Simple, transparent pricing
                    </h2>
                    <p className="text-slate-600 mt-4 text-lg leading-relaxed">
                        Start free. Upgrade as you grow. No hidden charges.
                    </p>
                </div>

                {/* Billing toggle */}
                <div className="flex justify-center mb-12">
                    <div className="inline-flex items-center gap-1 bg-slate-100 rounded-xl p-1">
                        <button
                            type="button"
                            onClick={() => setBillingCycle('monthly')}
                            className={`px-5 py-2 text-sm font-medium rounded-lg transition-colors ${billingCycle === 'monthly'
                                ? 'bg-white text-slate-900 shadow-sm'
                                : 'text-slate-600 hover:text-slate-900'
                                }`}
                        >
                            Monthly
                        </button>
                        <button
                            type="button"
                            onClick={() => setBillingCycle('yearly')}
                            className={`px-5 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-2 ${billingCycle === 'yearly'
                                ? 'bg-white text-slate-900 shadow-sm'
                                : 'text-slate-600 hover:text-slate-900'
                                }`}
                        >
                            Yearly
                            <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                                SAVE 17%
                            </span>
                        </button>
                    </div>
                </div>

                {/* Plans grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    {plans.map((plan) => {
                        const isEnterprise = plan.id === 'enterprise'
                        const displayPrice = billingCycle === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice

                        return (
                            <div
                                key={plan.id}
                                className={`relative rounded-2xl border p-6 flex flex-col transition-all duration-200 ${plan.popular
                                    ? 'border-indigo-500 bg-indigo-50/30 shadow-xl shadow-indigo-500/10 lg:scale-105 lg:z-10'
                                    : 'border-slate-200 bg-white hover:border-slate-300'
                                    }`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[10px] font-bold px-3 py-1 rounded-full tracking-wider uppercase">
                                        Most Popular
                                    </div>
                                )}

                                {/* Header */}
                                <div className="mb-4">
                                    <h3 className="text-lg font-semibold text-slate-900">
                                        {plan.name}
                                    </h3>
                                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                                        {plan.tagline}
                                    </p>
                                </div>

                                {/* Price */}
                                <div className="mb-5 pb-5 border-b border-slate-200">
                                    {isEnterprise ? (
                                        <div>
                                            <p className="text-2xl font-bold text-slate-900">
                                                Custom
                                            </p>
                                            <p className="text-xs text-slate-500 mt-1">
                                                Tailored to your needs
                                            </p>
                                        </div>
                                    ) : (
                                        <div>
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-3xl font-bold text-slate-900 tracking-tight">
                                                    ₹{displayPrice.toLocaleString('en-IN')}
                                                </span>
                                                <span className="text-xs text-slate-500 font-medium">
                                                    /{billingCycle === 'yearly' ? 'year' : 'month'}
                                                </span>
                                            </div>
                                            <p className="text-[11px] text-slate-500 mt-1.5">
                                                {plan.maxEmployees
                                                    ? `Up to ${plan.maxEmployees} employees`
                                                    : 'Unlimited employees'}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* CTA */}
                                <Button
                                    className={`w-full mb-6 gap-1.5 ${plan.popular
                                        ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                                        : isEnterprise
                                            ? 'bg-slate-900 hover:bg-slate-800 text-white'
                                            : 'bg-white border border-slate-300 hover:bg-slate-50 text-slate-900'
                                        }`}
                                    variant={plan.popular || isEnterprise ? 'default' : 'outline'}
                                >
                                    {plan.cta}
                                    <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.5} />
                                </Button>

                                {/* Features */}
                                <div className="space-y-2.5 flex-1">
                                    {plan.features.map((feature) => (
                                        <div
                                            key={feature.name}
                                            className="flex items-start gap-2 text-xs"
                                        >
                                            {feature.included ? (
                                                <div className="p-0.5 rounded-full bg-emerald-50 shrink-0 mt-0.5">
                                                    <Check className="w-3 h-3 text-emerald-600" strokeWidth={3} />
                                                </div>
                                            ) : (
                                                <div className="p-0.5 rounded-full bg-slate-100 shrink-0 mt-0.5">
                                                    <X className="w-3 h-3 text-slate-400" strokeWidth={3} />
                                                </div>
                                            )}
                                            <span
                                                className={
                                                    feature.included
                                                        ? 'text-slate-700'
                                                        : 'text-slate-400 line-through'
                                                }
                                            >
                                                {feature.name}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    })}
                </div>

                <p className="text-center text-xs text-slate-500 mt-8">
                    All plans include 14-day free trial · No credit card required · 30-day money-back guarantee
                </p>
            </div>
        </section>
    )
}

function Testimonials() {
    return (
        <section className="py-20 lg:py-28 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 lg:px-6">
                <div className="max-w-2xl mx-auto text-center mb-16">
                    <Badge className="bg-rose-50 text-rose-700 border-0 mb-4 text-xs font-semibold tracking-wide">
                        TESTIMONIALS
                    </Badge>
                    <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
                        Loved by field teams across India
                    </h2>
                    <p className="text-slate-600 mt-4 text-lg leading-relaxed">
                        Hear from operations managers and founders who switched to Hazir.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {testimonials.map((t) => (
                        <div
                            key={t.name}
                            className="p-6 rounded-2xl bg-white border border-slate-200"
                        >
                            {/* Stars */}
                            <div className="flex items-center gap-0.5 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className="w-4 h-4 fill-amber-400 text-amber-400"
                                        strokeWidth={2}
                                    />
                                ))}
                            </div>
                            <p className="text-sm text-slate-700 leading-relaxed">
                                "{t.quote}"
                            </p>
                            <div className="flex items-center gap-3 mt-6 pt-6 border-t border-slate-100">
                                <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-xs font-bold text-indigo-700">
                                    {t.initials}
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-slate-900">
                                        {t.name}
                                    </p>
                                    <p className="text-xs text-slate-500 mt-0.5">
                                        {t.role}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

function FAQ() {
    const [openIndex, setOpenIndex] = useState(0)

    return (
        <section id="faq" className="py-20 lg:py-28 bg-white">
            <div className="max-w-3xl mx-auto px-4 lg:px-6">
                <div className="text-center mb-12">
                    <Badge className="bg-cyan-50 text-cyan-700 border-0 mb-4 text-xs font-semibold tracking-wide">
                        FAQ
                    </Badge>
                    <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
                        Questions? We have answers.
                    </h2>
                    <p className="text-slate-600 mt-4 text-lg leading-relaxed">
                        Everything you need to know about Hazir.
                    </p>
                </div>

                <div className="space-y-3">
                    {faqs.map((faq, i) => {
                        const isOpen = openIndex === i
                        return (
                            <div
                                key={faq.q}
                                className="border border-slate-200 rounded-xl overflow-hidden transition-colors hover:border-slate-300"
                            >
                                <button
                                    type="button"
                                    onClick={() => setOpenIndex(isOpen ? -1 : i)}
                                    className="w-full flex items-center justify-between gap-4 p-5 text-left bg-white hover:bg-slate-50/50 transition-colors"
                                >
                                    <span className="text-sm font-semibold text-slate-900">
                                        {faq.q}
                                    </span>
                                    <ChevronDown
                                        className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''
                                            }`}
                                        strokeWidth={2.5}
                                    />
                                </button>
                                {isOpen && (
                                    <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                                        {faq.a}
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

function FinalCTA() {
    const navigate = useNavigate()

    return (
        <section className="py-20 lg:py-28 bg-slate-900 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-indigo-600/20 blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-purple-600/20 blur-3xl" />
            </div>

            <div className="relative max-w-4xl mx-auto px-4 lg:px-6 text-center">
                <h2 className="text-3xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
                    Ready to modernize
                    <br />
                    your field operations?
                </h2>
                <p className="text-slate-300 text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
                    Join 500+ companies who trust Hazir for attendance, tracking, and payroll.
                    Start your 14-day free trial today.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
                    <Button
                        size="lg"
                        onClick={() => navigate('/login')}
                        className="bg-white text-slate-900 hover:bg-slate-100 gap-2 h-11 px-6"
                    >
                        Start free trial
                        <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
                    </Button>
                    <Button
                        size="lg"
                        variant="outline"
                        className="border-slate-600 text-white hover:bg-slate-800 hover:text-white gap-2 h-11 px-6 bg-transparent"
                    >
                        <Phone className="w-4 h-4" strokeWidth={2.5} />
                        Talk to sales
                    </Button>
                </div>
            </div>
        </section>
    )
}

function Footer() {
    const navigate = useNavigate()

    const footerLinks = {
        Product: [
            { label: 'Features', href: '#features' },
            { label: 'Pricing', href: '#pricing' },
            { label: 'How it works', href: '#how-it-works' },
            { label: 'FAQ', href: '#faq' },
        ],
        Company: [
            { label: 'About us' },
            { label: 'Careers' },
            { label: 'Blog' },
            { label: 'Contact' },
        ],
        Legal: [
            { label: 'Privacy Policy' },
            { label: 'Terms of Service' },
            { label: 'Refund Policy' },
            { label: 'Security' },
        ],
    }

    return (
        <footer className="bg-white border-t border-slate-200">
            <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12 lg:py-16">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                    {/* Brand column */}
                    <div className="col-span-2 md:col-span-2">
                        <div className="flex items-center gap-2.5 mb-4">
                            <div className="p-2 rounded-lg bg-indigo-600">
                                <MapPin className="w-4 h-4 text-white" strokeWidth={2.5} />
                            </div>
                            <span className="text-lg font-bold tracking-tight text-slate-900">
                                Hazir
                            </span>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed max-w-xs">
                            AI-powered workforce management for Indian field teams. Attendance, tracking, payroll — all in one.
                        </p>
                        {/* Social — naya (generic icons) */}
                        <div className="flex items-center gap-2 mt-5">
                            <a
                                href="#"
                                className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                                aria-label="Twitter"
                            >
                                <Globe className="w-4 h-4" strokeWidth={2} />
                            </a>
                            <a
                                href="#"
                                className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                                aria-label="LinkedIn"
                            >
                                <Building2 className="w-4 h-4" strokeWidth={2} />
                            </a>
                            <a
                                href="mailto:hello@hazir.com"
                                className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                                aria-label="Email"
                            >
                                <Mail className="w-4 h-4" strokeWidth={2} />
                            </a>
                        </div>
                    </div>

                    {/* Link columns */}
                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category}>
                            <h4 className="text-sm font-semibold text-slate-900 mb-4">
                                {category}
                            </h4>
                            <ul className="space-y-2.5">
                                {links.map((link) => (
                                    <li key={link.label}>
                                        <a
                                            href={link.href || '#'}
                                            className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom row */}
                <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-slate-500">
                        © {new Date().getFullYear()} Hazir. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                            <Globe className="w-3 h-3" strokeWidth={2} />
                            Made in India
                        </span>
                        <span className="flex items-center gap-1">
                            <Shield className="w-3 h-3" strokeWidth={2} />
                            ISO 27001 Certified
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    )
}

// ═══════════════════════════════════════════════════════════
// MAIN LANDING PAGE
// ═══════════════════════════════════════════════════════════

export default function Landing() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <Hero />
            <Features />
            <HowItWorks />
            <Pricing />
            <Testimonials />
            <FAQ />
            <FinalCTA />
            <Footer />
        </div>
    )
}