import { FC, useRef } from "react";
import { Chip } from "@mui/material";

export const RenderCount: FC<{}> = () => {
  const renderCountRef = useRef(0);

  renderCountRef.current++;

  return <Chip label={<>Render Count: {renderCountRef.current}</>} />;
};
