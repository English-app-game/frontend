import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import Header from "../components/Header";
import ButtonHeader from "../components/ButtonHeader";
import UserInfoHeader from "./UserInfoHeader";
import { IconButton } from "./IconButton";
import { WindowBody } from "./WindowBody";
import { MobileSideBar } from "./MobileSideBar";

export const Nav = ({ HeaderText, HeaderIcon, page, pageText }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="flex items-center justify-center gap-5 h-16 py-7 sm:py-10 bg-secondary z-50 shadow-md">
      <div className="flex items-center justify-center w-full sm:justify-center relative">
        <div className="flex items-center justify-center gap-2">
          <Header
            text={HeaderText}
            className="text-primary uppercase text-[1.5rem] sm:text-4xl"
          />
          <HeaderIcon size={60} className="text-primary" />
        </div>
        <IconButton
          className={"sm:hidden text-primary text-3xl ml-1"}
          onClick={() => setIsOpen(true)}
          Icon={FiMenu}
        />
        <div className="hidden sm:flex items-center left-8 top-4">
          <ButtonHeader navigateTo={page} text={pageText} />
        </div>
      </div>
      <MobileSideBar isOpen={isOpen}>
        <IconButton
          className={"text-primary text-3xl mb-6 ml-auto"}
          onClick={() => setIsOpen(false)}
          Icon={FiX}
        />
        <WindowBody className={"flex flex-col items-end gap-4"}>
          <UserInfoHeader isInsideSidebar={true} />
          <ButtonHeader
            navigateTo={page}
            text={pageText}
            isInsideSidebar={true}
          />
        </WindowBody>
      </MobileSideBar>
    </header>
  );
};
