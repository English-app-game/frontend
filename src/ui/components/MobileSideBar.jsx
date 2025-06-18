export const MobileSideBar = ({ isOpen, children }) => {
  return (
    <div
      className={`fixed top-0 right-0 h-65 w-60 bg-secondary shadow-lg p-6 z-[100] transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } md:hidden border border-primary rounded-xl`}
    >
      {children}
    </div>
  );
};

