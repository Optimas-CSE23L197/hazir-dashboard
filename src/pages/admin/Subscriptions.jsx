import { useState } from 'react'
import {
    Search, Filter, DollarSign,
    CheckCircle2, XCircle, Clock
} from 'lucide-react'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { Card, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '#/components/ui/table'

const subscriptions = [
    { id: 'SUB-001', company: 'Acme Logistics', plan: 'Pro', amount: 8292, status: 'Active', renews: '15 Oct 2026', started: '15 Mar 2026' },
    { id: 'SUB-002', company: 'Swift Delivery Co', plan: 'Business', amount: 15416, status: 'Active', renews: '20 Oct 2026', started: '20 Jan 2026' },
    { id: 'SUB-003', company: 'Urban Pest Control', plan: 'Pro', amount: 4158, status: 'Active', renews: '28 Oct 2026', started: '28 Apr 2026' },
    { id: 'SUB-004', company: 'Metro Couriers', plan: 'Starter', amount: 2277, status: 'Trial', renews: '01 Oct 2026', started: '17 Sep 2026' },
    { id: 'SUB-005', company: 'GreenField Services', plan: 'Pro', amount: 6633, status: 'Past Due', renews: '10 Oct 2026', started: '10 Feb 2026' },
    { id: 'SUB-006', company: 'Prime Security', plan: 'Starter', amount: 1782, status: 'Cancelled', renews: '—', started: '01 Jan 2026' },
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
    'Past Due': { bg: 'bg-rose-50 text-rose-700 border-rose-200', dot: 'bg-rose-500' },
    Cancelled: { bg: 'bg-slate-50 text-slate-600 border-slate-200', dot: 'bg-slate-400' },
}

export default function Subscriptions() {
    const [search, setSearch] = useState('')

    const filtered = subscriptions.filter(
        (s) =>
            s.company.toLowerCase().includes(search.toLowerCase()) ||
            s.id.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="space-y-6 max-w-[1600px] mx-auto">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                    Subscriptions
                </h1>
                <p className="text-sm text-slate-500 mt-1">
                    Monitor all active subscriptions and renewals
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'Active Subs', value: '128', icon: CheckCircle2, bg: 'bg-emerald-50', color: 'text-emerald-600' },
                    { label: 'On Trial', value: '11', icon: Clock, bg: 'bg-amber-50', color: 'text-amber-600' },
                    { label: 'Past Due', value: '5', icon: XCircle, bg: 'bg-rose-50', color: 'text-rose-600' },
                    { label: 'MRR', value: '₹18.4L', icon: DollarSign, bg: 'bg-indigo-50', color: 'text-indigo-600' },
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
                                placeholder="Search subscriptions..."
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
                            <TableHead className="font-semibold text-slate-600 text-[11px] uppercase tracking-wider py-3">ID</TableHead>
                            <TableHead className="font-semibold text-slate-600 text-[11px] uppercase tracking-wider py-3">Company</TableHead>
                            <TableHead className="font-semibold text-slate-600 text-[11px] uppercase tracking-wider py-3">Plan</TableHead>
                            <TableHead className="font-semibold text-slate-600 text-[11px] uppercase tracking-wider py-3">Amount</TableHead>
                            <TableHead className="font-semibold text-slate-600 text-[11px] uppercase tracking-wider py-3">Status</TableHead>
                            <TableHead className="font-semibold text-slate-600 text-[11px] uppercase tracking-wider py-3">Renews</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filtered.map((s) => {
                            const ss = statusStyles[s.status]
                            return (
                                <TableRow key={s.id} className="hover:bg-slate-50/70 border-b border-slate-50">
                                    <TableCell className="text-sm font-mono text-slate-700 py-3">{s.id}</TableCell>
                                    <TableCell className="text-sm font-medium text-slate-900 py-3">{s.company}</TableCell>
                                    <TableCell className="py-3">
                                        <Badge variant="outline" className={planStyles[s.plan]}>{s.plan}</Badge>
                                    </TableCell>
                                    <TableCell className="text-sm font-semibold text-slate-900 py-3 tabular-nums">
                                        ₹{s.amount.toLocaleString('en-IN')}
                                    </TableCell>
                                    <TableCell className="py-3">
                                        <Badge variant="outline" className={`${ss.bg} gap-1.5`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${ss.dot}`} />
                                            {s.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-xs text-slate-500 py-3">{s.renews}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </Card>
        </div>
    )
}