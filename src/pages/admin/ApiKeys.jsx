import { useState } from 'react'
import {
    Plus, Key, Copy, Trash2, Eye, EyeOff, AlertTriangle,
    Check, Activity,
} from 'lucide-react'
import { Button } from '#/components/ui/button'
import { Card, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'

const apiKeys = [
    { id: 1, name: 'Production Key', key: 'sk_live_5f8a9c2b...7d3e', created: '15 Mar 2026', lastUsed: '2 min ago', status: 'Active', requests: '1.2M' },
    { id: 2, name: 'Staging Key', key: 'sk_test_2b4c6d8e...1a9f', created: '10 Apr 2026', lastUsed: '2 days ago', status: 'Active', requests: '24K' },
    { id: 3, name: 'Development Key', key: 'sk_test_9e1f3a5c...2b7d', created: '01 May 2026', lastUsed: '1 week ago', status: 'Active', requests: '8K' },
    { id: 4, name: 'Old Integration', key: 'sk_live_7c3e1b5a...9f2d', created: '01 Jan 2026', lastUsed: '30 days ago', status: 'Revoked', requests: '—' },
]

export default function ApiKeys() {
    const [revealed, setRevealed] = useState({})

    const toggleReveal = (id) => {
        setRevealed((prev) => ({ ...prev, [id]: !prev[id] }))
    }

    return (
        <div className="space-y-6 max-w-[1600px] mx-auto">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                        API Keys
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Manage API keys for platform integrations
                    </p>
                </div>
                <Button size="sm" className="gap-2 bg-rose-600 hover:bg-rose-700 text-white">
                    <Plus className="w-4 h-4" strokeWidth={2} />
                    Create Key
                </Button>
            </div>

            <div className="p-4 rounded-xl bg-amber-50 border border-amber-100 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" strokeWidth={2} />
                <div>
                    <p className="text-sm font-semibold text-amber-900">
                        Keep your API keys secure
                    </p>
                    <p className="text-xs text-amber-700 mt-1">
                        Never share your API keys publicly. Rotate them regularly and revoke unused keys.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                    { label: 'Total Keys', value: '4', icon: Key, bg: 'bg-indigo-50', color: 'text-indigo-600' },
                    { label: 'Active', value: '3', icon: Check, bg: 'bg-emerald-50', color: 'text-emerald-600' },
                    { label: 'Requests (30d)', value: '1.23M', icon: Activity, bg: 'bg-amber-50', color: 'text-amber-600' },
                ].map((s) => {
                    const Icon = s.icon
                    return (
                        <Card key={s.label}>
                            <CardContent className="p-5">
                                <div className={`p-2.5 rounded-lg ${s.bg} w-fit`}>
                                    <Icon className={`w-5 h-5 ${s.color}`} />
                                </div>
                                <p className="text-3xl font-bold text-slate-900 mt-4 tracking-tight">{s.value}</p>
                                <p className="text-xs text-slate-500 mt-0.5 font-medium">{s.label}</p>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>

            <Card className="overflow-hidden">
                <div className="divide-y divide-slate-100">
                    {apiKeys.map((k) => (
                        <div key={k.id} className="p-5 hover:bg-slate-50/70 transition-colors">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-sm font-semibold text-slate-900">{k.name}</h3>
                                        <Badge variant="outline" className={k.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-slate-50 text-slate-600 border-slate-200'}>
                                            {k.status}
                                        </Badge>
                                    </div>
                                    <div className="flex items-center gap-2 mt-2">
                                        <code className="text-xs font-mono text-slate-600 bg-slate-50 px-2 py-1 rounded border border-slate-200">
                                            {revealed[k.id] ? k.key : k.key.replace(/[a-zA-Z0-9]/g, '•')}
                                        </code>
                                        <button
                                            type="button"
                                            onClick={() => toggleReveal(k.id)}
                                            className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                                            aria-label="Toggle reveal"
                                        >
                                            {revealed[k.id] ? (
                                                <EyeOff className="w-3.5 h-3.5" strokeWidth={2} />
                                            ) : (
                                                <Eye className="w-3.5 h-3.5" strokeWidth={2} />
                                            )}
                                        </button>
                                        <button
                                            type="button"
                                            className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                                            aria-label="Copy key"
                                        >
                                            <Copy className="w-3.5 h-3.5" strokeWidth={2} />
                                        </button>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-slate-500">
                                        <span>Created {k.created}</span>
                                        <span>·</span>
                                        <span>Last used {k.lastUsed}</span>
                                        <span>·</span>
                                        <span>{k.requests} requests</span>
                                    </div>
                                </div>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-rose-600 hover:text-rose-700 hover:bg-rose-50 shrink-0">
                                    <Trash2 className="w-4 h-4" strokeWidth={2} />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    )
}