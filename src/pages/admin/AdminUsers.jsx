import { useState } from 'react'
import {
    Search, Filter, MoreHorizontal, Shield, Ban, Mail,
    CheckCircle2, XCircle, Users, UserCog, Crown,
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

const users = [
    { id: 1, name: 'Priya Sharma', email: 'priya@acme.com', company: 'Acme Logistics', role: 'Admin', status: 'Active', joined: '2 days ago', initials: 'PS' },
    { id: 2, name: 'Rajesh Kumar', email: 'rajesh@swift.com', company: 'Swift Delivery Co', role: 'Admin', status: 'Active', joined: '5 days ago', initials: 'RK' },
    { id: 3, name: 'Amit Patel', email: 'amit@urban.com', company: 'Urban Pest Control', role: 'HR Manager', status: 'Active', joined: '1 week ago', initials: 'AP' },
    { id: 4, name: 'Suresh Patil', email: 'suresh@metro.com', company: 'Metro Couriers', role: 'Manager', status: 'Pending', joined: '1 week ago', initials: 'SP' },
    { id: 5, name: 'Vikram Joshi', email: 'vikram@gf.com', company: 'GreenField Services', role: 'Admin', status: 'Active', joined: '2 weeks ago', initials: 'VJ' },
    { id: 6, name: 'Neha Verma', email: 'neha@citymovers.in', company: 'CityMovers', role: 'Employee', status: 'Suspended', joined: '3 weeks ago', initials: 'NV' },
]

const roleStyles = {
    Admin: 'bg-rose-50 text-rose-700 border-rose-200',
    'HR Manager': 'bg-indigo-50 text-indigo-700 border-indigo-200',
    Manager: 'bg-purple-50 text-purple-700 border-purple-200',
    Employee: 'bg-slate-50 text-slate-700 border-slate-200',
}

const statusStyles = {
    Active: { bg: 'bg-emerald-50 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500' },
    Pending: { bg: 'bg-amber-50 text-amber-700 border-amber-200', dot: 'bg-amber-500' },
    Suspended: { bg: 'bg-rose-50 text-rose-700 border-rose-200', dot: 'bg-rose-500' },
}

export default function AdminUsers() {
    const [search, setSearch] = useState('')

    const filtered = users.filter(
        (u) =>
            u.name.toLowerCase().includes(search.toLowerCase()) ||
            u.email.toLowerCase().includes(search.toLowerCase()) ||
            u.company.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="space-y-6 max-w-[1600px] mx-auto">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                        Users
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        All users across every tenant
                    </p>
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                    <Mail className="w-4 h-4" strokeWidth={2} />
                    Invite User
                </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'Total Users', value: '8,432', icon: Users, bg: 'bg-indigo-50', color: 'text-indigo-600' },
                    { label: 'Admins', value: '312', icon: Crown, bg: 'bg-rose-50', color: 'text-rose-600' },
                    { label: 'Active Today', value: '6,847', icon: CheckCircle2, bg: 'bg-emerald-50', color: 'text-emerald-600' },
                    { label: 'Suspended', value: '24', icon: XCircle, bg: 'bg-amber-50', color: 'text-amber-600' },
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
                                placeholder="Search users by name, email, or company..."
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
                            <TableHead className="font-semibold text-slate-600 text-[11px] uppercase tracking-wider py-3">Company</TableHead>
                            <TableHead className="font-semibold text-slate-600 text-[11px] uppercase tracking-wider py-3">Role</TableHead>
                            <TableHead className="font-semibold text-slate-600 text-[11px] uppercase tracking-wider py-3">Status</TableHead>
                            <TableHead className="font-semibold text-slate-600 text-[11px] uppercase tracking-wider py-3">Joined</TableHead>
                            <TableHead className="text-right py-3"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filtered.map((u) => {
                            const ss = statusStyles[u.status]
                            return (
                                <TableRow key={u.id} className="hover:bg-slate-50/70 border-b border-slate-50">
                                    <TableCell className="py-3">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="w-9 h-9">
                                                <AvatarFallback className="bg-rose-50 text-rose-700 text-[10px] font-semibold">
                                                    {u.initials}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="min-w-0">
                                                <p className="text-sm font-medium text-slate-900 truncate">{u.name}</p>
                                                <p className="text-[11px] text-slate-500 truncate">{u.email}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-sm text-slate-600 py-3">{u.company}</TableCell>
                                    <TableCell className="py-3">
                                        <Badge variant="outline" className={roleStyles[u.role]}>{u.role}</Badge>
                                    </TableCell>
                                    <TableCell className="py-3">
                                        <Badge variant="outline" className={`${ss.bg} gap-1.5`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${ss.dot}`} />
                                            {u.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-xs text-slate-500 py-3">{u.joined}</TableCell>
                                    <TableCell className="text-right py-3">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <MoreHorizontal className="w-4 h-4" strokeWidth={2} />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-48">
                                                <DropdownMenuItem className="gap-2 cursor-pointer">
                                                    <UserCog className="w-4 h-4 text-slate-400" strokeWidth={2} />
                                                    Change role
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="gap-2 cursor-pointer">
                                                    <Shield className="w-4 h-4 text-slate-400" strokeWidth={2} />
                                                    View permissions
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem className="gap-2 text-rose-600 focus:text-rose-600 cursor-pointer">
                                                    <Ban className="w-4 h-4" strokeWidth={2} />
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