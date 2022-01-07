export const NeonPreview = ({ text, color, icon, font, className, iconClass }) => {
  return (
    <div
      className={` transition-all relative flex items-center justify-center overflow-hidden ${className}`}
    >
      {icon.name && (
        <img
          src={`/img/neon-logos/${icon.link}`}
          alt={icon.name}
          className={`h-24 lg:h-56 ${iconClass}`}
        />
      )}
      <span
        className="whitespace-nowrap"
        style={{
          textShadow: `0 0 10px rgba(${color.r},${color.g},${
            color.b
          },1),0 0 20px rgba(${color.r + 10},${color.g + 10},${
            color.b + 10
          },0.5),0 0 40px rgba(${color.r + 10},${color.g + 10},${
            color.b + 10
          },0.33)`,
          color: `rgb(${color.r}, ${color.g}, ${color.b})`,
          fontFamily: font.family,
          transformStyle: "preserve-3d",
        }}
      >
        {text}
      </span>
    </div>
  );
};


export default NeonPreview;