import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

interface ILayout {
  children?: React.ReactNode;
  isFooterVisible?: boolean;
}

const Layout: React.FC<ILayout> = (props) => {
  const { children, isFooterVisible = true } = props;

  return (
    <>
      <Header />
      <div className="container">
        <main className="main">{children}</main>
      </div>
      {isFooterVisible && <Footer />}
    </>
  );
};

export default Layout;
