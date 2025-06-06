import * as React from "react";
import Tooltip from "@mui/material/Tooltip";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import PendingIcon from "@mui/icons-material/Pending";

export interface StatusProps {
  yesVotes: number;
  noVotes: number;
  executed: boolean;
}

const Status: React.FC<StatusProps> = ({ executed, noVotes, yesVotes }) => {
  return (
    <>
      {executed ? (
        <>
          {Number(yesVotes) > Number(noVotes) ? (
            <Tooltip title="Executed">
              <CheckCircleOutlineIcon color={"success"} />
            </Tooltip>
          ) : (
            <Tooltip title="Canceled">
              <CancelIcon color={"error"} />
            </Tooltip>
          )}
        </>
      ) : (
        <Tooltip title="Pending...">
          <PendingIcon color={"info"} />
        </Tooltip>
      )}
    </>
  );
};

export default Status;
