import { Providers } from "@providers/providers";
import { PropsWithChildren, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { GlobalStyle } from "./Global";
import { RouteWrapper } from "./ui/common/Route";
import { NavBar } from "./NavBar";

type PropTypes = {
  providers?: React.FC<PropsWithChildren>[];
  useWrapper?: boolean;
  showNav?: boolean;
};

export const Route: React.FC<PropsWithChildren<PropTypes>> = ({ providers = [], children, useWrapper = true, showNav = true }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Providers providers={providers}>
      <GlobalStyle />
      {useWrapper && <RouteWrapper>{children}</RouteWrapper>}
      {!useWrapper && children}
      {showNav && <NavBar />}
    </Providers>
  );
}