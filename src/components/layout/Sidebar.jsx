import { useEffect } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import {
    LayoutDashboard,
    Users,
    CalendarCheck,
    CalendarDays,
    Wallet,
    BarChart3,
    Settings,
    MapPin,
    MapPinned,
    Building2,
    Clock,
    Calendar,
    Megaphone,
    FileText,
    ScrollText,
    Shield,
    CreditCard,
    ArrowUpRight,
    X,
} from 'lucide-react'
import { cn } from '#/lib/utils'
import { useUIStore } from '#/stores/uiStore'

// ─────────────────────────────────────────────────────────────
// NAV DATA
// ─────────────────────────────────────────────────────────────

const navSections = [
    {
        label: 'Main',
        items: [
            { to: '/app/overview', label: 'Dashboard', icon: LayoutDashboard },
            { to: '/app/live-map', label: 'Live Map', icon: MapPin, live: true },
            { to: '/app/employees', label: 'Employees', icon: Users },
            { to: '/app/attendance', label: 'Attendance', icon: CalendarCheck },
            { to: '/app/leave', label: 'Leave', icon: CalendarDays },
            { to: '/app/payroll', label: 'Payroll', icon: Wallet },
        ],
    },
    {
        label: 'Manage',
        items: [
            { to: '/app/departments', label: 'Departments', icon: Building2 },
            { to: '/app/shifts', label: 'Shifts', icon: Clock },
            { to: '/app/holidays', label: 'Holidays', icon: Calendar },
            { to: '/app/zones', label: 'Zones', icon: MapPinned },
            { to: '/app/announcements', label: 'Announcements', icon: Megaphone },
        ],
    },
    {
        label: 'Reports',
        items: [
            { to: '/app/analytics', label: 'Analytics', icon: BarChart3 },
            { to: '/app/reports', label: 'Reports', icon: FileText },
            { to: '/app/audit', label: 'Audit Log', icon: ScrollText },
        ],
    },
    {
        label: 'Settings',
        items: [
            { to: '/app/settings', label: 'Company Settings', icon: Settings },
            { to: '/app/roles', label: 'Roles & Permissions', icon: Shield },
            { to: '/app/billing', label: 'Billing', icon: CreditCard },
        ],
    },
]

// Plan ladder, used to decide what the upgrade card says.
// Wire `plan` to your real tenant/subscription state (see prop below).
const PLAN_ORDER = ['starter', 'growth', 'pro', 'business', 'enterprise']
const NEXT_PLAN = {
    starter: { name: 'Growth', pitch: 'Automated payroll, TDS and 5 work zones' },
    growth: { name: 'Pro', pitch: 'Live route tracking and geofence alerts' },
    pro: { name: 'Business', pitch: 'Multi-branch hierarchy and API access' },
    business: null,
    enterprise: null,
}

const LG = 1024

// ─────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────

/**
 * @param {{ plan?: 'starter'|'growth'|'pro'|'business'|'enterprise' }} props
 * `plan` is optional. If you don't pass it the upgrade card is hidden,
 * so nobody on a top plan is nagged to upgrade.
 */
