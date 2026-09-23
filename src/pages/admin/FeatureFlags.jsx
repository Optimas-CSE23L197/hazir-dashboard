import { useState } from 'react'
import {
    Search, ToggleLeft, ToggleRight, Flag, Zap, Users,
    Globe, Lock,
} from 'lucide-react'
import { Input } from '#/components/ui/input'
import { Card, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'

const flags = [
    { id: 1, name: 'AI Face Recognition', desc: 'Facial recognition attendance for field employees', enabled: true, rollout: 100, audience: 'All Companies', icon: Zap, bg: 'bg-indigo-50', color: 'text-indigo-600' },
    { id: 2, name: 'Live Route Tracking', desc: 'Real-time GPS tracking of field workers', enabled: true, rollout: 100, audience: 'Pro + Business plans', icon: Globe, bg: 'bg-emerald-50', color: 'text-emerald-600' },
    { id: 3, name: 'WhatsApp Notifications', desc: 'Send alerts and reminders via WhatsApp', enabled: true, rollout: 60, audience: 'Gradual rollout', icon: Users, bg: 'bg-amber-50', color: 'text-amber-600' },
    { id: 4, name: 'Advanced Analytics', desc: 'Custom reports and deep insights', enabled: false, rollout: 0, audience: 'Business plan only', icon: Flag, bg: 'bg-purple-50', color: 'text-purple-600' },
    { id: 5, name: 'API Access', desc: 'Public REST API for integrations', enabled: false, rollout: 0, audience: 'Enterprise only', icon: Lock, bg: 'bg-rose-50', color: 'text-rose-600' },
]

export default function FeatureFlags() {
    const [search, setSearch] = useState('')

    const filtered = flags.filter((f) =>
        f.name.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="space-y-6 max-w-[1600px] mx-auto">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                    Feature Flags
                </h1>
                <p className="text-sm text-slate-500 mt-1">
                    Control feature rollouts across tenants
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                    { label: 'Total Flags', value: flags.length, bg: 'bg-indigo-50', color: 'text-indigo-600' },
                    { label: 'Enabled', value: flags.filter(f => f.enabled).length, bg: 'bg-emerald-50', color: 'text-emerald-600' },
                    { label: 'Disabled', value: flags.filter(f => !f.enabled).length, bg: 'bg-slate-50', color: 'text-slate-600' },
                ].map((s) => (
                    <Card key={s.label}>
                        <CardContent className="p-5">
                            <p className={`text-3xl font-bold ${s.color} tracking-tight`}>{s.value}</p>
                            <p className="text-xs text-slate-500 mt-0.5 font-medium">{s.label}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" strokeWidth={2} />
                <Input
                    placeholder="Search flags..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10 h-9 bg-slate-50 border-slate-200"
                />
            </div>

            <div className="space-y-3">
                {filtered.map((f) => {
                    const Icon = f.icon
                    return (
                        <Card key={f.id} className="hover:border-slate-300 transition-colors">
                            <CardContent className="p-5">
                                <div className="flex items-start gap-4">
                                    <div className={`p-2.5 rounded-lg ${f.bg} shrink-0`}>
                                        <Icon className={`w-5 h-5 ${f.color}`} strokeWidth={2} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-3">
                                            <div>
                                                <h3 className="text-base font-semibold text-slate-900">{f.name}</h3>
                                                <p className="text-sm text-slate-500 mt-1 leading-relaxed">{f.desc}</p>
                                            </div>
                                            <button
                                                type="button"
                                                className={`shrink-0 transition-colors ${f.enabled ? 'text-emerald-600' : 'text-slate-300'}`}
                                                aria-label={f.enabled ? 'Disable' : 'Enable'}
                                            >
                                                {f.enabled ? (
                                                    <ToggleRight className="w-8 h-8" strokeWidth={1.5} />
                                                ) : (
                                                    <ToggleLeft className="w-8 h-8" strokeWidth={1.5} />
                                                )}
                                            </button>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-3 mt-4 pt-4 border-t border-slate-100">
                                            <Badge variant="outline" className={f.enabled ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-50 text-slate-600 border-slate-200'}>
                                                {f.enabled ? 'Enabled' : 'Disabled'}
                                            </Badge>
                                            <span className="text-xs text-slate-500">{f.audience}</span>
                                            {f.enabled && f.rollout > 0 && (
                                                <span className="text-xs font-medium text-slate-600 ml-auto">
                                                    {f.rollout}% rollout
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>
        </div>
    )
}