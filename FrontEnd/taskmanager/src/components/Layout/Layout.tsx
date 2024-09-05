import { Children, FC } from "react";
import Header from "../Header/Header";

const Layout: FC<{ children: any }> = ({ children }) => {
  return (
    <div
      style={{
        background: "white",
        width: "100vw",
        display: "flex",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <Header />
      {children}
    </div>
  );
};
export default Layout;
