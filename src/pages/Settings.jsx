import { Building2, Clock, MapPin } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '#/components/ui/card'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { Label } from '#/components/ui/label'
import { Separator } from '#/components/ui/separator'

export default function Settings() {
    return (
        <div className="space-y-6 max-w-3xl mx-auto">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                    Settings
                </h1>
                <p className="text-sm text-slate-500 mt-1">
                    Manage company preferences and configurations
                </p>
            </div>

            {/* Company Info */}
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-indigo-50">
                            <Building2 className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div>
                            <CardTitle className="text-base">Company Information</CardTitle>
                            <CardDescription className="text-xs">
                                Basic details about your business
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="company">Company Name</Label>
                            <Input id="company" defaultValue="Demo Company" className="bg-slate-50 border-slate-200" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Contact Phone</Label>
                            <Input id="phone" defaultValue="+91 98765 43210" className="bg-slate-50 border-slate-200" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Contact Email</Label>
                        <Input id="email" defaultValue="admin@demo.com" className="bg-slate-50 border-slate-200" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input id="address" defaultValue="Mumbai, Maharashtra" className="bg-slate-50 border-slate-200" />
                    </div>
                    <Separator />
                    <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700 text-white">
                        Save Changes
                    </Button>
                </CardContent>
            </Card>

            {/* Shift Rules */}
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-emerald-50">
                            <Clock className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div>
                            <CardTitle className="text-base">Shift & Attendance Rules</CardTitle>
                            <CardDescription className="text-xs">
                                Define rules for attendance calculation
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="grace">Grace Period (minutes)</Label>
                            <Input id="grace" type="number" defaultValue="10" className="bg-slate-50 border-slate-200" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="halfday">Half-Day Threshold (hours)</Label>
                            <Input id="halfday" type="number" defaultValue="4" className="bg-slate-50 border-slate-200" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="overtime">Overtime Threshold (hours)</Label>
                            <Input id="overtime" type="number" defaultValue="9" className="bg-slate-50 border-slate-200" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="otrate">Overtime Multiplier</Label>
                            <Input id="otrate" type="number" step="0.1" defaultValue="1.5" className="bg-slate-50 border-slate-200" />
                        </div>
                    </div>
                    <Separator />
                    <Button className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white">
                        Save Rules
                    </Button>
                </CardContent>
            </Card>

            {/* Geofences */}
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-amber-50">
                            <MapPin className="w-5 h-5 text-amber-600" />
                        </div>
                        <div>
                            <CardTitle className="text-base">Geofences & Zones</CardTitle>
                            <CardDescription className="text-xs">
                                Manage work zones for field staff
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="h-40 flex flex-col items-center justify-center rounded-xl bg-amber-50/50 border-2 border-dashed border-amber-200">
                        <MapPin className="w-8 h-8 text-amber-500 mb-2" />
                        <p className="text-sm font-medium text-slate-700">
                            4 zones configured
                        </p>
                        <Button variant="outline" size="sm" className="mt-3 border-amber-300 text-amber-700 hover:bg-amber-50">
                            Manage Zones
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}