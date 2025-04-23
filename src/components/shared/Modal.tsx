'use client'

import { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';

interface Props {
  title: string;
  body: string;
  confirmAction: string;
  onCancel: () => void;
  onConfirm: () => void;
  isModalOpen: boolean;
  closeModal: () => void;
}

interface ButtonRef {
  focus: () => void;
}

const Modal = forwardRef<ButtonRef, Props>(({
  title,
  body,
  onCancel,
  onConfirm,
  confirmAction,
  isModalOpen,
  closeModal
}, ref) => {
  const cancelButtonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => {
    return {
      focus: () => {
        cancelButtonRef.current?.focus();
      },
    };
  });

  
  /**
   * useEffect
   * Listens for tab events and prevents tabbing to elements outside the modal
   * Binds the escape key to closing the modal
   */
  useEffect(() => {
    if (!isModalOpen) return;

    const focusableElements = modalRef.current?.querySelectorAll<HTMLElement>(
      'button, [href], [tabindex]:not([tabindex="-1"])'
    );
  
    const firstElement = focusableElements?.[0];
    const lastElement = focusableElements?.[focusableElements.length - 1];

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal();
      }
      else if (event.key === 'Tab') {
        if (!focusableElements) return;
  
        if (event.shiftKey) {
          // Shift + Tab for backwards
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement?.focus();
          }
        } else {
          // Tab for forwards
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    if (isModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
    } else {
      window.removeEventListener('keydown', handleKeyDown);
    }

    // Cleanup
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen]);

  return (
    <>
      {isModalOpen && (
        <div
          id="popup-modal"
          role="dialog"
          aria-modal
          tabIndex={-1}
          ref={modalRef}
          onClick={closeModal}
          className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50
                    flex justify-center items-center md:inset-0 
                    w-full h-[calc(100%-1rem)] max-h-full bg-black/50"
        >
          {/* modal */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative p-4 w-full max-w-md"
          >
            <div className="relative rounded-lg shadow-sm ring-1 ring-indigo-400 bg-indigo-950 text-indigo-200">
            
              {/* modal body */}
              <div className="relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all sm:w-full sm:max-w-lg">
                <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                      <svg className="size-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                      </svg>
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h2
                        id="modal-title"
                        className="text-base font-semibold text-indigo-300"
                      >
                        {title}
                      </h2>
                      <div className="mt-2">
                        <p className="text-sm text-indigo-200">
                          {body}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* modal x button */}
              <button
                type="button"
                onClick={onCancel}
                className="absolute top-3 right-2.5 text-gray-400 hover:text-gray-100
                            bg-transparent rounded-lg text-sm w-8 h-8
                            inline-flex justify-center items-center"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>

              {/* modal footer buttons */}
              <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={onConfirm}
                  className="inline-flex w-full justify-center rounded-md bg-red-800 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
                >
                  {confirmAction}
                </button>
                <button
                  type="button"
                  onClick={onCancel}
                  ref={cancelButtonRef}
                  className="mt-3 sm:mt-0 w-full sm:w-auto px-3 py-2 text-sm font-semibold inline-flex justify-center rounded-md 
                          bg-gray-400 hover:bg-gray-200 text-indigo-950 shadow-xs 
                          ring-1 ring-gray-600 ring-inset "
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
});

export default Modal;
