import React, { useState } from "react";
import DataTable from "../Components/DataTable";
import Modal from "../Components/Modal";
import AddButton from "../Components/AddButton";

export default function Customer() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const openModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div style={{ flex: 1, padding: "20px 0" }}>
        <AddButton onClick={() => openModal(null)} />
        <Modal
          isOpen={isModalOpen}
          handleClose={closeModal}
          mode={selectedItem ? "edit" : "add"}
          currentItem={selectedItem}
        />
      </div>
      <DataTable openModal={(item) => openModal(item)} />
    </>
  );
}
