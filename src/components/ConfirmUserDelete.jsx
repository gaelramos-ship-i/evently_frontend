export default function ConfirmUserDelete({
    user,
    loading,
    onCancel,
    onConfirm,
}) {
    if (!user) return null

    return (
        <div className="modal-overlay" onClick={onCancel}>
            <div
                className="modal-confirm"
                role="dialog"
                aria-modal="true"
                aria-labelledby="delete-user-title"
                onClick={(event) => event.stopPropagation()}
            >
                <h2 id="delete-user-title">Supprimer cet utilisateur ?</h2>

                <p>
                    Le compte de <strong>{user.name_user}</strong> sera supprimé.
                    Cette action est définitive.
                </p>

                <div className="modal-actions">
                    <button
                        type="button"
                        className="btn-cancel"
                        onClick={onCancel}
                        disabled={loading}
                    >
                        Annuler
                    </button>

                    <button
                        type="button"
                        className="btn-delete"
                        onClick={onConfirm}
                        disabled={loading}
                    >
                        {loading ? 'Suppression…' : 'Supprimer'}
                    </button>
                </div>
            </div>
        </div>
    )
}