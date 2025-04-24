import { ReactNode } from 'react';
import { toast } from 'react-toastify';

/**
 * showErrorToast
 * function to show toast on unsuccessful character creation
 */
export const showErrorToast = (display: ReactNode, label: string) => {
  toast.error(display, {
    position: 'bottom-right',
    className:"p-3 w-[400px] border border-red-900/40 rounded-xl bg-red-700 text-red-100",
    ariaLabel: label,
  });
}

/**
 * showSuccessToast
 * function to show toast on successful character creation
 */
export const showSuccessToast = (display: ReactNode, label: string) => {
  toast.success(display, {
    position: 'bottom-right',
    className:"p-3 w-[400px] border border-green-900/40 rounded-xl bg-green-700 text-green-100",
    ariaLabel: label,
  });
}

/**
 * showWarningToast
 * function to show toast on successful character creation but failure to upload image
 */
export const showWarningToast = (display: ReactNode, label: string) => {
  toast.warn(display, {
    position: 'bottom-right',
    className:"p-3 w-[400px] border border-amber-900/40 rounded-xl bg-amber-700 text-amber-100",
    ariaLabel: label,
  });
}
