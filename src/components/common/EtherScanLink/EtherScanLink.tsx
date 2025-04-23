import React from "react";
import { useEtherScanLink } from "../../../hooks/useNGODAO.ts";

interface EtherScanLinkProps {
  walletAddress: string;
  showAddress: boolean;
}

const EtherScanLink: React.FC<EtherScanLinkProps> = ({
  walletAddress,
  showAddress,
}) => {
  const etherScanLink = useEtherScanLink(walletAddress);

  if (!etherScanLink) {
    return <p>Unsupported network</p>;
  }

  return (
    <a href={etherScanLink} target="_blank" rel="noopener noreferrer">
      {showAddress ? <>{walletAddress}</> : <>View on EtherScan</>}
    </a>
  );
};

export default EtherScanLink;
