import type { FC, PropsWithChildren } from "react";

const Heading: FC<PropsWithChildren> = ({ children }) => {
  return <h1 className="text-2xl font-semibold">{children}</h1>;
};

export { Heading };
