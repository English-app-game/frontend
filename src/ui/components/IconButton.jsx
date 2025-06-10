export const IconButton = ({Icon, className, onClick}) => {
  return (
    <button
      className={className}
      onClick={onClick}
    >
      <Icon />
    </button>
  );
};
