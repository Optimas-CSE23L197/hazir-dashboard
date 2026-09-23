import { useState } from 'react'
import {
    Plus, Search, MoreHorizontal, Edit, Trash2, Shield,
    Check, X, Crown, UserCog, Eye, Lock, Save,
} from 'lucide-react'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem,
    DropdownMenuSeparator, DropdownMenuTrigger,
} from '#/components/ui/dropdown-menu'

const roles = [
    {
        id: 1,
        name: 'Super Admin',
        desc: 'Full access to entire platform. Can manage all tenants, billing, and settings.',
        users: 1,
        icon: Crown,
        bg: 'bg-rose-50',
        color: 'text-rose-600',
        permissions: 42,
        totalPermissions: 42,
        locked: true,
    },
    {
        id: 2,
        name: 'Admin',
        desc: 'Manage companies, users, subscriptions, and view analytics.',
        users: 2,
        icon: Shield,
        bg: 'bg-indigo-50',
        color: 'text-indigo-600',
        permissions: 32,
        totalPermissions: 42,
        locked: true,
    },
    {
        id: 3,
        name: 'Support',
        desc: 'Handle support tickets, view companies, and manage users.',
        users: 5,
        icon: UserCog,
        bg: 'bg-emerald-50',
        color: 'text-emerald-600',
        permissions: 18,
        totalPermissions: 42,
        locked: false,
    },
    {
        id: 4,
        name: 'Finance',
        desc: 'Access to billing, subscriptions, invoices, and revenue reports.',
        users: 3,
        icon: Lock,
        bg: 'bg-purple-50',
        color: 'text-purple-600',
        permissions: 15,
        totalPermissions: 42,
        locked: false,
    },
    {
        id: 5,
        name: 'Viewer',
        desc: 'Read-only access to dashboards and reports.',
        users: 8,
        icon: Eye,
        bg: 'bg-slate-50',
        color: 'text-slate-600',
        permissions: 8,
        totalPermissions: 42,
        locked: false,
    },
]

const permissionGroups = [
    {
        group: 'Companies',
        permissions: ['View companies', 'Create company', 'Edit company', 'Delete company', 'Impersonate'],
    },
    {
        group: 'Users',
        permissions: ['View users', 'Invite user', 'Edit user', 'Suspend user', 'Reset password'],
    },
    {
        group: 'Billing',
        permissions: ['View subscriptions', 'Manage plans', 'View invoices', 'Issue refunds', 'Update pricing'],
    },
    {
        group: 'Support',
        permissions: ['View tickets', 'Reply to tickets', 'Close tickets', 'Escalate tickets'],
    },
    {
        group: 'System',
        permissions: ['View analytics', 'View audit logs', 'Manage API keys', 'View system health'],
    },
]

const permissionMatrix = {
    'Super Admin': ['view_companies', 'create_company', 'edit_company', 'delete_company', 'impersonate', 'view_users', 'invite_user', 'edit_user', 'suspend_user', 'reset_password', 'view_subs', 'manage_plans', 'view_invoices', 'issue_refunds', 'update_pricing', 'view_tickets', 'reply_tickets', 'close_tickets', 'escalate_tickets', 'view_analytics', 'view_audit', 'manage_api', 'view_health'],
    'Admin': ['view_companies', 'create_company', 'edit_company', 'view_users', 'invite_user', 'edit_user', 'view_subs', 'manage_plans', 'view_invoices', 'view_tickets', 'reply_tickets', 'view_analytics', 'view_audit', 'view_health'],
    'Support': ['view_companies', 'view_users', 'view_tickets', 'reply_tickets', 'close_tickets', 'escalate_tickets', 'view_analytics'],
    'Finance': ['view_companies', 'view_subs', 'manage_plans', 'view_invoices', 'issue_refunds', 'update_pricing', 'view_analytics'],
    'Viewer': ['view_companies', 'view_users', 'view_analytics'],
}

