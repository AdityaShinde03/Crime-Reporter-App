// src/components/report/ReportModal.js
import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import ReportForm from "./ReportForm"; // Import the ReportForm component

const ReportModal = ({ isOpen, onClose }) => {
  const handleSubmit = (values) => {
    // Handle form submission logic here, e.g., submit data to the backend
    console.log(values);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">Submit Report</ModalHeader>
            <ModalBody>
              <ReportForm onSubmit={handleSubmit} />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ReportModal;
