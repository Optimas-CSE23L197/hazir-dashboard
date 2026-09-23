import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

/**
 * Dashboard shell.
 *
 * Design tokens are defined once here on `.hz-app` so every page rendered
 * inside <Outlet /> can use var(--ink), var(--line), var(--green) etc.
 * without redefining them.
 *
 * Optional: pass `plan` (from your tenant/subscription) so the sidebar can
 * show the right upgrade card.
 */
export default function DashboardLayout({ plan }) {
    return (
        <div className="hz-app flex h-screen">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700;12..96,800&family=Inter:wght@400;500;600&display=swap');

        .hz-app {
          --ink: #0E1B16;
          --ink-2: #33423B;
          --ink-3: #66746D;
          --paper: #F7F6F2;
          --card: #FFFFFF;
          --line: #E3E1DA;
          --green: #0E9F6E;
          --green-deep: #0A6B4A;
          --green-soft: #E3F4EC;
          --amber: #F5A524;
          --amber-soft: #FDF1DA;
          --red: #E5484D;
          --red-soft: #FDECEC;
          background: var(--paper);
          color: var(--ink);
          font-family: 'Inter', system-ui, sans-serif;
          -webkit-font-smoothing: antialiased;
        }
        .hz-app .display { font-family: 'Bricolage Grotesque', 'Inter', sans-serif; letter-spacing: -0.025em; }
        .hz-app .tnum { font-variant-numeric: tabular-nums; }

        /* page container: content-max / page-padding kept as real classes
           so existing pages don't break, but now defined here. */
        .hz-app .content-max { width: 100%; max-width: 1280px; margin-inline: auto; }
        .hz-app .page-padding { padding: 20px 16px 48px; }
        @media (min-width: 640px)  { .hz-app .page-padding { padding: 24px 24px 56px; } }
        @media (min-width: 1024px) { .hz-app .page-padding { padding: 32px 36px 64px; } }

        .hz-app main::-webkit-scrollbar { width: 10px; }
        .hz-app main::-webkit-scrollbar-thumb { background: #D8D5CC; border-radius: 9999px; border: 3px solid var(--paper); }
        .hz-app main::-webkit-scrollbar-thumb:hover { background: #C4C0B5; }

        .hz-app :focus-visible { outline: 2px solid var(--green); outline-offset: 2px; }
      `}</style>

            <Sidebar plan={plan} />

            <div className="flex-1 flex flex-col overflow-hidden min-w-0">
                <Topbar />
                <main id="main" className="flex-1 overflow-y-auto" tabIndex={-1}>
                    <div className="content-max page-padding">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    )
}