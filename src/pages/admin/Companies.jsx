import { useState } from 'react'
import {
    Search, Filter, MoreHorizontal, Eye, Edit, Trash2,
    Building2, Users, Download,
    CheckCircle2, XCircle, Clock,
} from 'lucide-react'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { Card, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Avatar, AvatarFallback } from '#/components/ui/avatar'
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '#/components/ui/table'
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem,
    DropdownMenuSeparator, DropdownMenuTrigger,
} from '#/components/ui/dropdown-menu'

const companies = [
    { id: 1, name: 'Acme Logistics', email: 'admin@acme.com', plan: 'Pro', employees: 84, mrr: 8292, status: 'Active', joined: '2 days ago', initials: 'AL' },
    { id: 2, name: 'Swift Delivery Co', email: 'hr@swift.com', plan: 'Business', employees: 156, mrr: 15416, status: 'Active', joined: '5 days ago', initials: 'SD' },
    { id: 3, name: 'Urban Pest Control', email: 'ops@urban.com', plan: 'Pro', employees: 42, mrr: 4158, status: 'Active', joined: '1 week ago', initials: 'UP' },
    { id: 4, name: 'Metro Couriers', email: 'hello@metro.com', plan: 'Starter', employees: 23, mrr: 2277, status: 'Trial', joined: '1 week ago', initials: 'MC' },
    { id: 5, name: 'GreenField Services', email: 'contact@gf.com', plan: 'Pro', employees: 67, mrr: 6633, status: 'Active', joined: '2 weeks ago', initials: 'GF' },
    { id: 6, name: 'CityMovers', email: 'admin@citymovers.in', plan: 'Business', employees: 210, mrr: 20790, status: 'Active', joined: '3 weeks ago', initials: 'CM' },
    { id: 7, name: 'Prime Security', email: 'hr@primesec.in', plan: 'Starter', employees: 18, mrr: 1782, status: 'Suspended', joined: '1 month ago', initials: 'PS' },
]

const planStyles = {
    Starter: 'bg-slate-50 text-slate-700 border-slate-200',
    Pro: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    Business: 'bg-purple-50 text-purple-700 border-purple-200',
    Enterprise: 'bg-rose-50 text-rose-700 border-rose-200',
}

const statusStyles = {
    Active: { bg: 'bg-emerald-50 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500' },
    Trial: { bg: 'bg-amber-50 text-amber-700 border-amber-200', dot: 'bg-amber-500' },
    Suspended: { bg: 'bg-rose-50 text-rose-700 border-rose-200', dot: 'bg-rose-500' },
}

export default function Companies() {
    const [search, setSearch] = useState('')

    const filtered = companies.filter(
        (c) =>
            c.name.toLowerCase().includes(search.toLowerCase()) ||
            c.email.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="space-y-6 max-w-[1600px] mx-auto">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                        Companies
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Manage all tenants on your platform
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                        <Download className="w-4 h-4" strokeWidth={2} />
                        Export
                    </Button>
                    <Button size="sm" className="gap-2 bg-rose-600 hover:bg-rose-700 text-white">
                        <Building2 className="w-4 h-4" strokeWidth={2} />
                        Add Company
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'Total Companies', value: '142', icon: Building2, bg: 'bg-indigo-50', color: 'text-indigo-600' },
                    { label: 'Active', value: '128', icon: CheckCircle2, bg: 'bg-emerald-50', color: 'text-emerald-600' },
                    { label: 'On Trial', value: '11', icon: Clock, bg: 'bg-amber-50', color: 'text-amber-600' },
                    { label: 'Suspended', value: '3', icon: XCircle, bg: 'bg-rose-50', color: 'text-rose-600' },
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
                                placeholder="Search companies..."
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
                <Table>
                    <TableHeader>
                        <TableRow className="bg-slate-50 hover:bg-slate-50 border-b border-slate-100">
                            <TableHead className="font-semibold text-slate-600 text-[11px] uppercase tracking-wider py-3">Company</TableHead>
                            <TableHead className="font-semibold text-slate-600 text-[11px] uppercase tracking-wider py-3">Plan</TableHead>
                            <TableHead className="font-semibold text-slate-600 text-[11px] uppercase tracking-wider py-3">Employees</TableHead>
                            <TableHead className="font-semibold text-slate-600 text-[11px] uppercase tracking-wider py-3">MRR</TableHead>
                            <TableHead className="font-semibold text-slate-600 text-[11px] uppercase tracking-wider py-3">Status</TableHead>
                            <TableHead className="font-semibold text-slate-600 text-[11px] uppercase tracking-wider py-3">Joined</TableHead>
                            <TableHead className="text-right py-3"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filtered.map((c) => {
                            const ss = statusStyles[c.status]
                            return (
                                <TableRow key={c.id} className="hover:bg-slate-50/70 border-b border-slate-50">
                                    <TableCell className="py-3">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="w-9 h-9">
                                                <AvatarFallback className="bg-rose-50 text-rose-700 text-[10px] font-semibold">
                                                    {c.initials}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="min-w-0">
                                                <p className="text-sm font-medium text-slate-900 truncate">{c.name}</p>
                                                <p className="text-[11px] text-slate-500 truncate">{c.email}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-3">
                                        <Badge variant="outline" className={planStyles[c.plan]}>{c.plan}</Badge>
                                    </TableCell>
                                    <TableCell className="text-sm text-slate-600 py-3 tabular-nums">{c.employees}</TableCell>
                                    <TableCell className="text-sm font-semibold text-slate-900 py-3 tabular-nums">
                                        ₹{c.mrr.toLocaleString('en-IN')}
                                    </TableCell>
                                    <TableCell className="py-3">
                                        <Badge variant="outline" className={`${ss.bg} gap-1.5`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${ss.dot}`} />
                                            {c.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-xs text-slate-500 py-3">{c.joined}</TableCell>
                                    <TableCell className="text-right py-3">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <MoreHorizontal className="w-4 h-4" strokeWidth={2} />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-48">
                                                <DropdownMenuItem className="gap-2 cursor-pointer">
                                                    <Eye className="w-4 h-4 text-slate-400" strokeWidth={2} />
                                                    View details
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="gap-2 cursor-pointer">
                                                    <Edit className="w-4 h-4 text-slate-400" strokeWidth={2} />
                                                    Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="gap-2 cursor-pointer">
                                                    <Users className="w-4 h-4 text-slate-400" strokeWidth={2} />
                                                    Impersonate
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem className="gap-2 text-rose-600 focus:text-rose-600 cursor-pointer">
                                                    <Trash2 className="w-4 h-4" strokeWidth={2} />
                                                    Suspend
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </Card>
        </div>
    )
}