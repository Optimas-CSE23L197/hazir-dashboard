import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
    Bell,
    Search,
    LogOut,
    ChevronDown,
    HelpCircle,
    Menu,
    User,
    Building2,
    CreditCard,
} from 'lucide-react'
import { useAuthStore } from '#/stores/authStore'
import { useUIStore } from '#/stores/uiStore'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '#/components/ui/dropdown-menu'

// Route → page title. Falls back to a title-cased last path segment.
const TITLES = {
    overview: 'Dashboard',
    'live-map': 'Live Map',
    employees: 'Employees',
    attendance: 'Attendance',
    leave: 'Leave',
    payroll: 'Payroll',
    departments: 'Departments',
    shifts: 'Shifts',
    holidays: 'Holidays',
    zones: 'Zones',
    announcements: 'Announcements',
    analytics: 'Analytics',
    reports: 'Reports',
    audit: 'Audit Log',
    settings: 'Company Settings',
    roles: 'Roles & Permissions',
    billing: 'Billing',
}

function titleFor(pathname) {
    const seg = pathname.split('/').filter(Boolean)[1] // /app/<seg>
    if (!seg) return 'Dashboard'
    return TITLES[seg] || seg.replace(/-/g, ' ').replace(/^\w/, (c) => c.toUpperCase())
}

const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform)

/**
 * @param {{ unread?: number }} props
 * `unread` is optional. Pass your real notification count; the dot and
 * pulse only show when it is > 0.
 */
