import { Outlet } from "react-router-dom";
import { Container, Box, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SideNavBar from "../../../components/sidebar/SideNavBar";

export default function RestaurantLayout() {
  return (
    <Box sx={{ bgcolor: "#f8f9fa" }}>
      <Container maxWidth="lg">
        <Outlet />
      </Container>
    </Box>
  );
}
