import React from "react";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";

import SignupForm from "../AuthForms/SignupForm";

const SignupModal = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  return (
    <div className="">
      <Modal isOpen={isOpen} onClose={onClose} placement="top-center">
        <ModalContent className="p-4">
          <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
          <ModalBody>
            <SignupForm />
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default SignupModal;
