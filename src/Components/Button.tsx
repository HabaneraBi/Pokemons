import type { FC, PropsWithChildren } from "react";
interface ButtonProps {
  className?: string;
  onClick?: () => void;
}

const Button: FC<PropsWithChildren<ButtonProps>> = ({
  className,
  children,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`${className} cursor-pointer text-center text-lg text-white bg-[#24282b] rounded-md transition-colors duration-150 ease-in hover:bg-[#343638] active:bg-[#181b1d] active:transition-none`}
    >
      {children}
    </button>
  );
};

export { Button };
