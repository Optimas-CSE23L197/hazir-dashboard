import { useState } from 'react'
import {
    Plus, Search, MoreHorizontal, Edit, Trash2, Copy,
    Check, X, Users, TrendingUp, Star, Crown, Zap, Building2,
    DollarSign, Percent, ArrowUpRight, Save, Eye,
} from 'lucide-react'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { Label } from '#/components/ui/label'
import { Badge } from '#/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '#/components/ui/card'
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '#/components/ui/table'
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem,
    DropdownMenuSeparator, DropdownMenuTrigger,
} from '#/components/ui/dropdown-menu'
import {
    Dialog, DialogContent, DialogDescription, DialogFooter,
    DialogHeader, DialogTitle, DialogTrigger,
} from '#/components/ui/dialog'

const plans = [
    {
        id: 'free',
        name: 'Free',
        description: 'For small teams getting started',
        price: 0,
        yearlyPrice: 0,
        interval: 'month',
        maxEmployees: 5,
        subscribers: 68,
        mrr: 0,
        color: 'slate',
        icon: Star,
        bg: 'bg-slate-50',
        color_text: 'text-slate-600',
        popular: false,
        features: [
            { name: 'Basic attendance', included: true },
            { name: 'Leave management', included: true },
            { name: 'Face recognition AI', included: false },
            { name: 'Route tracking', included: false },
            { name: 'Payroll automation', included: false },
            { name: 'Advanced analytics', included: false },
            { name: 'Priority support', included: false },
        ],
    },
    {
        id: 'starter',
        name: 'Starter',
        description: 'For growing small businesses',
        price: 999,
        yearlyPrice: 9990,
        interval: 'month',
        maxEmployees: 25,
        subscribers: 32,
        mrr: 31968,
        color: 'indigo',
        icon: Zap,
        bg: 'bg-indigo-50',
        color_text: 'text-indigo-600',
        popular: false,
        features: [
            { name: 'Basic attendance', included: true },
            { name: 'Leave management', included: true },
            { name: 'Face recognition AI', included: true },
            { name: 'Route tracking', included: false },
            { name: 'Payroll automation', included: true },
            { name: 'Advanced analytics', included: false },
            { name: 'Priority support', included: false },
        ],
    },
    {
        id: 'pro',
        name: 'Pro',
        description: 'Best for field workforce management',
        price: 2999,
        yearlyPrice: 29990,
        interval: 'month',
        maxEmployees: 100,
        subscribers: 24,
        mrr: 71976,
        color: 'rose',
        icon: Crown,
        bg: 'bg-rose-50',
        color_text: 'text-rose-600',
        popular: true,
        features: [
            { name: 'Basic attendance', included: true },
            { name: 'Leave management', included: true },
            { name: 'Face recognition AI', included: true },
            { name: 'Route tracking', included: true },
            { name: 'Payroll automation', included: true },
            { name: 'Advanced analytics', included: true },
            { name: 'Priority support', included: false },
        ],
    },
    {
        id: 'business',
        name: 'Business',
        description: 'For mid-market companies',
        price: 7999,
        yearlyPrice: 79990,
        interval: 'month',
        maxEmployees: 500,
        subscribers: 12,
        mrr: 95988,
        color: 'purple',
        icon: Building2,
        bg: 'bg-purple-50',
        color_text: 'text-purple-600',
        popular: false,
        features: [
            { name: 'Basic attendance', included: true },
            { name: 'Leave management', included: true },
            { name: 'Face recognition AI', included: true },
            { name: 'Route tracking', included: true },
            { name: 'Payroll automation', included: true },
            { name: 'Advanced analytics', included: true },
            { name: 'Priority support', included: true },
        ],
    },
]

const allFeatures = [
    'Basic attendance',
    'Leave management',
    'Face recognition AI',
    'Route tracking',
    'Payroll automation',
    'Advanced analytics',
    'Priority support',
]