export default function AdminRoles() {
    const [search, setSearch] = useState('')
    const [activeRole, setActiveRole] = useState('Super Admin')

    const filtered = roles.filter((r) =>
        r.name.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="space-y-6 max-w-[1600px] mx-auto">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                        Roles & Permissions
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Manage platform-level roles for your admin team
                    </p>
                </div>
                <Button size="sm" className="gap-2 bg-rose-600 hover:bg-rose-700 text-white">
                    <Plus className="w-4 h-4" strokeWidth={2} />
                    Create Role
                </Button>
            </div>

            {/* Search */}
            <div className="relative max-w-md">
                <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
                    strokeWidth={2}
                />
                <Input
                    placeholder="Search roles..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10 h-9 bg-slate-50 border-slate-200"
                />
            </div>

            {/* Role Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((r) => {
                    const Icon = r.icon
                    const isActive = activeRole === r.name
                    return (
                        <Card
                            key={r.id}
                            className={`cursor-pointer transition-all duration-200 hover:-translate-y-0.5 ${isActive ? 'ring-2 ring-rose-500 ring-offset-2' : ''
                                }`}
                            onClick={() => setActiveRole(r.name)}
                        >
                            <CardContent className="p-5">
                                <div className="flex items-start justify-between">
                                    <div className={`p-2.5 rounded-lg ${r.bg}`}>
                                        <Icon className={`w-5 h-5 ${r.color}`} strokeWidth={2} />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {r.locked && (
                                            <Badge
                                                variant="outline"
                                                className="text-[10px] bg-slate-50 text-slate-600 border-slate-200"
                                            >
                                                System
                                            </Badge>
                                        )}
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 -mr-2 -mt-1"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <MoreHorizontal className="w-4 h-4" strokeWidth={2} />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-44">
                                                <DropdownMenuItem className="gap-2 cursor-pointer">
                                                    <Eye className="w-4 h-4 text-slate-400" strokeWidth={2} />
                                                    View
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    className="gap-2 cursor-pointer"
                                                    disabled={r.locked}
                                                >
                                                    <Edit className="w-4 h-4 text-slate-400" strokeWidth={2} />
                                                    Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem
                                                    className="gap-2 text-rose-600 focus:text-rose-600 cursor-pointer"
                                                    disabled={r.locked}
                                                >
                                                    <Trash2 className="w-4 h-4" strokeWidth={2} />
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <h3 className="text-base font-semibold text-slate-900">
                                        {r.name}
                                    </h3>
                                    <p className="text-xs text-slate-500 mt-1 leading-relaxed line-clamp-2">
                                        {r.desc}
                                    </p>
                                </div>

                                <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                                            Members
                                        </p>
                                        <p className="text-lg font-bold text-slate-900 mt-0.5">
                                            {r.users}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                                            Permissions
                                        </p>
                                        <p className="text-lg font-bold text-slate-900 mt-0.5">
                                            {r.permissions}
                                            <span className="text-xs font-normal text-slate-400">
                                                /{r.totalPermissions}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>

            {/* Permission Matrix */}
            <Card className="overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <div>
                        <CardTitle className="text-base font-semibold">
                            Permission Matrix — {activeRole}
                        </CardTitle>
                        <p className="text-xs text-slate-500 mt-0.5">
                            What this role can access across the platform
                        </p>
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        className="gap-2"
                        disabled={roles.find((r) => r.name === activeRole)?.locked}
                    >
                        <Save className="w-4 h-4" strokeWidth={2} />
                        Save Changes
                    </Button>
                </CardHeader>
                <CardContent className="space-y-6">
                    {permissionGroups.map((group) => (
                        <div key={group.group}>
                            <div className="flex items-center gap-2 mb-3">
                                <h4 className="text-sm font-semibold text-slate-900">
                                    {group.group}
                                </h4>
                                <div className="flex-1 h-px bg-slate-100" />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                                {group.permissions.map((perm) => {
                                    const key = perm.toLowerCase().replace(/\s+/g, '_')
                                    const isGranted =
                                        permissionMatrix[activeRole]?.includes(key) ||
                                        permissionMatrix[activeRole]?.includes(key.replace('view_', 'view_'))
                                    const isLocked =
                                        activeRole === 'Super Admin' ||
                                        (activeRole === 'Admin' && perm !== 'Delete company')
                                    return (
                                        <label
                                            key={perm}
                                            className={`flex items-center gap-2.5 p-2.5 rounded-lg border transition-colors cursor-pointer ${isGranted
                                                ? 'bg-emerald-50/50 border-emerald-100'
                                                : 'bg-slate-50/50 border-slate-100'
                                                }`}
                                        >
                                            <div
                                                className={`p-0.5 rounded ${isGranted ? 'bg-emerald-100' : 'bg-slate-200'
                                                    }`}
                                            >
                                                {isGranted ? (
                                                    <Check
                                                        className="w-3 h-3 text-emerald-600"
                                                        strokeWidth={3}
                                                    />
                                                ) : (
                                                    <X
                                                        className="w-3 h-3 text-slate-400"
                                                        strokeWidth={3}
                                                    />
                                                )}
                                            </div>
                                            <span
                                                className={`text-xs font-medium ${isGranted ? 'text-slate-700' : 'text-slate-400'
                                                    }`}
                                            >
                                                {perm}
                                            </span>
                                        </label>
                                    )
                                })}
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    )
}