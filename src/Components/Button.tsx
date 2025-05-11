import type { FC, PropsWithChildren } from "react";
interface ButtonProps {
  className?: string;
}

const Button: FC<PropsWithChildren<ButtonProps>> = ({
  className,
  children,
}) => {
  return (
    <button
      className={`${className} cursor-pointer text-center text-white bg-[#24282b] rounded-md transition-colors duration-150 ease-in hover:bg-[#343638] active:bg-[#181b1d] active:transition-none`}
    >
      {children}
    </button>
  );
};

export { Button };
