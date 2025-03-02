import { toast } from 'react-toastify';

const ToastError = () => (
  <div>
    An error occured on submitting character, please try again.
  </div>
);

const ToastSuccess = () => (
  <div>
    Character created!
  </div>
);

/**
 * showErrorToast
 * function to show toast on unsuccessful character creation
 */
export const showErrorToast = () => {
  toast.error(ToastError, {
    position: 'bottom-right',
    className:"p-3 w-[400px] border border-red-900/40 rounded-xl bg-red-700 text-red-100",
    ariaLabel: 'An error occured on submission.'
  });
}

/**
 * showSuccessToast
 * function to show toast on successful character creation
 */
export const showSuccessToast = () => {
  toast.success(ToastSuccess, {
    position: 'bottom-right',
    className:"p-3 w-[400px] border border-green-900/40 rounded-xl bg-green-700 text-green-100",
    ariaLabel: 'Character created!'
  });
}
