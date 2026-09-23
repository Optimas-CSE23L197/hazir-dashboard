import { useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
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

const navSections = [
    {
        label: 'Main',
        items: [
            { to: '/app/overview', label: 'Dashboard', icon: LayoutDashboard },
            { to: '/app/live-map', label: 'Live Map', icon: MapPin },
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

export default function Sidebar() {
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
                    'w-60 sidebar-dark flex flex-col h-screen z-50',
                    'fixed top-0 left-0 transition-transform duration-200 ease-out',
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
                    'lg:sticky lg:top-0 lg:translate-x-0 lg:transition-none'
                )}
                aria-label="Main navigation"
            >
                {/* Logo */}
                <div className="h-16 flex items-center justify-between px-5 border-b border-slate-800 shrink-0">
                    <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-lg bg-indigo-600">
                            <MapPin className="w-4 h-4 text-white" strokeWidth={2} />
                        </div>
                        <span className="text-base font-semibold tracking-tight text-white">
                            Hazir
                        </span>
                        <span className="text-[10px] font-medium text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                            v1.0
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
                                                        className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-0.5 rounded-r-full bg-indigo-500"
                                                    />
                                                )}
                                                <item.icon
                                                    className={cn(
                                                        'w-4 h-4 shrink-0 transition-colors',
                                                        isActive
                                                            ? 'text-indigo-400'
                                                            : 'text-slate-500 group-hover:text-slate-300'
                                                    )}
                                                    strokeWidth={2}
                                                />
                                                <span className="flex-1">{item.label}</span>
                                            </>
                                        )}
                                    </NavLink>
                                ))}
                            </div>
                        </div>
                    ))}
                </nav>

                {/* Upgrade card */}
                <div className="p-3 shrink-0">
                    <div className="rounded-xl bg-slate-800 p-4 border border-slate-700/50">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="p-1.5 rounded-md bg-indigo-600">
                                <ArrowUpRight className="w-3.5 h-3.5 text-white" strokeWidth={2} />
                            </div>
                            <p className="text-sm font-semibold text-white">Upgrade to Pro</p>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            Unlock payroll, analytics & more
                        </p>
                        <button className="mt-3 w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium py-2 rounded-lg transition-colors">
                            Upgrade now
                        </button>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-4 py-3 border-t border-slate-800 shrink-0">
                    <p className="text-[10px] text-slate-500 text-center">
                        Made in India · © {currentYear}
                    </p>
                </div>
            </aside>
        </>
    )
}