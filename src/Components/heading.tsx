import type { FC, PropsWithChildren } from "react";

interface HeadingProps {
  size: string;
}

const Heading: FC<PropsWithChildren<HeadingProps>> = ({ children, size }) => {
  return <h1 className={`${size} font-semibold`}>{children}</h1>;
};

export { Heading };
