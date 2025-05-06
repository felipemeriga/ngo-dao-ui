import * as React from "react";
import { Connector, useConnect } from "wagmi";
import { Button } from "@mui/material";

interface WalletOptionProps {
  connector: Connector;
  onClick: () => void;
}

const WalletOptions: React.FC = () => {
  const { connectors, connect } = useConnect();

  return connectors.map((connector) => (
    <WalletOption
      key={connector.uid}
      connector={connector}
      onClick={() => connect({ connector })}
    />
  ));
};

const WalletOption: React.FC<WalletOptionProps> = ({ connector, onClick }) => {
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const provider = await connector.getProvider();
      setReady(!!provider);
    })();
  }, [connector]);

  return (
    <Button disabled={!ready} onClick={onClick} variant="contained" fullWidth>
      {connector.name}
    </Button>
  );
};

export default WalletOptions;
