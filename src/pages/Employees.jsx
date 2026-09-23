import { useState } from 'react'
import {
    Plus, Search, Download, Filter, MoreHorizontal, Mail, Phone,
    MapPin, Users, UserCheck, UserX, Clock, UserPlus,
} from 'lucide-react'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { Card, CardContent } from '#/components/ui/card'
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '#/components/ui/table'
import { Badge } from '#/components/ui/badge'
import { Avatar, AvatarFallback } from '#/components/ui/avatar'
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem,
    DropdownMenuSeparator, DropdownMenuTrigger,
} from '#/components/ui/dropdown-menu'

const mockEmployees = [
    {
        id: 1, code: 'EMP001', name: 'Rahul Sharma', email: 'rahul@hazir.in',
        dept: 'Sales', phone: '98765 43210', status: 'Active',
        today: 'Present', checkIn: '09:02 AM', zone: 'Andheri West',
    },
    {
        id: 2, code: 'EMP002', name: 'Amit Kumar', email: 'amit@hazir.in',
        dept: 'Delivery', phone: '98765 43211', status: 'Active',
        today: 'Late', checkIn: '09:45 AM', zone: 'Bandra',
    },
    {
        id: 3, code: 'EMP003', name: 'Suresh Patil', email: 'suresh@hazir.in',
        dept: 'Pest Control', phone: '98765 43212', status: 'Active',
        today: 'Absent', checkIn: null, zone: 'Thane',
    },
    {
        id: 4, code: 'EMP004', name: 'Priya Singh', email: 'priya@hazir.in',
        dept: 'Sales', phone: '98765 43213', status: 'Pending',
        today: null, checkIn: null, zone: null,
    },
    {
        id: 5, code: 'EMP005', name: 'Vikram Joshi', email: 'vikram@hazir.in',
        dept: 'Transport', phone: '98765 43214', status: 'Active',
        today: 'Present', checkIn: '08:55 AM', zone: 'Powai',
    },
]

const todayStatusStyle = {
    Present: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Late: 'bg-amber-50 text-amber-700 border-amber-200',
    Absent: 'bg-rose-50 text-rose-700 border-rose-200',
}

const deptColors = {
    Sales: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    Delivery: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'Pest Control': 'bg-amber-50 text-amber-700 border-amber-200',
    Transport: 'bg-rose-50 text-rose-700 border-rose-200',
}

function StatCard({ icon: Icon, label, value, color, bgColor }) {
    return (
        <Card className="border border-slate-100 rounded-xl bg-white shadow-sm">
            <CardContent className="p-4 flex items-center gap-3">
                <div className={`p-2 rounded-lg ${bgColor}`}>
                    <Icon className={`w-4 h-4 ${color}`} strokeWidth={2} />
                </div>
                <div>
                    <p className="text-2xl font-bold text-slate-900 leading-none kpi-value">
                        {value}
                    </p>
                    <p className="text-xs text-slate-500 mt-1.5 font-medium">{label}</p>
                </div>
            </CardContent>
        </Card>
    )
}

function getInitials(name) {
    return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
}

