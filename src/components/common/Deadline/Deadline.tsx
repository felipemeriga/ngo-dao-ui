import React from "react";
import Typography from "@mui/material/Typography";
import { formatDeadline } from "../../../utils/utils.ts";

interface DeadlineProps {
  deadline: bigint; // Bigint prop representing the timestamp
}

const Deadline: React.FC<DeadlineProps> = ({ deadline }) => {
  // Convert deadline (bigint) to a number
  const timestamp = Number(deadline) * 1000; // Convert seconds to milliseconds
  const isFuture = timestamp > Date.now(); // Check if the deadline is in the future

  return (
    <Typography variant="h5" color={isFuture ? "green" : "red"}>
      {formatDeadline(deadline)}
    </Typography>
  );
};

export default Deadline;
