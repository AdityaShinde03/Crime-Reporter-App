import React from "react";
import {
  Tabs,
  Tab,
  Card,
  CardBody,
  CardHeader,
  useDisclosure,
  Button,
} from "@nextui-org/react";
import LoginModal from "../Auth/modals/LoginModal";
import LoginForm from "../Auth/AuthForms/LoginForm";
import SignupForm from "../Auth/AuthForms/SignupForm";

const AuthTab = () => {
  const [selected, setSelected] = React.useState("photos");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <div className="flex w-full flex-col">
        <Tabs
          aria-label="Options"
          selectedKey={selected}
          onSelectionChange={setSelected}
        >
          <Tab key="music" title="Sign Up">
            <SignupForm />
          </Tab>
          <Tab key="Login" title="Login">
            <LoginForm />
          </Tab>
        </Tabs>
      </div>
    </>
  );
};

export default AuthTab;
