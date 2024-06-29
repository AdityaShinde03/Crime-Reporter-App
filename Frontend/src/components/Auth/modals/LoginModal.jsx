import React from "react";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";

import LoginForm from "../AuthForms/LoginForm";

const LoginModal = ({}) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure(); 
  return (
    <div className="container">
      <Button onPress={onOpen}>Open Modal</Button>
      <Modal isOpen={isOpen} onClose={onClose} placement="top-center">
        <ModalContent className="p-4">
          <ModalHeader className="flex flex-col gap-1 text-primary">
            Log in
          </ModalHeader>
          <ModalBody>
            <LoginForm />
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default LoginModal;
