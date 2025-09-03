import { PropsWithChildren } from "react";

type PropTypes = {
  providers: React.FC<PropsWithChildren>[];
}

export const Providers: React.FC<PropsWithChildren<PropTypes>> = ({ providers, children }) => {
  if (providers.length === 0) return <>{children}</>;
  const Provider = providers[0];
  return (
    <Provider>
      <Providers providers={providers.slice(1)}>
        {children}
      </Providers>
    </Provider>
  );
};