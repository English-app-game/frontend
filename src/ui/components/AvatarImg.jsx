const AvatarImg = ({ src, alt }) => {
  return <img src={src} alt={alt} className="border-white border-2 rounded-xl transition-transform duration-300 hover:scale-110 cursor-pointer" />;
};
export default AvatarImg;
