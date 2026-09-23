import {
    TrendingUp, TrendingDown, CalendarCheck, Clock,
    MapPin, AlertTriangle,
} from 'lucide-react'
import {
    BarChart, Bar, PieChart, Pie, Cell,
    ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'

const kpis = [
    { label: 'Avg Attendance Rate', value: '92.4%', change: '+2.1%', trend: 'up', icon: CalendarCheck, bg: 'bg-emerald-50', color: 'text-emerald-600' },
    { label: 'Avg Working Hours', value: '8.6h', change: '+0.3h', trend: 'up', icon: Clock, bg: 'bg-indigo-50', color: 'text-indigo-600' },
    { label: 'On-Time Arrival', value: '87.2%', change: '-1.4%', trend: 'down', icon: MapPin, bg: 'bg-amber-50', color: 'text-amber-600' },
    { label: 'Violations', value: '12', change: '+3', trend: 'up', icon: AlertTriangle, bg: 'bg-rose-50', color: 'text-rose-600' },
]

const attendanceTrend = [
    { week: 'W1', present: 88, late: 8, absent: 4 },
    { week: 'W2', present: 91, late: 6, absent: 3 },
    { week: 'W3', present: 89, late: 7, absent: 4 },
    { week: 'W4', present: 93, late: 5, absent: 2 },
]

const deptData = [
    { name: 'Sales', value: 92 },
    { name: 'Delivery', value: 95 },
    { name: 'Pest Control', value: 88 },
    { name: 'Transport', value: 91 },
]

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#8b5cf6']

export default function Analytics() {
    return (
        <div className="space-y-6 max-w-[1600px] mx-auto">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                        Analytics
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Deep insights into your workforce performance
                    </p>
                </div>
                <Badge className="bg-indigo-50 text-indigo-700 border border-indigo-100">
                    Last 30 days
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
                                        className={`gap-1 border-0 ${k.trend === 'up' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}
                                    >
                                        <TrendIcon className="w-3 h-3" />
                                        {k.change}
                                    </Badge>
                                </div>
                                <p className="text-3xl font-bold text-slate-900 mt-4 tracking-tight">
                                    {k.value}
                                </p>
                                <p className="text-sm text-slate-500 mt-0.5 font-medium">{k.label}</p>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-base font-semibold">
                            Weekly Attendance Trend
                        </CardTitle>
                        <p className="text-xs text-slate-500 mt-0.5">
                            Present vs Late vs Absent percentages
                        </p>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={280}>
                            <BarChart data={attendanceTrend}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                                <XAxis dataKey="week" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }} />
                                <Legend wrapperStyle={{ fontSize: 12 }} />
                                <Bar dataKey="present" fill="#10b981" radius={[4, 4, 0, 0]} name="Present %" />
                                <Bar dataKey="late" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Late %" />
                                <Bar dataKey="absent" fill="#ef4444" radius={[4, 4, 0, 0]} name="Absent %" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-4">
                        <CardTitle className="text-base font-semibold">Department-wise Attendance</CardTitle>
                        <p className="text-xs text-slate-500 mt-0.5">Average attendance rate</p>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={200}>
                            <PieChart>
                                <Pie data={deptData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value">
                                    {deptData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="space-y-2 mt-4">
                            {deptData.map((d, i) => (
                                <div key={d.name} className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                                        <span className="text-slate-600">{d.name}</span>
                                    </div>
                                    <span className="font-semibold text-slate-900">{d.value}%</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}