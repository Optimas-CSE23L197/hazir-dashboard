import { useState } from 'react'
import {
    Search, Filter, Download, Edit, Trash2, Plus,
    LogIn, Check, X,
} from 'lucide-react'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { Card, CardContent } from '#/components/ui/card'
import { Avatar, AvatarFallback } from '#/components/ui/avatar'
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '#/components/ui/table'

const logs = [
    { id: 1, user: 'Priya Sharma', initials: 'PS', action: 'Approved leave', target: 'Rahul Sharma · 3 days', type: 'approve', time: '2 min ago', ip: '192.168.1.42' },
    { id: 2, user: 'Rajesh Kumar', initials: 'RK', action: 'Added employee', target: 'Vikram Joshi · Sales', type: 'create', time: '15 min ago', ip: '192.168.1.18' },
    { id: 3, user: 'Amit Patel', initials: 'AP', action: 'Updated shift', target: 'Morning Shift · Grace 10→15 min', type: 'update', time: '1 hour ago', ip: '192.168.1.55' },
    { id: 4, user: 'Priya Sharma', initials: 'PS', action: 'Rejected leave', target: 'Suresh Patil · 2 days', type: 'reject', time: '2 hours ago', ip: '192.168.1.42' },
    { id: 5, user: 'Suresh Patil', initials: 'SP', action: 'Logged in', target: 'From web browser', type: 'login', time: '3 hours ago', ip: '192.168.1.77' },
    { id: 6, user: 'Rajesh Kumar', initials: 'RK', action: 'Deleted employee', target: 'Test User · Pest Control', type: 'delete', time: '5 hours ago', ip: '192.168.1.18' },
]

const typeConfig = {
    approve: { label: 'Approve', icon: Check, bg: 'bg-emerald-50', color: 'text-emerald-600' },
    reject: { label: 'Reject', icon: X, bg: 'bg-rose-50', color: 'text-rose-600' },
    create: { label: 'Create', icon: Plus, bg: 'bg-indigo-50', color: 'text-indigo-600' },
    update: { label: 'Update', icon: Edit, bg: 'bg-amber-50', color: 'text-amber-600' },
    delete: { label: 'Delete', icon: Trash2, bg: 'bg-rose-50', color: 'text-rose-600' },
    login: { label: 'Login', icon: LogIn, bg: 'bg-cyan-50', color: 'text-cyan-600' },
}

export default function AuditLog() {
    const [search, setSearch] = useState('')

    const filtered = logs.filter(
        (l) =>
            l.user.toLowerCase().includes(search.toLowerCase()) ||
            l.action.toLowerCase().includes(search.toLowerCase()) ||
            l.target.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="space-y-6 max-w-[1600px] mx-auto">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                        Audit Log
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Track all activities across your workspace
                    </p>
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                    <Download className="w-4 h-4" strokeWidth={2} />
                    Export
                </Button>
            </div>

            <Card>
                <CardContent className="p-4">
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="relative flex-1 min-w-[240px]">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" strokeWidth={2} />
                            <Input
                                placeholder="Search by user, action, or target..."
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
                            <TableHead className="font-semibold text-slate-600 text-[11px] uppercase tracking-wider py-3">User</TableHead>
                            <TableHead className="font-semibold text-slate-600 text-[11px] uppercase tracking-wider py-3">Action</TableHead>
                            <TableHead className="font-semibold text-slate-600 text-[11px] uppercase tracking-wider py-3">Target</TableHead>
                            <TableHead className="font-semibold text-slate-600 text-[11px] uppercase tracking-wider py-3">IP Address</TableHead>
                            <TableHead className="font-semibold text-slate-600 text-[11px] uppercase tracking-wider py-3">Time</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filtered.map((l) => {
                            const cfg = typeConfig[l.type]
                            const Icon = cfg.icon
                            return (
                                <TableRow key={l.id} className="hover:bg-slate-50/70 border-b border-slate-50">
                                    <TableCell className="py-3">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="w-8 h-8">
                                                <AvatarFallback className="bg-indigo-50 text-indigo-700 text-[10px] font-semibold">
                                                    {l.initials}
                                                </AvatarFallback>
                                            </Avatar>
                                            <span className="text-sm font-medium text-slate-900">{l.user}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-3">
                                        <div className="flex items-center gap-2">
                                            <div className={`p-1 rounded-md ${cfg.bg}`}>
                                                <Icon className={`w-3 h-3 ${cfg.color}`} strokeWidth={2.5} />
                                            </div>
                                            <span className="text-sm text-slate-700">{l.action}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-sm text-slate-600 py-3">{l.target}</TableCell>
                                    <TableCell className="text-xs text-slate-500 font-mono py-3">{l.ip}</TableCell>
                                    <TableCell className="text-xs text-slate-500 py-3">{l.time}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </Card>
        </div>
    )
}