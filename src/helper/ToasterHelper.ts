import { toast, type ToastPosition, type Theme } from 'react-toastify'

// Interface defining the options for toast messages
interface ToastOptions {
  position: ToastPosition
  autoClose: number
  hideProgressBar: boolean
  closeOnClick: boolean
  pauseOnHover: boolean
  draggable: boolean
  progress?: number
  theme: Theme
}

// Default options for toast messages
const defaultToastOptions: ToastOptions = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: 'colored'
}

// Function for displaying toast messages
function ToasterMessage (type: string, message: string): void {
  // Switch statement to determine the type of toast and display accordingly
  switch (type) {
    case 'success':
      toast.success(message, defaultToastOptions)
      break
    case 'error':
      toast.error(message, defaultToastOptions)
      break
    case 'warning':
      toast.warn(message, defaultToastOptions)
      break
    default:
      break
  }
}

export { ToasterMessage }
