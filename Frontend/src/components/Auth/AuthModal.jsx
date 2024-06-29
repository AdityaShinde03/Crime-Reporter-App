import React from "react";
import AuthTab from "../Tabs/AuthTab";
import { Button, Modal, ModalBody, ModalContent, useDisclosure } from "@nextui-org/react";

const AuthModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className="container">
      <Button onPress={onOpen}>Sign Up</Button>
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onClose={onClose}
        classNames={{
          backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
        }}
      >
        <ModalContent>
          <ModalBody>
            <AuthTab />
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AuthModal;
