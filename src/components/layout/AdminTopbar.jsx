import { useEffect } from 'react'
import {
    Bell, Search, LogOut, ChevronDown, HelpCircle, Menu,
    User, Shield, Key, Activity, Building2,
} from 'lucide-react'
import { useAuthStore } from '#/stores/authStore'
import { useUIStore } from '#/stores/uiStore'
import { Input } from '#/components/ui/input'
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from '#/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '#/components/ui/avatar'

export default function AdminTopbar() {
    const user = useAuthStore((s) => s.user)
    const logout = useAuthStore((s) => s.logout)
    const toggleSidebar = useUIStore((s) => s.toggleSidebar)

    const initials =
        user?.name
            ?.split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase() || 'A'

    useEffect(() => {
        const onKey = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault()
                document.getElementById('admin-search')?.focus()
            }
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [])

    return (
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between gap-4 px-4 lg:px-6 shrink-0 sticky top-0 z-30">

            {/* Left */}
            <div className="flex items-center gap-2 flex-1 min-w-0">
                <button
                    type="button"
                    onClick={toggleSidebar}
                    className="lg:hidden p-2 -ml-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/20"
                    aria-label="Open sidebar"
                >
                    <Menu className="w-5 h-5" strokeWidth={2} />
                </button>

                {/* Admin badge */}
                <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-rose-50 border border-rose-100 shrink-0">
                    <Shield className="w-3.5 h-3.5 text-rose-600" strokeWidth={2} />
                    <span className="text-[11px] font-semibold text-rose-700 tracking-wide uppercase">
                        Super Admin
                    </span>
                </div>

                {/* Search */}
                <div className="relative w-full max-w-md">
                    <Search
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
                        strokeWidth={2}
                    />
                    <Input
                        id="admin-search"
                        placeholder="Search companies, users, invoices..."
                        className="pl-10 pr-3 sm:pr-16 h-9 text-sm bg-slate-50 border-slate-200 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-rose-500/20 focus-visible:border-rose-500"
                    />
                    <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center gap-0.5 text-[10px] font-mono text-slate-400 bg-white border border-slate-200 px-1.5 py-0.5 rounded">
                        Ctrl K
                    </kbd>
                </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-1 shrink-0">

                {/* System health quick indicator */}
                <div className="hidden md:flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-emerald-50 border border-emerald-100">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-700">
                        All systems operational
                    </span>
                </div>

                <button
                    type="button"
                    className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/20"
                    aria-label="Help"
                >
                    <HelpCircle className="w-5 h-5" strokeWidth={2} />
                </button>

                <button
                    type="button"
                    className="relative p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/20"
                    aria-label="Notifications"
                >
                    <Bell className="w-5 h-5" strokeWidth={2} />
                    <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
                    </span>
                </button>

                <div className="w-px h-6 bg-slate-200 mx-2" aria-hidden="true" />

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button
                            type="button"
                            className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-lg hover:bg-slate-100 data-[state=open]:bg-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/20"
                        >
                            <Avatar className="w-8 h-8">
                                <AvatarFallback className="bg-rose-600 text-white text-xs font-semibold">
                                    {initials}
                                </AvatarFallback>
                            </Avatar>
                            <div className="text-left hidden md:block max-w-[140px]">
                                <p className="text-sm font-medium text-slate-900 leading-tight truncate">
                                    {user?.name || 'Admin'}
                                </p>
                                <p className="text-[11px] text-rose-600 leading-tight truncate font-medium">
                                    Super Admin
                                </p>
                            </div>
                            <ChevronDown className="w-4 h-4 text-slate-400 hidden md:block" strokeWidth={2} />
                        </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="w-60">
                        <DropdownMenuLabel>
                            <p className="text-sm font-medium text-slate-900 truncate">
                                {user?.name || 'Admin'}
                            </p>
                            <p className="text-xs text-slate-500 font-normal mt-0.5 truncate">
                                {user?.email || 'admin@hazir.com'}
                            </p>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-2 cursor-pointer">
                            <User className="w-4 h-4 text-slate-400" strokeWidth={2} />
                            Admin profile
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 cursor-pointer">
                            <Key className="w-4 h-4 text-slate-400" strokeWidth={2} />
                            API keys
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 cursor-pointer">
                            <Activity className="w-4 h-4 text-slate-400" strokeWidth={2} />
                            System health
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-2 cursor-pointer">
                            <Building2 className="w-4 h-4 text-slate-400" strokeWidth={2} />
                            Switch to company view
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