export default function Sidebar({ plan }) {
    const isSidebarOpen = useUIStore((s) => s.isSidebarOpen)
    const closeSidebar = useUIStore((s) => s.closeSidebar)
    const location = useLocation()

    const currentYear = new Date().getFullYear()
    const next = plan && PLAN_ORDER.includes(plan) ? NEXT_PLAN[plan] : null

    // Close the drawer after navigating (mobile only)
    useEffect(() => {
        if (window.innerWidth < LG) closeSidebar()
    }, [location.pathname, closeSidebar])

    // Scroll-lock + Escape only matter while the drawer is an overlay (< lg).
    // On desktop the sidebar is always "open", so locking scroll there would
    // freeze the whole app.
    useEffect(() => {
        const isDrawer = () => window.innerWidth < LG

        const apply = () => {
            document.body.style.overflow = isSidebarOpen && isDrawer() ? 'hidden' : ''
        }
        apply()
        window.addEventListener('resize', apply)

        const onKey = (e) => {
            if (e.key === 'Escape' && isDrawer()) closeSidebar()
        }
        window.addEventListener('keydown', onKey)

        return () => {
            window.removeEventListener('resize', apply)
            window.removeEventListener('keydown', onKey)
            document.body.style.overflow = ''
        }
    }, [isSidebarOpen, closeSidebar])

    return (
        <>
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-[#0E1B16]/50 backdrop-blur-[2px] lg:hidden"
                    onClick={closeSidebar}
                    aria-hidden="true"
                />
            )}

            <aside
                className={cn(
                    'hz-sidebar w-[248px] flex flex-col h-screen z-50',
                    'fixed top-0 left-0 transition-transform duration-200 ease-out',
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
                    'lg:sticky lg:top-0 lg:translate-x-0 lg:transition-none'
                )}
                style={{
                    '--sb-bg': '#0E1B16',
                    '--sb-line': 'rgba(255,255,255,.08)',
                    '--sb-text': 'rgba(255,255,255,.62)',
                    '--sb-text-hi': '#FFFFFF',
                    '--sb-hover': 'rgba(255,255,255,.06)',
                    '--sb-active': 'rgba(14,159,110,.16)',
                    '--sb-green': '#0E9F6E',
                    '--sb-green-hi': '#3DD9A0',
                    background: 'var(--sb-bg)',
                    fontFamily: "'Inter', system-ui, sans-serif",
                }}
                aria-label="Main navigation"
            >
                <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700&family=Inter:wght@400;500;600&display=swap');
          .hz-sidebar .sb-display { font-family: 'Bricolage Grotesque', 'Inter', sans-serif; letter-spacing: -0.025em; }
          .hz-sidebar nav::-webkit-scrollbar { width: 6px; }
          .hz-sidebar nav::-webkit-scrollbar-thumb { background: rgba(255,255,255,.12); border-radius: 9999px; }
          .hz-sidebar a:focus-visible, .hz-sidebar button:focus-visible {
            outline: 2px solid var(--sb-green-hi); outline-offset: 2px; border-radius: 8px;
          }
          @keyframes sb-pulse { 0% { transform: scale(1); opacity: .6 } 100% { transform: scale(2.4); opacity: 0 } }
          .sb-live::after {
            content: ''; position: absolute; inset: 0; border-radius: 9999px;
            background: var(--sb-green-hi); animation: sb-pulse 2.2s ease-out infinite;
          }
          @media (prefers-reduced-motion: reduce) { .sb-live::after { animation: none } }
        `}</style>

                {/* Logo */}
                <div
                    className="h-16 flex items-center justify-between px-5 shrink-0"
                    style={{ borderBottom: '1px solid var(--sb-line)' }}
                >
                    <Link to="/app/overview" className="flex items-center gap-2.5" aria-label="Hazir dashboard">
                        <span className="grid place-items-center w-8 h-8 rounded-[10px] bg-white">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                                <path d="M4 9.5l3.2 3.2L14 5.5" stroke="#0E1B16" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                        <span className="sb-display text-[22px] font-bold text-white">hazir</span>
                    </Link>

                    <button
                        type="button"
                        onClick={closeSidebar}
                        className="lg:hidden p-1.5 rounded-md text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                        aria-label="Close sidebar"
                    >
                        <X className="w-4 h-4" strokeWidth={2} />
                    </button>
                </div>

                {/* Nav */}
                <nav className="flex-1 px-3 py-5 space-y-6 overflow-y-auto" aria-label="Sections">
                    {navSections.map((section) => (
                        <div key={section.label}>
                            <p className="px-3 pb-2 text-[12px] font-semibold text-white/40">{section.label}</p>
                            <div className="space-y-0.5">
                                {section.items.map((item) => (
                                    <NavLink
                                        key={item.to}
                                        to={item.to}
                                        aria-label={item.label}
                                        className={({ isActive }) =>
                                            cn(
                                                'group relative flex items-center gap-3 h-10 px-3 rounded-[10px] text-[14px] font-medium transition-colors duration-150',
                                                isActive
                                                    ? 'bg-[var(--sb-active)] text-white'
                                                    : 'text-[var(--sb-text)] hover:bg-[var(--sb-hover)] hover:text-white'
                                            )
                                        }
                                    >
                                        {({ isActive }) => (
                                            <>
                                                {isActive && (
                                                    <span
                                                        aria-hidden="true"
                                                        className="absolute -left-3 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-r-full bg-[var(--sb-green-hi)]"
                                                    />
                                                )}
                                                <item.icon
                                                    className={cn(
                                                        'w-[18px] h-[18px] shrink-0 transition-colors',
                                                        isActive
                                                            ? 'text-[var(--sb-green-hi)]'
                                                            : 'text-white/45 group-hover:text-white/80'
                                                    )}
                                                    strokeWidth={2}
                                                />
                                                <span className="flex-1 truncate">{item.label}</span>
                                                {item.live && (
                                                    <span
                                                        className="relative w-1.5 h-1.5 rounded-full sb-live bg-[var(--sb-green-hi)]"
                                                        role="img"
                                                        aria-label="Live"
                                                    />
                                                )}
                                            </>
                                        )}
                                    </NavLink>
                                ))}
                            </div>
                        </div>
                    ))}
                </nav>

                {/* Upgrade card (only when there is a next plan) */}
                {next && (
                    <div className="p-3 shrink-0">
                        <div className="rounded-[14px] p-4" style={{ background: 'rgba(255,255,255,.05)', border: '1px solid var(--sb-line)' }}>
                            <p className="sb-display text-[16px] font-bold text-white">Upgrade to {next.name}</p>
                            <p className="text-[12.5px] leading-[1.5] mt-1.5" style={{ color: 'var(--sb-text)' }}>
                                {next.pitch}
                            </p>
                            <Link
                                to="/app/billing"
                                className="mt-3.5 w-full inline-flex items-center justify-center gap-1.5 h-9 rounded-[9px] bg-white text-[#0E1B16] text-[13px] font-semibold hover:bg-[#E3F4EC] transition-colors"
                            >
                                See plans <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2.5} />
                            </Link>
                        </div>
                    </div>
                )}

                {/* Footer */}
                <div className="px-4 py-3 shrink-0" style={{ borderTop: '1px solid var(--sb-line)' }}>
                    <p className="text-[11.5px] text-center text-white/35">© {currentYear} Hazir</p>
                </div>
            </aside>
        </>
    )
}