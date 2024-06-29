import { useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Link,
  Button,
} from "@nextui-org/react";

import AuthModal from "../Auth/AuthModal";
import ReportModal from "../ReportModal/ReportModal"; // Import the ReportModal component

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("");
  const [userName, setUserName] = useState(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false); // State for the ReportModal

  useEffect(() => {
    setCurrentPage(window.location.pathname);

    if (getCookie("userName")) {
      setUserName(getCookie("userName").replace("%20", " "));
    }
  }, []);

  const handleLogout = () => {
    document.cookie = "userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "userName=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setUserName(null);
  };

  const menuItems = ["Submit Report", "Show Map"];

  // const handleMenuItemClick = (item) => {
  //   if (item === "Submit Report") {
  //     setIsReportModalOpen(true); // Open the modal when "Submit Report" is clicked
  //   } else {
  //     window.location.href = `/${item.toLowerCase().replace(" ", "-")}`;
  //   }
  // };

  return (
    <div className="bg-primary">
      <div className="container">
        <Navbar
          onMenuOpenChange={setIsMenuOpen}
          className="bg-primary/50 text-secondary backdrop-none fixed top-0 z-30"
        >
          <NavbarContent>
            <NavbarMenuToggle
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="sm:hidden"
            />
            <NavbarBrand>
              <Link href="/">
                {/* <Logo className="!text-secondary" /> */}
                <p className="font-bold text-secondary text-lg">Crime App</p>
              </Link>
            </NavbarBrand>
          </NavbarContent>

          <NavbarContent className="hidden sm:flex gap-4" justify="center">
            {menuItems.map((item, index) => (
              <NavbarItem key={index}>
                <Link
                  className="text-secondary"
                  href={`/${item.toLowerCase().replace(" ", "-")}`}
                  aria-current={
                    currentPage === `/${item.toLowerCase().replace(" ", "-")}`
                      ? "page"
                      : undefined
                  }
                >
                  {item}
                </Link>
              </NavbarItem>
            ))}
          </NavbarContent>
          <NavbarContent justify="end">
            <NavbarItem className="hidden lg:flex">
              {userName ? (
                <div className="flex items-center gap-2">
                  <Dropdown>
                    <DropdownTrigger>
                      <Button
                        variant="bordered"
                        className="border-0 focus:ring-0 focus:ring-offset-0 focus:outline-none text-white font-bold text-lg"
                      >
                        Welcome, {userName.split(" ")[0]}
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions">
                      <DropdownItem
                        key="new"
                        className="w-full bg-transparent text-center"
                      >
                        <Button
                          className="bg-transparent hover:bg-transparent"
                          onPress={handleLogout}
                        >
                          Logout
                        </Button>
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              ) : (
                <AuthModal />
              )}
            </NavbarItem>
          </NavbarContent>
          <NavbarMenu>
            {menuItems.map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                  className="text-secondary w-full"
                  color={
                    index === 2
                      ? "primary"
                      : index === menuItems.length - 1
                      ? "danger"
                      : "foreground"
                  }
                  href="#"
                  onClick={() => handleMenuItemClick(item)}
                  size="lg"
                >
                  {item}
                </Link>
              </NavbarMenuItem>
            ))}
          </NavbarMenu>
        </Navbar>
      </div>
      {/* Include the ReportModal component */}
      <ReportModal isOpen={isReportModalOpen} onClose={() => setIsReportModalOpen(false)} />
    </div>
  );
}
