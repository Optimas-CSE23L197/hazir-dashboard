import { useState } from 'react'
import {
    Plus, Search, MoreHorizontal, Edit, Trash2, Clock,
    Sun, Moon, Sunrise,
} from 'lucide-react'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { Card, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem,
    DropdownMenuSeparator, DropdownMenuTrigger,
} from '#/components/ui/dropdown-menu'

const shifts = [
    { id: 1, name: 'Morning Shift', start: '09:00 AM', end: '06:00 PM', icon: Sunrise, bg: 'bg-amber-50', color: 'text-amber-600', employees: 68, grace: 10, active: true },
    { id: 2, name: 'Evening Shift', start: '02:00 PM', end: '11:00 PM', icon: Sun, bg: 'bg-orange-50', color: 'text-orange-600', employees: 32, grace: 10, active: true },
    { id: 3, name: 'Night Shift', start: '10:00 PM', end: '07:00 AM', icon: Moon, bg: 'bg-indigo-50', color: 'text-indigo-600', employees: 24, grace: 15, active: true },
    { id: 4, name: 'General Shift', start: '10:00 AM', end: '07:00 PM', icon: Clock, bg: 'bg-emerald-50', color: 'text-emerald-600', employees: 18, grace: 10, active: false },
]

export default function Shifts() {
    const [search, setSearch] = useState('')

    const filtered = shifts.filter((s) =>
        s.name.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="space-y-6 max-w-[1600px] mx-auto">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                        Shifts
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Configure working shifts and timings
                    </p>
                </div>
                <Button size="sm" className="gap-2 bg-indigo-600 hover:bg-indigo-700 text-white">
                    <Plus className="w-4 h-4" strokeWidth={2} />
                    Add Shift
                </Button>
            </div>

            <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" strokeWidth={2} />
                <Input
                    placeholder="Search shifts..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10 h-9 bg-slate-50 border-slate-200"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((s) => {
                    const Icon = s.icon
                    return (
                        <Card key={s.id} className="hover:-translate-y-0.5 transition-all duration-200">
                            <CardContent className="p-5">
                                <div className="flex items-start justify-between">
                                    <div className={`p-2.5 rounded-lg ${s.bg}`}>
                                        <Icon className={`w-5 h-5 ${s.color}`} strokeWidth={2} />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Badge
                                            variant="outline"
                                            className={
                                                s.active
                                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                                                    : 'bg-slate-50 text-slate-500 border-slate-200'
                                            }
                                        >
                                            {s.active ? 'Active' : 'Inactive'}
                                        </Badge>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2 -mt-1">
                                                    <MoreHorizontal className="w-4 h-4" strokeWidth={2} />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-44">
                                                <DropdownMenuItem className="gap-2 cursor-pointer">
                                                    <Edit className="w-4 h-4 text-slate-400" strokeWidth={2} />
                                                    Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem className="gap-2 text-rose-600 focus:text-rose-600 cursor-pointer">
                                                    <Trash2 className="w-4 h-4" strokeWidth={2} />
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <h3 className="text-base font-semibold text-slate-900">
                                        {s.name}
                                    </h3>
                                    <p className="text-xs text-slate-500 mt-1">
                                        {s.start} — {s.end}
                                    </p>
                                </div>

                                <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                                            Employees
                                        </p>
                                        <p className="text-lg font-bold text-slate-900 mt-0.5">
                                            {s.employees}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                                            Grace Period
                                        </p>
                                        <p className="text-lg font-bold text-slate-900 mt-0.5">
                                            {s.grace} min
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