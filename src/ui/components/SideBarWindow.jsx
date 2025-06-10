import UserInfoHeader from "./UserInfoHeader";
import ButtonHeader from "./ButtonHeader";

export const SideBarWindow = ({ boolean, className, page, pageText }) => {
  return (
    <div className={className}>
      <UserInfoHeader isInsideSidebar={boolean} />
      <ButtonHeader
        navigateTo={page}
        text={pageText}
        isInsideSidebar={boolean}
      />
    </div>
  );
};
