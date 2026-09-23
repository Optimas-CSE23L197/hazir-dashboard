import {
    Users,
    UserCheck,
    UserX,
    Clock,
    AlertTriangle,
    TrendingUp,
    TrendingDown,
    ArrowUpRight,
    MapPin,
    Calendar,
    Activity,
    ChevronRight,
} from 'lucide-react'
import {
    LineChart,
    Line,
    ResponsiveContainer,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    PieChart,
    Pie,
    Cell,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'

const kpis = [
    {
        label: 'Total Employees',
        value: 142,
        change: '+12',
        trend: 'up',
        icon: Users,
        bg: 'bg-indigo-50',
        color: 'text-indigo-600',
    },
    {
        label: 'Present Today',
        value: 128,
        sub: '90.1% attendance',
        change: '+5.2%',
        trend: 'up',
        icon: UserCheck,
        bg: 'bg-emerald-50',
        color: 'text-emerald-600',
        subColor: 'text-emerald-600',
    },
    {
        label: 'Absent',
        value: 8,
        change: '-2',
        trend: 'down',
        icon: UserX,
        bg: 'bg-rose-50',
        color: 'text-rose-600',
    },
    {
        label: 'On Leave',
        value: 6,
        change: '0',
        trend: 'neutral',
        icon: Clock,
        bg: 'bg-amber-50',
        color: 'text-amber-600',
    },
    {
        label: 'Late Arrivals',
        value: 3,
        change: '+1',
        trend: 'up',
        icon: AlertTriangle,
        bg: 'bg-orange-50',
        color: 'text-orange-600',
    },
]

const attendanceTrend = [
    { day: 'Mon', present: 128, absent: 8, late: 3 },
    { day: 'Tue', present: 132, absent: 6, late: 5 },
    { day: 'Wed', present: 130, absent: 9, late: 2 },
    { day: 'Thu', present: 135, absent: 4, late: 4 },
    { day: 'Fri', present: 128, absent: 8, late: 3 },
    { day: 'Sat', present: 120, absent: 15, late: 6 },
    { day: 'Sun', present: 45, absent: 90, late: 1 },
]

const departmentData = [
    { name: 'Sales', value: 45, color: '#6366f1' },
    { name: 'Delivery', value: 38, color: '#10b981' },
    { name: 'Pest Control', value: 32, color: '#f59e0b' },
    { name: 'Transport', value: 27, color: '#8b5cf6' },
]

const alerts = [
    {
        type: 'danger',
        title: 'Geofence violation',
        desc: 'Rahul Sharma checked in 2.4km outside assigned zone',
        time: '10:15 AM',
        icon: AlertTriangle,
    },
    {
        type: 'warning',
        title: 'Missed check-out',
        desc: 'Amit Kumar did not check out yesterday',
        time: 'Yesterday',
        icon: Clock,
    },
    {
        type: 'info',
        title: 'Face verification failed',
        desc: 'Suresh Patil failed face match 3 times',
        time: '9:30 AM',
        icon: UserX,
    },
]

function KpiCard({ kpi }) {
    const Icon = kpi.icon
    const TrendIcon = kpi.trend === 'up' ? TrendingUp : TrendingDown

    return (
        <Card className="hover:-translate-y-0.5 transition-all duration-200">
            <CardContent className="p-5">
                <div className="flex items-start justify-between">
                    <div className={`p-2.5 rounded-lg ${kpi.bg}`}>
                        <Icon className={`w-5 h-5 ${kpi.color}`} />
                    </div>
                    {kpi.change && kpi.change !== '0' && (
                        <Badge
                            variant="outline"
                            className={`gap-1 border-0 ${kpi.trend === 'up'
                                    ? 'bg-emerald-50 text-emerald-700'
                                    : 'bg-rose-50 text-rose-700'
                                }`}
                        >
                            <TrendIcon className="w-3 h-3" />
                            {kpi.change}
                        </Badge>
                    )}
                </div>
                <div className="mt-4">
                    <p className="text-3xl font-bold text-slate-900 tracking-tight">
                        {kpi.value}
                    </p>
                    <p className="text-sm text-slate-500 mt-0.5 font-medium">
                        {kpi.label}
                    </p>
                    {kpi.sub && (
                        <p className={`text-xs mt-1.5 font-medium ${kpi.subColor || 'text-slate-500'}`}>
                            {kpi.sub}
                        </p>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}

function AlertItem({ alert }) {
    const Icon = alert.icon
    const styles = {
        danger: {
            border: 'border-l-rose-500',
            bg: 'bg-rose-50',
            icon: 'text-rose-600',
        },
        warning: {
            border: 'border-l-amber-500',
            bg: 'bg-amber-50',
            icon: 'text-amber-600',
        },
        info: {
            border: 'border-l-indigo-500',
            bg: 'bg-indigo-50',
            icon: 'text-indigo-600',
        },
    }
    const s = styles[alert.type]

    return (
        <div
            className={`border-l-4 ${s.border} ${s.bg} p-3 rounded-r-lg cursor-pointer hover:shadow-sm transition`}
        >
            <div className="flex items-start gap-3">
                <div className={`p-1.5 rounded-md bg-white ${s.icon} shrink-0`}>
                    <Icon className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-semibold text-slate-900 truncate">
                            {alert.title}
                        </p>
                        <span className="text-[10px] text-slate-500 shrink-0">
                            {alert.time}
                        </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed line-clamp-2">
                        {alert.desc}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default function Overview() {
    return (
        <div className="space-y-6 max-w-[1600px] mx-auto">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                        Good morning, Priya 👋
                    </h1>
                    <p className="text-sm text-slate-500 mt-1 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        Tuesday, 22 September 2026 · Here's what's happening today
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                        <Activity className="w-4 h-4" />
                        Export Report
                    </Button>
                    <Button
                        size="sm"
                        className="gap-2 bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm"
                    >
                        <MapPin className="w-4 h-4" strokeWidth={2} />
                        View live map
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {kpis.map((kpi) => (
                    <KpiCard key={kpi.label} kpi={kpi} />
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                        <div>
                            <CardTitle className="text-base font-semibold">
                                Attendance Trend
                            </CardTitle>
                            <p className="text-xs text-slate-500 mt-0.5">
                                Last 7 days overview
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                                <span className="text-xs text-slate-600">Present</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                                <span className="text-xs text-slate-600">Absent</span>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={280}>
                            <LineChart data={attendanceTrend}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                                <XAxis
                                    dataKey="day"
                                    stroke="#94a3b8"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <YAxis
                                    stroke="#94a3b8"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#fff',
                                        border: '1px solid #e2e8f0',
                                        borderRadius: '8px',
                                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                                    }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="present"
                                    stroke="#6366f1"
                                    strokeWidth={3}
                                    dot={{ fill: '#6366f1', r: 4 }}
                                    activeDot={{ r: 6 }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="absent"
                                    stroke="#ef4444"
                                    strokeWidth={2}
                                    strokeDasharray="5 5"
                                    dot={{ fill: '#ef4444', r: 3 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-4">
                        <CardTitle className="text-base font-semibold">
                            Department Breakdown
                        </CardTitle>
                        <p className="text-xs text-slate-500 mt-0.5">
                            Employees by department
                        </p>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={200}>
                            <PieChart>
                                <Pie
                                    data={departmentData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={55}
                                    outerRadius={80}
                                    paddingAngle={4}
                                    dataKey="value"
                                >
                                    {departmentData.map((entry, idx) => (
                                        <Cell key={idx} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="space-y-2 mt-4">
                            {departmentData.map((dept) => (
                                <div
                                    key={dept.name}
                                    className="flex items-center justify-between text-sm"
                                >
                                    <div className="flex items-center gap-2">
                                        <div
                                            className="w-2.5 h-2.5 rounded-full"
                                            style={{ backgroundColor: dept.color }}
                                        />
                                        <span className="text-slate-600">{dept.name}</span>
                                    </div>
                                    <span className="font-semibold text-slate-900">
                                        {dept.value}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 overflow-hidden">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                        <div>
                            <CardTitle className="text-base font-semibold flex items-center gap-2">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                </span>
                                Live Map
                            </CardTitle>
                            <p className="text-xs text-slate-500 mt-0.5">
                                128 employees on duty right now
                            </p>
                        </div>
                        <Button variant="ghost" size="sm" className="gap-1 text-indigo-600">
                            View Full Map
                            <ArrowUpRight className="w-3.5 h-3.5" />
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <div className="h-72 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-200 relative overflow-hidden">
                            <div
                                className="absolute inset-0 opacity-40"
                                style={{
                                    backgroundImage:
                                        'linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(90deg, #cbd5e1 1px, transparent 1px)',
                                    backgroundSize: '40px 40px',
                                }}
                            />
                            <div className="absolute top-[30%] left-[25%] w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-emerald-500/30" />
                            <div className="absolute top-[45%] left-[60%] w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-emerald-500/30" />
                            <div className="absolute top-[60%] left-[40%] w-3 h-3 rounded-full bg-amber-500 ring-4 ring-amber-500/30" />
                            <div className="absolute top-[25%] left-[70%] w-3 h-3 rounded-full bg-rose-500 ring-4 ring-rose-500/30" />
                            <div className="absolute top-[70%] left-[75%] w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-emerald-500/30" />
                            <div className="relative z-10 text-center">
                                <MapPin className="w-8 h-8 text-indigo-500 mx-auto mb-2" />
                                <p className="text-sm font-medium text-slate-700">
                                    Interactive map coming soon
                                </p>
                                <p className="text-xs text-slate-500 mt-1">
                                    Mapbox integration in next update
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-3 mt-4">
                            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-emerald-50">
                                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                <span className="text-xs font-medium text-emerald-700">
                                    125 On Time
                                </span>
                            </div>
                            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-amber-50">
                                <div className="w-2 h-2 rounded-full bg-amber-500" />
                                <span className="text-xs font-medium text-amber-700">
                                    3 Late
                                </span>
                            </div>
                            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-rose-50">
                                <div className="w-2 h-2 rounded-full bg-rose-500" />
                                <span className="text-xs font-medium text-rose-700">
                                    2 Violations
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                        <div>
                            <CardTitle className="text-base font-semibold">Alerts</CardTitle>
                            <p className="text-xs text-slate-500 mt-0.5">
                                {alerts.length} new notifications
                            </p>
                        </div>
                        <Badge className="bg-rose-50 text-rose-700 border border-rose-100">
                            {alerts.length}
                        </Badge>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {alerts.map((alert, i) => (
                            <AlertItem key={i} alert={alert} />
                        ))}
                        <Button
                            variant="ghost"
                            size="sm"
                            className="w-full text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 gap-1"
                        >
                            View all alerts
                            <ChevronRight className="w-3.5 h-3.5" />
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}