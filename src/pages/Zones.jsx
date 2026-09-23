import { useState } from 'react'
import {
    Plus, MapPin, MoreHorizontal, Edit, Trash2, Search,
} from 'lucide-react'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { Card, CardContent } from '#/components/ui/card'
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem,
    DropdownMenuSeparator, DropdownMenuTrigger,
} from '#/components/ui/dropdown-menu'

const zones = [
    { id: 1, name: 'Andheri West', radius: 500, employees: 22, violations: 2, bg: 'bg-indigo-50', color: 'text-indigo-600' },
    { id: 2, name: 'Bandra', radius: 300, employees: 18, violations: 0, bg: 'bg-emerald-50', color: 'text-emerald-600' },
    { id: 3, name: 'Powai', radius: 1000, employees: 26, violations: 1, bg: 'bg-amber-50', color: 'text-amber-600' },
    { id: 4, name: 'Thane', radius: 800, employees: 16, violations: 3, bg: 'bg-rose-50', color: 'text-rose-600' },
    { id: 5, name: 'Andheri East', radius: 400, employees: 20, violations: 0, bg: 'bg-purple-50', color: 'text-purple-600' },
    { id: 6, name: 'Malad', radius: 600, employees: 14, violations: 1, bg: 'bg-cyan-50', color: 'text-cyan-600' },
]

export default function Zones() {
    const [search, setSearch] = useState('')

    const filtered = zones.filter((z) =>
        z.name.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="space-y-6 max-w-[1600px] mx-auto">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                        Zones & Geofences
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Manage work zones for field staff
                    </p>
                </div>
                <Button size="sm" className="gap-2 bg-indigo-600 hover:bg-indigo-700 text-white">
                    <Plus className="w-4 h-4" strokeWidth={2} />
                    Add Zone
                </Button>
            </div>

            <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" strokeWidth={2} />
                <Input
                    placeholder="Search zones..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10 h-9 bg-slate-50 border-slate-200"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((z) => (
                    <Card key={z.id} className="hover:-translate-y-0.5 transition-all duration-200">
                        <CardContent className="p-5">
                            <div className="flex items-start justify-between">
                                <div className={`p-2.5 rounded-lg ${z.bg}`}>
                                    <MapPin className={`w-5 h-5 ${z.color}`} strokeWidth={2} />
                                </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2 -mt-1">
                                            <MoreHorizontal className="w-4 h-4" strokeWidth={2} />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-44">
                                        <DropdownMenuItem className="gap-2 cursor-pointer">
                                            <Edit className="w-4 h-4 text-slate-400" strokeWidth={2} />
                                            Edit zone
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="gap-2 text-rose-600 focus:text-rose-600 cursor-pointer">
                                            <Trash2 className="w-4 h-4" strokeWidth={2} />
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>

                            <div className="mt-4">
                                <h3 className="text-base font-semibold text-slate-900">
                                    {z.name}
                                </h3>
                                <p className="text-xs text-slate-500 mt-1">
                                    Radius: {z.radius}m
                                </p>
                            </div>

                            <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                                        Employees
                                    </p>
                                    <p className="text-lg font-bold text-slate-900 mt-0.5">
                                        {z.employees}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                                        Violations
                                    </p>
                                    <p className={`text-lg font-bold mt-0.5 ${z.violations > 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                                        {z.violations}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}