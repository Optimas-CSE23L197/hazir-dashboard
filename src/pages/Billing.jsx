import {
    CreditCard, Download, Check, Users, Calendar,
    TrendingUp, FileText, Zap, Crown, Building2,
} from 'lucide-react'
import { Button } from '#/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '#/components/ui/table'

const currentPlan = {
    name: 'Pro',
    price: 3999,
    employees: 50,
    billingCycle: 'Monthly',
    nextBilling: '15 Oct 2026',
    icon: Zap,
    bg: 'bg-indigo-50',
    color: 'text-indigo-600',
}

const invoices = [
    { id: 'INV-2026-009', date: '15 Sep 2026', amount: 3999, status: 'Paid' },
    { id: 'INV-2026-008', date: '15 Aug 2026', amount: 3999, status: 'Paid' },
    { id: 'INV-2026-007', date: '15 Jul 2026', amount: 3999, status: 'Paid' },
    { id: 'INV-2026-006', date: '15 Jun 2026', amount: 3999, status: 'Paid' },
    { id: 'INV-2026-005', date: '15 May 2026', amount: 3999, status: 'Paid' },
]

const usage = [
    { label: 'Employees', used: 47, limit: 50, icon: Users, bg: 'bg-indigo-50', color: 'text-indigo-600' },
    { label: 'Zones', used: 6, limit: 'Unlimited', icon: Building2, bg: 'bg-emerald-50', color: 'text-emerald-600' },
    { label: 'API Calls', used: '48K', limit: '100K', icon: TrendingUp, bg: 'bg-amber-50', color: 'text-amber-600' },
    { label: 'Storage', used: '2.4 GB', limit: '10 GB', icon: FileText, bg: 'bg-purple-50', color: 'text-purple-600' },
]

const paymentMethod = {
    type: 'Visa',
    last4: '4242',
    expiry: '12/27',
    name: 'Demo Company Pvt Ltd',
}

