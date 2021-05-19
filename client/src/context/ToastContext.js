import React, { useCallback, useEffect, useState, createContext } from 'react'

const ToastContext = createContext()

export default ToastContext

export function ToastContextProvider({ children }) {
  const [toasts, setToasts] = useState([])

  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(
        () => setToasts((toasts) => toasts.slice(1)),
        4000,
      )
      return () => clearTimeout(timer)
    }
  }, [toasts])

  const addToast = useCallback(
    function (toast) {
      setToasts((toasts) => [...toasts, toast])
    },
    [setToasts],
  )

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      <div className="toasts-wrapper">
        {toasts.map((toast) => (
          <div className="toast Alert" key={toast}>
            Your password for {toast} has been successfully saved.
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
