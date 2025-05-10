import type { FC, PropsWithChildren } from "react";
interface ParagraphProps {
  className: string;
}

const Paragraph: FC<PropsWithChildren<ParagraphProps>> = ({
  className,
  children,
}) => {
  return (
    <p className={`text-center bg-[#abff2d] text-lg rounded-xl ${className}`}>
      {children}
    </p>
  );
};

export { Paragraph };