export default function Billing() {
    const PlanIcon = currentPlan.icon

    return (
        <div className="space-y-6 max-w-[1600px] mx-auto">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                    Billing & Subscription
                </h1>
                <p className="text-sm text-slate-500 mt-1">
                    Manage your plan, payment methods, and invoices
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Current Plan */}
                <Card className="lg:col-span-2">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                        <div>
                            <CardTitle className="text-base font-semibold">Current Plan</CardTitle>
                            <p className="text-xs text-slate-500 mt-0.5">
                                Your active subscription
                            </p>
                        </div>
                        <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-100">
                            Active
                        </Badge>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-start gap-4 p-5 rounded-xl bg-indigo-50 border border-indigo-100">
                            <div className="p-3 rounded-xl bg-white shrink-0">
                                <PlanIcon className="w-6 h-6 text-indigo-600" strokeWidth={2} />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900">
                                            {currentPlan.name}
                                        </h3>
                                        <p className="text-xs text-slate-600 mt-1">
                                            Up to {currentPlan.employees} employees
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-bold text-slate-900">
                                            ₹{currentPlan.price.toLocaleString('en-IN')}
                                        </p>
                                        <p className="text-xs text-slate-500">
                                            /{currentPlan.billingCycle.toLowerCase()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-5 pt-5 border-t border-slate-100">
                            <div>
                                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                                    Next Billing Date
                                </p>
                                <p className="text-sm font-semibold text-slate-900 mt-1 flex items-center gap-1.5">
                                    <Calendar className="w-3.5 h-3.5 text-slate-400" strokeWidth={2} />
                                    {currentPlan.nextBilling}
                                </p>
                            </div>
                            <div>
                                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                                    Billing Cycle
                                </p>
                                <p className="text-sm font-semibold text-slate-900 mt-1">
                                    {currentPlan.billingCycle}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-2 mt-5 pt-5 border-t border-slate-100">
                            <Button size="sm" className="gap-2 bg-indigo-600 hover:bg-indigo-700 text-white">
                                <Crown className="w-4 h-4" strokeWidth={2} />
                                Upgrade Plan
                            </Button>
                            <Button variant="outline" size="sm">
                                Change Billing Cycle
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Payment Method */}
                <Card>
                    <CardHeader className="pb-4">
                        <CardTitle className="text-base font-semibold">Payment Method</CardTitle>
                        <p className="text-xs text-slate-500 mt-0.5">Default card on file</p>
                    </CardHeader>
                    <CardContent>
                        <div className="p-4 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-indigo-500/20 blur-2xl" />
                            <div className="relative">
                                <div className="flex items-center justify-between">
                                    <CreditCard className="w-6 h-6 text-white/80" strokeWidth={2} />
                                    <span className="text-xs font-semibold text-white/80">
                                        {paymentMethod.type}
                                    </span>
                                </div>
                                <p className="text-lg font-mono tracking-wider mt-6">
                                    •••• •••• •••• {paymentMethod.last4}
                                </p>
                                <div className="flex items-end justify-between mt-4">
                                    <div>
                                        <p className="text-[10px] uppercase tracking-wider text-white/60">
                                            Card Holder
                                        </p>
                                        <p className="text-xs font-medium mt-0.5 truncate">
                                            {paymentMethod.name}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] uppercase tracking-wider text-white/60">
                                            Expires
                                        </p>
                                        <p className="text-xs font-medium mt-0.5">
                                            {paymentMethod.expiry}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Button variant="outline" size="sm" className="w-full mt-4 gap-2">
                            <CreditCard className="w-4 h-4" strokeWidth={2} />
                            Update Card
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* Usage */}
            <Card>
                <CardHeader className="pb-4">
                    <CardTitle className="text-base font-semibold">Current Usage</CardTitle>
                    <p className="text-xs text-slate-500 mt-0.5">
                        Your usage against plan limits
                    </p>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {usage.map((u) => {
                            const Icon = u.icon
                            return (
                                <div key={u.label} className="p-4 rounded-xl border border-slate-100">
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className={`p-1.5 rounded-md ${u.bg}`}>
                                            <Icon className={`w-3.5 h-3.5 ${u.color}`} strokeWidth={2} />
                                        </div>
                                        <p className="text-xs font-semibold text-slate-700">
                                            {u.label}
                                        </p>
                                    </div>
                                    <p className="text-2xl font-bold text-slate-900 tracking-tight">
                                        {u.used}
                                    </p>
                                    <p className="text-[11px] text-slate-500 mt-0.5">
                                        of {u.limit}
                                    </p>
                                </div>
                            )
                        })}
                    </div>
                </CardContent>
            </Card>

            {/* Invoices */}
            <Card className="overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <div>
                        <CardTitle className="text-base font-semibold">Billing History</CardTitle>
                        <p className="text-xs text-slate-500 mt-0.5">
                            Download past invoices
                        </p>
                    </div>
                    <Button variant="outline" size="sm" className="gap-2">
                        <Download className="w-4 h-4" strokeWidth={2} />
                        Export All
                    </Button>
                </CardHeader>
                <Table>
                    <TableHeader>
                        <TableRow className="bg-slate-50 hover:bg-slate-50 border-b border-slate-100">
                            <TableHead className="font-semibold text-slate-600 text-[11px] uppercase tracking-wider py-3">Invoice</TableHead>
                            <TableHead className="font-semibold text-slate-600 text-[11px] uppercase tracking-wider py-3">Date</TableHead>
                            <TableHead className="font-semibold text-slate-600 text-[11px] uppercase tracking-wider py-3">Amount</TableHead>
                            <TableHead className="font-semibold text-slate-600 text-[11px] uppercase tracking-wider py-3">Status</TableHead>
                            <TableHead className="font-semibold text-slate-600 text-[11px] uppercase tracking-wider py-3 text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {invoices.map((inv) => (
                            <TableRow key={inv.id} className="hover:bg-slate-50/70 border-b border-slate-50">
                                <TableCell className="text-sm font-mono text-slate-700 py-3">
                                    {inv.id}
                                </TableCell>
                                <TableCell className="text-sm text-slate-600 py-3">
                                    {inv.date}
                                </TableCell>
                                <TableCell className="text-sm font-semibold text-slate-900 py-3">
                                    ₹{inv.amount.toLocaleString('en-IN')}
                                </TableCell>
                                <TableCell className="py-3">
                                    <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-100 gap-1.5">
                                        <Check className="w-3 h-3" strokeWidth={3} />
                                        {inv.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right py-3">
                                    <Button variant="ghost" size="sm" className="gap-1.5 text-indigo-600 hover:text-indigo-700">
                                        <Download className="w-3.5 h-3.5" strokeWidth={2} />
                                        Download
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </div>
    )
}