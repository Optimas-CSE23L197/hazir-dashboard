import {
    FileSpreadsheet, FileText, Calendar, MapPin, Clock,
    TrendingUp, ArrowUpRight,
} from 'lucide-react'
import { Card, CardContent } from '#/components/ui/card'

const reports = [
    {
        icon: FileSpreadsheet,
        title: 'Monthly Attendance Register',
        desc: 'Employee-wise attendance for a month',
        tag: 'Attendance',
        bg: 'bg-indigo-50',
        color: 'text-indigo-600',
        tagClass: 'bg-indigo-50 text-indigo-700 border-indigo-100',
    },
    {
        icon: FileText,
        title: 'Muster Roll',
        desc: 'All employees × days of month matrix',
        tag: 'Attendance',
        bg: 'bg-emerald-50',
        color: 'text-emerald-600',
        tagClass: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    },
    {
        icon: Clock,
        title: 'Late & Early Departure',
        desc: 'Employees with late check-ins or early exits',
        tag: 'Attendance',
        bg: 'bg-amber-50',
        color: 'text-amber-600',
        tagClass: 'bg-amber-50 text-amber-700 border-amber-100',
    },
    {
        icon: TrendingUp,
        title: 'Overtime Report',
        desc: 'Overtime hours by employee',
        tag: 'Payroll',
        bg: 'bg-purple-50',
        color: 'text-purple-600',
        tagClass: 'bg-purple-50 text-purple-700 border-purple-100',
    },
    {
        icon: Calendar,
        title: 'Leave Balance',
        desc: 'Leave balance across all types',
        tag: 'Leave',
        bg: 'bg-rose-50',
        color: 'text-rose-600',
        tagClass: 'bg-rose-50 text-rose-700 border-rose-100',
    },
    {
        icon: MapPin,
        title: 'Geofence Violations',
        desc: 'Attendance outside assigned zones',
        tag: 'Compliance',
        bg: 'bg-cyan-50',
        color: 'text-cyan-600',
        tagClass: 'bg-cyan-50 text-cyan-700 border-cyan-100',
    },
]

export default function Reports() {
    return (
        <div className="space-y-6 max-w-[1600px] mx-auto">
            {/* Page Header */}
            <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                        Reports
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Export attendance, leave, and payroll reports
                    </p>
                </div>
                <p className="text-xs text-slate-400">
                    {reports.length} reports available
                </p>
            </div>

            {/* Reports Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {reports.map((r) => {
                    const Icon = r.icon
                    return (
                        <Card
                            key={r.title}
                            className="cursor-pointer group transition-all duration-200 hover:border-slate-300 hover:-translate-y-0.5"
                        >
                            <CardContent className="p-5">
                                {/* Top row: icon + tag */}
                                <div className="flex items-start justify-between">
                                    <div className={`p-2.5 rounded-lg ${r.bg}`}>
                                        <Icon className={`w-5 h-5 ${r.color}`} />
                                    </div>
                                    <span
                                        className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${r.tagClass}`}
                                    >
                                        {r.tag}
                                    </span>
                                </div>

                                {/* Title + desc */}
                                <div className="mt-4">
                                    <h3 className="font-semibold text-slate-900 text-[15px] leading-snug">
                                        {r.title}
                                    </h3>
                                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                                        {r.desc}
                                    </p>
                                </div>

                                {/* Bottom row */}
                                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                                    <span className="text-[11px] text-slate-400">
                                        Updated today
                                    </span>
                                    <span
                                        className={`text-[11px] font-semibold ${r.color} flex items-center gap-1 group-hover:gap-1.5 transition-all`}
                                    >
                                        Generate
                                        <ArrowUpRight className="w-3 h-3" />
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>
        </div>
    )
}