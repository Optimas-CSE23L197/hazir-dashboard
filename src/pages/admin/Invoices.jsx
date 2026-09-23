import { useState } from 'react'
import {
    Search, Filter, Download, FileText, CheckCircle2, XCircle,
    DollarSign,
} from 'lucide-react'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { Card, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '#/components/ui/table'

const invoices = [
    { id: 'INV-2026-1247', company: 'Acme Logistics', amount: 8292, status: 'Paid', date: '15 Sep 2026', due: '15 Sep 2026' },
    { id: 'INV-2026-1246', company: 'Swift Delivery Co', amount: 15416, status: 'Paid', date: '14 Sep 2026', due: '14 Sep 2026' },
    { id: 'INV-2026-1245', company: 'GreenField Services', amount: 6633, status: 'Past Due', date: '10 Sep 2026', due: '10 Sep 2026' },
    { id: 'INV-2026-1244', company: 'Urban Pest Control', amount: 4158, status: 'Paid', date: '05 Sep 2026', due: '05 Sep 2026' },
    { id: 'INV-2026-1243', company: 'CityMovers', amount: 20790, status: 'Paid', date: '01 Sep 2026', due: '01 Sep 2026' },
    { id: 'INV-2026-1242', company: 'Prime Security', amount: 1782, status: 'Cancelled', date: '28 Aug 2026', due: '28 Aug 2026' },
]

const statusStyles = {
    Paid: { bg: 'bg-emerald-50 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500' },
    Pending: { bg: 'bg-amber-50 text-amber-700 border-amber-200', dot: 'bg-amber-500' },
    'Past Due': { bg: 'bg-rose-50 text-rose-700 border-rose-200', dot: 'bg-rose-500' },
    Cancelled: { bg: 'bg-slate-50 text-slate-600 border-slate-200', dot: 'bg-slate-400' },
}

export default function Invoices() {
    const [search, setSearch] = useState('')

    const filtered = invoices.filter(
        (i) =>
            i.id.toLowerCase().includes(search.toLowerCase()) ||
            i.company.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="space-y-6 max-w-[1600px] mx-auto">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                        Invoices
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        View and manage all invoices across tenants
                    </p>
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                    <Download className="w-4 h-4" strokeWidth={2} />
                    Export All
                </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'Total Invoices', value: '1,247', icon: FileText, bg: 'bg-indigo-50', color: 'text-indigo-600' },
                    { label: 'Paid', value: '1,186', icon: CheckCircle2, bg: 'bg-emerald-50', color: 'text-emerald-600' },
                    { label: 'Past Due', value: '5', icon: XCircle, bg: 'bg-rose-50', color: 'text-rose-600' },
                    { label: 'Total Revenue', value: '₹2.4Cr', icon: DollarSign, bg: 'bg-amber-50', color: 'text-amber-600' },
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
                                placeholder="Search invoices..."
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
                            <TableHead className="font-semibold text-slate-600 text-[11px] uppercase tracking-wider py-3">Invoice</TableHead>
                            <TableHead className="font-semibold text-slate-600 text-[11px] uppercase tracking-wider py-3">Company</TableHead>
                            <TableHead className="font-semibold text-slate-600 text-[11px] uppercase tracking-wider py-3">Amount</TableHead>
                            <TableHead className="font-semibold text-slate-600 text-[11px] uppercase tracking-wider py-3">Status</TableHead>
                            <TableHead className="font-semibold text-slate-600 text-[11px] uppercase tracking-wider py-3">Issued</TableHead>
                            <TableHead className="text-right py-3"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filtered.map((i) => {
                            const ss = statusStyles[i.status]
                            return (
                                <TableRow key={i.id} className="hover:bg-slate-50/70 border-b border-slate-50">
                                    <TableCell className="text-sm font-mono text-slate-700 py-3">{i.id}</TableCell>
                                    <TableCell className="text-sm font-medium text-slate-900 py-3">{i.company}</TableCell>
                                    <TableCell className="text-sm font-semibold text-slate-900 py-3 tabular-nums">
                                        ₹{i.amount.toLocaleString('en-IN')}
                                    </TableCell>
                                    <TableCell className="py-3">
                                        <Badge variant="outline" className={`${ss.bg} gap-1.5`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${ss.dot}`} />
                                            {i.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-xs text-slate-500 py-3">{i.date}</TableCell>
                                    <TableCell className="text-right py-3">
                                        <Button variant="ghost" size="sm" className="gap-1.5 text-rose-600 hover:text-rose-700">
                                            <Download className="w-3.5 h-3.5" strokeWidth={2} />
                                            Download
                                        </Button>
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