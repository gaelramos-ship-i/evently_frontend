import '../styles/modalConfirm.scss'

function ModalConfirm({
    isOpen,
    eventName,
    onCancel,
    onConfirm,
    loading
}) {
    if (!isOpen) {
        return null
    }

    return (
        <div className="modal-overlay" onClick={onCancel}>
            <div
                className="modal-confirm"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 id="modal-title">
                    Confirmer la suppression
                </h2>

                <p>
                    Voulez-vous vraiment supprimer l'événement
                    <strong> « {eventName} » </strong> ?
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
                        {loading ? 'Suppression...' : 'Supprimer'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ModalConfirm