export default function Employees() {
    const [search, setSearch] = useState('')

    const filtered = mockEmployees.filter(
        (e) =>
            e.name.toLowerCase().includes(search.toLowerCase()) ||
            e.code.toLowerCase().includes(search.toLowerCase()) ||
            e.phone.includes(search)
    )

    const isEmpty = filtered.length === 0

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">
                        Employees
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Manage your workforce {mockEmployees.length} total
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-2 bg-white">
                        <Download className="w-4 h-4" strokeWidth={2} />
                        Export
                    </Button>
                    <Button
                        size="sm"
                        className="gap-2 bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm"
                    >
                        <Plus className="w-4 h-4" strokeWidth={2} />
                        Add employee
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard
                    icon={Users}
                    label="Total employees"
                    value={142}
                    color="text-indigo-600"
                    bgColor="bg-indigo-50"
                />
                <StatCard
                    icon={UserCheck}
                    label="Active today"
                    value={128}
                    color="text-emerald-600"
                    bgColor="bg-emerald-50"
                />
                <StatCard
                    icon={Clock}
                    label="On leave"
                    value={6}
                    color="text-amber-600"
                    bgColor="bg-amber-50"
                />
                <StatCard
                    icon={UserX}
                    label="Absent"
                    value={8}
                    color="text-rose-600"
                    bgColor="bg-rose-50"
                />
            </div>

            <Card className="border border-slate-100 rounded-xl bg-white shadow-sm">
                <CardContent className="p-4">
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="relative flex-1 min-w-[240px]">
                            <Search
                                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
                                strokeWidth={2}
                            />
                            <Input
                                placeholder="Search by name, code, phone..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-10 h-9 text-sm bg-slate-50 border-slate-200 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500"
                            />
                        </div>
                        <Button variant="outline" size="sm" className="gap-2 bg-white">
                            <Filter className="w-4 h-4" strokeWidth={2} />
                            Filters
                        </Button>
                        <Button variant="outline" size="sm" className="gap-2 bg-white">
                            <MapPin className="w-4 h-4" strokeWidth={2} />
                            All zones
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Card className="border border-slate-100 rounded-xl overflow-hidden bg-white shadow-sm">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-slate-50 border-b border-slate-200 hover:bg-slate-50">
                            <TableHead className="font-medium text-slate-500 text-xs h-10">
                                Employee
                            </TableHead>
                            <TableHead className="font-medium text-slate-500 text-xs h-10">
                                Department
                            </TableHead>
                            <TableHead className="font-medium text-slate-500 text-xs h-10">
                                Contact
                            </TableHead>
                            <TableHead className="font-medium text-slate-500 text-xs h-10">
                                Zone
                            </TableHead>
                            <TableHead className="font-medium text-slate-500 text-xs h-10">
                                Account status
                            </TableHead>
                            <TableHead className="font-medium text-slate-500 text-xs h-10">
                                Today's status
                            </TableHead>
                            <TableHead className="font-medium text-slate-500 text-xs h-10 text-right">
                                <span className="sr-only">Actions</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isEmpty ? (
                            <TableRow>
                                <TableCell colSpan={7} className="h-64 text-center">
                                    <div className="flex flex-col items-center justify-center gap-3">
                                        <div className="p-3 rounded-full bg-slate-100">
                                            <Users className="w-5 h-5 text-slate-400" strokeWidth={2} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-slate-900">
                                                No employees found
                                            </p>
                                            <p className="text-xs text-slate-500 mt-1">
                                                {search
                                                    ? `No employee matches "${search}"`
                                                    : 'Add your first employee to get started'}
                                            </p>
                                        </div>
                                        {!search && (
                                            <Button size="sm" className="gap-2 bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm mt-1">
                                                <UserPlus className="w-4 h-4" strokeWidth={2} />
                                                Add employee
                                            </Button>
                                        )}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            filtered.map((emp) => (
                                <TableRow
                                    key={emp.id}
                                    className="hover:bg-slate-50 transition-colors duration-150 border-b border-slate-100 last:border-0"
                                >
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar className="w-9 h-9">
                                                <AvatarFallback className="bg-indigo-600 text-white text-xs font-semibold">
                                                    {getInitials(emp.name)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="min-w-0">
                                                <p className="font-medium text-slate-900 text-sm truncate">
                                                    {emp.name}
                                                </p>
                                                <p className="text-xs text-slate-500 font-mono">
                                                    {emp.code}
                                                </p>
                                            </div>
                                        </div>
                                    </TableCell>

                                    <TableCell>
                                        <Badge
                                            variant="outline"
                                            className={deptColors[emp.dept] || 'bg-slate-50 text-slate-600 border-slate-200'}
                                        >
                                            {emp.dept}
                                        </Badge>
                                    </TableCell>

                                    <TableCell>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-1.5 text-xs text-slate-600">
                                                <Mail className="w-3 h-3 text-slate-400 shrink-0" strokeWidth={2} />
                                                <span className="truncate">{emp.email}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-xs text-slate-600">
                                                <Phone className="w-3 h-3 text-slate-400 shrink-0" strokeWidth={2} />
                                                {emp.phone}
                                            </div>
                                        </div>
                                    </TableCell>

                                    <TableCell>
                                        {emp.zone ? (
                                            <div className="flex items-center gap-1.5 text-xs text-slate-600">
                                                <MapPin className="w-3 h-3 text-slate-400 shrink-0" strokeWidth={2} />
                                                {emp.zone}
                                            </div>
                                        ) : (
                                            <span className="text-xs text-slate-400">—</span>
                                        )}
                                    </TableCell>

                                    <TableCell>
                                        <Badge
                                            variant="outline"
                                            className={
                                                emp.status === 'Active'
                                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                                    : 'bg-amber-50 text-amber-700 border-amber-200'
                                            }
                                        >
                                            <span
                                                aria-hidden="true"
                                                className={`w-1.5 h-1.5 rounded-full mr-1.5 ${emp.status === 'Active' ? 'bg-emerald-500' : 'bg-amber-500'}`}
                                            />
                                            {emp.status}
                                        </Badge>
                                    </TableCell>

                                    <TableCell>
                                        {emp.today ? (
                                            <Badge
                                                variant="outline"
                                                className={todayStatusStyle[emp.today]}
                                            >
                                                {emp.today}
                                                {emp.checkIn && (
                                                    <span className="ml-1.5 opacity-70 font-normal">
                                                        {emp.checkIn}
                                                    </span>
                                                )}
                                            </Badge>
                                        ) : (
                                            <span className="text-xs text-slate-400">Not marked</span>
                                        )}
                                    </TableCell>

                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8"
                                                    aria-label={`Actions for ${emp.name}`}
                                                >
                                                    <MoreHorizontal className="w-4 h-4" strokeWidth={2} />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-48">
                                                <DropdownMenuItem>View profile</DropdownMenuItem>
                                                <DropdownMenuItem>Edit details</DropdownMenuItem>
                                                <DropdownMenuItem>View attendance</DropdownMenuItem>
                                                <DropdownMenuItem>View route</DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem className="text-rose-600 focus:text-rose-600">
                                                    Suspend employee
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>

                {!isEmpty && (
                    <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-t border-slate-200 bg-slate-50">
                        <p className="text-xs text-slate-500">
                            Showing{' '}
                            <span className="font-medium text-slate-900">1–{filtered.length}</span>{' '}
                            of <span className="font-medium text-slate-900">{filtered.length}</span> employees
                        </p>
                        <div className="flex items-center gap-1.5">
                            <Button variant="outline" size="sm" disabled className="bg-white">
                                Previous
                            </Button>
                            <Button variant="outline" size="sm" disabled className="bg-white">
                                Next
                            </Button>
                        </div>
                    </div>
                )}
            </Card>
        </div>
    )
}