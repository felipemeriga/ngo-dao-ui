import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { useVotingPeriod } from "../../../hooks/useNGODAO.ts";
import styled from "@mui/material/styles/styled";

export const LoadingContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const convertDays = (data: bigint | undefined) => {
  if (data) {
    const secondsInDay = BigInt(3600 * 24);
    return Number(data / secondsInDay);
  }
};

const VotingPeriod: React.FC = () => {
  const { data, isLoading, isError } = useVotingPeriod();

  return (
    <Card>
      <CardContent sx={{ height: "100%" }}>
        {isLoading || isError ? (
          <LoadingContainer>
            <CircularProgress />
          </LoadingContainer>
        ) : (
          <>
            <Typography variant="h4" component="div">
              Voting Period
            </Typography>
            <Typography variant="h5" color="text.secondary">
              {convertDays(data)} days
            </Typography>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default VotingPeriod;