const stats = [
    {
        label: 'Total Subscribers',
        value: '136',
        icon: Users,
        bg: 'bg-indigo-50',
        color: 'text-indigo-600',
        sub: '4 active plans',
    },
    {
        label: 'Total MRR',
        value: '₹1.99L',
        icon: DollarSign,
        bg: 'bg-emerald-50',
        color: 'text-emerald-600',
        sub: '+14.2% MoM',
    },
    {
        label: 'Avg Revenue Per User',
        value: '₹1,467',
        icon: TrendingUp,
        bg: 'bg-rose-50',
        color: 'text-rose-600',
        sub: 'Per company',
    },
    {
        label: 'Most Popular',
        value: 'Free',
        icon: Star,
        bg: 'bg-amber-50',
        color: 'text-amber-600',
        sub: '68 subscribers',
    },
]

const planStyles = {
    free: 'bg-slate-50 text-slate-700 border-slate-200',
    starter: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    pro: 'bg-rose-50 text-rose-700 border-rose-200',
    business: 'bg-purple-50 text-purple-700 border-purple-200',
}

function StatCard({ stat }) {
    const Icon = stat.icon
    return (
        <Card className="hover:-translate-y-0.5 transition-all duration-200">
            <CardContent className="p-5">
                <div className={`p-2.5 rounded-lg ${stat.bg} w-fit`}>
                    <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <p className="text-3xl font-bold text-slate-900 mt-4 tracking-tight">
                    {stat.value}
                </p>
                <p className="text-sm text-slate-500 mt-0.5 font-medium">{stat.label}</p>
                <p className="text-[11px] mt-1.5 text-slate-400 font-medium">{stat.sub}</p>
            </CardContent>
        </Card>
    )
}

