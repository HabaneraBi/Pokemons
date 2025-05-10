import type { FC, PropsWithChildren } from "react";

interface HeadingProps {
  className?: string;
}

const Heading: FC<PropsWithChildren<HeadingProps>> = ({
  children,
  className,
}) => {
  return <h1 className={`${className} font-semibold`}>{children}</h1>;
};

export { Heading };
