export const SideBarButton = ({Icon, className, onClick}) => {
  return (
    <button
      className={className}
      onClick={onClick}
    >
      <Icon />
    </button>
  );
};
