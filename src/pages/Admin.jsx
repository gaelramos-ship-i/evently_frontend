import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AdminEventsSection from '../components/AdminEventsSection'
import AdminUsersSection from '../components/AdminUsersSection'
import ConfirmUserDelete from '../components/ConfirmUserDelete'
import useAdminEvents from '../hooks/useAdminEvents'
import useAdminUsers from '../hooks/useAdminUsers'
import '../styles/admin.scss'

export default function Admin() {
    const adminEvents = useAdminEvents()
    const adminUsers = useAdminUsers()
    const [userToDelete, setUserToDelete] = useState(null)

    const confirmDeleteUser = async () => {
        if (!userToDelete) return

        const deleted = await adminUsers.deleteUser(userToDelete)

        if (deleted) {
            setUserToDelete(null)
        }
    }

    return (
        <>
            <header>
                <div>
                    <a href="/">
                        Event<span>ly</span>
                    </a>
                    <Navbar />
                </div>
            </header>

            <main id="admin-page">
                <AdminEventsSection
                    events={adminEvents.events}
                    loading={adminEvents.loading}
                    error={adminEvents.error}
                    processingId={adminEvents.processingId}
                    onModerate={adminEvents.moderateEvent}
                />

                <AdminUsersSection
                    users={adminUsers.users}
                    loading={adminUsers.loading}
                    error={adminUsers.error}
                    processingUserId={adminUsers.processingUserId}
                    onUpdateRole={adminUsers.updateRole}
                    onRequestDelete={setUserToDelete}
                />

                <ConfirmUserDelete
                    user={userToDelete}
                    loading={
                        adminUsers.processingUserId === userToDelete?.id_user
                    }
                    onCancel={() => setUserToDelete(null)}
                    onConfirm={confirmDeleteUser}
                />
            </main>

            <Footer />
        </>
    )
}