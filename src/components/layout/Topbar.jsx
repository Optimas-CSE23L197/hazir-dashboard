import { useEffect } from 'react'
import {
    Bell, Search, LogOut, ChevronDown, HelpCircle, Menu,
    User, Building2, CreditCard,
} from 'lucide-react'
import { useAuthStore } from '#/stores/authStore'
import { useUIStore } from '#/stores/uiStore'
import { Input } from '#/components/ui/input'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '#/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '#/components/ui/avatar'

export default function Topbar() {
    const user = useAuthStore((s) => s.user)
    const tenant = useAuthStore((s) => s.tenant)
    const logout = useAuthStore((s) => s.logout)
    const toggleSidebar = useUIStore((s) => s.toggleSidebar)

    const initials =
        user?.name
            ?.split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase() || 'A'

    // Ctrl/Cmd + K → focus search
    useEffect(() => {
        const onKey = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault()
                document.getElementById('global-search')?.focus()
            }
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [])

    return (
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between gap-4 px-4 lg:px-6 shrink-0 sticky top-0 z-30">

            {/* ───────── Left ───────── */}
            <div className="flex items-center gap-2 flex-1 min-w-0">

                {/* Hamburger — mobile only */}
                <button
                    type="button"
                    onClick={toggleSidebar}
                    className="lg:hidden p-2 -ml-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/20"
                    aria-label="Open sidebar"
                >
                    <Menu className="w-5 h-5" strokeWidth={2} />
                </button>

                {/* Search */}
                <div className="relative w-full max-w-md">
                    <Search
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
                        strokeWidth={2}
                    />
                    <Input
                        id="global-search"
                        placeholder="Search employees, reports..."
                        className="pl-10 pr-3 sm:pr-16 h-9 text-sm bg-slate-50 border-slate-200 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500"
                    />
                    <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center gap-0.5 text-[10px] font-mono text-slate-400 bg-white border border-slate-200 px-1.5 py-0.5 rounded">
                        Ctrl K
                    </kbd>
                </div>
            </div>

            {/* ───────── Right ───────── */}
            <div className="flex items-center gap-1 shrink-0">

                <button
                    type="button"
                    className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/20"
                    aria-label="Help"
                >
                    <HelpCircle className="w-5 h-5" strokeWidth={2} />
                </button>

                <button
                    type="button"
                    className="relative p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/20"
                    aria-label="Notifications"
                >
                    <Bell className="w-5 h-5" strokeWidth={2} />
                    <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
                    </span>
                </button>

                <div className="w-px h-6 bg-slate-200 mx-2" aria-hidden="true" />

                {/* User Menu */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button
                            type="button"
                            className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-lg hover:bg-slate-100 data-[state=open]:bg-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/20"
                        >
                            <Avatar className="w-8 h-8">
                                <AvatarFallback className="bg-indigo-600 text-white text-xs font-semibold">
                                    {initials}
                                </AvatarFallback>
                            </Avatar>
                            <div className="text-left hidden md:block max-w-[140px]">
                                <p className="text-sm font-medium text-slate-900 leading-tight truncate">
                                    {user?.name || 'User'}
                                </p>
                                <p className="text-[11px] text-slate-500 leading-tight truncate">
                                    {tenant?.name || 'Workspace'}
                                </p>
                            </div>
                            <ChevronDown className="w-4 h-4 text-slate-400 hidden md:block" strokeWidth={2} />
                        </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel>
                            <p className="text-sm font-medium text-slate-900 truncate">
                                {user?.name || 'User'}
                            </p>
                            <p className="text-xs text-slate-500 font-normal mt-0.5 truncate">
                                {user?.email || 'user@example.com'}
                            </p>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-2 cursor-pointer">
                            <User className="w-4 h-4 text-slate-400" strokeWidth={2} />
                            Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 cursor-pointer">
                            <Building2 className="w-4 h-4 text-slate-400" strokeWidth={2} />
                            Company settings
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 cursor-pointer">
                            <CreditCard className="w-4 h-4 text-slate-400" strokeWidth={2} />
                            Billing
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            className="gap-2 text-rose-600 focus:text-rose-600 cursor-pointer"
                            onClick={() => logout()}
                        >
                            <LogOut className="w-4 h-4" strokeWidth={2} />
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}