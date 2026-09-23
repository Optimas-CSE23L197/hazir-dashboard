import {
    TrendingUp, TrendingDown, Building2, Users, DollarSign,

} from 'lucide-react'
import {
    BarChart, Bar, AreaChart, Area,
    ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'

const kpis = [
    { label: 'MRR', value: '₹18.4L', change: '+12.5%', trend: 'up', icon: DollarSign, bg: 'bg-emerald-50', color: 'text-emerald-600' },
    { label: 'Active Companies', value: '128', change: '+8', trend: 'up', icon: Building2, bg: 'bg-indigo-50', color: 'text-indigo-600' },
    { label: 'Total Users', value: '8,432', change: '+324', trend: 'up', icon: Users, bg: 'bg-blue-50', color: 'text-blue-600' },
    { label: 'Churn Rate', value: '2.1%', change: '-0.4%', trend: 'down', icon: TrendingDown, bg: 'bg-amber-50', color: 'text-amber-600' },
]

const revenueData = [
    { month: 'Apr', mrr: 11.2, new: 1.8, churn: 0.4 },
    { month: 'May', mrr: 12.4, new: 1.9, churn: 0.5 },
    { month: 'Jun', mrr: 13.1, new: 1.5, churn: 0.6 },
    { month: 'Jul', mrr: 14.8, new: 2.3, churn: 0.4 },
    { month: 'Aug', mrr: 16.2, new: 2.1, churn: 0.5 },
    { month: 'Sep', mrr: 18.4, new: 2.8, churn: 0.5 },
]

const signupData = [
    { month: 'Apr', signups: 42, churned: 8 },
    { month: 'May', signups: 48, churned: 6 },
    { month: 'Jun', signups: 52, churned: 10 },
    { month: 'Jul', signups: 68, churned: 7 },
    { month: 'Aug', signups: 74, churned: 9 },
    { month: 'Sep', signups: 86, churned: 6 },
]

export default function AdminAnalytics() {
    return (
        <div className="space-y-6 max-w-[1600px] mx-auto">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                        Analytics
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Deep dive into platform metrics
                    </p>
                </div>
                <Badge className="bg-rose-50 text-rose-700 border border-rose-100">
                    Last 6 months
                </Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {kpis.map((k) => {
                    const Icon = k.icon
                    const TrendIcon = k.trend === 'up' ? TrendingUp : TrendingDown
                    return (
                        <Card key={k.label} className="hover:-translate-y-0.5 transition-all duration-200">
                            <CardContent className="p-5">
                                <div className="flex items-start justify-between">
                                    <div className={`p-2.5 rounded-lg ${k.bg}`}>
                                        <Icon className={`w-5 h-5 ${k.color}`} />
                                    </div>
                                    <Badge
                                        variant="outline"
                                        className={`gap-1 border-0 ${k.trend === 'up' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}
                                    >
                                        <TrendIcon className="w-3 h-3" />
                                        {k.change}
                                    </Badge>
                                </div>
                                <p className="text-3xl font-bold text-slate-900 mt-4 tracking-tight">{k.value}</p>
                                <p className="text-sm text-slate-500 mt-0.5 font-medium">{k.label}</p>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>

            <Card>
                <CardHeader className="pb-4">
                    <CardTitle className="text-base font-semibold">Revenue Growth</CardTitle>
                    <p className="text-xs text-slate-500 mt-0.5">MRR, New MRR, and Churn (₹ Lakhs)</p>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={revenueData}>
                            <defs>
                                <linearGradient id="mrrG" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#f43f5e" stopOpacity={0.25} />
                                    <stop offset="100%" stopColor="#f43f5e" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="newG" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#6366f1" stopOpacity={0.2} />
                                    <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                            <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }} />
                            <Legend wrapperStyle={{ fontSize: 12 }} />
                            <Area type="monotone" dataKey="mrr" stroke="#f43f5e" strokeWidth={2.5} fill="url(#mrrG)" name="Total MRR" />
                            <Area type="monotone" dataKey="new" stroke="#6366f1" strokeWidth={2} fill="url(#newG)" name="New MRR" />
                        </AreaChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="pb-4">
                    <CardTitle className="text-base font-semibold">Signups vs Churn</CardTitle>
                    <p className="text-xs text-slate-500 mt-0.5">Monthly new companies vs churned</p>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={signupData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                            <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }} />
                            <Legend wrapperStyle={{ fontSize: 12 }} />
                            <Bar dataKey="signups" fill="#10b981" radius={[4, 4, 0, 0]} name="Signups" />
                            <Bar dataKey="churned" fill="#f43f5e" radius={[4, 4, 0, 0]} name="Churned" />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    )
}