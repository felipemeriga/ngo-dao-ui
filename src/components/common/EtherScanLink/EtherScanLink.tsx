import React from "react";
import { useEtherScanLink } from "../../../hooks/useNGODAO.ts";
import styled from "@mui/material/styles/styled";

export const Link = styled("a")({
  "&:hover": {
    color: "rgb(7,54,135)", // Or any color you prefer
    cursor: "pointer", // Add this if you want to show pointer on hover
  },
});

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
    <Link href={etherScanLink} target="_blank" rel="noopener noreferrer">
      {showAddress ? <>{walletAddress}</> : <>View on EtherScan</>}
    </Link>
  );
};

export default EtherScanLink;