export default function Topbar({ unread = 0 }) {
    const user = useAuthStore((s) => s.user)
    const tenant = useAuthStore((s) => s.tenant)
    const logout = useAuthStore((s) => s.logout)
    const toggleSidebar = useUIStore((s) => s.toggleSidebar)

    const navigate = useNavigate()
    const { pathname } = useLocation()
    const searchRef = useRef(null)
    const [q, setQ] = useState('')

    const initials =
        user?.name
            ?.split(' ')
            .filter(Boolean)
            .map((n) => n[0])
            .join('')
            .slice(0, 2)
            .toUpperCase() || 'A'

    // Ctrl/Cmd + K focuses search. Esc leaves it.
    useEffect(() => {
        const onKey = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault()
                searchRef.current?.focus()
                searchRef.current?.select()
            }
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [])

    const onSearchKeyDown = (e) => {
        if (e.key === 'Escape') {
            e.currentTarget.blur()
        }
    }

    const onSearchSubmit = (e) => {
        e.preventDefault()
        const term = q.trim()
        if (!term) return
        navigate(`/app/employees?q=${encodeURIComponent(term)}`)
        searchRef.current?.blur()
    }

    const iconBtn =
        'relative grid place-items-center w-9 h-9 rounded-[10px] text-[var(--ink-3)] hover:text-[var(--ink)] hover:bg-[var(--paper)] transition-colors'

    // NOTE: DropdownMenuContent renders in a portal on <body>, outside .hz-app,
    // so CSS variables are not guaranteed there. Use literal colours inside it.
    const menuItem =
        'gap-2.5 h-9 px-2.5 rounded-[8px] text-[14px] text-[#33423B] cursor-pointer focus:bg-[#F7F6F2] focus:text-[#0E1B16]'

    return (
        <header className="h-16 bg-white border-b border-[var(--line)] flex items-center justify-between gap-4 px-4 lg:px-6 shrink-0 sticky top-0 z-30">
            {/* ───────── Left ───────── */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
                {/* Hamburger, mobile only */}
                <button
                    type="button"
                    onClick={toggleSidebar}
                    className={`${iconBtn} lg:hidden -ml-2`}
                    aria-label="Open sidebar"
                >
                    <Menu className="w-5 h-5" strokeWidth={2} />
                </button>

                {/* Page title, desktop */}
                <h1 className="display hidden xl:block text-[20px] font-bold text-[var(--ink)] whitespace-nowrap pr-3 mr-1 border-r border-[var(--line)]">
                    {titleFor(pathname)}
                </h1>

                {/* Search */}
                <form onSubmit={onSearchSubmit} role="search" className="relative w-full max-w-[420px]">
                    <Search
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--ink-3)] pointer-events-none"
                        strokeWidth={2}
                    />
                    <input
                        ref={searchRef}
                        id="global-search"
                        type="search"
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        onKeyDown={onSearchKeyDown}
                        placeholder="Search employees…"
                        aria-label="Search employees"
                        className="w-full h-10 pl-10 pr-3 sm:pr-16 rounded-[10px] text-[14px] text-[var(--ink)] placeholder:text-[#9AA59F] bg-[var(--paper)] border border-transparent outline-none transition-colors hover:border-[var(--line)] focus:bg-white focus:border-[var(--ink)] focus:ring-2 focus:ring-[var(--green)]/25 [&::-webkit-search-cancel-button]:hidden"
                    />
                    <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center h-6 px-1.5 text-[11px] font-medium text-[var(--ink-3)] bg-white border border-[var(--line)] rounded-md pointer-events-none">
                        {isMac ? '⌘ K' : 'Ctrl K'}
                    </kbd>
                </form>
            </div>

            {/* ───────── Right ───────── */}
            <div className="flex items-center gap-1 shrink-0">
                <button type="button" className={iconBtn} aria-label="Help">
                    <HelpCircle className="w-[19px] h-[19px]" strokeWidth={2} />
                </button>

                <button
                    type="button"
                    className={iconBtn}
                    aria-label={unread > 0 ? `Notifications, ${unread} unread` : 'Notifications'}
                >
                    <Bell className="w-[19px] h-[19px]" strokeWidth={2} />
                    {unread > 0 && (
                        <span className="absolute top-2 right-2 flex h-2 w-2" aria-hidden="true">
                            <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--red)] opacity-60" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--red)] ring-2 ring-white" />
                        </span>
                    )}
                </button>

                <div className="w-px h-6 bg-[var(--line)] mx-2" aria-hidden="true" />

                {/* User menu */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button
                            type="button"
                            className="flex items-center gap-2.5 pl-1 pr-2 h-11 rounded-[10px] hover:bg-[var(--paper)] data-[state=open]:bg-[var(--paper)] transition-colors"
                            aria-label="Account menu"
                        >
                            <span className="grid place-items-center w-8 h-8 rounded-full bg-[var(--ink)] text-white text-[12px] font-semibold shrink-0">
                                {initials}
                            </span>
                            <span className="text-left hidden md:block max-w-[150px]">
                                <span className="block text-[13.5px] font-semibold text-[var(--ink)] leading-tight truncate">
                                    {user?.name || 'User'}
                                </span>
                                <span className="block text-[12px] text-[var(--ink-3)] leading-tight mt-0.5 truncate">
                                    {tenant?.name || 'Workspace'}
                                </span>
                            </span>
                            <ChevronDown className="w-4 h-4 text-[var(--ink-3)] hidden md:block" strokeWidth={2} />
                        </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                        align="end"
                        sideOffset={8}
                        className="w-60 p-1.5 rounded-[14px] border-[#E3E1DA] bg-white text-[#0E1B16] shadow-[0_20px_40px_-16px_rgba(14,27,22,.25)]"
                    >
                        <DropdownMenuLabel className="px-2.5 py-2">
                            <p className="text-[14px] font-semibold text-[#0E1B16] truncate">{user?.name || 'User'}</p>
                            <p className="text-[12.5px] text-[#66746D] font-normal mt-0.5 truncate">
                                {user?.email || 'user@example.com'}
                            </p>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-[#E3E1DA]" />

                        <DropdownMenuItem className={menuItem} onSelect={() => navigate('/app/settings')}>
                            <User className="w-4 h-4 text-[#66746D]" strokeWidth={2} />
                            Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem className={menuItem} onSelect={() => navigate('/app/settings')}>
                            <Building2 className="w-4 h-4 text-[#66746D]" strokeWidth={2} />
                            Company settings
                        </DropdownMenuItem>
                        <DropdownMenuItem className={menuItem} onSelect={() => navigate('/app/billing')}>
                            <CreditCard className="w-4 h-4 text-[#66746D]" strokeWidth={2} />
                            Billing
                        </DropdownMenuItem>

                        <DropdownMenuSeparator className="bg-[#E3E1DA]" />

                        <DropdownMenuItem
                            className="gap-2.5 h-9 px-2.5 rounded-[8px] text-[14px] text-[#E5484D] cursor-pointer focus:bg-[#FDECEC] focus:text-[#E5484D]"
                            onSelect={() => logout()}
                        >
                            <LogOut className="w-4 h-4" strokeWidth={2} />
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}