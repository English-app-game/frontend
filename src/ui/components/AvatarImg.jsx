const AvatarImg = ({ src, alt, className }) => {
  return <img src={src} alt={alt} className={`object-cover transition-transform duration-300 hover:scale-107 cursor-pointer ${className}`}/>;
};
export default AvatarImg;

"w-full h-full border-white border-2 rounded-xl"