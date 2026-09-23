import {
    Download, Calendar as CalendarIcon, UserCheck, UserX,
    Clock, AlertTriangle, Search, Filter, ChevronDown,
} from 'lucide-react'
import { Button } from '#/components/ui/button'
import { Card, CardContent } from '#/components/ui/card'
import { Input } from '#/components/ui/input'
import { Badge } from '#/components/ui/badge'
import { Avatar, AvatarFallback } from '#/components/ui/avatar'
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '#/components/ui/table'

const summary = [
    {
        label: 'Present',
        value: 128,
        icon: UserCheck,
        color: 'text-emerald-600',
        bg: 'bg-emerald-50',
        sub: '90.1% attendance',
    },
    {
        label: 'Absent',
        value: 8,
        icon: UserX,
        color: 'text-rose-600',
        bg: 'bg-rose-50',
        sub: '5.6% of total',
    },
    {
        label: 'Late',
        value: 3,
        icon: AlertTriangle,
        color: 'text-amber-600',
        bg: 'bg-amber-50',
        sub: 'Avg 22 min late',
    },
    {
        label: 'Half-day',
        value: 2,
        icon: Clock,
        color: 'text-orange-600',
        bg: 'bg-orange-50',
        sub: 'Early departures',
    },
    {
        label: 'On Leave',
        value: 6,
        icon: CalendarIcon,
        color: 'text-indigo-600',
        bg: 'bg-indigo-50',
        sub: 'Approved leaves',
    },
]

const mockAttendance = [
    { id: 1, name: 'Rahul Sharma', code: 'EMP001', dept: 'Sales', checkIn: '09:02 AM', checkOut: '06:15 PM', hours: '9h 13m', status: 'Present', zone: 'Andheri' },
    { id: 2, name: 'Amit Kumar', code: 'EMP002', dept: 'Delivery', checkIn: '09:45 AM', checkOut: '06:30 PM', hours: '8h 45m', status: 'Late', zone: 'Bandra' },
    { id: 3, name: 'Suresh Patil', code: 'EMP003', dept: 'Pest Control', checkIn: '—', checkOut: '—', hours: '—', status: 'Absent', zone: '—' },
    { id: 4, name: 'Priya Singh', code: 'EMP004', dept: 'Sales', checkIn: '08:55 AM', checkOut: '01:00 PM', hours: '4h 05m', status: 'Half-day', zone: 'Andheri' },
    { id: 5, name: 'Vikram Joshi', code: 'EMP005', dept: 'Transport', checkIn: '08:50 AM', checkOut: '06:00 PM', hours: '9h 10m', status: 'Present', zone: 'Powai' },
]

const statusStyles = {
    Present: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    Late: 'bg-amber-50 text-amber-700 border-amber-100',
    Absent: 'bg-rose-50 text-rose-700 border-rose-100',
    'Half-day': 'bg-orange-50 text-orange-700 border-orange-100',
}

const statusDot = {
    Present: 'bg-emerald-500',
    Late: 'bg-amber-500',
    Absent: 'bg-rose-500',
    'Half-day': 'bg-orange-500',
}

function getInitials(name) {
    return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
}

