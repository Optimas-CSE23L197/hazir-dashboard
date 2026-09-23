import {
    Building2,
    Users,
    CreditCard,
    TrendingUp,
    TrendingDown,
    ArrowUpRight,
    Activity,
    DollarSign,
    UserPlus,
    FileText,
    ChevronRight,
    CheckCircle2,
    XCircle,
} from 'lucide-react'
import {
    AreaChart,
    Area,
    ResponsiveContainer,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    BarChart,
    Bar,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'

// ---------- Mock Data ----------
const kpis = [
    {
        label: 'Monthly Recurring Revenue',
        value: '₹18.4L',
        change: '+12.5%',
        trend: 'up',
        sub: 'vs last month',
        icon: DollarSign,
        bg: 'bg-emerald-50',
        color: 'text-emerald-600',
    },
    {
        label: 'Active Companies',
        value: '142',
        change: '+8',
        trend: 'up',
        sub: 'new this month',
        icon: Building2,
        bg: 'bg-indigo-50',
        color: 'text-indigo-600',
    },
    {
        label: 'Total Users',
        value: '8,432',
        change: '+324',
        trend: 'up',
        sub: 'across all tenants',
        icon: Users,
        bg: 'bg-blue-50',
        color: 'text-blue-600',
    },
    {
        label: 'Churn Rate',
        value: '2.1%',
        change: '-0.4%',
        trend: 'down',
        sub: 'improving',
        icon: TrendingDown,
        bg: 'bg-amber-50',
        color: 'text-amber-600',
    },
]

const revenueData = [
    { month: 'Apr', mrr: 11.2, newMrr: 1.8 },
    { month: 'May', mrr: 12.4, newMrr: 1.9 },
    { month: 'Jun', mrr: 13.1, newMrr: 1.5 },
    { month: 'Jul', mrr: 14.8, newMrr: 2.3 },
    { month: 'Aug', mrr: 16.2, newMrr: 2.1 },
    { month: 'Sep', mrr: 18.4, newMrr: 2.8 },
]

const planData = [
    { plan: 'Starter', count: 68 },
    { plan: 'Pro', count: 52 },
    { plan: 'Business', count: 18 },
    { plan: 'Enterprise', count: 4 },
]

const recentCompanies = [
    { name: 'Acme Logistics', plan: 'Pro', users: 84, mrr: '₹12,400', status: 'Active', joined: '2 days ago' },
    { name: 'Swift Delivery Co', plan: 'Business', users: 156, mrr: '₹28,800', status: 'Active', joined: '5 days ago' },
    { name: 'Urban Pest Control', plan: 'Pro', users: 42, mrr: '₹8,900', status: 'Active', joined: '1 week ago' },
    { name: 'Metro Couriers', plan: 'Starter', users: 23, mrr: '₹4,200', status: 'Trial', joined: '1 week ago' },
    { name: 'GreenField Services', plan: 'Pro', users: 67, mrr: '₹10,500', status: 'Active', joined: '2 weeks ago' },
]

const systemAlerts = [
    {
        type: 'warning',
        title: 'High API latency',
        desc: 'Mumbai region response time above 500ms',
        time: '5 min ago',
        icon: Activity,
    },
    {
        type: 'danger',
        title: '3 failed payments',
        desc: 'Stripe webhook returned errors for 3 tenants',
        time: '20 min ago',
        icon: XCircle,
    },
    {
        type: 'info',
        title: 'New trial started',
        desc: 'Metro Couriers began their 14-day Pro trial',
        time: '1 hour ago',
        icon: UserPlus,
    },
]

const statusStyles = {
    Active: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    Trial: 'bg-amber-50 text-amber-700 border-amber-100',
    Suspended: 'bg-rose-50 text-rose-700 border-rose-100',
}

const planStyles = {
    Starter: 'bg-slate-50 text-slate-700 border-slate-200',
    Pro: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    Business: 'bg-purple-50 text-purple-700 border-purple-200',
    Enterprise: 'bg-rose-50 text-rose-700 border-rose-200',
}

// ---------- Components ----------
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
                    <Badge
                        variant="outline"
                        className={`gap-1 border-0 ${kpi.trend === 'up'
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-amber-50 text-amber-700'
                            }`}
                    >
                        <TrendIcon className="w-3 h-3" />
                        {kpi.change}
                    </Badge>
                </div>
                <div className="mt-4">
                    <p className="text-3xl font-bold text-slate-900 tracking-tight">
                        {kpi.value}
                    </p>
                    <p className="text-sm text-slate-500 mt-0.5 font-medium">
                        {kpi.label}
                    </p>
                    <p className="text-[11px] mt-1.5 text-slate-400 font-medium">
                        {kpi.sub}
                    </p>
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
        <div className={`border-l-4 ${s.border} ${s.bg} p-3 rounded-r-lg cursor-pointer hover:shadow-sm transition`}>
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

export default function AdminOverview() {
    return (
        <div className="space-y-6 max-w-[1600px] mx-auto">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                        Platform Overview
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Monitor your SaaS — revenue, tenants, and system health
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                        <FileText className="w-4 h-4" strokeWidth={2} />
                        Export Report
                    </Button>
                    <Button
                        size="sm"
                        className="gap-2 bg-rose-600 hover:bg-rose-700 text-white shadow-sm"
                    >
                        <Building2 className="w-4 h-4" strokeWidth={2} />
                        Add Company
                    </Button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {kpis.map((kpi) => (
                    <KpiCard key={kpi.label} kpi={kpi} />
                ))}
            </div>

            {/* Revenue Chart + Plan Distribution */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Revenue Chart */}
                <Card className="lg:col-span-2">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                        <div>
                            <CardTitle className="text-base font-semibold">
                                Revenue Growth
                            </CardTitle>
                            <p className="text-xs text-slate-500 mt-0.5">
                                MRR trend over last 6 months (₹ Lakhs)
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                                <span className="text-xs text-slate-600">Total MRR</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                                <span className="text-xs text-slate-600">New MRR</span>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={280}>
                            <AreaChart data={revenueData}>
                                <defs>
                                    <linearGradient id="mrrGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#f43f5e" stopOpacity={0.25} />
                                        <stop offset="100%" stopColor="#f43f5e" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="newMrrGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#6366f1" stopOpacity={0.2} />
                                        <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                                <XAxis
                                    dataKey="month"
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
                                <Area
                                    type="monotone"
                                    dataKey="mrr"
                                    stroke="#f43f5e"
                                    strokeWidth={2.5}
                                    fill="url(#mrrGrad)"
                                />
                                <Area
                                    type="monotone"
                                    dataKey="newMrr"
                                    stroke="#6366f1"
                                    strokeWidth={2}
                                    fill="url(#newMrrGrad)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Plan Distribution */}
                <Card>
                    <CardHeader className="pb-4">
                        <CardTitle className="text-base font-semibold">
                            Plan Distribution
                        </CardTitle>
                        <p className="text-xs text-slate-500 mt-0.5">
                            Companies by subscription tier
                        </p>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={planData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                                <XAxis
                                    dataKey="plan"
                                    stroke="#94a3b8"
                                    fontSize={11}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <YAxis
                                    stroke="#94a3b8"
                                    fontSize={11}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#fff',
                                        border: '1px solid #e2e8f0',
                                        borderRadius: '8px',
                                    }}
                                />
                                <Bar dataKey="count" fill="#6366f1" radius={[6, 6, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                        <div className="space-y-2 mt-4">
                            {planData.map((p) => (
                                <div key={p.plan} className="flex items-center justify-between text-sm">
                                    <span className="text-slate-600">{p.plan}</span>
                                    <span className="font-semibold text-slate-900">
                                        {p.count} companies
                                    </span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Companies + System Alerts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Companies */}
                <Card className="lg:col-span-2 overflow-hidden">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                        <div>
                            <CardTitle className="text-base font-semibold">
                                Recently Onboarded
                            </CardTitle>
                            <p className="text-xs text-slate-500 mt-0.5">
                                New companies in the last 2 weeks
                            </p>
                        </div>
                        <Button variant="ghost" size="sm" className="gap-1 text-rose-600 hover:text-rose-700 hover:bg-rose-50">
                            View all
                            <ArrowUpRight className="w-3.5 h-3.5" />
                        </Button>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y divide-slate-100">
                            {recentCompanies.map((c) => (
                                <div
                                    key={c.name}
                                    className="flex items-center justify-between gap-3 px-6 py-3 hover:bg-slate-50/70 transition-colors cursor-pointer"
                                >
                                    <div className="flex items-center gap-3 min-w-0 flex-1">
                                        <div className="p-2 rounded-lg bg-slate-100 shrink-0">
                                            <Building2 className="w-4 h-4 text-slate-600" strokeWidth={2} />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-sm font-medium text-slate-900 truncate">
                                                {c.name}
                                            </p>
                                            <p className="text-[11px] text-slate-500">
                                                {c.users} users · joined {c.joined}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 shrink-0">
                                        <Badge variant="outline" className={planStyles[c.plan]}>
                                            {c.plan}
                                        </Badge>
                                        <span className="text-sm font-semibold text-slate-900 tabular-nums w-20 text-right">
                                            {c.mrr}
                                        </span>
                                        <Badge variant="outline" className={`${statusStyles[c.status]} gap-1.5`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${c.status === 'Active' ? 'bg-emerald-500' :
                                                c.status === 'Trial' ? 'bg-amber-500' : 'bg-rose-500'
                                                }`} />
                                            {c.status}
                                        </Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* System Alerts */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                        <div>
                            <CardTitle className="text-base font-semibold">
                                System Alerts
                            </CardTitle>
                            <p className="text-xs text-slate-500 mt-0.5">
                                {systemAlerts.length} active notifications
                            </p>
                        </div>
                        <Badge className="bg-rose-50 text-rose-700 border border-rose-100">
                            {systemAlerts.length}
                        </Badge>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {systemAlerts.map((alert, i) => (
                            <AlertItem key={i} alert={alert} />
                        ))}
                        <Button
                            variant="ghost"
                            size="sm"
                            className="w-full text-rose-600 hover:text-rose-700 hover:bg-rose-50 gap-1"
                        >
                            View all alerts
                            <ChevronRight className="w-3.5 h-3.5" />
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* Bottom Row - Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="p-5">
                        <div className="flex items-center gap-2 text-slate-500 mb-3">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" strokeWidth={2} />
                            <p className="text-xs font-semibold uppercase tracking-wider">
                                Uptime
                            </p>
                        </div>
                        <p className="text-2xl font-bold text-slate-900">99.98%</p>
                        <p className="text-[11px] text-slate-400 mt-1">Last 30 days</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-5">
                        <div className="flex items-center gap-2 text-slate-500 mb-3">
                            <Activity className="w-4 h-4 text-indigo-500" strokeWidth={2} />
                            <p className="text-xs font-semibold uppercase tracking-wider">
                                API Calls
                            </p>
                        </div>
                        <p className="text-2xl font-bold text-slate-900">2.4M</p>
                        <p className="text-[11px] text-slate-400 mt-1">Today</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-5">
                        <div className="flex items-center gap-2 text-slate-500 mb-3">
                            <UserPlus className="w-4 h-4 text-blue-500" strokeWidth={2} />
                            <p className="text-xs font-semibold uppercase tracking-wider">
                                Signups
                            </p>
                        </div>
                        <p className="text-2xl font-bold text-slate-900">28</p>
                        <p className="text-[11px] text-slate-400 mt-1">This week</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-5">
                        <div className="flex items-center gap-2 text-slate-500 mb-3">
                            <CreditCard className="w-4 h-4 text-purple-500" strokeWidth={2} />
                            <p className="text-xs font-semibold uppercase tracking-wider">
                                ARPU
                            </p>
                        </div>
                        <p className="text-2xl font-bold text-slate-900">₹12,957</p>
                        <p className="text-[11px] text-slate-400 mt-1">Per company</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}