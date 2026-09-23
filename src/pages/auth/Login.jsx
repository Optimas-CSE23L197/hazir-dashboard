import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    MapPin, Mail, Lock, Eye, EyeOff, Loader2,
    Users, MapPinned, Wallet, Sparkles,
} from 'lucide-react'
import { toast } from 'sonner'
import { useAuthStore } from '#/stores/authStore'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { Label } from '#/components/ui/label'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const emailRef = useRef(null)
    const login = useAuthStore((s) => s.login)
    const navigate = useNavigate()

    const currentYear = new Date().getFullYear()

    useEffect(() => {
        emailRef.current?.focus()
    }, [])

    const validate = () => {
        if (!email || !password) {
            toast.error('Please enter both email and password')
            return false
        }
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            toast.error('Please enter a valid email address')
            return false
        }
        if (password.length < 6) {
            toast.error('Password must be at least 6 characters')
            return false
        }
        return true
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validate()) return

        setIsLoading(true)
        try {
            await new Promise((resolve) => setTimeout(resolve, 800))
            login(
                { id: '1', name: 'Priya Sharma', email, role: 'ADMIN' },
                'mock-jwt-token',
                { id: 'tenant-1', name: 'Demo Company' }
            )
            toast.success('Welcome back, Priya!')
            navigate('/overview')
        } catch {
            toast.error('Login failed. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    const fillDemo = () => {
        setEmail('admin@demo.com')
        setPassword('demo1234')
    }

    const features = [
        { icon: Users, text: 'Face-based attendance for field staff' },
        { icon: MapPinned, text: 'Live GPS tracking & route history' },
        { icon: Wallet, text: 'Automatic payroll calculation' },
    ]

    return (
        <div className="min-h-screen flex bg-[#FAFAFA]">
            {/* Left Branding (hidden on mobile) */}
            <div className="hidden lg:flex lg:w-1/2 bg-slate-900 flex-col justify-between p-12">
                {/* Logo */}
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-indigo-600">
                        <MapPin className="w-5 h-5 text-white" strokeWidth={2} />
                    </div>
                    <span className="text-xl font-semibold tracking-tight text-white">
                        Hazir
                    </span>
                </div>

                {/* Hero */}
                <div className="space-y-6 max-w-md">
                    <h1 className="text-3xl font-semibold leading-tight tracking-tight text-white">
                        Field workforce management, simplified.
                    </h1>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        Track attendance, monitor field staff, and run payroll all in one place.
                        Built for Indian businesses.
                    </p>
                    <div className="space-y-3 pt-2">
                        {features.map((f) => (
                            <div key={f.text} className="flex items-center gap-3">
                                <div className="p-1.5 rounded-md bg-slate-800">
                                    <f.icon className="w-4 h-4 text-indigo-400" strokeWidth={2} />
                                </div>
                                <span className="text-sm text-slate-300">{f.text}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span>© {currentYear} Hazir</span>
                    <span>·</span>
                    <span>Made in India</span>
                </div>
            </div>

            {/* Right Form */}
            <div className="flex-1 flex items-center justify-center p-6">
                <div className="w-full max-w-md">
                    {/* Mobile logo */}
                    <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
                        <div className="p-2 rounded-lg bg-indigo-600">
                            <MapPin className="w-5 h-5 text-white" strokeWidth={2} />
                        </div>
                        <span className="text-xl font-semibold text-slate-900">Hazir</span>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-3xl font-semibold text-slate-900 tracking-tight">
                            Welcome back
                        </h2>
                        <p className="text-sm text-slate-500 mt-2">
                            Sign in to access your dashboard
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-slate-700 font-medium text-sm">
                                Email address
                            </Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" strokeWidth={2} />
                                <Input
                                    id="email"
                                    ref={emailRef}
                                    type="email"
                                    placeholder="admin@company.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-10 h-10 bg-white border-slate-200 focus-visible:ring-2 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500"
                                    autoComplete="email"
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password" className="text-slate-700 font-medium text-sm">
                                    Password
                                </Label>
                                <button
                                    type="button"
                                    className="text-xs text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
                                    onClick={() => toast.info('Password reset coming soon')}
                                >
                                    Forgot password?
                                </button>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" strokeWidth={2} />
                                <Input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-10 pr-10 h-10 bg-white border-slate-200 focus-visible:ring-2 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500"
                                    autoComplete="current-password"
                                    disabled={isLoading}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                >
                                    {showPassword
                                        ? <EyeOff className="w-4 h-4" strokeWidth={2} />
                                        : <Eye className="w-4 h-4" strokeWidth={2} />}
                                </button>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-10 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow-sm transition-colors"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 w-4 h-4 animate-spin" strokeWidth={2} />
                                    Signing in...
                                </>
                            ) : (
                                'Sign in'
                            )}
                        </Button>
                    </form>

                    {/* Demo hint */}
                    <div className="mt-6 p-4 rounded-xl status-info">
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <p className="text-xs font-medium flex items-center gap-1.5">
                                    <Sparkles className="w-3.5 h-3.5" />
                                    Demo mode
                                </p>
                                <p className="text-xs opacity-80 mt-1">
                                    Enter any email and password (6+ chars) to explore the dashboard.
                                </p>
                            </div>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={fillDemo}
                                className="shrink-0 h-7 text-[11px] bg-white/60 border-indigo-200 text-indigo-700 hover:bg-white"
                            >
                                Fill demo
                            </Button>
                        </div>
                    </div>

                    <p className="text-center text-xs text-slate-400 mt-8">
                        Don't have an account?{' '}
                        <button
                            type="button"
                            className="text-indigo-600 font-medium hover:underline transition-colors"
                            onClick={() => toast.info('Contact sales to get started')}
                        >
                            Contact sales
                        </button>
                    </p>
                </div>
            </div>
        </div>
    )
}