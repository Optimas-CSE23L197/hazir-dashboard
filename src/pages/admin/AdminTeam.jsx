import { useState } from 'react'
import {
    Plus, Search, MoreHorizontal, Edit, Crown, Shield,
    Mail, Ban, UserCog,
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

const team = [
    { id: 1, name: 'You', email: 'you@hazir.in', role: 'Super Admin', status: 'Active', lastActive: 'Just now', initials: 'Y', isYou: true },
    { id: 2, name: 'Priya Sharma', email: 'priya@hazir.in', role: 'Admin', status: 'Active', lastActive: '2 min ago', initials: 'PS' },
    { id: 3, name: 'Rajesh Kumar', email: 'rajesh@hazir.in', role: 'Support', status: 'Active', lastActive: '1 hour ago', initials: 'RK' },
    { id: 4, name: 'Amit Patel', email: 'amit@hazir.in', role: 'Finance', status: 'Active', lastActive: '3 hours ago', initials: 'AP' },
    { id: 5, name: 'Suresh Patil', email: 'suresh@hazir.in', role: 'Support', status: 'Suspended', lastActive: '30 days ago', initials: 'SP' },
]

const roleStyles = {
    'Super Admin': 'bg-rose-50 text-rose-700 border-rose-200',
    Admin: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    Support: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Finance: 'bg-purple-50 text-purple-700 border-purple-200',
}

export default function AdminTeam() {
    const [search, setSearch] = useState('')

    const filtered = team.filter(
        (t) =>
            t.name.toLowerCase().includes(search.toLowerCase()) ||
            t.email.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="space-y-6 max-w-[1600px] mx-auto">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                        Admin Users
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Manage your internal team members
                    </p>
                </div>
                <Button size="sm" className="gap-2 bg-rose-600 hover:bg-rose-700 text-white">
                    <Plus className="w-4 h-4" strokeWidth={2} />
                    Invite Member
                </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                {[
                    { label: 'Team Size', value: '5', icon: UserCog, bg: 'bg-indigo-50', color: 'text-indigo-600' },
                    { label: 'Admins', value: '2', icon: Crown, bg: 'bg-rose-50', color: 'text-rose-600' },
                    { label: 'Active', value: '4', icon: Shield, bg: 'bg-emerald-50', color: 'text-emerald-600' },
                    { label: 'Suspended', value: '1', icon: Ban, bg: 'bg-amber-50', color: 'text-amber-600' },
                ].map((s) => {
                    const Icon = s.icon
                    return (
                        <Card key={s.label}>
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

            <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" strokeWidth={2} />
                <Input
                    placeholder="Search team members..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10 h-9 bg-slate-50 border-slate-200"
                />
            </div>

            <Card className="overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-slate-50 hover:bg-slate-50 border-b border-slate-100">
                            <TableHead className="font-semibold text-slate-600 text-[11px] uppercase tracking-wider py-3">Member</TableHead>
                            <TableHead className="font-semibold text-slate-600 text-[11px] uppercase tracking-wider py-3">Role</TableHead>
                            <TableHead className="font-semibold text-slate-600 text-[11px] uppercase tracking-wider py-3">Status</TableHead>
                            <TableHead className="font-semibold text-slate-600 text-[11px] uppercase tracking-wider py-3">Last Active</TableHead>
                            <TableHead className="text-right py-3"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filtered.map((t) => (
                            <TableRow key={t.id} className="hover:bg-slate-50/70 border-b border-slate-50">
                                <TableCell className="py-3">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="w-9 h-9">
                                            <AvatarFallback className="bg-rose-50 text-rose-700 text-[10px] font-semibold">
                                                {t.initials}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="min-w-0">
                                            <div className="flex items-center gap-2">
                                                <p className="text-sm font-medium text-slate-900 truncate">
                                                    {t.name}
                                                </p>
                                                {t.isYou && (
                                                    <Badge variant="outline" className="text-[10px] bg-slate-50 text-slate-600 border-slate-200">
                                                        You
                                                    </Badge>
                                                )}
                                            </div>
                                            <p className="text-[11px] text-slate-500 truncate">{t.email}</p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="py-3">
                                    <Badge variant="outline" className={roleStyles[t.role]}>
                                        {t.role}
                                    </Badge>
                                </TableCell>
                                <TableCell className="py-3">
                                    <Badge variant="outline" className={t.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-rose-50 text-rose-700 border-rose-100'}>
                                        {t.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-xs text-slate-500 py-3">{t.lastActive}</TableCell>
                                <TableCell className="text-right py-3">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                <MoreHorizontal className="w-4 h-4" strokeWidth={2} />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-44">
                                            <DropdownMenuItem className="gap-2 cursor-pointer">
                                                <Edit className="w-4 h-4 text-slate-400" strokeWidth={2} />
                                                Edit role
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="gap-2 cursor-pointer">
                                                <Mail className="w-4 h-4 text-slate-400" strokeWidth={2} />
                                                Resend invite
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
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </div>
    )
}