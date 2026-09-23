import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

export default function DashboardLayout() {
    return (
        <div className="flex h-screen bg-slate-100">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden min-w-0">
                <Topbar />
                <main
                    className="flex-1 overflow-y-auto bg-slate-100"
                    style={{
                        backgroundImage:
                            'radial-gradient(circle, #CBD5E1 1px, transparent 1px)',
                        backgroundSize: '24px 24px',
                    }}
                >
                    <div className="content-max page-padding">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    )
}