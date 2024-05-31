import { Card } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";

interface WrapperProps {}

const Wrapper: React.FC<WrapperProps> = () => {
  return (
    <Card
      variant="outlined"
      className="max-w-screen-xl min-h-screen px-5 mx-auto"
    >
      <Outlet />
    </Card>
  );
};

export default Wrapper;
