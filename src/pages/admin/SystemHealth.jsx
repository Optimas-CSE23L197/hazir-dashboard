import {
    Database, Zap, AlertTriangle,
    Globe, HardDrive, Cpu, Wifi,
} from 'lucide-react'
import {
    LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'

const services = [
    { name: 'API Gateway', status: 'Operational', uptime: '99.99%', latency: '45ms', icon: Globe, bg: 'bg-emerald-50', color: 'text-emerald-600' },
    { name: 'Database (Postgres)', status: 'Operational', uptime: '99.98%', latency: '12ms', icon: Database, bg: 'bg-emerald-50', color: 'text-emerald-600' },
    { name: 'Redis Cache', status: 'Operational', uptime: '99.99%', latency: '2ms', icon: Zap, bg: 'bg-emerald-50', color: 'text-emerald-600' },
    { name: 'AI Face Service', status: 'Degraded', uptime: '98.42%', latency: '850ms', icon: Cpu, bg: 'bg-amber-50', color: 'text-amber-600' },
    { name: 'Storage (R2)', status: 'Operational', uptime: '100%', latency: '120ms', icon: HardDrive, bg: 'bg-emerald-50', color: 'text-emerald-600' },
    { name: 'Email Service', status: 'Operational', uptime: '99.95%', latency: '230ms', icon: Wifi, bg: 'bg-emerald-50', color: 'text-emerald-600' },
]

const latencyData = [
    { time: '00:00', api: 42, ai: 620 },
    { time: '04:00', api: 38, ai: 580 },
    { time: '08:00', api: 62, ai: 920 },
    { time: '12:00', api: 78, ai: 1250 },
    { time: '16:00', api: 65, ai: 890 },
    { time: '20:00', api: 48, ai: 720 },
    { time: '23:59', api: 45, ai: 850 },
]

export default function SystemHealth() {
    return (
        <div className="space-y-6 max-w-[1600px] mx-auto">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                        System Health
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Real-time status of all platform services
                    </p>
                </div>
                <Badge className="bg-amber-50 text-amber-700 border border-amber-100 gap-1.5 px-3 py-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" strokeWidth={2} />
                    1 service degraded
                </Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'Overall Uptime', value: '99.98%', bg: 'bg-emerald-50', color: 'text-emerald-600' },
                    { label: 'Avg Latency', value: '45ms', bg: 'bg-indigo-50', color: 'text-indigo-600' },
                    { label: 'Active Connections', value: '2,847', bg: 'bg-blue-50', color: 'text-blue-600' },
                    { label: 'Errors (24h)', value: '12', bg: 'bg-rose-50', color: 'text-rose-600' },
                ].map((s) => (
                    <Card key={s.label}>
                        <CardContent className="p-5">
                            <p className={`text-3xl font-bold ${s.color} tracking-tight`}>{s.value}</p>
                            <p className="text-xs text-slate-500 mt-0.5 font-medium">{s.label}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card>
                <CardHeader className="pb-4">
                    <CardTitle className="text-base font-semibold">Service Status</CardTitle>
                    <p className="text-xs text-slate-500 mt-0.5">All services across the platform</p>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {services.map((s) => {
                            const Icon = s.icon
                            const isOk = s.status === 'Operational'
                            return (
                                <div key={s.name} className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 hover:border-slate-200 transition-colors">
                                    <div className={`p-2 rounded-lg ${s.bg} shrink-0`}>
                                        <Icon className={`w-4 h-4 ${s.color}`} strokeWidth={2} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-slate-900 truncate">{s.name}</p>
                                        <p className="text-[11px] text-slate-500">Uptime {s.uptime} · {s.latency}</p>
                                    </div>
                                    <Badge variant="outline" className={isOk ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-amber-50 text-amber-700 border-amber-100'}>
                                        {s.status}
                                    </Badge>
                                </div>
                            )
                        })}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="pb-4">
                    <CardTitle className="text-base font-semibold">Latency (Last 24h)</CardTitle>
                    <p className="text-xs text-slate-500 mt-0.5">API vs AI Face processing time (ms)</p>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={280}>
                        <LineChart data={latencyData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                            <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }} />
                            <Line type="monotone" dataKey="api" stroke="#6366f1" strokeWidth={2.5} dot={{ fill: '#6366f1', r: 3 }} name="API" />
                            <Line type="monotone" dataKey="ai" stroke="#f43f5e" strokeWidth={2.5} dot={{ fill: '#f43f5e', r: 3 }} name="AI Face" />
                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    )
}