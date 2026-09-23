import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check, Loader2, AlertCircle } from 'lucide-react'

const PLAN_OPTIONS = [
    { id: 'starter', label: 'Starter', note: 'Up to 10 employees · ₹999/mo' },
    { id: 'growth', label: 'Growth', note: 'Up to 30 employees · ₹2,499/mo' },
    { id: 'pro', label: 'Pro', note: 'Up to 100 employees · ₹5,999/mo' },
    { id: 'business', label: 'Business', note: 'Up to 500 employees · ₹12,999/mo' },
    { id: 'enterprise', label: 'Enterprise', note: 'Unlimited · custom pricing' },
]

const TEAM_SIZES = ['1–10', '11–30', '31–100', '101–500', '500+']

const INTENTS = {
    trial: {
        title: 'Start your 14-day free trial',
        sub: 'Fill in your company details and we will set up your workspace. No credit card required.',
        cta: 'Start free trial',
        success: {
            h: 'We received your workspace request.',
            p: 'We will email you the login details within 1 working day.',
        },
    },
    demo: {
        title: 'Book a 20-minute demo',
        sub: 'Our team will show you how Hazir fits into your workflow.',
        cta: 'Book demo',
        success: {
            h: 'We received your demo request.',
            p: 'We will confirm a time with you shortly by email or phone.',
        },
    },
    sales: {
        title: 'Talk to sales',
        sub: 'Large team or a custom requirement? Let us know — we reply the same day.',
        cta: 'Send request',
        success: {
            h: 'We received your message.',
            p: 'Our sales team will reach out to you the same working day.',
        },
    },
}

const sideNotes = [
    'Live tracking and payroll all in one place',
    '14 days free, no credit card required',
    'Set up in a day, no training needed',
]

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phoneRe = /^[6-9]\d{9}$/

const inputCls = (err) =>
    `w-full h-11 rounded-[10px] bg-white border px-3.5 text-[15px] text-[var(--ink)] placeholder:text-[#9AA59F] outline-none transition-colors focus:border-[var(--ink)] focus:ring-2 focus:ring-[var(--green)]/25 ${err ? 'border-[var(--red)]' : 'border-[var(--line)]'
    }`

function Field({ label, error, hint, children, htmlFor }) {
    return (
        <div>
            <label htmlFor={htmlFor} className="block text-[13px] font-semibold mb-1.5">
                {label}
            </label>
            {children}
            {error ? (
                <p className="flex items-center gap-1.5 text-[12.5px] text-[var(--red)] mt-1.5" role="alert">
                    <AlertCircle className="w-3.5 h-3.5" /> {error}
                </p>
            ) : hint ? (
                <p className="text-[12.5px] text-[var(--ink-3)] mt-1.5">{hint}</p>
            ) : null}
        </div>
    )
}

