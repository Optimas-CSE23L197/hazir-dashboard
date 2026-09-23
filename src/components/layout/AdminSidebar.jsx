import { useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import {
    LayoutDashboard,
    Building2,
    Users,
    CreditCard,
    Receipt,
    Package,
    Headphones,
    Megaphone,
    ToggleLeft,
    BarChart3,
    ScrollText,
    Key,
    Activity,
    UserCog,
    Shield,
    Settings,
    ArrowUpRight,
    X,
} from 'lucide-react'
import { cn } from '#/lib/utils'
import { useUIStore } from '#/stores/uiStore'

const navSections = [
    {
        label: 'Overview',
        items: [
            { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
            { to: '/admin/companies', label: 'Companies', icon: Building2 },
            { to: '/admin/users', label: 'Users', icon: Users },
        ],
    },
    {
        label: 'Business',
        items: [
            { to: '/admin/subscriptions', label: 'Subscriptions', icon: CreditCard },
            { to: '/admin/invoices', label: 'Invoices', icon: Receipt },
            { to: '/admin/plans', label: 'Plans & Pricing', icon: Package },
        ],
    },
    {
        label: 'Operations',
        items: [
            { to: '/admin/tickets', label: 'Support Tickets', icon: Headphones, badge: '3' },
            { to: '/admin/announcements', label: 'Announcements', icon: Megaphone },
            { to: '/admin/features', label: 'Feature Flags', icon: ToggleLeft },
        ],
    },
    {
        label: 'System',
        items: [
            { to: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
            { to: '/admin/audit', label: 'Audit Logs', icon: ScrollText },
            { to: '/admin/api', label: 'API Keys', icon: Key },
            { to: '/admin/health', label: 'System Health', icon: Activity },
        ],
    },
    {
        label: 'Settings',
        items: [
            { to: '/admin/team', label: 'Admin Users', icon: UserCog },
            { to: '/admin/roles', label: 'Roles', icon: Shield },
            { to: '/admin/settings', label: 'Platform Settings', icon: Settings },
        ],
    },
]

export default function AdminSidebar() {
    const isSidebarOpen = useUIStore((s) => s.isSidebarOpen)
    const closeSidebar = useUIStore((s) => s.closeSidebar)
    const location = useLocation()

    const currentYear = new Date().getFullYear()

    useEffect(() => {
        if (window.innerWidth < 1024) {
            closeSidebar()
        }
    }, [location.pathname, closeSidebar])

    useEffect(() => {
        document.body.style.overflow = isSidebarOpen ? 'hidden' : ''
        return () => {
            document.body.style.overflow = ''
        }
    }, [isSidebarOpen])

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'Escape') closeSidebar()
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [closeSidebar])

    return (
        <>
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden"
                    onClick={closeSidebar}
                    aria-hidden="true"
                />
            )}

            <aside
                className={cn(
                    'w-60 bg-slate-950 flex flex-col h-screen z-50',
                    'fixed top-0 left-0 transition-transform duration-200 ease-out',
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
                    'lg:sticky lg:top-0 lg:translate-x-0 lg:transition-none'
                )}
                aria-label="Admin navigation"
            >
                {/* Logo */}
                <div className="h-16 flex items-center justify-between px-5 border-b border-slate-800/80 shrink-0">
                    <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-lg bg-rose-600">
                            <Shield className="w-4 h-4 text-white" strokeWidth={2} />
                        </div>
                        <span className="text-base font-semibold tracking-tight text-white">
                            Hazir
                        </span>
                        <span className="text-[10px] font-semibold text-rose-300 bg-rose-950/60 border border-rose-900/60 px-1.5 py-0.5 rounded">
                            ADMIN
                        </span>
                    </div>

                    <button
                        type="button"
                        onClick={closeSidebar}
                        className="lg:hidden p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                        aria-label="Close sidebar"
                    >
                        <X className="w-4 h-4" strokeWidth={2} />
                    </button>
                </div>

                {/* Nav */}
                <nav className="flex-1 px-3 py-4 space-y-5 overflow-y-auto">
                    {navSections.map((section) => (
                        <div key={section.label}>
                            <p className="px-3 pb-1.5 text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
                                {section.label}
                            </p>
                            <div className="space-y-0.5">
                                {section.items.map((item) => (
                                    <NavLink
                                        key={item.to}
                                        to={item.to}
                                        end={item.end}
                                        aria-label={item.label}
                                        className={({ isActive }) =>
                                            cn(
                                                'group relative flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150',
                                                isActive
                                                    ? 'bg-slate-800 text-white'
                                                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'
                                            )
                                        }
                                    >
                                        {({ isActive }) => (
                                            <>
                                                {isActive && (
                                                    <span
                                                        aria-hidden="true"
                                                        className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-0.5 rounded-r-full bg-rose-500"
                                                    />
                                                )}
                                                <item.icon
                                                    className={cn(
                                                        'w-4 h-4 shrink-0 transition-colors',
                                                        isActive
                                                            ? 'text-rose-400'
                                                            : 'text-slate-500 group-hover:text-slate-300'
                                                    )}
                                                    strokeWidth={2}
                                                />
                                                <span className="flex-1">{item.label}</span>
                                                {item.badge && (
                                                    <span
                                                        className={cn(
                                                            'text-[10px] font-semibold px-1.5 py-0.5 rounded-full leading-none',
                                                            isActive
                                                                ? 'bg-rose-500 text-white'
                                                                : 'bg-slate-800 text-slate-300 group-hover:bg-slate-700'
                                                        )}
                                                    >
                                                        {item.badge}
                                                    </span>
                                                )}
                                            </>
                                        )}
                                    </NavLink>
                                ))}
                            </div>
                        </div>
                    ))}
                </nav>

                {/* Footer */}
                <div className="px-4 py-3 border-t border-slate-800/80 shrink-0">
                    <div className="flex items-center justify-between gap-2">
                        <p className="text-[10px] text-slate-500">
                            © {currentYear} Hazir
                        </p>
                        <button
                            type="button"
                            className="text-[10px] text-slate-500 hover:text-slate-300 transition-colors flex items-center gap-0.5"
                        >
                            Support
                            <ArrowUpRight className="w-3 h-3" strokeWidth={2} />
                        </button>
                    </div>
                </div>
            </aside>
        </>
    )
}