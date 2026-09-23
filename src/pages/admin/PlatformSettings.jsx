import {
    Globe, Save, Bell,
    Webhook
} from 'lucide-react'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { Label } from '#/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '#/components/ui/card'
import { Separator } from '#/components/ui/separator'

export default function PlatformSettings() {
    return (
        <div className="space-y-6 max-w-3xl mx-auto">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                    Platform Settings
                </h1>
                <p className="text-sm text-slate-500 mt-1">
                    Global configuration for your SaaS platform
                </p>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-rose-50">
                            <Globe className="w-5 h-5 text-rose-600" />
                        </div>
                        <div>
                            <CardTitle className="text-base">Platform Information</CardTitle>
                            <CardDescription className="text-xs">
                                Basic details about your SaaS platform
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="platform-name">Platform Name</Label>
                            <Input id="platform-name" defaultValue="Hazir" className="bg-slate-50 border-slate-200" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="platform-domain">Primary Domain</Label>
                            <Input id="platform-domain" defaultValue="hazir.in" className="bg-slate-50 border-slate-200" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="support-email">Support Email</Label>
                        <Input id="support-email" defaultValue="support@hazir.in" className="bg-slate-50 border-slate-200" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="default-region">Default Region</Label>
                        <Input id="default-region" defaultValue="Mumbai, India (ap-south-1)" className="bg-slate-50 border-slate-200" />
                    </div>
                    <Separator />
                    <Button className="gap-2 bg-rose-600 hover:bg-rose-700 text-white">
                        <Save className="w-4 h-4" strokeWidth={2} />
                        Save Changes
                    </Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-indigo-50">
                            <Bell className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div>
                            <CardTitle className="text-base">Notifications</CardTitle>
                            <CardDescription className="text-xs">
                                Configure platform-wide notification behavior
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="trial-days">Trial Period (days)</Label>
                            <Input id="trial-days" type="number" defaultValue="14" className="bg-slate-50 border-slate-200" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="grace-days">Grace Period (days)</Label>
                            <Input id="grace-days" type="number" defaultValue="7" className="bg-slate-50 border-slate-200" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="from-email">From Email Address</Label>
                        <Input id="from-email" defaultValue="hello@hazir.in" className="bg-slate-50 border-slate-200" />
                    </div>
                    <Separator />
                    <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700 text-white">
                        <Save className="w-4 h-4" strokeWidth={2} />
                        Save Preferences
                    </Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-amber-50">
                            <Webhook className="w-5 h-5 text-amber-600" />
                        </div>
                        <div>
                            <CardTitle className="text-base">Webhooks & Integrations</CardTitle>
                            <CardDescription className="text-xs">
                                External services for events and payments
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="razorpay-key">Razorpay Key ID</Label>
                        <Input id="razorpay-key" defaultValue="rzp_live_••••••••••••" className="bg-slate-50 border-slate-200 font-mono text-sm" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="webhook-url">Webhook URL</Label>
                        <Input id="webhook-url" defaultValue="https://api.hazir.in/webhooks/events" className="bg-slate-50 border-slate-200 font-mono text-sm" />
                    </div>
                    <Separator />
                    <Button className="gap-2 bg-amber-600 hover:bg-amber-700 text-white">
                        <Save className="w-4 h-4" strokeWidth={2} />
                        Save Integrations
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}