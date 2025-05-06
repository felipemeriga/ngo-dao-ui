import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

interface AddressProps {
  address: string | undefined;
}

const Address: React.FC<AddressProps> = ({ address }) => {
  if (!address) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(address).then(() => {});
  };

  return (
    <Box display="flex" alignItems="center">
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        {address}
      </Typography>
      <Tooltip title="Copy to clipboard">
        <IconButton color="inherit" onClick={handleCopy}>
          <ContentCopyIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default Address;
