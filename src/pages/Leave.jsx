import { Check, X, Clock, TrendingUp, Calendar, FileText } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import { Avatar, AvatarFallback } from '#/components/ui/avatar'

const mockLeaves = [
    {
        id: 1, name: 'Rahul Sharma', code: 'EMP001', dept: 'Sales',
        type: 'Casual', from: '25 Sep 2026', to: '27 Sep 2026',
        days: 3, reason: 'Family function',
        balance: { CL: '8/12', SL: '6/6', PL: '4/4' },
        appliedOn: '20 Sep 2026',
    },
    {
        id: 2, name: 'Amit Kumar', code: 'EMP002', dept: 'Delivery',
        type: 'Sick', from: '23 Sep 2026', to: '23 Sep 2026',
        days: 1, reason: 'Fever and cold',
        balance: { CL: '10/12', SL: '5/6', PL: '4/4' },
        appliedOn: '22 Sep 2026',
    },
]

const typeStyles = {
    Casual: 'bg-indigo-50 text-indigo-700 border-indigo-100',
    Sick: 'bg-rose-50 text-rose-700 border-rose-100',
    Paid: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    Unpaid: 'bg-slate-50 text-slate-700 border-slate-200',
}

const stats = [
    {
        label: 'Pending Approval',
        value: '2',
        icon: Clock,
        bg: 'bg-amber-50',
        color: 'text-amber-600',
        sub: 'Awaiting your action',
        subColor: 'text-amber-600',
    },
    {
        label: 'Approved this month',
        value: '24',
        icon: Check,
        bg: 'bg-emerald-50',
        color: 'text-emerald-600',
        sub: '+6 vs last month',
        subColor: 'text-emerald-600',
    },
    {
        label: 'Rejected',
        value: '3',
        icon: X,
        bg: 'bg-rose-50',
        color: 'text-rose-600',
        sub: '12% rejection rate',
        subColor: 'text-slate-500',
    },
    {
        label: 'Avg days per request',
        value: '4.2',
        icon: TrendingUp,
        bg: 'bg-indigo-50',
        color: 'text-indigo-600',
        sub: 'Stable trend',
        subColor: 'text-slate-500',
    },
]

function getInitials(name) {
    return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
}

export default function Leave() {
    return (
        <div className="space-y-6 max-w-[1600px] mx-auto">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                        Leave Requests
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Approve or reject pending leave requests
                    </p>
                </div>
                <Badge className="bg-amber-50 text-amber-700 border border-amber-100 gap-1.5 px-3 py-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    2 Pending
                </Badge>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((s) => {
                    const Icon = s.icon
                    return (
                        <Card key={s.label} className="hover:-translate-y-0.5 transition-all duration-200">
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
                                <p className={`text-[11px] mt-1.5 font-medium ${s.subColor}`}>
                                    {s.sub}
                                </p>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>

            {/* Section heading */}
            <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-slate-900">
                    Pending Requests
                </h2>
                <span className="text-xs text-slate-500">
                    {mockLeaves.length} requests
                </span>
            </div>

            {/* Leave cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {mockLeaves.map((leave) => (
                    <Card key={leave.id} className="hover:border-slate-300 transition-colors">
                        <CardHeader className="pb-4">
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex items-center gap-3">
                                    <Avatar className="w-11 h-11">
                                        <AvatarFallback className="bg-indigo-50 text-indigo-700 text-xs font-semibold">
                                            {getInitials(leave.name)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <CardTitle className="text-base font-semibold">
                                            {leave.name}
                                        </CardTitle>
                                        <p className="text-xs text-slate-500 mt-0.5">
                                            {leave.code} · {leave.dept}
                                        </p>
                                    </div>
                                </div>
                                <Badge variant="outline" className={`${typeStyles[leave.type]} border`}>
                                    {leave.type} Leave
                                </Badge>
                            </div>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            {/* Dates — cleaner grid */}
                            <div className="grid grid-cols-3 gap-3">
                                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                                    <div className="flex items-center gap-1.5 text-slate-500 mb-1">
                                        <Calendar className="w-3 h-3" />
                                        <p className="text-[10px] uppercase tracking-wider font-semibold">From</p>
                                    </div>
                                    <p className="text-xs font-medium text-slate-900">{leave.from}</p>
                                </div>
                                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                                    <div className="flex items-center gap-1.5 text-slate-500 mb-1">
                                        <Calendar className="w-3 h-3" />
                                        <p className="text-[10px] uppercase tracking-wider font-semibold">To</p>
                                    </div>
                                    <p className="text-xs font-medium text-slate-900">{leave.to}</p>
                                </div>
                                <div className="p-3 rounded-lg bg-indigo-50 border border-indigo-100">
                                    <div className="flex items-center gap-1.5 text-indigo-600 mb-1">
                                        <Clock className="w-3 h-3" />
                                        <p className="text-[10px] uppercase tracking-wider font-semibold">Days</p>
                                    </div>
                                    <p className="text-xs font-bold text-indigo-900">
                                        {leave.days} {leave.days === 1 ? 'day' : 'days'}
                                    </p>
                                </div>
                            </div>

                            {/* Reason */}
                            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-100">
                                <FileText className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                                <div>
                                    <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                                        Reason
                                    </p>
                                    <p className="text-xs text-slate-700 mt-0.5">{leave.reason}</p>
                                </div>
                            </div>

                            {/* Balance — highlight the requested leave type */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                                        Leave Balance
                                    </p>
                                    <p className="text-[10px] text-slate-400">
                                        Applied {leave.appliedOn}
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    {Object.entries(leave.balance).map(([type, val]) => {
                                        const isMatch =
                                            (leave.type === 'Casual' && type === 'CL') ||
                                            (leave.type === 'Sick' && type === 'SL') ||
                                            (leave.type === 'Paid' && type === 'PL')
                                        return (
                                            <div
                                                key={type}
                                                className={`flex-1 p-2 rounded-lg text-center border ${isMatch
                                                    ? 'bg-indigo-50 border-indigo-200'
                                                    : 'bg-slate-50 border-slate-100'
                                                    }`}
                                            >
                                                <p className={`text-[10px] font-semibold ${isMatch ? 'text-indigo-600' : 'text-slate-500'}`}>
                                                    {type}
                                                </p>
                                                <p className={`text-xs font-bold mt-0.5 ${isMatch ? 'text-indigo-900' : 'text-slate-700'}`}>
                                                    {val}
                                                </p>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2 pt-4 border-t border-slate-100">
                                <Button
                                    size="sm"
                                    className="flex-1 gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
                                >
                                    <Check className="w-4 h-4" />
                                    Approve
                                </Button>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="flex-1 gap-1.5 text-rose-600 hover:text-rose-700 hover:bg-rose-50 border-rose-200"
                                >
                                    <X className="w-4 h-4" />
                                    Reject
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}