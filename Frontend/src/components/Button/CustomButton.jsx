import { Button } from "@nextui-org/react";

const CustomButton = ({
  label,
  onClick,
  icon,
  role,
  url,
  className,
  variant,
  rightIcon,
  type,
  size,
}) => {
  const style = {
    primary: "bg-primary text-white",
    secondary: "bg-primary-100 text-white",
    success: "bg-success text-white",
    danger: "bg-danger text-white",
    warning: "bg-warning text-white",
    info: "bg-info text-white",
    light: "bg-light text-white",
    dark: "bg-dark text-white",
    white: "bg-white text-black",
  };
  const baseStyle =
    "rounded-lg px-4 py-2 flex items-center font-semibold justify-center gap-2 transition-all duration-300 ease-in-out"; 
  return (
    <>
      {role === "link" ? (
        <>
          <Link href={url}>{label}</Link>
        </>
      ) : (
        <>
          <Button
            onClick={onClick}
            className={`${className ? className : ""} ${baseStyle} ${style[variant]}`}
            type={type}
            size={size ? size : "medium"}
          >
            <div className={`${rightIcon ? "flex-row-reverse" : "flex-row"}`}>
              {label} {icon}
            </div>
          </Button>
        </>
      )}
    </>
  );
};

export default CustomButton;
