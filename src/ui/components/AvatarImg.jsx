const AvatarImg = ({ src, alt }) => {
  return <img src={src} alt={alt} className="w-full h-full object-cover border-white border-2 rounded-xl transition-transform duration-300 hover:scale-107 cursor-pointer" />;
};
export default AvatarImg;