export default function GetStarted() {
    const [params] = useSearchParams()
    const intentKey = INTENTS[params.get('intent')] ? params.get('intent') : 'trial'
    const intent = INTENTS[intentKey]
    const planFromUrl = PLAN_OPTIONS.some((p) => p.id === params.get('plan')) ? params.get('plan') : ''

    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        role: '',
        teamSize: '',
        plan: planFromUrl || (intentKey === 'sales' ? 'enterprise' : ''),
        message: '',
    })
    const [errors, setErrors] = useState({})
    const [status, setStatus] = useState('idle') // idle | sending | done | failed

    const set = (k) => (e) => {
        setForm((f) => ({ ...f, [k]: e.target.value }))
        if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }))
    }

    const validate = () => {
        const e = {}
        if (!form.name.trim()) e.name = 'Please enter your name.'
        if (!emailRe.test(form.email)) e.email = 'Please enter a valid work email.'
        if (!phoneRe.test(form.phone.replace(/\s/g, ''))) e.phone = 'Please enter a 10-digit mobile number.'
        if (!form.company.trim()) e.company = 'Please enter your company name.'
        if (!form.teamSize) e.teamSize = 'Please select your team size.'
        return e
    }

    const onSubmit = async (ev) => {
        ev.preventDefault()
        const e = validate()
        setErrors(e)
        if (Object.keys(e).length) {
            const first = Object.keys(e)[0]
            document.getElementById(`f-${first}`)?.focus()
            return
        }

        setStatus('sending')
        try {
            // TODO: replace with your real endpoint
            // const res = await fetch(`${import.meta.env.VITE_API_URL}/leads`, {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify({ ...form, intent: intentKey }),
            // })
            // if (!res.ok) throw new Error('Request failed')
            await new Promise((r) => setTimeout(r, 900))
            setStatus('done')
        } catch {
            setStatus('failed')
        }
    }

    const selectedPlan = useMemo(() => PLAN_OPTIONS.find((p) => p.id === form.plan), [form.plan])

    return (
        <div
            className="min-h-screen"
            style={{
                '--ink': '#0E1B16',
                '--ink-2': '#33423B',
                '--ink-3': '#66746D',
                '--paper': '#F7F6F2',
                '--line': '#E3E1DA',
                '--green': '#0E9F6E',
                '--green-deep': '#0A6B4A',
                '--green-soft': '#E3F4EC',
                '--red': '#E5484D',
                background: 'var(--paper)',
                color: 'var(--ink)',
                fontFamily: "'Inter', system-ui, sans-serif",
            }}
        >
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700;12..96,800&family=Inter:wght@400;500;600&display=swap');
            .gs-display{font-family:'Bricolage Grotesque','Inter',sans-serif;letter-spacing:-0.025em}`}</style>

            <header className="border-b border-[var(--line)]">
                <div className="max-w-[1180px] mx-auto px-5 h-16 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2.5" aria-label="Hazir home">
                        <span className="grid place-items-center w-8 h-8 rounded-[10px] bg-[var(--ink)]">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                <path d="M4 9.5l3.2 3.2L14 5.5" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                        <span className="gs-display text-[22px] font-bold">hazir</span>
                    </Link>
                    <Link to="/" className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[var(--ink-2)] hover:text-[var(--ink)]">
                        <ArrowLeft className="w-4 h-4" /> Back to site
                    </Link>
                </div>
            </header>

            <main className="max-w-[1180px] mx-auto px-5 py-12 lg:py-20 grid lg:grid-cols-[1fr_1.15fr] gap-12 lg:gap-20">
                {/* left */}
                <aside className="lg:sticky lg:top-12 self-start">
                    <h1 className="gs-display text-[36px] sm:text-[48px] leading-[1.05] font-extrabold">{intent.title}</h1>
                    <p className="mt-5 text-[17px] leading-[1.65] text-[var(--ink-2)] max-w-[440px]">{intent.sub}</p>

                    <ul className="mt-10 space-y-4">
                        {sideNotes.map((n) => (
                            <li key={n} className="flex items-start gap-3 text-[15px] text-[var(--ink-2)]">
                                <span className="mt-0.5 grid place-items-center w-5 h-5 rounded-full bg-[var(--green-soft)] shrink-0">
                                    <Check className="w-3 h-3 text-[var(--green-deep)]" strokeWidth={3.5} />
                                </span>
                                {n}
                            </li>
                        ))}
                    </ul>

                    <div className="mt-10 flex flex-wrap gap-2" role="tablist" aria-label="Request type">
                        {[
                            { k: 'trial', l: 'Free trial' },
                            { k: 'demo', l: 'Demo' },
                            { k: 'sales', l: 'Sales' },
                        ].map((t) => (
                            <Link
                                key={t.k}
                                to={`/get-started?intent=${t.k}`}
                                role="tab"
                                aria-selected={intentKey === t.k}
                                className={`h-9 px-4 inline-flex items-center rounded-full text-[13px] font-semibold border transition-colors ${intentKey === t.k
                                    ? 'bg-[var(--ink)] text-white border-[var(--ink)]'
                                    : 'bg-white text-[var(--ink-2)] border-[var(--line)] hover:border-[var(--ink)]'
                                    }`}
                            >
                                {t.l}
                            </Link>
                        ))}
                    </div>
                </aside>

                {/* right */}
                <section className="rounded-[20px] bg-white border border-[var(--line)] p-6 sm:p-9">
                    {status === 'done' ? (
                        <div className="py-10 text-center" role="status">
                            <span className="mx-auto grid place-items-center w-14 h-14 rounded-full bg-[var(--green-soft)]">
                                <Check className="w-7 h-7 text-[var(--green-deep)]" strokeWidth={3} />
                            </span>
                            <h2 className="gs-display text-[28px] font-bold mt-6">{intent.success.h}</h2>
                            <p className="mt-3 text-[15.5px] leading-[1.65] text-[var(--ink-2)] max-w-[380px] mx-auto">{intent.success.p}</p>
                            <Link
                                to="/"
                                className="mt-8 inline-flex items-center justify-center gap-2 h-11 px-5 rounded-[10px] bg-[var(--ink)] text-white text-[14px] font-semibold hover:bg-[var(--green-deep)] transition-colors"
                            >
                                Back to home
                            </Link>
                        </div>
                    ) : (
                        <form onSubmit={onSubmit} noValidate className="space-y-5">
                            <div className="grid sm:grid-cols-2 gap-5">
                                <Field label="Full name" error={errors.name} htmlFor="f-name">
                                    <input id="f-name" className={inputCls(errors.name)} value={form.name} onChange={set('name')} placeholder="Rahul Sharma" autoComplete="name" />
                                </Field>
                                <Field label="Work email" error={errors.email} htmlFor="f-email">
                                    <input id="f-email" type="email" className={inputCls(errors.email)} value={form.email} onChange={set('email')} placeholder="rahul@company.com" autoComplete="email" />
                                </Field>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-5">
                                <Field label="Mobile number" error={errors.phone} htmlFor="f-phone">
                                    <input id="f-phone" type="tel" inputMode="numeric" className={inputCls(errors.phone)} value={form.phone} onChange={set('phone')} placeholder="98765 43210" autoComplete="tel-national" />
                                </Field>
                                <Field label="Company name" error={errors.company} htmlFor="f-company">
                                    <input id="f-company" className={inputCls(errors.company)} value={form.company} onChange={set('company')} placeholder="Swift Logistics" autoComplete="organization" />
                                </Field>
                            </div>

                            <Field label="Your role" htmlFor="f-role" hint="Optional">
                                <input id="f-role" className={inputCls()} value={form.role} onChange={set('role')} placeholder="HR Manager, Founder, Ops Head…" autoComplete="organization-title" />
                            </Field>

                            <Field label="Team size" error={errors.teamSize}>
                                <div id="f-teamSize" tabIndex={-1} className="flex flex-wrap gap-2" role="radiogroup" aria-label="Team size">
                                    {TEAM_SIZES.map((s) => (
                                        <button
                                            key={s}
                                            type="button"
                                            role="radio"
                                            aria-checked={form.teamSize === s}
                                            onClick={() => {
                                                setForm((f) => ({ ...f, teamSize: s }))
                                                setErrors((er) => ({ ...er, teamSize: undefined }))
                                            }}
                                            className={`h-10 px-4 rounded-[10px] text-[14px] font-medium border transition-colors ${form.teamSize === s
                                                ? 'bg-[var(--ink)] text-white border-[var(--ink)]'
                                                : 'bg-white text-[var(--ink-2)] border-[var(--line)] hover:border-[var(--ink)]'
                                                }`}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </Field>

                            {intentKey !== 'sales' && (
                                <Field label="Plan you're interested in" htmlFor="f-plan" hint={selectedPlan ? selectedPlan.note : 'You can change this later.'}>
                                    <select
                                        id="f-plan"
                                        className={inputCls() + ' appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2716%27 height=%2716%27 fill=%27none%27 stroke=%27%2366746D%27 stroke-width=%272.5%27%3E%3Cpath d=%27M4 6l4 4 4-4%27/%3E%3C/svg%3E")] bg-no-repeat bg-[right_14px_center] pr-10'}
                                        value={form.plan}
                                        onChange={set('plan')}
                                    >
                                        <option value="">Haven't decided yet</option>
                                        {PLAN_OPTIONS.map((p) => (
                                            <option key={p.id} value={p.id}>{p.label}</option>
                                        ))}
                                    </select>
                                </Field>
                            )}

                            <Field label={intentKey === 'sales' ? 'Your requirement' : 'Anything else you would like to tell us?'} htmlFor="f-message" hint="Optional">
                                <textarea
                                    id="f-message"
                                    rows={4}
                                    className={inputCls() + ' h-auto py-3 resize-y'}
                                    value={form.message}
                                    onChange={set('message')}
                                    placeholder="For example: We have 3 branches, field staff too, and payroll goes into Tally."
                                />
                            </Field>

                            {status === 'failed' && (
                                <p className="flex items-start gap-2 text-[13.5px] text-[var(--red)] bg-[#FDECEC] rounded-[10px] px-3.5 py-3" role="alert">
                                    <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                                    We couldn't send your request. Please check your internet and try again.
                                </p>
                            )}

                            <button
                                type="submit"
                                disabled={status === 'sending'}
                                className="w-full h-12 inline-flex items-center justify-center gap-2 rounded-[10px] bg-[var(--ink)] text-white text-[15px] font-semibold hover:bg-[var(--green-deep)] disabled:opacity-70 disabled:cursor-not-allowed transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--green)]"
                            >
                                {status === 'sending' ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" /> Sending…
                                    </>
                                ) : (
                                    <>
                                        {intent.cta} <ArrowRight className="w-4 h-4" />
                                    </>
                                )}
                            </button>

                            <p className="text-[12.5px] text-[var(--ink-3)] text-center">
                                By submitting, you agree to our Privacy Policy.
                            </p>
                        </form>
                    )}
                </section>
            </main>
        </div>
    )
}