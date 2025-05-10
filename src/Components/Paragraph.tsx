import type { FC, PropsWithChildren } from "react";
interface ParagraphProps {
  width: string;
}

const Paragraph: FC<PropsWithChildren<ParagraphProps>> = ({
  width,
  children,
}) => {
  return (
    <p className={`text-center bg-[#abff2d] text-lg rounded-xl ${width}`}>
      {children}
    </p>
  );
};

export { Paragraph };
