import { Chip } from "@mui/material";
import { FC, useRef } from "react";

export const RenderCount: FC = () => {
  const renderCountRef = useRef(0);

  renderCountRef.current++;

  return <Chip label={<>Render Count: {renderCountRef.current}</>} />;
};
