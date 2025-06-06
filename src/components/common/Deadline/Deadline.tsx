import React from "react";
import Typography from "@mui/material/Typography";
import { formatDeadline, isInTheFuture } from "../../../utils/utils.ts";

interface DeadlineProps {
  deadline: bigint; // Bigint prop representing the timestamp
}

const Deadline: React.FC<DeadlineProps> = ({ deadline }) => {
  // Convert deadline (bigint) to a number
  const isFuture = isInTheFuture(deadline);

  return (
    <Typography variant="h5" color={isFuture ? "green" : "red"}>
      {formatDeadline(deadline)}
    </Typography>
  );
};

export default Deadline;
