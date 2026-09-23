import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
    ArrowRight,
    Check,
    Menu,
    X,
    Route,
    ScanFace,
    CalendarDays,
    Minus,
    Plus,
    WifiOff,
    ShieldCheck,
    Smartphone,
    FileSpreadsheet,
    Fingerprint,
    Zap,
} from 'lucide-react'

// ─────────────────────────────────────────────────────────────
// FONTS + BASE STYLES (scoped to this page)
// ─────────────────────────────────────────────────────────────

const PageStyles = () => (
    <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,600;12..96,700;12..96,800&family=Inter:wght@400;500;600&display=swap');

    .hz {
      --ink: #0E1B16;
      --ink-2: #33423B;
      --ink-3: #66746D;
      --paper: #F7F6F2;
      --card: #FFFFFF;
      --line: #E3E1DA;
      --green: #0E9F6E;
      --green-deep: #0A6B4A;
      --green-soft: #E3F4EC;
      --amber: #F5A524;
      --amber-soft: #FDF1DA;
      --red: #E5484D;
      font-family: 'Inter', system-ui, sans-serif;
      color: var(--ink);
      background: var(--paper);
      -webkit-font-smoothing: antialiased;
    }
    .hz .display { font-family: 'Bricolage Grotesque', 'Inter', sans-serif; letter-spacing: -0.025em; }
    .hz .tnum { font-variant-numeric: tabular-nums; }
    .hz a:focus-visible, .hz button:focus-visible {
      outline: 2px solid var(--green); outline-offset: 2px; border-radius: 8px;
    }
    .hz .grid-bg {
      background-image:
        linear-gradient(to right, rgba(14,27,22,.045) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(14,27,22,.045) 1px, transparent 1px);
      background-size: 44px 44px;
      mask-image: radial-gradient(ellipse 70% 60% at 50% 0%, #000 30%, transparent 75%);
      -webkit-mask-image: radial-gradient(ellipse 70% 60% at 50% 0%, #000 30%, transparent 75%);
    }
    .hz .dark-grid {
      background-image:
        linear-gradient(to right, rgba(255,255,255,.05) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255,255,255,.05) 1px, transparent 1px);
      background-size: 40px 40px;
    }

    /* hero board animations, one orchestrated moment */
    @keyframes hz-pin-pulse {
      0% { transform: scale(1); opacity: .55; }
      100% { transform: scale(2.6); opacity: 0; }
    }
    @keyframes hz-draw { to { stroke-dashoffset: 0; } }
    @keyframes hz-feed-in {
      from { opacity: 0; transform: translateY(-6px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .hz-pulse::after {
      content: ''; position: absolute; inset: 0; border-radius: 9999px;
      background: var(--green); animation: hz-pin-pulse 2.2s ease-out infinite;
    }
    .hz-route { stroke-dasharray: 520; stroke-dashoffset: 520; animation: hz-draw 3.2s .4s ease-out forwards; }
    .hz-feed-item { animation: hz-feed-in .45s ease-out both; }

    /* face scan */
    @keyframes hz-scan {
      0%   { top: 6%;  opacity: 0; }
      8%   { opacity: 1; }
      50%  { top: 92%; opacity: 1; }
      58%  { opacity: 0; }
      100% { top: 92%; opacity: 0; }
    }
    @keyframes hz-mesh {
      0%, 12%  { opacity: 0; }
      30%, 62% { opacity: 1; }
      78%, 100%{ opacity: 0; }
    }
    @keyframes hz-verify {
      0%, 60%  { opacity: 0; transform: translateY(8px) scale(.96); }
      70%, 92% { opacity: 1; transform: translateY(0) scale(1); }
      100%     { opacity: 0; transform: translateY(0) scale(1); }
    }
    @keyframes hz-brackets {
      0%, 55%  { border-color: rgba(255,255,255,.55); }
      66%, 92% { border-color: var(--green); }
      100%     { border-color: rgba(255,255,255,.55); }
    }
    .hz-scan-line { animation: hz-scan 4.4s ease-in-out infinite; }
    .hz-mesh      { animation: hz-mesh 4.4s ease-in-out infinite; }
    .hz-verify    { animation: hz-verify 4.4s ease-out infinite; }
    .hz-bracket   { animation: hz-brackets 4.4s ease-in-out infinite; }

    @media (prefers-reduced-motion: reduce) {
      .hz-pulse::after, .hz-route, .hz-feed-item,
      .hz-scan-line, .hz-mesh, .hz-verify, .hz-bracket { animation: none !important; }
      .hz-route { stroke-dashoffset: 0; }
      .hz-scan-line { display: none; }
      .hz-mesh { opacity: 1; }
      .hz-verify { opacity: 1; }
      .hz-bracket { border-color: var(--green); }
    }
  `}</style>
)

// ─────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────

const YEARLY_MONTHS_PAID = 10 // 2 months free

const plans = [
    {
        id: 'starter',
        name: 'Starter',
        for: 'Shop, clinic or small team',
        monthly: 999,
        employees: 10,
        zones: '2 work zones',
        cta: 'Start free trial',
        includes: [
            'Up to 10 employees',
            'AI face attendance',
            'Leave management',
            '2 work zones',
            'Payslips + PF / ESI',
            'Basic reports',
        ],
    },
    {
        id: 'growth',
        name: 'Growth',
        for: 'Growing teams, 2–3 branches',
        monthly: 2499,
        employees: 30,
        zones: '5 work zones',
        cta: 'Start free trial',
        includes: [
            'Up to 30 employees',
            'Everything in Starter',
            'Automated payroll + TDS',
            '5 work zones',
            'Shift & overtime rules',
            'Email support',
        ],
    },
    {
        id: 'pro',
        name: 'Pro',
        for: 'Field teams on the road',
        monthly: 5999,
        employees: 100,
        popular: true,
        zones: 'Unlimited zones',
        cta: 'Start free trial',
        includes: [
            'Up to 100 employees',
            'Everything in Growth',
            'Live route tracking',
            'Geofence violation alerts',
            'Unlimited zones',
            'Advanced analytics',
        ],
    },
    {
        id: 'business',
        name: 'Business',
        for: 'Multi-city operations',
        monthly: 12999,
        employees: 500,
        zones: 'Unlimited zones',
        cta: 'Start free trial',
        includes: [
            'Up to 500 employees',
            'Everything in Pro',
            'Multi-branch hierarchy',
            'Role-based access',
            'API access',
            'Priority support',
        ],
    },
    {
        id: 'enterprise',
        name: 'Enterprise',
        for: 'Large organisations',
        monthly: null,
        employees: null,
        cta: 'Talk to sales',
        includes: [
            'Unlimited employees',
            'Everything in Business',
            'Custom integrations',
            'SSO + audit logs',
            'Dedicated account manager',
            'SLA-backed support',
        ],
    },
]

const faqs = [
    {
        q: 'How does AI face attendance work?',
        a: 'The employee looks at the phone camera and attendance is marked in under two seconds. A liveness check stops photo and video fraud, so nobody can mark attendance for someone else. It works offline too and syncs when the phone reconnects.',
    },
    {
        q: 'Does route tracking work offline?',
        a: 'Yes. The app stores GPS points on the phone and syncs them as soon as the network is available. No point in between is missed.',
    },
    {
        q: 'What happens after the free trial?',
        a: '14 days free without a credit card. When the trial ends, you can choose any paid plan. If you do not choose a plan, the account becomes read-only and your data is not deleted.',
    },
    {
        q: 'Can I import old employee data?',
        a: 'Bulk import from CSV or Excel. Download the template from the dashboard, fill in the columns and upload.',
    },
    {
        q: 'What is calculated in payroll?',
        a: 'Attendance, overtime, late marks, leave deduction, PF, ESI and TDS. Payslips are generated in one click at month-end.',
    },
    {
        q: 'Can I cancel anytime?',
        a: 'Yes. No lock-in. Annual plans come with a 30-day money-back guarantee.',
    },
]

// ─────────────────────────────────────────────────────────────
// SHARED
// ─────────────────────────────────────────────────────────────

const inr = (n) => '₹' + n.toLocaleString('en-IN')

function Logo({ light = false }) {
    return (
        <Link to="/" className="flex items-center gap-2.5" aria-label="Hazir home">
            <span
                className="grid place-items-center w-8 h-8 rounded-[10px]"
                style={{ background: light ? '#fff' : 'var(--ink)' }}
            >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path
                        d="M4 9.5l3.2 3.2L14 5.5"
                        stroke={light ? 'var(--ink)' : '#fff'}
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </span>
            <span
                className="display text-[22px] font-bold"
                style={{ color: light ? '#fff' : 'var(--ink)' }}
            >
                hazir
            </span>
        </Link>
    )
}

function PrimaryBtn({ children, onClick, to, className = '', dark = false }) {
    const cls = `inline-flex items-center justify-center gap-2 h-11 px-5 rounded-[10px] text-[14px] font-semibold transition-colors ${dark ? 'bg-white text-[var(--ink)] hover:bg-[var(--green-soft)]' : 'bg-[var(--ink)] text-white hover:bg-[var(--green-deep)]'
        } ${className}`
    if (to) return <Link to={to} className={cls}>{children}</Link>
    return <button type="button" onClick={onClick} className={cls}>{children}</button>
}

function GhostBtn({ children, onClick, to, className = '', dark = false }) {
    const cls = `inline-flex items-center justify-center gap-2 h-11 px-5 rounded-[10px] text-[14px] font-semibold border transition-colors ${dark
        ? 'border-white/25 text-white hover:bg-white/10'
        : 'border-[var(--line)] bg-white text-[var(--ink)] hover:border-[var(--ink)]'
        } ${className}`
    if (to) return <Link to={to} className={cls}>{children}</Link>
    return <button type="button" onClick={onClick} className={cls}>{children}</button>
}

// ─────────────────────────────────────────────────────────────
// NAV
// ─────────────────────────────────────────────────────────────

function Navbar() {
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()
    const links = [
        { label: 'Product', href: '#product' },
        { label: 'Payroll', href: '#payroll' },
        { label: 'Pricing', href: '#pricing' },
        { label: 'FAQ', href: '#faq' },
    ]

    return (
        <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--paper)]/85 backdrop-blur">
            <div className="max-w-[1180px] mx-auto px-5 h-16 flex items-center justify-between">
                <Logo />
                <nav className="hidden md:flex items-center gap-8">
                    {links.map((l) => (
                        <a key={l.label} href={l.href} className="text-[14px] font-medium text-[var(--ink-2)] hover:text-[var(--ink)]">
                            {l.label}
                        </a>
                    ))}
                </nav>
                <div className="hidden md:flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => navigate('/login')}
                        className="h-10 px-4 text-[14px] font-semibold text-[var(--ink-2)] hover:text-[var(--ink)]"
                    >
                        Log in
                    </button>
                    <PrimaryBtn to="/get-started" className="!h-10">Start free trial</PrimaryBtn>
                </div>
                <button
                    type="button"
                    className="md:hidden p-2 -mr-2"
                    onClick={() => setOpen(!open)}
                    aria-label="Toggle menu"
                    aria-expanded={open}
                >
                    {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
            </div>
            {open && (
                <div className="md:hidden border-t border-[var(--line)] px-5 py-4 space-y-1 bg-[var(--paper)]">
                    {links.map((l) => (
                        <a
                            key={l.label}
                            href={l.href}
                            onClick={() => setOpen(false)}
                            className="block py-2.5 text-[15px] font-medium text-[var(--ink-2)]"
                        >
                            {l.label}
                        </a>
                    ))}
                    <div className="pt-3 grid grid-cols-2 gap-2">
                        <GhostBtn onClick={() => navigate('/login')}>Log in</GhostBtn>
                        <PrimaryBtn to="/get-started">Start trial</PrimaryBtn>
                    </div>
                </div>
            )}
        </header>
    )
}

// ─────────────────────────────────────────────────────────────
// HERO — live ops board (the one memorable moment)
// ─────────────────────────────────────────────────────────────

const feedSeed = [
    { name: 'Ravi Yadav', act: 'Face verified · Salt Lake', t: '09:02', ok: true },
    { name: 'Meena Das', act: 'Face verified · Howrah', t: '09:04', ok: true },
    { name: 'Imran Sheikh', act: 'Left zone Park Street', t: '09:11', ok: false },
    { name: 'Pooja Roy', act: 'Face verified · Salt Lake', t: '09:13', ok: true },
]

const feedPool = [
    { name: 'Sanjay Ghosh', act: 'Face verified · Dumdum', ok: true },
    { name: 'Neha Paul', act: 'Face verified · Howrah', ok: true },
    { name: 'Arjun Mondal', act: 'Late by 12 min · Salt Lake', ok: false },
    { name: 'Kavita Singh', act: 'Face verified · Park Street', ok: true },
]

function LiveBoard() {
    const [feed, setFeed] = useState(feedSeed.map((f, i) => ({ ...f, id: i })))
    const [present, setPresent] = useState(84)

    useEffect(() => {
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (reduce) return
        let n = 0
        const id = setInterval(() => {
            const next = feedPool[n % feedPool.length]
            const t = `${String(9 + Math.floor(n / 4)).padStart(2, '0')}:${String(14 + ((n * 3) % 40)).padStart(2, '0')}`
            setFeed((prev) => [{ ...next, t, id: 100 + n }, ...prev].slice(0, 4))
            if (next.ok) setPresent((p) => Math.min(p + 1, 96))
            n += 1
        }, 2800)
        return () => clearInterval(id)
    }, [])

    return (
        <div
            className="relative rounded-[20px] border border-[var(--line)] bg-white overflow-hidden"
            style={{ boxShadow: '0 40px 80px -36px rgba(14,27,22,.4), 0 2px 0 rgba(14,27,22,.04)' }}
            role="img"
            aria-label="Hazir live operations dashboard preview showing employee locations and attendance feed"
        >
            {/* window chrome */}
            <div className="flex items-center justify-between px-4 h-11 border-b border-[var(--line)] bg-[#FBFAF7]">
                <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#E3E1DA]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#E3E1DA]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#E3E1DA]" />
                </div>
                <span className="text-[12px] font-medium text-[var(--ink-3)]">Today · Live board</span>
                <span className="flex items-center gap-1.5 text-[12px] font-semibold text-[var(--green-deep)]">
                    <span className="relative w-2 h-2 rounded-full bg-[var(--green)] hz-pulse" />
                    Live
                </span>
            </div>

            <div className="grid md:grid-cols-[1.35fr_1fr]">
                {/* map */}
                <div className="relative h-[300px] md:h-[380px] bg-[#EEF1EC] border-b md:border-b-0 md:border-r border-[var(--line)]">
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 520 380" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                        <g fill="#E2E8E1">
                            <rect x="20" y="24" width="120" height="70" rx="6" />
                            <rect x="160" y="24" width="90" height="70" rx="6" />
                            <rect x="290" y="24" width="210" height="70" rx="6" />
                            <rect x="20" y="124" width="70" height="90" rx="6" />
                            <rect x="120" y="124" width="150" height="90" rx="6" />
                            <rect x="300" y="124" width="200" height="90" rx="6" />
                            <rect x="20" y="244" width="150" height="110" rx="6" />
                            <rect x="200" y="244" width="100" height="110" rx="6" />
                            <rect x="330" y="244" width="170" height="110" rx="6" />
                        </g>
                        <rect x="120" y="124" width="150" height="90" rx="6" fill="#D5E7D6" />
                        <path d="M-10 330 C 120 300, 220 350, 340 320 S 520 300, 540 310 L540 390 L-10 390Z" fill="#D6E6EE" />
                        <circle cx="150" cy="150" r="64" fill="rgba(14,159,110,.10)" stroke="var(--green)" strokeWidth="1.5" strokeDasharray="5 5" />
                        <circle cx="390" cy="180" r="56" fill="rgba(14,159,110,.10)" stroke="var(--green)" strokeWidth="1.5" strokeDasharray="5 5" />
                        <path
                            className="hz-route"
                            d="M60 300 C 110 250, 130 200, 190 190 S 300 210, 340 170 S 420 110, 470 70"
                            fill="none"
                            stroke="var(--ink)"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                        />
                    </svg>

                    {[
                        { l: '28%', t: '40%', c: 'var(--green)', label: 'Ravi' },
                        { l: '74%', t: '46%', c: 'var(--green)', label: 'Meena' },
                        { l: '90%', t: '18%', c: 'var(--ink)', label: 'Arjun · on route' },
                        { l: '52%', t: '58%', c: 'var(--amber)', label: 'Imran · outside zone' },
                    ].map((p, i) => (
                        <div key={i} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: p.l, top: p.t }}>
                            <span className="relative block w-3.5 h-3.5 rounded-full border-2 border-white hz-pulse" style={{ background: p.c }} />
                            <span className="absolute left-4 -top-1.5 whitespace-nowrap rounded-md bg-white border border-[var(--line)] px-1.5 py-0.5 text-[10.5px] font-medium text-[var(--ink-2)]">
                                {p.label}
                            </span>
                        </div>
                    ))}

                    <div className="absolute left-3 bottom-3 right-3 md:right-auto md:w-[240px] flex items-start gap-2.5 rounded-xl bg-white border border-[var(--line)] p-3 shadow-sm">
                        <span className="mt-0.5 grid place-items-center w-6 h-6 rounded-md bg-[var(--amber-soft)]">
                            <Route className="w-3.5 h-3.5 text-[#B7791F]" />
                        </span>
                        <div>
                            <p className="text-[12px] font-semibold leading-tight">Imran left Park Street zone</p>
                            <p className="text-[11px] text-[var(--ink-3)] mt-0.5">Manager notified · 09:11</p>
                        </div>
                    </div>
                </div>

                {/* side panel */}
                <div className="p-5 flex flex-col">
                    <div className="flex items-end justify-between">
                        <div>
                            <p className="text-[12px] font-medium text-[var(--ink-3)]">Present today</p>
                            <p className="display tnum text-[40px] leading-none font-bold mt-1">
                                {present}
                                <span className="text-[20px] text-[var(--ink-3)] font-semibold"> / 100</span>
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-[12px] font-medium text-[var(--ink-3)]">Payroll · Jun</p>
                            <p className="display tnum text-[18px] font-bold mt-1">₹8,42,300</p>
                        </div>
                    </div>

                    <div className="mt-4 h-1.5 rounded-full bg-[var(--line)] overflow-hidden">
                        <div className="h-full rounded-full bg-[var(--green)] transition-all duration-700" style={{ width: `${present}%` }} />
                    </div>

                    <p className="text-[12px] font-semibold text-[var(--ink-2)] mt-6 mb-2">Activity</p>
                    <ul className="space-y-1.5 flex-1">
                        {feed.map((f) => (
                            <li
                                key={f.id}
                                className="hz-feed-item flex items-center gap-2.5 rounded-lg border border-[var(--line)] px-2.5 py-2"
                            >
                                <span
                                    className="grid place-items-center w-7 h-7 rounded-full text-[10px] font-bold shrink-0"
                                    style={{
                                        background: f.ok ? 'var(--green-soft)' : 'var(--amber-soft)',
                                        color: f.ok ? 'var(--green-deep)' : '#B7791F',
                                    }}
                                >
                                    {f.name.split(' ').map((w) => w[0]).join('')}
                                </span>
                                <span className="min-w-0 flex-1">
                                    <span className="block text-[12px] font-semibold truncate">{f.name}</span>
                                    <span className="block text-[11px] text-[var(--ink-3)] truncate">{f.act}</span>
                                </span>
                                <span className="tnum text-[11px] text-[var(--ink-3)]">{f.t}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

function Hero() {
    return (
        <section className="relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-[560px] grid-bg pointer-events-none" aria-hidden="true" />
            <div className="relative max-w-[1180px] mx-auto px-5 pt-16 md:pt-24 pb-10">
                <div className="max-w-[860px]">
                    <div className="inline-flex items-center gap-2 h-8 pl-2 pr-3.5 rounded-full bg-white border border-[var(--line)] text-[13px] font-medium text-[var(--ink-2)]">
                        <span className="grid place-items-center w-5 h-5 rounded-full bg-[var(--green-soft)]">
                            <ScanFace className="w-3 h-3 text-[var(--green-deep)]" strokeWidth={2.5} />
                        </span>
                        AI face attendance, now with liveness check
                    </div>

                    <h1 className="display mt-6 text-[44px] sm:text-[62px] lg:text-[76px] leading-[1.02] font-extrabold">
                        When your team is in the field,
                        <br />
                        attendance is on the phone.
                    </h1>
                    <p className="mt-6 text-[18px] leading-[1.6] text-[var(--ink-2)] max-w-[580px]">
                        AI face attendance, GPS-based live location and one-click payroll at month-end. Built for field teams, with Indian compliance.
                    </p>
                    <div className="mt-8 flex flex-wrap items-center gap-3">
                        <PrimaryBtn to="/get-started">
                            Start free trial <ArrowRight className="w-4 h-4" />
                        </PrimaryBtn>
                        <GhostBtn to="/get-started?intent=demo">Book a 20-min demo</GhostBtn>
                    </div>
                    <p className="mt-4 text-[13px] text-[var(--ink-3)]">14 days free. No credit card required.</p>
                </div>

                <div className="mt-14 md:mt-16">
                    <LiveBoard />
                </div>
            </div>
        </section>
    )
}

// ─────────────────────────────────────────────────────────────
// AI FACE ATTENDANCE — the featured section
// ─────────────────────────────────────────────────────────────

function PhoneScan() {
    return (
        <div className="relative mx-auto w-[280px] sm:w-[300px]">
            {/* phone body */}
            <div className="relative rounded-[40px] bg-[#0A120F] p-[10px] border border-white/10" style={{ boxShadow: '0 40px 80px -30px rgba(0,0,0,.6)' }}>
                <div className="relative rounded-[31px] overflow-hidden bg-[#13211B] aspect-[9/17]">
                    {/* notch */}
                    <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-20 h-5 rounded-full bg-[#0A120F] z-20" />

                    {/* status bar */}
                    <div className="absolute top-3 left-5 right-5 flex items-center justify-between text-[10px] font-semibold text-white/70 z-10">
                        <span className="tnum">9:02</span>
                        <span className="flex items-center gap-1">
                            <WifiOff className="w-3 h-3" />
                        </span>
                    </div>

                    {/* header */}
                    <div className="absolute top-12 inset-x-0 text-center z-10">
                        <p className="text-[13px] font-semibold text-white">Mark attendance</p>
                        <p className="text-[11px] text-white/55 mt-0.5">Look at the camera</p>
                    </div>

                    {/* viewfinder */}
                    <div className="absolute inset-x-0 top-[96px] bottom-[110px] grid place-items-center">
                        <div className="relative w-[170px] h-[210px]">
                            {/* face silhouette */}
                            <svg viewBox="0 0 170 210" className="absolute inset-0 w-full h-full" fill="none" aria-hidden="true">
                                <defs>
                                    <linearGradient id="skin" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0" stopColor="#2C4A3E" />
                                        <stop offset="1" stopColor="#1B3129" />
                                    </linearGradient>
                                </defs>
                                <ellipse cx="85" cy="100" rx="56" ry="74" fill="url(#skin)" />
                                <path d="M30 210 C 30 170, 60 158, 85 158 S 140 170, 140 210Z" fill="url(#skin)" />
                                {/* mesh */}
                                <g className="hz-mesh" stroke="var(--green)" strokeWidth="1" strokeLinecap="round">
                                    <path d="M45 80 Q85 62 125 80" />
                                    <path d="M40 104 Q85 90 130 104" />
                                    <path d="M46 128 Q85 120 124 128" />
                                    <path d="M58 150 Q85 156 112 150" />
                                    <path d="M85 40 V158" />
                                    <path d="M62 52 Q60 110 70 152" />
                                    <path d="M108 52 Q110 110 100 152" />
                                    <circle cx="65" cy="92" r="3" fill="var(--green)" />
                                    <circle cx="105" cy="92" r="3" fill="var(--green)" />
                                    <circle cx="85" cy="118" r="2.5" fill="var(--green)" />
                                    <circle cx="85" cy="142" r="2.5" fill="var(--green)" />
                                    <circle cx="45" cy="104" r="2" fill="var(--green)" />
                                    <circle cx="125" cy="104" r="2" fill="var(--green)" />
                                </g>
                            </svg>

                            {/* corner brackets */}
                            {[
                                'top-0 left-0 border-t-2 border-l-2 rounded-tl-xl',
                                'top-0 right-0 border-t-2 border-r-2 rounded-tr-xl',
                                'bottom-0 left-0 border-b-2 border-l-2 rounded-bl-xl',
                                'bottom-0 right-0 border-b-2 border-r-2 rounded-br-xl',
                            ].map((c) => (
                                <span key={c} className={`hz-bracket absolute w-7 h-7 ${c}`} />
                            ))}

                            {/* scan line */}
                            <span
                                className="hz-scan-line absolute left-1 right-1 h-[2px] rounded-full"
                                style={{ background: 'linear-gradient(90deg, transparent, var(--green), transparent)', boxShadow: '0 0 14px 2px rgba(14,159,110,.7)' }}
                            />
                        </div>
                    </div>

                    {/* verified card */}
                    <div className="hz-verify absolute left-4 right-4 bottom-5 rounded-2xl bg-white p-3 flex items-center gap-3 z-10">
                        <span className="grid place-items-center w-9 h-9 rounded-full bg-[var(--green)] shrink-0">
                            <Check className="w-5 h-5 text-white" strokeWidth={3} />
                        </span>
                        <span className="min-w-0">
                            <span className="block text-[13px] font-semibold text-[var(--ink)] leading-tight">Ravi Yadav</span>
                            <span className="block text-[11px] text-[var(--ink-3)] mt-0.5">Marked in 1.8s · On time</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

function FaceAttendance() {
    const points = [
        { icon: Fingerprint, t: 'No buddy punching', d: 'Every check-in is matched to the employee’s own face.' },
        { icon: ShieldCheck, t: 'Liveness check', d: 'Photos, screens and videos are rejected.' },
        { icon: WifiOff, t: 'Works offline', d: 'Marks on the phone, syncs when the network returns.' },
        { icon: Zap, t: 'Under 2 seconds', d: 'Look at the camera, that’s it. No hardware needed.' },
    ]

    return (
        <section id="face-attendance" className="relative bg-[var(--ink)] text-white overflow-hidden">
            <div className="absolute inset-0 dark-grid opacity-60 pointer-events-none" aria-hidden="true"
                style={{ maskImage: 'radial-gradient(ellipse 80% 70% at 70% 40%, #000 20%, transparent 75%)', WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 70% 40%, #000 20%, transparent 75%)' }} />
            <div className="absolute -right-40 top-10 w-[520px] h-[520px] rounded-full pointer-events-none" aria-hidden="true"
                style={{ background: 'radial-gradient(circle, rgba(14,159,110,.28), transparent 65%)' }} />

            <div className="relative max-w-[1180px] mx-auto px-5 py-20 lg:py-28 grid lg:grid-cols-[1.05fr_1fr] gap-14 lg:gap-16 items-center">
                <div className="max-w-[540px]">
                    <span className="inline-flex items-center gap-2 h-8 px-3 rounded-full border border-white/15 bg-white/5 text-[13px] font-medium text-white/80">
                        <ScanFace className="w-4 h-4 text-[var(--green)]" />
                        AI face attendance
                    </span>
                    <h2 className="display mt-6 text-[38px] sm:text-[52px] leading-[1.03] font-bold">
                        Your face is the punch card.
                    </h2>
                    <p className="mt-5 text-[17px] leading-[1.65] text-white/70">
                        Employees look at their phone and attendance is marked. Nobody can mark it for someone else, and it keeps working when the network doesn’t.
                    </p>

                    <div className="mt-10 grid sm:grid-cols-2 gap-x-8 gap-y-7">
                        {points.map(({ icon: I, t, d }) => (
                            <div key={t} className="flex items-start gap-3.5">
                                <span className="mt-0.5 grid place-items-center w-9 h-9 rounded-[10px] bg-white/[.07] border border-white/10 shrink-0">
                                    <I className="w-[18px] h-[18px] text-[var(--green)]" />
                                </span>
                                <div>
                                    <p className="text-[15px] font-semibold">{t}</p>
                                    <p className="text-[13.5px] leading-[1.55] text-white/60 mt-1">{d}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative">
                    <PhoneScan />

                    {/* floating chips */}
                    <div className="hidden sm:flex absolute -left-2 lg:-left-10 top-24 items-center gap-2 rounded-xl bg-white text-[var(--ink)] px-3 py-2 shadow-lg">
                        <span className="w-2 h-2 rounded-full bg-[var(--red)]" />
                        <span className="text-[12px] font-semibold">Photo detected · Rejected</span>
                    </div>
                    <div className="hidden sm:flex absolute -right-2 lg:-right-8 bottom-28 items-center gap-2 rounded-xl bg-white text-[var(--ink)] px-3 py-2 shadow-lg">
                        <WifiOff className="w-3.5 h-3.5 text-[var(--ink-3)]" />
                        <span className="text-[12px] font-semibold">Offline · Will sync</span>
                    </div>
                </div>
            </div>
        </section>
    )
}

// ─────────────────────────────────────────────────────────────
// PRODUCT (route tracking)
// ─────────────────────────────────────────────────────────────

function RouteVisual() {
    const stops = [
        { n: 'Depot, Salt Lake', t: '08:30', d: '—' },
        { n: 'Client · Sector V', t: '09:10', d: '42 min' },
        { n: 'Client · New Town', t: '10:25', d: '38 min' },
        { n: 'Client · Rajarhat', t: '11:40', d: '27 min' },
    ]
    return (
        <div className="rounded-[20px] border border-[var(--line)] bg-white p-6 min-h-[320px]" style={{ boxShadow: '0 30px 60px -40px rgba(14,27,22,.3)' }}>
            <div className="flex items-center justify-between">
                <p className="text-[13px] font-semibold">Sanjay Ghosh · Today</p>
                <p className="tnum text-[12px] text-[var(--ink-3)]">38.4 km</p>
            </div>
            <ol className="mt-5 relative">
                <span className="absolute left-[7px] top-2 bottom-2 w-px bg-[var(--line)]" />
                {stops.map((s, i) => (
                    <li key={s.n} className="relative pl-8 pb-5 last:pb-0">
                        <span
                            className="absolute left-0 top-1 w-[15px] h-[15px] rounded-full border-[3px] border-white"
                            style={{ background: i === stops.length - 1 ? 'var(--green)' : 'var(--ink)', boxShadow: '0 0 0 1px var(--line)' }}
                        />
                        <div className="flex items-baseline justify-between gap-3">
                            <span className="text-[14px] font-medium">{s.n}</span>
                            <span className="tnum text-[12px] text-[var(--ink-3)]">{s.t}</span>
                        </div>
                        <p className="text-[12px] text-[var(--ink-3)] mt-0.5">{s.d === '—' ? 'Start' : `Spent ${s.d} on site`}</p>
                    </li>
                ))}
            </ol>
        </div>
    )
}

function ProductRow({ reverse, icon: Icon, title, body, points, visual }) {
    return (
        <div className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${reverse ? 'lg:[&>*:first-child]:order-2' : ''}`}>
            <div>{visual}</div>
            <div className="max-w-[480px]">
                <span className="inline-grid place-items-center w-10 h-10 rounded-[10px] bg-[var(--green-soft)] text-[var(--green-deep)]">
                    <Icon className="w-5 h-5" />
                </span>
                <h3 className="display text-[30px] sm:text-[36px] leading-[1.1] font-bold mt-5">{title}</h3>
                <p className="mt-4 text-[16px] leading-[1.65] text-[var(--ink-2)]">{body}</p>
                <ul className="mt-6 space-y-2.5">
                    {points.map((p) => (
                        <li key={p} className="flex items-start gap-2.5 text-[14.5px] text-[var(--ink-2)]">
                            <Check className="w-4 h-4 mt-0.5 text-[var(--green)] shrink-0" strokeWidth={3} />
                            {p}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

function Product() {
    return (
        <section id="product" className="py-20 lg:py-28">
            <div className="max-w-[1180px] mx-auto px-5">
                <div className="max-w-[640px] mb-16 lg:mb-24">
                    <h2 className="display text-[36px] sm:text-[48px] leading-[1.05] font-bold">
                        One app. From attendance to salary.
                    </h2>
                    <p className="mt-5 text-[17px] leading-[1.65] text-[var(--ink-2)]">
                        Replace the Excel sheet, WhatsApp group and register with one system that works with your team even in the field.
                    </p>
                </div>

                <ProductRow
                    icon={Route}
                    title="See where your team went all day."
                    body="Every visit's route, how long they stayed, and what the next stop is. Fuel and time both accounted for clearly."
                    points={['Live location and full-day history', 'Time spent at every stop', 'Battery-friendly background tracking']}
                    visual={<RouteVisual />}
                />
            </div>
        </section>
    )
}

// ─────────────────────────────────────────────────────────────
// PAYROLL — light band with real payslip
// ─────────────────────────────────────────────────────────────

function Payroll() {
    const rows = [
        { k: 'Basic', v: 22000 },
        { k: 'HRA', v: 8800 },
        { k: 'Overtime · 6 hrs', v: 1350 },
        { k: 'PF (12%)', v: -2640 },
        { k: 'ESI', v: -230 },
        { k: 'Leave deduction · 1 day', v: -1100 },
    ]
    const net = rows.reduce((s, r) => s + r.v, 0)

    return (
        <section id="payroll" className="py-20 lg:py-28 bg-white border-y border-[var(--line)]">
            <div className="max-w-[1180px] mx-auto px-5 grid lg:grid-cols-[1fr_1.05fr] gap-12 lg:gap-20 items-center">
                <div className="max-w-[500px]">
                    <h2 className="display text-[36px] sm:text-[48px] leading-[1.05] font-bold">
                        Payroll is no longer a three-day job.
                    </h2>
                    <p className="mt-5 text-[17px] leading-[1.65] text-[var(--ink-2)]">
                        Attendance, overtime and leave go straight into salary. PF, ESI and TDS are deducted automatically. Payslips reach the employee's phone.
                    </p>
                    <div className="mt-8 grid grid-cols-2 gap-4">
                        {[
                            { icon: FileSpreadsheet, t: 'Bank-ready export' },
                            { icon: ShieldCheck, t: 'PF / ESI / TDS' },
                            { icon: CalendarDays, t: 'Leave sync' },
                            { icon: Smartphone, t: 'Payslip on phone' },
                        ].map(({ icon: I, t }) => (
                            <div key={t} className="flex items-center gap-2.5 text-[14px] text-[var(--ink-2)]">
                                <span className="grid place-items-center w-8 h-8 rounded-lg bg-[var(--green-soft)]">
                                    <I className="w-4 h-4 text-[var(--green-deep)]" />
                                </span>
                                {t}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rounded-[20px] bg-[var(--paper)] border border-[var(--line)] p-6 sm:p-7" style={{ boxShadow: '0 30px 60px -40px rgba(14,27,22,.3)' }}>
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-[12px] text-[var(--ink-3)] font-medium">Payslip · June</p>
                            <p className="display text-[22px] font-bold mt-0.5">Ravi Yadav</p>
                            <p className="text-[12px] text-[var(--ink-3)] mt-0.5">Field Executive · 26 / 30 days present</p>
                        </div>
                        <span className="text-[11px] font-semibold rounded-full bg-[var(--green-soft)] text-[var(--green-deep)] px-2.5 py-1">Processed</span>
                    </div>
                    <div className="mt-5 divide-y divide-[var(--line)] border-y border-[var(--line)]">
                        {rows.map((r) => (
                            <div key={r.k} className="flex items-center justify-between py-2.5 text-[14px]">
                                <span className="text-[var(--ink-2)]">{r.k}</span>
                                <span className={`tnum font-medium ${r.v < 0 ? 'text-[var(--red)]' : ''}`}>
                                    {r.v < 0 ? '−' : ''}
                                    {inr(Math.abs(r.v))}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="flex items-end justify-between mt-5">
                        <span className="text-[13px] text-[var(--ink-3)] font-medium">Net pay</span>
                        <span className="display tnum text-[34px] font-bold leading-none">{inr(net)}</span>
                    </div>
                </div>
            </div>
        </section>
    )
}

// ─────────────────────────────────────────────────────────────
// SETUP — genuinely a sequence, so numbering is justified
// ─────────────────────────────────────────────────────────────

function Setup() {
    const steps = [
        { t: 'Create a workspace', d: 'Company, departments and shifts. Two minutes.' },
        { t: 'Add your team', d: 'Import from CSV or one by one. Assign zones and shifts.' },
        { t: 'Install the app', d: 'Employees get a link and enrol their face once. No training needed.' },
        { t: 'Run payroll at month-end', d: 'One click. Payslips go out to everyone.' },
    ]
    return (
        <section className="py-20 lg:py-28">
            <div className="max-w-[1180px] mx-auto px-5">
                <h2 className="display text-[32px] sm:text-[42px] leading-[1.08] font-bold max-w-[560px]">
                    Up and running in a day.
                </h2>
                <ol className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
                    {steps.map((s, i) => (
                        <li key={s.t} className="relative border-t-2 border-[var(--ink)] pt-5">
                            <span className="display tnum text-[14px] font-bold text-[var(--green-deep)]">{i + 1}</span>
                            <h3 className="text-[17px] font-semibold mt-2">{s.t}</h3>
                            <p className="text-[14.5px] leading-[1.6] text-[var(--ink-2)] mt-2">{s.d}</p>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    )
}

// ─────────────────────────────────────────────────────────────
// PRICING
// ─────────────────────────────────────────────────────────────

function Pricing() {
    const [yearly, setYearly] = useState(false)

    const priced = useMemo(
        () =>
            plans.map((p) => {
                if (p.monthly === null) return { ...p, price: null }
                const price = yearly ? p.monthly * YEARLY_MONTHS_PAID : p.monthly
                const perMonth = yearly ? Math.round(price / 12) : p.monthly
                return { ...p, price, perMonth }
            }),
        [yearly]
    )

    return (
        <section id="pricing" className="py-20 lg:py-28 border-t border-[var(--line)] bg-white">
            <div className="max-w-[1180px] mx-auto px-5">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                    <div className="max-w-[560px]">
                        <h2 className="display text-[36px] sm:text-[48px] leading-[1.05] font-bold">
                            A plan for every team size.
                        </h2>
                        <p className="mt-4 text-[16px] leading-[1.65] text-[var(--ink-2)]">
                            Every plan comes with a 14-day free trial. No setup fee, no lock-in.
                        </p>
                    </div>

                    <div className="inline-flex p-1 rounded-[12px] bg-[var(--paper)] border border-[var(--line)] self-start md:self-auto" role="group" aria-label="Billing period">
                        {[
                            { v: false, l: 'Monthly' },
                            { v: true, l: 'Yearly · 2 months free' },
                        ].map((o) => (
                            <button
                                key={o.l}
                                type="button"
                                aria-pressed={yearly === o.v}
                                onClick={() => setYearly(o.v)}
                                className={`h-9 px-4 rounded-[9px] text-[13px] font-semibold transition-colors ${yearly === o.v ? 'bg-[var(--ink)] text-white' : 'text-[var(--ink-2)] hover:text-[var(--ink)]'
                                    }`}
                            >
                                {o.l}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                    {priced.map((p) => {
                        const ent = p.monthly === null
                        return (
                            <div
                                key={p.id}
                                className={`relative flex flex-col rounded-[16px] p-5 ${p.popular
                                    ? 'bg-[var(--ink)] text-white lg:-my-3 lg:py-8'
                                    : 'bg-[var(--paper)] border border-[var(--line)]'
                                    }`}
                                style={p.popular ? { boxShadow: '0 30px 60px -30px rgba(14,27,22,.5)' } : undefined}
                            >
                                {p.popular && (
                                    <span className="absolute -top-3 left-5 rounded-full bg-[var(--green)] text-white text-[11.5px] font-semibold px-3 py-1">
                                        For field teams
                                    </span>
                                )}

                                <h3 className="display text-[22px] font-bold">{p.name}</h3>
                                <p className={`text-[13px] mt-1 min-h-[36px] ${p.popular ? 'text-white/65' : 'text-[var(--ink-3)]'}`}>{p.for}</p>

                                <div className="mt-5">
                                    {ent ? (
                                        <p className="display text-[32px] font-bold leading-none">Custom</p>
                                    ) : (
                                        <>
                                            <p className="display tnum text-[32px] font-bold leading-none">
                                                {inr(p.perMonth)}
                                                <span className={`text-[13px] font-medium ml-1 ${p.popular ? 'text-white/65' : 'text-[var(--ink-3)]'}`}>/month</span>
                                            </p>
                                            <p className={`tnum text-[12px] mt-1.5 ${p.popular ? 'text-white/65' : 'text-[var(--ink-3)]'}`}>
                                                {yearly ? `${inr(p.price)} billed yearly` : 'billed monthly'}
                                            </p>
                                        </>
                                    )}
                                </div>

                                <Link
                                    to={ent ? '/get-started?intent=sales' : `/get-started?plan=${p.id}`}
                                    className={`mt-5 inline-flex items-center justify-center gap-1.5 h-10 rounded-[10px] text-[13.5px] font-semibold transition-colors ${p.popular
                                        ? 'bg-white text-[var(--ink)] hover:bg-[var(--green-soft)]'
                                        : 'bg-[var(--ink)] text-white hover:bg-[var(--green-deep)]'
                                        }`}
                                >
                                    {p.cta}
                                </Link>

                                <ul className="mt-6 space-y-2.5 flex-1">
                                    {p.includes.map((f) => (
                                        <li key={f} className={`flex items-start gap-2 text-[13px] ${p.popular ? 'text-white/85' : 'text-[var(--ink-2)]'}`}>
                                            <Check className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${p.popular ? 'text-[var(--green)]' : 'text-[var(--green-deep)]'}`} strokeWidth={3} />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )
                    })}
                </div>

                <p className="mt-8 text-[13px] text-[var(--ink-3)]">
                    Prices exclude GST. Yearly plans come with a 30-day money-back guarantee.
                </p>
            </div>
        </section>
    )
}

// ─────────────────────────────────────────────────────────────
// FAQ
// ─────────────────────────────────────────────────────────────

function FAQ() {
    const [open, setOpen] = useState(0)
    return (
        <section id="faq" className="py-20 lg:py-28">
            <div className="max-w-[1180px] mx-auto px-5 grid lg:grid-cols-[1fr_1.6fr] gap-10 lg:gap-20">
                <div>
                    <h2 className="display text-[34px] sm:text-[42px] leading-[1.08] font-bold">Questions?</h2>
                    <p className="mt-4 text-[16px] leading-[1.65] text-[var(--ink-2)] max-w-[320px]">
                        If you don't find the answer here, let us know we reply the same day.
                    </p>
                    <Link to="/get-started?intent=sales" className="inline-flex items-center gap-1.5 mt-5 text-[14px] font-semibold text-[var(--green-deep)] hover:underline">
                        Talk to our sales team <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
                    {faqs.map((f, i) => {
                        const isOpen = open === i
                        return (
                            <div key={f.q}>
                                <button
                                    type="button"
                                    aria-expanded={isOpen}
                                    onClick={() => setOpen(isOpen ? -1 : i)}
                                    className="w-full flex items-center justify-between gap-6 py-5 text-left"
                                >
                                    <span className="text-[16px] font-semibold">{f.q}</span>
                                    {isOpen ? <Minus className="w-4 h-4 shrink-0" /> : <Plus className="w-4 h-4 shrink-0" />}
                                </button>
                                {isOpen && <p className="pb-5 pr-10 text-[15px] leading-[1.7] text-[var(--ink-2)]">{f.a}</p>}
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

// ─────────────────────────────────────────────────────────────
// CTA + FOOTER
// ─────────────────────────────────────────────────────────────

function FinalCTA() {
    return (
        <section className="px-5 pb-20 lg:pb-28">
            <div className="relative overflow-hidden max-w-[1180px] mx-auto rounded-[28px] bg-[var(--green-deep)] text-white px-6 sm:px-14 py-14 sm:py-20 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                <div className="absolute inset-0 dark-grid opacity-40 pointer-events-none" aria-hidden="true"
                    style={{ maskImage: 'radial-gradient(ellipse 70% 90% at 100% 0%, #000 10%, transparent 70%)', WebkitMaskImage: 'radial-gradient(ellipse 70% 90% at 100% 0%, #000 10%, transparent 70%)' }} />
                <h2 className="relative display text-[34px] sm:text-[48px] leading-[1.05] font-bold max-w-[620px]">
                    Your team's attendance, on the phone from tomorrow.
                </h2>
                <div className="relative flex flex-wrap gap-3">
                    <PrimaryBtn to="/get-started" dark>
                        Start free trial <ArrowRight className="w-4 h-4" />
                    </PrimaryBtn>
                    <GhostBtn to="/get-started?intent=demo" dark>Book a demo</GhostBtn>
                </div>
            </div>
        </section>
    )
}

function Footer() {
    const cols = {
        Product: [
            { l: 'Face attendance', h: '#face-attendance' },
            { l: 'Payroll', h: '#payroll' },
            { l: 'Pricing', h: '#pricing' },
            { l: 'FAQ', h: '#faq' },
        ],
        Company: [
            { l: 'Contact', to: '/get-started?intent=sales' },
            { l: 'Book a demo', to: '/get-started?intent=demo' },
        ],
        Legal: [{ l: 'Privacy Policy' }, { l: 'Terms of Service' }, { l: 'Refund Policy' }],
    }
    return (
        <footer className="border-t border-[var(--line)] bg-white">
            <div className="max-w-[1180px] mx-auto px-5 py-14 grid grid-cols-2 md:grid-cols-[1.6fr_1fr_1fr_1fr] gap-10">
                <div className="col-span-2 md:col-span-1">
                    <Logo />
                    <p className="mt-4 text-[14px] leading-[1.6] text-[var(--ink-3)] max-w-[280px]">
                        AI face attendance, live tracking and payroll for field teams.
                    </p>
                </div>
                {Object.entries(cols).map(([h, items]) => (
                    <div key={h}>
                        <h4 className="text-[13px] font-semibold">{h}</h4>
                        <ul className="mt-4 space-y-2.5">
                            {items.map((it) => (
                                <li key={it.l}>
                                    {it.to ? (
                                        <Link to={it.to} className="text-[14px] text-[var(--ink-3)] hover:text-[var(--ink)]">{it.l}</Link>
                                    ) : (
                                        <a href={it.h || '#'} className="text-[14px] text-[var(--ink-3)] hover:text-[var(--ink)]">{it.l}</a>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <div className="border-t border-[var(--line)]">
                <div className="max-w-[1180px] mx-auto px-5 py-5 text-[12.5px] text-[var(--ink-3)]">
                    © {new Date().getFullYear()} Hazir. All rights reserved.
                </div>
            </div>
        </footer>
    )
}

// ─────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────

export default function Landing() {
    return (
        <div className="hz min-h-screen">
            <PageStyles />
            <Navbar />
            <main>
                <Hero />
                <FaceAttendance />
                <Product />
                <Payroll />
                <Setup />
                <Pricing />
                <FAQ />
                <FinalCTA />
            </main>
            <Footer />
        </div>
    )
}