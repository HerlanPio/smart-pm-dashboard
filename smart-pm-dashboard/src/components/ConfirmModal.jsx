import React from 'react'
import '../styles/modal.css'

export default function ConfirmModal({ 
  title, 
  message, 
  confirmText = 'Confirm', 
  cancelText = 'Cancel',
  onConfirm, 
  onCancel, 
  type = 'danger' 
}) {
  const handleConfirm = () => {
    onConfirm()
  }

  const handleCancel = () => {
    onCancel()
  }

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content confirm-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="close-btn" onClick={onCancel}>×</button>
        </div>

        <div className="modal-body">
          <div className="confirm-icon">
            {type === 'danger' ? '⚠️' : 'ℹ️'}
          </div>
          <p className="confirm-message">{message}</p>
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={handleCancel}>
            {cancelText}
          </button>
          <button 
            className={`btn-${type}`} 
            onClick={handleConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}
