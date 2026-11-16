export default function AdminUsersSection({
    users,
    loading,
    error,
    processingUserId,
    onUpdateRole,
    onRequestDelete,
}) {
    return (
        <section className="admin-users-section">
            <h1>Gestion des utilisateurs</h1>
            <p>Consulte les comptes et gère leurs rôles.</p>

            {error && <p role="alert" className="admin-error">{error}</p>}
            {loading && <p>Chargement des utilisateurs…</p>}

            {!loading && !error && users.length === 0 && (
                <p>Aucun utilisateur trouvé.</p>
            )}

            <div className="admin-users">
                {users.map((user) => (
                    <article className="admin-user" key={user.id_user}>
                        <div>
                            <h2>{user.name_user}</h2>
                            <p>{user.email_user}</p>

                            <span
                                className={`admin-user__role admin-user__role--${user.role_user}`}
                            >
                                {user.role_user === 'admin'
                                    ? 'Administrateur'
                                    : 'Membre'}
                            </span>
                        </div>

                        <div className="admin-user__actions">
                            <button
                                type="button"
                                disabled={processingUserId === user.id_user}
                                onClick={() =>
                                    onUpdateRole(
                                        user,
                                        user.role_user === 'member'
                                            ? 'admin'
                                            : 'member'
                                    )
                                }
                            >
                                {user.role_user === 'member'
                                    ? 'Promouvoir admin'
                                    : 'Rétrograder'}
                            </button>

                            <button
                                type="button"
                                className="admin-user__delete"
                                disabled={processingUserId === user.id_user}
                                onClick={() => onRequestDelete(user)}
                            >
                                Supprimer
                            </button>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    )
}