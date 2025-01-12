import React from "react";
import Headerr from "./Headerr";
type LayoutPageProps = {
  children?: React.ReactNode;
  title?: any;
};
const LayoutPage = ({ children, title }: LayoutPageProps) => {
  return (
    <>
      <Headerr />
      {children}
    </>
  );
};

export default LayoutPage;
