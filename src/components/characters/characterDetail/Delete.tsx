'use client'

import { useState, useRef, useEffect } from 'react';
import ButtonWithRef from '@/components/shared/ButtonWithRef';
import Modal from '@/components/shared/Modal';

interface Props {
  id: number;
}

const Delete: React.FC<Props> = ({ id }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

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
  const onDelete = () => {
    alert(id)
  }

  return (
    <>
      <ButtonWithRef
        type="button"
        text="Delete Character"
        onClick={openModal}
        ref={openButtonRef}
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
    </>
  )
}

export default Delete;
