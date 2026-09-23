import { useState } from 'react'
import {
    Plus, Calendar, Search, MoreHorizontal, Edit, Trash2,
    PartyPopper,
} from 'lucide-react'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { Card, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem,
    DropdownMenuSeparator, DropdownMenuTrigger,
} from '#/components/ui/dropdown-menu'

const holidays = [
    { id: 1, name: 'Diwali', date: '20 Oct 2026', day: 'Tuesday', type: 'National', bg: 'bg-amber-50', color: 'text-amber-600' },
    { id: 2, name: 'Christmas', date: '25 Dec 2026', day: 'Friday', type: 'National', bg: 'bg-rose-50', color: 'text-rose-600' },
    { id: 3, name: 'Holi', date: '14 Mar 2026', day: 'Saturday', type: 'National', bg: 'bg-purple-50', color: 'text-purple-600' },
    { id: 4, name: 'Company Foundation Day', date: '10 Apr 2026', day: 'Friday', type: 'Optional', bg: 'bg-indigo-50', color: 'text-indigo-600' },
    { id: 5, name: 'Independence Day', date: '15 Aug 2026', day: 'Saturday', type: 'National', bg: 'bg-emerald-50', color: 'text-emerald-600' },
    { id: 6, name: 'Ganesh Chaturthi', date: '27 Aug 2026', day: 'Thursday', type: 'Regional', bg: 'bg-orange-50', color: 'text-orange-600' },
]

const typeStyles = {
    National: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    Regional: 'bg-amber-50 text-amber-700 border-amber-100',
    Optional: 'bg-indigo-50 text-indigo-700 border-indigo-100',
}

export default function Holidays() {
    const [search, setSearch] = useState('')

    const filtered = holidays.filter((h) =>
        h.name.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="space-y-6 max-w-[1600px] mx-auto">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                        Holidays
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Manage company holidays for the year
                    </p>
                </div>
                <Button size="sm" className="gap-2 bg-indigo-600 hover:bg-indigo-700 text-white">
                    <Plus className="w-4 h-4" strokeWidth={2} />
                    Add Holiday
                </Button>
            </div>

            <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" strokeWidth={2} />
                <Input
                    placeholder="Search holidays..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10 h-9 bg-slate-50 border-slate-200"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((h) => (
                    <Card key={h.id} className="hover:-translate-y-0.5 transition-all duration-200">
                        <CardContent className="p-5">
                            <div className="flex items-start justify-between">
                                <div className={`p-2.5 rounded-lg ${h.bg}`}>
                                    <PartyPopper className={`w-5 h-5 ${h.color}`} strokeWidth={2} />
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
                                <h3 className="text-base font-semibold text-slate-900">
                                    {h.name}
                                </h3>
                                <div className="flex items-center gap-2 mt-1.5">
                                    <Calendar className="w-3.5 h-3.5 text-slate-400" strokeWidth={2} />
                                    <p className="text-xs text-slate-600">
                                        {h.date} · {h.day}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-5 pt-4 border-t border-slate-100">
                                <Badge variant="outline" className={typeStyles[h.type]}>
                                    {h.type}
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}