export default function Attendance() {
    return (
        <div className="space-y-6 max-w-[1600px] mx-auto">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                        Attendance
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Daily and calendar view of all employees
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Input
                        type="date"
                        defaultValue="2026-09-22"
                        className="w-auto bg-white border-slate-200"
                    />
                    <Button variant="outline" size="sm" className="gap-2">
                        <Download className="w-4 h-4" />
                        Export
                    </Button>
                </div>
            </div>

            {/* Summary cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {summary.map((s) => {
                    const Icon = s.icon
                    return (
                        <Card
                            key={s.label}
                            className="hover:-translate-y-0.5 transition-all duration-200"
                        >
                            <CardContent className="p-5">
                                <div className={`p-2.5 rounded-lg ${s.bg} w-fit`}>
                                    <Icon className={`w-5 h-5 ${s.color}`} />
                                </div>
                                <p className="text-3xl font-bold text-slate-900 mt-4 tracking-tight">
                                    {s.value}
                                </p>
                                <p className="text-xs text-slate-500 mt-0.5 font-medium">
                                    {s.label}
                                </p>
                                <p className="text-[11px] mt-1.5 text-slate-400 font-medium">
                                    {s.sub}
                                </p>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>

            {/* Filters bar */}
            <Card>
                <CardContent className="p-4">
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="relative flex-1 min-w-[240px]">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <Input
                                placeholder="Search by name, code, or department..."
                                className="pl-10 bg-slate-50 border-slate-200"
                            />
                        </div>
                        <Button variant="outline" size="sm" className="gap-2">
                            <Filter className="w-4 h-4" />
                            Status
                            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                        </Button>
                        <Button variant="outline" size="sm" className="gap-2">
                            <Filter className="w-4 h-4" />
                            Department
                            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                        </Button>
                        <span className="text-xs text-slate-400 ml-auto">
                            {mockAttendance.length} of 142 employees
                        </span>
                    </div>
                </CardContent>
            </Card>

            {/* Attendance table */}
            <Card className="overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-slate-50 hover:bg-slate-50 border-b border-slate-100">
                            <TableHead className="font-semibold text-slate-600 text-[11px] uppercase tracking-wider py-3 w-12">
                                #
                            </TableHead>
                            <TableHead className="font-semibold text-slate-600 text-[11px] uppercase tracking-wider py-3">
                                Employee
                            </TableHead>
                            <TableHead className="font-semibold text-slate-600 text-[11px] uppercase tracking-wider py-3">
                                Department
                            </TableHead>
                            <TableHead className="font-semibold text-slate-600 text-[11px] uppercase tracking-wider py-3">
                                Check-in
                            </TableHead>
                            <TableHead className="font-semibold text-slate-600 text-[11px] uppercase tracking-wider py-3">
                                Check-out
                            </TableHead>
                            <TableHead className="font-semibold text-slate-600 text-[11px] uppercase tracking-wider py-3">
                                Hours
                            </TableHead>
                            <TableHead className="font-semibold text-slate-600 text-[11px] uppercase tracking-wider py-3">
                                Zone
                            </TableHead>
                            <TableHead className="font-semibold text-slate-600 text-[11px] uppercase tracking-wider py-3">
                                Status
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {mockAttendance.map((a, i) => (
                            <TableRow
                                key={a.id}
                                className="hover:bg-slate-50/70 transition-colors border-b border-slate-50"
                            >
                                <TableCell className="text-xs text-slate-400 font-mono py-3">
                                    {String(i + 1).padStart(2, '0')}
                                </TableCell>
                                <TableCell className="py-3">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="w-8 h-8">
                                            <AvatarFallback className="bg-indigo-50 text-indigo-700 text-[10px] font-semibold">
                                                {getInitials(a.name)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-medium text-slate-900 text-sm">{a.name}</p>
                                            <p className="text-[11px] text-slate-500 font-mono">{a.code}</p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="text-sm text-slate-600">{a.dept}</TableCell>
                                <TableCell className="text-sm font-medium text-slate-900 tabular-nums">
                                    {a.checkIn}
                                </TableCell>
                                <TableCell className="text-sm font-medium text-slate-900 tabular-nums">
                                    {a.checkOut}
                                </TableCell>
                                <TableCell className="text-sm text-slate-600 tabular-nums">
                                    {a.hours}
                                </TableCell>
                                <TableCell className="text-sm text-slate-600">
                                    {a.zone !== '—' ? (
                                        <span className="inline-flex items-center gap-1.5">
                                            <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                                            {a.zone}
                                        </span>
                                    ) : (
                                        <span className="text-slate-300">—</span>
                                    )}
                                </TableCell>
                                <TableCell className="py-3">
                                    <Badge
                                        variant="outline"
                                        className={`${statusStyles[a.status]} gap-1.5 border`}
                                    >
                                        <span className={`w-1.5 h-1.5 rounded-full ${statusDot[a.status]}`} />
                                        {a.status}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </div>
    )
}