import { useState } from 'react'
import {
    Plus, Megaphone, Search, MoreHorizontal, Edit, Trash2,
    Send, Users, Pin
} from 'lucide-react'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { Card, CardContent } from '#/components/ui/card'
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem,
    DropdownMenuSeparator, DropdownMenuTrigger,
} from '#/components/ui/dropdown-menu'

const announcements = [
    { id: 1, title: 'Scheduled maintenance on 30 Sep', body: 'Platform will be under maintenance from 2-4 AM. Please plan accordingly.', audience: 'All Companies', author: 'Super Admin', date: '1 hour ago', pinned: true, bg: 'bg-amber-50', color: 'text-amber-600' },
    { id: 2, title: 'New feature: WhatsApp alerts', body: 'WhatsApp notifications are now available. Enable from company settings.', audience: 'All Companies', author: 'Super Admin', date: '1 day ago', pinned: false, bg: 'bg-emerald-50', color: 'text-emerald-600' },
    { id: 3, title: 'Pricing update for Business plan', body: 'Business plan pricing will be updated on 1 October. Existing customers are unaffected.', audience: 'Business Plan Users', author: 'Super Admin', date: '3 days ago', pinned: false, bg: 'bg-rose-50', color: 'text-rose-600' },
]

export default function AdminAnnouncements() {
    const [search, setSearch] = useState('')

    const filtered = announcements.filter((a) =>
        a.title.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="space-y-6 max-w-[1600px] mx-auto">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                        Announcements
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Broadcast messages to all companies
                    </p>
                </div>
                <Button size="sm" className="gap-2 bg-rose-600 hover:bg-rose-700 text-white">
                    <Plus className="w-4 h-4" strokeWidth={2} />
                    New Announcement
                </Button>
            </div>

            <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" strokeWidth={2} />
                <Input
                    placeholder="Search announcements..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10 h-9 bg-slate-50 border-slate-200"
                />
            </div>

            <div className="space-y-3">
                {filtered.map((a) => (
                    <Card key={a.id} className="hover:border-slate-300 transition-colors">
                        <CardContent className="p-5">
                            <div className="flex items-start gap-4">
                                <div className={`p-2.5 rounded-lg ${a.bg} shrink-0`}>
                                    <Megaphone className={`w-5 h-5 ${a.color}`} strokeWidth={2} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-base font-semibold text-slate-900">{a.title}</h3>
                                            {a.pinned && <Pin className="w-3.5 h-3.5 text-amber-500 fill-amber-500" strokeWidth={2} />}
                                        </div>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                                                    <MoreHorizontal className="w-4 h-4" strokeWidth={2} />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-44">
                                                <DropdownMenuItem className="gap-2 cursor-pointer">
                                                    <Edit className="w-4 h-4 text-slate-400" strokeWidth={2} />
                                                    Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="gap-2 cursor-pointer">
                                                    <Pin className="w-4 h-4 text-slate-400" strokeWidth={2} />
                                                    {a.pinned ? 'Unpin' : 'Pin'}
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem className="gap-2 text-rose-600 focus:text-rose-600 cursor-pointer">
                                                    <Trash2 className="w-4 h-4" strokeWidth={2} />
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                    <p className="text-sm text-slate-600 mt-2 leading-relaxed">{a.body}</p>
                                    <div className="flex flex-wrap items-center gap-4 mt-4 pt-4 border-t border-slate-100">
                                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                                            <Users className="w-3.5 h-3.5" strokeWidth={2} />
                                            {a.audience}
                                        </div>
                                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                                            <Send className="w-3.5 h-3.5" strokeWidth={2} />
                                            {a.author}
                                        </div>
                                        <span className="text-xs text-slate-400 ml-auto">{a.date}</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}