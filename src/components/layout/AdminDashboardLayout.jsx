import { Outlet } from 'react-router-dom'
import AdminSidebar from './AdminSidebar'
import AdminTopbar from './AdminTopbar'

export default function AdminDashboardLayout() {
    return (
        <div className="flex h-screen bg-slate-100">
            <AdminSidebar />
            <div className="flex-1 flex flex-col overflow-hidden min-w-0">
                <AdminTopbar />
                <main
                    className="flex-1 overflow-y-auto bg-slate-50"
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