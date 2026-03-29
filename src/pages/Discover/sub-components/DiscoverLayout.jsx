import { Outlet } from "react-router-dom";
import { Container, Box, IconButton } from "@mui/material";

export default function RestaurantLayout() {
  return (
    <Box sx={{ bgcolor: "#f8f9fa" }}>
      <Container maxWidth="lg">
        <Outlet />
      </Container>
    </Box>
  );
}
