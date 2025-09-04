import { useState } from "react";

export const useModal = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const toggleModal = () => {
    const visible = !!isModalVisible;
    setIsModalVisible(!visible);
  };

  return {
    openModal,
    open: openModal,
    closeModal,
    close: closeModal,
    toggleModal,
    toggle: toggleModal,
    isModalVisible,
    isOpen: isModalVisible,
  };
};
