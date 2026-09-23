import { useState } from 'react'
import {
    Plus, Search, MoreHorizontal, Edit, Trash2, Shield,
    Users, Crown, UserCog, Eye,
} from 'lucide-react'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { Card, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem,
    DropdownMenuSeparator, DropdownMenuTrigger,
} from '#/components/ui/dropdown-menu'

const roles = [
    { id: 1, name: 'Super Admin', desc: 'Full access to everything', users: 1, icon: Crown, bg: 'bg-rose-50', color: 'text-rose-600', permissions: 42, locked: true },
    { id: 2, name: 'Admin', desc: 'Manage employees, attendance, payroll', users: 3, icon: Shield, bg: 'bg-indigo-50', color: 'text-indigo-600', permissions: 35, locked: true },
    { id: 3, name: 'HR Manager', desc: 'Employees, leave, attendance, reports', users: 5, icon: UserCog, bg: 'bg-emerald-50', color: 'text-emerald-600', permissions: 28, locked: false },
    { id: 4, name: 'Operations Manager', desc: 'Live map, zones, route tracking', users: 4, icon: Users, bg: 'bg-amber-50', color: 'text-amber-600', permissions: 22, locked: false },
    { id: 5, name: 'Viewer', desc: 'Read-only access to dashboards', users: 8, icon: Eye, bg: 'bg-slate-50', color: 'text-slate-600', permissions: 10, locked: false },
]

export default function Roles() {
    const [search, setSearch] = useState('')

    const filtered = roles.filter((r) =>
        r.name.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="space-y-6 max-w-[1600px] mx-auto">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                        Roles & Permissions
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Manage user roles and their access levels
                    </p>
                </div>
                <Button size="sm" className="gap-2 bg-indigo-600 hover:bg-indigo-700 text-white">
                    <Plus className="w-4 h-4" strokeWidth={2} />
                    Create Role
                </Button>
            </div>

            <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" strokeWidth={2} />
                <Input
                    placeholder="Search roles..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10 h-9 bg-slate-50 border-slate-200"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((r) => {
                    const Icon = r.icon
                    return (
                        <Card key={r.id} className="hover:-translate-y-0.5 transition-all duration-200">
                            <CardContent className="p-5">
                                <div className="flex items-start justify-between">
                                    <div className={`p-2.5 rounded-lg ${r.bg}`}>
                                        <Icon className={`w-5 h-5 ${r.color}`} strokeWidth={2} />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {r.locked && (
                                            <Badge variant="outline" className="text-[10px] bg-slate-50 text-slate-600 border-slate-200">
                                                System
                                            </Badge>
                                        )}
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2 -mt-1">
                                                    <MoreHorizontal className="w-4 h-4" strokeWidth={2} />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-44">
                                                <DropdownMenuItem className="gap-2 cursor-pointer">
                                                    <Eye className="w-4 h-4 text-slate-400" strokeWidth={2} />
                                                    View
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="gap-2 cursor-pointer" disabled={r.locked}>
                                                    <Edit className="w-4 h-4 text-slate-400" strokeWidth={2} />
                                                    Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem className="gap-2 text-rose-600 focus:text-rose-600 cursor-pointer" disabled={r.locked}>
                                                    <Trash2 className="w-4 h-4" strokeWidth={2} />
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <h3 className="text-base font-semibold text-slate-900">
                                        {r.name}
                                    </h3>
                                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                                        {r.desc}
                                    </p>
                                </div>

                                <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                                            Users
                                        </p>
                                        <p className="text-lg font-bold text-slate-900 mt-0.5">
                                            {r.users}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                                            Permissions
                                        </p>
                                        <p className="text-lg font-bold text-slate-900 mt-0.5">
                                            {r.permissions}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>
        </div>
    )
}