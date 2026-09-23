import { Play, Wallet, Users, TrendingUp, IndianRupee, CheckCircle2, Clock, FileText } from 'lucide-react'
import { Button } from '#/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '#/components/ui/card'
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '#/components/ui/select'

const stats = [
    {
        label: 'Employees',
        value: '142',
        icon: Users,
        bg: 'bg-indigo-50',
        color: 'text-indigo-600',
        trend: '+12 this month',
        trendColor: 'text-emerald-600',
    },
    {
        label: 'Est. Total Payout',
        value: '₹18.4L',
        icon: IndianRupee,
        bg: 'bg-emerald-50',
        color: 'text-emerald-600',
        trend: '+5.2% vs Aug',
        trendColor: 'text-emerald-600',
    },
    {
        label: 'Deductions',
        value: '₹2.1L',
        icon: Wallet,
        bg: 'bg-amber-50',
        color: 'text-amber-600',
        trend: 'PF + ESI + TDS',
        trendColor: 'text-slate-500',
    },
    {
        label: 'Net Payable',
        value: '₹16.3L',
        icon: TrendingUp,
        bg: 'bg-purple-50',
        color: 'text-purple-600',
        trend: 'Ready to disburse',
        trendColor: 'text-slate-500',
    },
]

const checklist = [
    { icon: CheckCircle2, text: '142 employees marked present', done: true },
    { icon: CheckCircle2, text: 'Attendance locked for September', done: true },
    { icon: Clock, text: '2 pending leave approvals', done: false },
    { icon: FileText, text: 'Tax declarations verified', done: true },
]

export default function Payroll() {
    return (
        <div className="space-y-6 max-w-[1600px] mx-auto">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                        Payroll
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Run monthly payroll for your employees
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Select defaultValue="2026-09">
                        <SelectTrigger className="w-44 bg-white border-slate-200">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="2026-09">September 2026</SelectItem>
                            <SelectItem value="2026-08">August 2026</SelectItem>
                            <SelectItem value="2026-07">July 2026</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button
                        size="sm"
                        className="gap-2 bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm"
                    >
                        <Play className="w-4 h-4" />
                        Run Payroll
                    </Button>
                </div>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((s) => {
                    const Icon = s.icon
                    return (
                        <Card key={s.label} className="hover:-translate-y-0.5 transition-all duration-200">
                            <CardContent className="p-5">
                                <div className="flex items-start justify-between">
                                    <div className={`p-2.5 rounded-lg ${s.bg}`}>
                                        <Icon className={`w-5 h-5 ${s.color}`} />
                                    </div>
                                </div>
                                <p className="text-3xl font-bold text-slate-900 mt-4 tracking-tight">
                                    {s.value}
                                </p>
                                <p className="text-xs text-slate-500 mt-0.5 font-medium">
                                    {s.label}
                                </p>
                                <p className={`text-[11px] mt-1.5 font-medium ${s.trendColor}`}>
                                    {s.trend}
                                </p>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>

            {/* Payroll Preview */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <div>
                        <CardTitle className="text-base font-semibold">
                            Payroll Preview — September 2026
                        </CardTitle>
                        <p className="text-xs text-slate-500 mt-0.5">
                            Review status before running payroll
                        </p>
                    </div>
                    <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-100">
                        Not started
                    </span>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                        {/* Left — Illustration + CTA */}
                        <div className="lg:col-span-3 rounded-xl bg-slate-50 border border-slate-100 p-8 flex flex-col items-center justify-center text-center min-h-[320px]">
                            <div className="p-4 rounded-2xl bg-indigo-50 mb-5">
                                <Play className="w-8 h-8 text-indigo-600" />
                            </div>
                            <p className="text-slate-900 font-semibold text-lg">
                                September 2026 payroll hasn't been run yet
                            </p>
                            <p className="text-sm text-slate-500 mt-2 max-w-md leading-relaxed">
                                Generate salary for <span className="font-semibold text-slate-700">142 employees</span> based on their attendance, leave, and overtime records for this month.
                            </p>
                            <Button className="mt-6 gap-2 bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm">
                                <Play className="w-4 h-4" />
                                Run Payroll Now
                            </Button>
                            <p className="text-[11px] text-slate-400 mt-3">
                                Estimated time: ~30 seconds
                            </p>
                        </div>

                        {/* Right — Pre-flight checklist */}
                        <div className="lg:col-span-2 flex flex-col">
                            <div className="mb-4">
                                <h3 className="text-sm font-semibold text-slate-900">
                                    Pre-flight Checklist
                                </h3>
                                <p className="text-xs text-slate-500 mt-0.5">
                                    Make sure these are done before running
                                </p>
                            </div>
                            <div className="space-y-2.5 flex-1">
                                {checklist.map((item, i) => {
                                    const Icon = item.icon
                                    return (
                                        <div
                                            key={i}
                                            className={`flex items-start gap-3 p-3 rounded-lg border ${item.done
                                                ? 'border-emerald-100 bg-emerald-50/50'
                                                : 'border-amber-100 bg-amber-50/50'
                                                }`}
                                        >
                                            <div className={`p-1 rounded-md ${item.done ? 'bg-emerald-100' : 'bg-amber-100'} shrink-0 mt-0.5`}>
                                                <Icon className={`w-3.5 h-3.5 ${item.done ? 'text-emerald-600' : 'text-amber-600'}`} />
                                            </div>
                                            <p className="text-xs text-slate-700 font-medium leading-relaxed">
                                                {item.text}
                                            </p>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="mt-4 pt-4 border-t border-slate-100">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-slate-500">Overall status</span>
                                    <span className="font-semibold text-amber-600">
                                        1 item pending
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}