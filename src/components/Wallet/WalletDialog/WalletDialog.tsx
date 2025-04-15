import React from "react";
import { Dialog, DialogTitle, DialogContent, Stack } from "@mui/material";
import WalletOptions from "../WalletOptions/WalletOptions.tsx";
import { useAccount } from "wagmi";

const WalletDialog: React.FC = () => {
  const { isConnected } = useAccount();

  React.useEffect(() => {
    (async () => {
      console.log("Connection state: ", { isConnected });
    })();
  }, [isConnected]);

  return (
    <Dialog open={!isConnected}>
      <DialogTitle>Connect Wallet</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <WalletOptions />
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default WalletDialog;
