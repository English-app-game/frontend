import { useState } from "react";
import { IoGameControllerOutline } from "react-icons/io5";
import { FiMenu, FiX } from "react-icons/fi"; 
import Header from "../../components/Header";
import ButtonHeader from "../../components/ButtonHeader";
import { STATISTICS } from "../../../routes/routes_consts";
import UserInfoHeader from "../../components/UserInfoHeader";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="flex items-center justify-center gap-5 h-16 py-7 sm:py-10 bg-secondary z-50 shadow-md">
      <div className="flex items-center justify-center w-full sm:justify-center relative">
        <div className="flex items-center justify-center gap-2">
          <Header
            text="Join a game room"
            className="text-primary uppercase text-[1.5rem] sm:text-4xl"
          />
          <IoGameControllerOutline size={60} className="text-primary" />
        </div>
        <button
          className="sm:hidden text-primary text-3xl ml-1"
          onClick={() => setIsOpen(true)}
        >
          <FiMenu />
        </button>
        <div className="hidden sm:flex items-center left-8 top-4">
          <ButtonHeader navigateTo={STATISTICS} text="Statistics" />
        </div>
      </div>
      <div
        className={`fixed top-0 right-0 h-65 w-60 bg-secondary shadow-lg p-6 z-[100] transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } sm:hidden border border-primary rounded-xl`}
      >
        <button
          className="text-primary text-3xl mb-6 ml-auto"
          onClick={() => setIsOpen(false)}
        >
          <FiX />
        </button>
        <div className="flex flex-col items-end gap-4">
          <UserInfoHeader isInsideSidebar={true} />
          <ButtonHeader
            navigateTo={STATISTICS}
            text="Statistics"
            isInsideSidebar={true}
          />
        </div>
      </div>
    </header>
  );
}
