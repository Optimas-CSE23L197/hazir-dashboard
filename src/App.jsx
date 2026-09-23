import { Routes, Route, Navigate } from 'react-router-dom'
import DashboardLayout from '#/components/layout/DashboardLayout'
import AdminDashboardLayout from '#/components/layout/AdminDashboardLayout'
import Landing from '#/pages/Landing'
import GetStarted from './pages/GetStarted'
import Login from '#/pages/auth/Login'
import Overview from '#/pages/Overview'
import Employees from '#/pages/Employees'
import Attendance from '#/pages/Attendance'
import Leave from '#/pages/Leave'
import Payroll from '#/pages/Payroll'
import Reports from '#/pages/Reports'
import Settings from '#/pages/Settings'
import LiveMap from '#/pages/LiveMap'
import Departments from '#/pages/Departments'
import Shifts from '#/pages/Shifts'
import Holidays from '#/pages/Holidays'
import Zones from '#/pages/Zones'
import Announcements from '#/pages/Announcements'
import Analytics from '#/pages/Analytics'
import AuditLog from '#/pages/AuditLog'
import Roles from '#/pages/Roles'
import Billing from '#/pages/Billing'

// Admin pages
import AdminOverview from '#/pages/admin/AdminOverview'
import Companies from '#/pages/admin/Companies'
import AdminUsers from '#/pages/admin/AdminUsers'
import Subscriptions from '#/pages/admin/Subscriptions'
import Invoices from '#/pages/admin/Invoices'
import Plans from '#/pages/admin/Plans'
import SupportTickets from '#/pages/admin/SupportTickets'
import AdminAnnouncements from '#/pages/admin/Announcements'
import FeatureFlags from '#/pages/admin/FeatureFlags'
import AdminAnalytics from '#/pages/admin/AdminAnalytics'
import AuditLogs from '#/pages/admin/AuditLogs'
import ApiKeys from '#/pages/admin/ApiKeys'
import SystemHealth from '#/pages/admin/SystemHealth'
import AdminTeam from '#/pages/admin/AdminTeam'
import AdminRoles from '#/pages/admin/Roles'
import PlatformSettings from '#/pages/admin/PlatformSettings'

// import { useAuthStore } from '#/stores/authStore'

// function ProtectedRoute({ children }) {
//     const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
//     return isAuthenticated ? children : <Navigate to="/login" replace />
// }

// function AdminRoute({ children }) {
//     const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
//     const user = useAuthStore((s) => s.user)
//     if (!isAuthenticated) return <Navigate to="/login" replace />
//     if (user?.role !== 'SUPER_ADMIN') return <Navigate to="/overview" replace />
//     return children
// }

export default function App() {
    // const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
    // const user = useAuthStore((s) => s.user)
    // const isSuperAdmin = user?.role === 'SUPER_ADMIN'

    return (
        <Routes>
            {/* Public */}
            <Route path="/" element={<Landing />} />
            <Route path='/get-started' element={<GetStarted />} />
            <Route path="/login" element={<Login />} />

            {/* ───────── Company Dashboard ───────── */}
            <Route path="/app" element={<DashboardLayout />}>
                <Route index element={<Navigate to="/app/overview" replace />} />

                {/* Main */}
                <Route path="overview" element={<Overview />} />
                <Route path="live-map" element={<LiveMap />} />
                <Route path="employees" element={<Employees />} />
                <Route path="attendance" element={<Attendance />} />
                <Route path="leave" element={<Leave />} />
                <Route path="payroll" element={<Payroll />} />

                {/* Manage */}
                <Route path="departments" element={<Departments />} />
                <Route path="shifts" element={<Shifts />} />
                <Route path="holidays" element={<Holidays />} />
                <Route path="zones" element={<Zones />} />
                <Route path="announcements" element={<Announcements />} />

                {/* Reports */}
                <Route path="analytics" element={<Analytics />} />
                <Route path="reports" element={<Reports />} />
                <Route path="audit" element={<AuditLog />} />

                {/* Settings */}
                <Route path="settings" element={<Settings />} />
                <Route path="roles" element={<Roles />} />
                <Route path="billing" element={<Billing />} />
            </Route>

            {/* ───────── Super Admin ───────── */}
            <Route path="/admin" element={<AdminDashboardLayout />}>
                <Route index element={<AdminOverview />} />
                <Route path="companies" element={<Companies />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="subscriptions" element={<Subscriptions />} />
                <Route path="invoices" element={<Invoices />} />
                <Route path="plans" element={<Plans />} />
                <Route path="tickets" element={<SupportTickets />} />
                <Route path="announcements" element={<AdminAnnouncements />} />
                <Route path="features" element={<FeatureFlags />} />
                <Route path="analytics" element={<AdminAnalytics />} />
                <Route path="audit" element={<AuditLogs />} />
                <Route path="api" element={<ApiKeys />} />
                <Route path="health" element={<SystemHealth />} />
                <Route path="team" element={<AdminTeam />} />
                <Route path="roles" element={<AdminRoles />} />
                <Route path="settings" element={<PlatformSettings />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    )
}