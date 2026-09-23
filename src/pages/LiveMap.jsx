import { useState } from 'react'
import {
    MapPin, Users, Clock, Search,
    Navigation, Maximize2, Layers,
} from 'lucide-react'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Avatar, AvatarFallback } from '#/components/ui/avatar'

const activeWorkers = [
    { id: 1, name: 'Rahul Sharma', code: 'EMP001', zone: 'Andheri West', status: 'On Route', lastSeen: 'Just now', initials: 'RS' },
    { id: 2, name: 'Amit Kumar', code: 'EMP002', zone: 'Bandra', status: 'At Stop', lastSeen: '2 min ago', initials: 'AK' },
    { id: 3, name: 'Vikram Joshi', code: 'EMP005', zone: 'Powai', status: 'On Route', lastSeen: '5 min ago', initials: 'VJ' },
    { id: 4, name: 'Priya Singh', code: 'EMP004', zone: 'Andheri', status: 'Idle', lastSeen: '12 min ago', initials: 'PS' },
]

const stats = [
    { label: 'On Duty', value: 128, icon: Users, bg: 'bg-emerald-50', color: 'text-emerald-600' },
    { label: 'On Route', value: 84, icon: Navigation, bg: 'bg-indigo-50', color: 'text-indigo-600' },
    { label: 'At Stop', value: 32, icon: MapPin, bg: 'bg-amber-50', color: 'text-amber-600' },
    { label: 'Idle', value: 12, icon: Clock, bg: 'bg-rose-50', color: 'text-rose-600' },
]

const statusStyles = {
    'On Route': 'bg-indigo-50 text-indigo-700 border-indigo-100',
    'At Stop': 'bg-amber-50 text-amber-700 border-amber-100',
    'Idle': 'bg-rose-50 text-rose-700 border-rose-100',
}

export default function LiveMap() {
    const [search, setSearch] = useState('')

    const filtered = activeWorkers.filter(
        (w) =>
            w.name.toLowerCase().includes(search.toLowerCase()) ||
            w.code.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="space-y-6 max-w-[1600px] mx-auto">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                        Live Map
                    </h1>
                    <p className="text-sm text-slate-500 mt-1 flex items-center gap-1.5">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                        </span>
                        Live tracking · Updated every 60 seconds
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                        <Layers className="w-4 h-4" strokeWidth={2} />
                        Layers
                    </Button>
                    <Button size="sm" className="gap-2 bg-indigo-600 hover:bg-indigo-700 text-white">
                        <Maximize2 className="w-4 h-4" strokeWidth={2} />
                        Full Screen
                    </Button>
                </div>
            </div>

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
                                <p className="text-xs text-slate-500 mt-0.5 font-medium">{s.label}</p>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 overflow-hidden">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                        <div>
                            <CardTitle className="text-base font-semibold">Field Activity</CardTitle>
                            <p className="text-xs text-slate-500 mt-0.5">
                                128 employees currently on duty
                            </p>
                        </div>
                        <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-100">
                            Live
                        </Badge>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[500px] rounded-xl bg-slate-50 flex items-center justify-center border border-slate-200 relative overflow-hidden">
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
                                <MapPin className="w-10 h-10 text-indigo-500 mx-auto mb-3" />
                                <p className="text-base font-semibold text-slate-900">
                                    Interactive map coming soon
                                </p>
                                <p className="text-xs text-slate-500 mt-1">
                                    Mapbox integration in next update
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="overflow-hidden flex flex-col">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-base font-semibold">Active Workers</CardTitle>
                        <div className="relative mt-3">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" strokeWidth={2} />
                            <Input
                                placeholder="Search workers..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-10 h-9 text-sm bg-slate-50 border-slate-200"
                            />
                        </div>
                    </CardHeader>
                    <CardContent className="flex-1 overflow-y-auto p-0">
                        <div className="divide-y divide-slate-100">
                            {filtered.map((w) => (
                                <div
                                    key={w.id}
                                    className="flex items-center gap-3 px-6 py-3 hover:bg-slate-50 transition-colors cursor-pointer"
                                >
                                    <Avatar className="w-9 h-9">
                                        <AvatarFallback className="bg-indigo-50 text-indigo-700 text-xs font-semibold">
                                            {w.initials}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-slate-900 truncate">
                                            {w.name}
                                        </p>
                                        <p className="text-[11px] text-slate-500">
                                            {w.code} · {w.zone}
                                        </p>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <Badge variant="outline" className={statusStyles[w.status]}>
                                            {w.status}
                                        </Badge>
                                        <p className="text-[10px] text-slate-400 mt-1">
                                            {w.lastSeen}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}