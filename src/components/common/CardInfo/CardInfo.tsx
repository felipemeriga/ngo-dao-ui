import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import styled from "@mui/material/styles/styled";

export const LoadingContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

interface HookInfo {
  isLoading: boolean;
  isError: boolean;
  data: bigint | undefined;
}

interface CardInfoProps {
  convertData: (data: bigint | undefined) => number | undefined;
  title: string;
  description: string;
  useInfo: () => HookInfo;
}

const CardInfo: React.FC<CardInfoProps> = ({
  useInfo,
  title,
  description,
  convertData,
}) => {
  const { data, isLoading, isError } = useInfo();
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
              {title}
            </Typography>
            <Typography variant="h5" color="text.secondary">
              {convertData(data)} {description}
            </Typography>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default CardInfo;