export default function AdminPlans() {
    const [billingCycle, setBillingCycle] = useState('monthly')

    return (
        <div className="space-y-6 max-w-[1600px] mx-auto">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                        Plans & Pricing
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Manage subscription plans and their features
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                        <Eye className="w-4 h-4" strokeWidth={2} />
                        Preview pricing page
                    </Button>
                    <Button
                        size="sm"
                        className="gap-2 bg-rose-600 hover:bg-rose-700 text-white shadow-sm"
                    >
                        <Plus className="w-4 h-4" strokeWidth={2} />
                        Create Plan
                    </Button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((s) => (
                    <StatCard key={s.label} stat={s} />
                ))}
            </div>

            {/* Plan Cards */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h2 className="text-base font-semibold text-slate-900">
                            Active Plans
                        </h2>
                        <p className="text-xs text-slate-500 mt-0.5">
                            {plans.length} plans configured
                        </p>
                    </div>
                    <div className="inline-flex items-center gap-1 bg-slate-100 rounded-lg p-1">
                        <button
                            type="button"
                            onClick={() => setBillingCycle('monthly')}
                            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${billingCycle === 'monthly'
                                ? 'bg-white text-slate-900 shadow-sm'
                                : 'text-slate-600 hover:text-slate-900'
                                }`}
                        >
                            Monthly
                        </button>
                        <button
                            type="button"
                            onClick={() => setBillingCycle('yearly')}
                            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 ${billingCycle === 'yearly'
                                ? 'bg-white text-slate-900 shadow-sm'
                                : 'text-slate-600 hover:text-slate-900'
                                }`}
                        >
                            Yearly
                            <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                                -17%
                            </span>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                    {plans.map((plan) => {
                        const Icon = plan.icon
                        const displayPrice = billingCycle === 'yearly'
                            ? plan.yearlyPrice
                            : plan.price

                        return (
                            <Card
                                key={plan.id}
                                className={`relative overflow-hidden transition-all duration-200 hover:-translate-y-0.5 ${plan.popular ? 'ring-2 ring-rose-500 ring-offset-2' : ''
                                    }`}
                            >
                                {plan.popular && (
                                    <div className="absolute top-0 right-0 bg-rose-500 text-white text-[10px] font-semibold px-3 py-1 rounded-bl-lg tracking-wide uppercase">
                                        Most Popular
                                    </div>
                                )}

                                <CardContent className="p-5">
                                    {/* Icon + Menu */}
                                    <div className="flex items-start justify-between">
                                        <div className={`p-2.5 rounded-lg ${plan.bg}`}>
                                            <Icon className={`w-5 h-5 ${plan.color_text}`} strokeWidth={2} />
                                        </div>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2 -mt-1">
                                                    <MoreHorizontal className="w-4 h-4" strokeWidth={2} />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-48">
                                                <DropdownMenuItem className="gap-2 cursor-pointer">
                                                    <Edit className="w-4 h-4 text-slate-400" strokeWidth={2} />
                                                    Edit plan
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="gap-2 cursor-pointer">
                                                    <Copy className="w-4 h-4 text-slate-400" strokeWidth={2} />
                                                    Duplicate
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="gap-2 cursor-pointer">
                                                    <Eye className="w-4 h-4 text-slate-400" strokeWidth={2} />
                                                    View subscribers
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem className="gap-2 text-rose-600 focus:text-rose-600 cursor-pointer">
                                                    <Trash2 className="w-4 h-4" strokeWidth={2} />
                                                    Delete plan
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>

                                    {/* Name + Desc */}
                                    <div className="mt-4">
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-base font-semibold text-slate-900">
                                                {plan.name}
                                            </h3>
                                        </div>
                                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                                            {plan.description}
                                        </p>
                                    </div>

                                    {/* Price */}
                                    <div className="mt-5 pb-5 border-b border-slate-100">
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-3xl font-bold text-slate-900 tracking-tight">
                                                ₹{displayPrice.toLocaleString('en-IN')}
                                            </span>
                                            <span className="text-xs text-slate-500 font-medium">
                                                /{billingCycle === 'yearly' ? 'year' : 'month'}
                                            </span>
                                        </div>
                                        <p className="text-[11px] text-slate-400 mt-1">
                                            Up to {plan.maxEmployees} employees
                                        </p>
                                    </div>

                                    {/* Features */}
                                    <div className="mt-4 space-y-2">
                                        {allFeatures.slice(0, 5).map((featureName) => {
                                            const feature = plan.features.find(
                                                (f) => f.name === featureName
                                            )
                                            return (
                                                <div
                                                    key={featureName}
                                                    className="flex items-center gap-2 text-xs"
                                                >
                                                    {feature?.included ? (
                                                        <div className="p-0.5 rounded-full bg-emerald-50 shrink-0">
                                                            <Check className="w-3 h-3 text-emerald-600" strokeWidth={3} />
                                                        </div>
                                                    ) : (
                                                        <div className="p-0.5 rounded-full bg-slate-100 shrink-0">
                                                            <X className="w-3 h-3 text-slate-400" strokeWidth={3} />
                                                        </div>
                                                    )}
                                                    <span
                                                        className={
                                                            feature?.included
                                                                ? 'text-slate-700'
                                                                : 'text-slate-400 line-through'
                                                        }
                                                    >
                                                        {featureName}
                                                    </span>
                                                </div>
                                            )
                                        })}
                                    </div>

                                    {/* Footer Stats */}
                                    <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                                        <div>
                                            <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                                                Subscribers
                                            </p>
                                            <p className="text-sm font-semibold text-slate-900 mt-0.5">
                                                {plan.subscribers}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                                                MRR
                                            </p>
                                            <p className="text-sm font-semibold text-emerald-600 mt-0.5">
                                                ₹{(plan.mrr / 1000).toFixed(1)}K
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>
            </div>

            {/* Feature Comparison Matrix */}
            <Card className="overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <div>
                        <CardTitle className="text-base font-semibold">
                            Feature Comparison
                        </CardTitle>
                        <p className="text-xs text-slate-500 mt-0.5">
                            What's included in each plan
                        </p>
                    </div>
                    <Button variant="outline" size="sm" className="gap-2">
                        <Save className="w-4 h-4" strokeWidth={2} />
                        Save Changes
                    </Button>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-y border-slate-100 bg-slate-50">
                                    <th className="text-left px-6 py-3 text-[11px] font-semibold text-slate-600 uppercase tracking-wider">
                                        Feature
                                    </th>
                                    {plans.map((plan) => (
                                        <th
                                            key={plan.id}
                                            className="text-center px-6 py-3 text-[11px] font-semibold text-slate-600 uppercase tracking-wider"
                                        >
                                            {plan.name}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {allFeatures.map((featureName, i) => (
                                    <tr
                                        key={featureName}
                                        className={`border-b border-slate-50 hover:bg-slate-50/70 transition-colors ${i === allFeatures.length - 1 ? 'border-b-0' : ''
                                            }`}
                                    >
                                        <td className="px-6 py-3 text-sm font-medium text-slate-700">
                                            {featureName}
                                        </td>
                                        {plans.map((plan) => {
                                            const feature = plan.features.find(
                                                (f) => f.name === featureName
                                            )
                                            return (
                                                <td
                                                    key={plan.id}
                                                    className="px-6 py-3 text-center"
                                                >
                                                    {feature?.included ? (
                                                        <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-50">
                                                            <Check className="w-3.5 h-3.5 text-emerald-600" strokeWidth={3} />
                                                        </div>
                                                    ) : (
                                                        <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-100">
                                                            <X className="w-3.5 h-3.5 text-slate-400" strokeWidth={3} />
                                                        </div>
                                                    )}
                                                </td>
                                            )
                                        })}
                                    </tr>
                                ))}
                                {/* Price row */}
                                <tr className="bg-slate-50/70 border-t border-slate-100">
                                    <td className="px-6 py-4 text-sm font-semibold text-slate-900">
                                        Monthly Price
                                    </td>
                                    {plans.map((plan) => (
                                        <td
                                            key={plan.id}
                                            className="px-6 py-4 text-center"
                                        >
                                            <span className="text-base font-bold text-slate-900">
                                                ₹{plan.price.toLocaleString('en-IN')}
                                            </span>
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            {/* Add-on Pricing */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <div>
                        <CardTitle className="text-base font-semibold">
                            Add-on Pricing
                        </CardTitle>
                        <p className="text-xs text-slate-500 mt-0.5">
                            Extra features that tenants can purchase
                        </p>
                    </div>
                    <Button variant="outline" size="sm" className="gap-2">
                        <Plus className="w-4 h-4" strokeWidth={2} />
                        Add Add-on
                    </Button>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {[
                            { name: 'Extra Zone', price: 199, unit: 'per zone / month' },
                            { name: 'Extra Admin User', price: 299, unit: 'per user / month' },
                            { name: 'SMS Notifications', price: 0.20, unit: 'per SMS' },
                            { name: 'WhatsApp Alerts', price: 0.50, unit: 'per message' },
                            { name: 'API Access', price: 1999, unit: 'per month' },
                            { name: 'White-label', price: 4999, unit: 'per month' },
                        ].map((addon) => (
                            <div
                                key={addon.name}
                                className="flex items-center justify-between gap-3 p-3 rounded-lg border border-slate-100 hover:border-slate-200 transition-colors"
                            >
                                <div className="min-w-0">
                                    <p className="text-sm font-medium text-slate-900 truncate">
                                        {addon.name}
                                    </p>
                                    <p className="text-[11px] text-slate-500 mt-0.5">
                                        {addon.unit}
                                    </p>
                                </div>
                                <div className="text-right shrink-0">
                                    <p className="text-base font-bold text-slate-900">
                                        ₹{addon.price}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}