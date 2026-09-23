import { useState } from 'react'
import {
    Plus, Search, MoreHorizontal, Edit, Trash2,
    Building2
} from 'lucide-react'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { Card, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem,
    DropdownMenuSeparator, DropdownMenuTrigger,
} from '#/components/ui/dropdown-menu'

const departments = [
    { id: 1, name: 'Sales', code: 'SAL', manager: 'Rajesh Kumar', employees: 45, active: 42, color: 'indigo', bg: 'bg-indigo-50', text: 'text-indigo-600' },
    { id: 2, name: 'Delivery', code: 'DEL', manager: 'Priya Sharma', employees: 38, active: 36, color: 'emerald', bg: 'bg-emerald-50', text: 'text-emerald-600' },
    { id: 3, name: 'Pest Control', code: 'PST', manager: 'Amit Patel', employees: 32, active: 30, color: 'amber', bg: 'bg-amber-50', text: 'text-amber-600' },
    { id: 4, name: 'Transport', code: 'TRN', manager: 'Suresh Patil', employees: 27, active: 25, color: 'purple', bg: 'bg-purple-50', text: 'text-purple-600' },
]

export default function Departments() {
    const [search, setSearch] = useState('')

    const filtered = departments.filter(
        (d) =>
            d.name.toLowerCase().includes(search.toLowerCase()) ||
            d.code.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="space-y-6 max-w-[1600px] mx-auto">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                        Departments
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Manage your company's departments and teams
                    </p>
                </div>
                <Button size="sm" className="gap-2 bg-indigo-600 hover:bg-indigo-700 text-white">
                    <Plus className="w-4 h-4" strokeWidth={2} />
                    Add Department
                </Button>
            </div>

            <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" strokeWidth={2} />
                <Input
                    placeholder="Search departments..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10 h-9 bg-slate-50 border-slate-200"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((d) => (
                    <Card key={d.id} className="hover:-translate-y-0.5 transition-all duration-200">
                        <CardContent className="p-5">
                            <div className="flex items-start justify-between">
                                <div className={`p-2.5 rounded-lg ${d.bg}`}>
                                    <Building2 className={`w-5 h-5 ${d.text}`} strokeWidth={2} />
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

                            <div className="mt-4">
                                <div className="flex items-center gap-2">
                                    <h3 className="text-base font-semibold text-slate-900">
                                        {d.name}
                                    </h3>
                                    <Badge variant="outline" className="text-[10px] bg-slate-50 text-slate-600 border-slate-200">
                                        {d.code}
                                    </Badge>
                                </div>
                                <p className="text-xs text-slate-500 mt-1">
                                    Manager: {d.manager}
                                </p>
                            </div>

                            <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                                        Employees
                                    </p>
                                    <p className="text-lg font-bold text-slate-900 mt-0.5">
                                        {d.employees}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                                        Active Today
                                    </p>
                                    <p className="text-lg font-bold text-emerald-600 mt-0.5">
                                        {d.active}
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