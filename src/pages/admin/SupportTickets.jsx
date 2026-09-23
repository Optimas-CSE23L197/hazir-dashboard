import { useState } from 'react'
import {
    Search, Filter, MessageSquare, Clock, CheckCircle2, AlertTriangle,
    MoreHorizontal, Eye,
} from 'lucide-react'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { Card, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Avatar, AvatarFallback } from '#/components/ui/avatar'
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem,
    DropdownMenuTrigger,
} from '#/components/ui/dropdown-menu'

const tickets = [
    { id: 'TKT-2041', subject: 'Cannot export attendance report', company: 'Acme Logistics', user: 'Priya Sharma', priority: 'High', status: 'Open', created: '10 min ago', initials: 'PS' },
    { id: 'TKT-2040', subject: 'Face recognition failing on Android 14', company: 'Swift Delivery Co', user: 'Rajesh Kumar', priority: 'Critical', status: 'In Progress', created: '1 hour ago', initials: 'RK' },
    { id: 'TKT-2039', subject: 'Billing question about upgrade', company: 'Metro Couriers', user: 'Suresh Patil', priority: 'Low', status: 'Open', created: '3 hours ago', initials: 'SP' },
    { id: 'TKT-2038', subject: 'Add new zone feature request', company: 'Urban Pest Control', user: 'Amit Patel', priority: 'Medium', status: 'Resolved', created: '1 day ago', initials: 'AP' },
    { id: 'TKT-2037', subject: 'Payroll calculation mismatch', company: 'CityMovers', user: 'Neha Verma', priority: 'High', status: 'In Progress', created: '2 days ago', initials: 'NV' },
]

const priorityStyles = {
    Critical: 'bg-rose-50 text-rose-700 border-rose-200',
    High: 'bg-orange-50 text-orange-700 border-orange-200',
    Medium: 'bg-amber-50 text-amber-700 border-amber-200',
    Low: 'bg-slate-50 text-slate-700 border-slate-200',
}

const statusStyles = {
    Open: { bg: 'bg-indigo-50 text-indigo-700 border-indigo-200', dot: 'bg-indigo-500' },
    'In Progress': { bg: 'bg-amber-50 text-amber-700 border-amber-200', dot: 'bg-amber-500' },
    Resolved: { bg: 'bg-emerald-50 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500' },
}

export default function SupportTickets() {
    const [search, setSearch] = useState('')

    const filtered = tickets.filter(
        (t) =>
            t.subject.toLowerCase().includes(search.toLowerCase()) ||
            t.company.toLowerCase().includes(search.toLowerCase()) ||
            t.id.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="space-y-6 max-w-[1600px] mx-auto">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                        Support Tickets
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Customer support queue across all tenants
                    </p>
                </div>
                <Badge className="bg-rose-50 text-rose-700 border border-rose-100 gap-1.5 px-3 py-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" strokeWidth={2} />
                    3 urgent
                </Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'Open Tickets', value: '12', icon: MessageSquare, bg: 'bg-indigo-50', color: 'text-indigo-600' },
                    { label: 'In Progress', value: '8', icon: Clock, bg: 'bg-amber-50', color: 'text-amber-600' },
                    { label: 'Resolved Today', value: '24', icon: CheckCircle2, bg: 'bg-emerald-50', color: 'text-emerald-600' },
                    { label: 'Avg Response', value: '2.4h', icon: Clock, bg: 'bg-rose-50', color: 'text-rose-600' },
                ].map((s) => {
                    const Icon = s.icon
                    return (
                        <Card key={s.label} className="hover:-translate-y-0.5 transition-all duration-200">
                            <CardContent className="p-5">
                                <div className={`p-2.5 rounded-lg ${s.bg} w-fit`}>
                                    <Icon className={`w-5 h-5 ${s.color}`} />
                                </div>
                                <p className="text-3xl font-bold text-slate-900 mt-4 tracking-tight">{s.value}</p>
                                <p className="text-xs text-slate-500 mt-0.5 font-medium">{s.label}</p>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>

            <Card>
                <CardContent className="p-4">
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="relative flex-1 min-w-[240px]">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" strokeWidth={2} />
                            <Input
                                placeholder="Search tickets..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-10 h-9 bg-slate-50 border-slate-200"
                            />
                        </div>
                        <Button variant="outline" size="sm" className="gap-2">
                            <Filter className="w-4 h-4" strokeWidth={2} />
                            Filter
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Card className="overflow-hidden">
                <div className="divide-y divide-slate-100">
                    {filtered.map((t) => {
                        const ss = statusStyles[t.status]
                        return (
                            <div key={t.id} className="flex items-start gap-4 p-5 hover:bg-slate-50/70 transition-colors cursor-pointer">
                                <Avatar className="w-10 h-10 shrink-0">
                                    <AvatarFallback className="bg-rose-50 text-rose-700 text-xs font-semibold">
                                        {t.initials}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="min-w-0 flex-1">
                                            <p className="text-sm font-semibold text-slate-900 truncate">
                                                {t.subject}
                                            </p>
                                            <p className="text-[11px] text-slate-500 mt-0.5">
                                                {t.id} · {t.company} · by {t.user}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2 shrink-0">
                                            <Badge variant="outline" className={priorityStyles[t.priority]}>
                                                {t.priority}
                                            </Badge>
                                            <Badge variant="outline" className={`${ss.bg} gap-1.5`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${ss.dot}`} />
                                                {t.status}
                                            </Badge>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                                        <MoreHorizontal className="w-4 h-4" strokeWidth={2} />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-44">
                                                    <DropdownMenuItem className="gap-2 cursor-pointer">
                                                        <Eye className="w-4 h-4 text-slate-400" strokeWidth={2} />
                                                        View
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="gap-2 cursor-pointer">
                                                        <CheckCircle2 className="w-4 h-4 text-slate-400" strokeWidth={2} />
                                                        Mark resolved
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </div>
                                    <p className="text-[10px] text-slate-400 mt-2">{t.created}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </Card>
        </div>
    )
}