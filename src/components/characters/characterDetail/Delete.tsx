'use client'

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer } from 'react-toastify';
import ButtonWithRef from '@/components/shared/ButtonWithRef';
import Modal from '@/components/shared/Modal';
import { showErrorToast, showSuccessToast } from '@/components/shared/Toasts';
import { useDeleteCharacter } from '@/lib/graphql/hooks';
import 'react-toastify/dist/ReactToastify.css';

interface Props {
  id: number;
}

const ToastError = (
  <div>
    An error occured on deleting character, please try again.
  </div>
);

const ToastSuccess = (
  <div>
    Character deleted!
  </div>
);


const Delete: React.FC<Props> = ({ id }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteError, setDeleteError] = useState(false);

  const openButtonRef = useRef<HTMLButtonElement>(null);
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  const router = useRouter();

  const { deleteCharacterMutation, loading } = useDeleteCharacter();

  useEffect(() => {
    if (isModalOpen) {
      cancelButtonRef.current?.focus();
    }
  }, [isModalOpen]);

  /**
   * openModal
   * Sets state to show modal
   */
  const openModal = () => {
    setIsModalOpen(true);
  }

  /**
   * closeModal
   * Sets state to close modal
   */
  const closeModal = () => {
    setIsModalOpen(false);
    openButtonRef.current?.focus();
  }

  /**
   * onDelete
   */
  const onDelete = async () => {
    try {
      await deleteCharacterMutation(id);
      setDeleteError(false);
      showSuccessToast(ToastSuccess, 'Character deleted!');
      setTimeout(() => { router.push('/characters')}, 2000);
    } catch (err) {
      console.log(err);
      setDeleteError(true);
      showErrorToast(ToastError, 'An error occured on deletion.');
    }

    closeModal();
  }

  return (
    <>
      <ButtonWithRef
        type="button"
        text="Delete Character"
        onClick={openModal}
        ref={openButtonRef}
        disabled={loading}
      />
      <Modal
        title="Delete character"
        body="Are you sure you want to delete this character? This action cannot be undone."
        confirmAction="Delete"
        isModalOpen={isModalOpen}
        onCancel={closeModal}
        onConfirm={onDelete}
        closeModal={closeModal}
        ref={cancelButtonRef}
      />
      <div>
        <ToastContainer
          position="bottom-right"
          autoClose={2000}
          closeOnClick
        />
      </div>
      
    </>
  )
}

export default Delete;
