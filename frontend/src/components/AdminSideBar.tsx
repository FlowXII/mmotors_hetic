import React from "react"; 
import { NavLink } from "react-router-dom";
import { Box, VisuallyHidden, useToken } from "@chakra-ui/react";
import { AdminCardProps } from "../types/AdminCardProps";
import { Tooltip } from "./ui/tooltip";
import {
  ListFilter,
} from "lucide-react";

const AdminSideBar: React.FC<Pick<AdminCardProps, 'selectedTab'>> = ({ selectedTab }) => {
  const [accentBg, accentFg, mutedFg] = useToken('colors', [
    'accent',
    'accent.foreground',
    'muted.foreground'
  ]);

  return (
    <Box
      as="aside"
      position="fixed"
      top={0}
      bottom={0}
      left={0}
      zIndex={10}
      display={{ base: "none", sm: "flex" }}
      flexDirection="column"
      w="56px"
      borderRightWidth="1px"
      bg="background"
    >
      <Box
        as="nav"
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={4}
        px={2}
        py={{ base: 4, sm: 20 }}
      >
        <VisuallyHidden>Acme Inc</VisuallyHidden>

        {/* Produits */}
        <Tooltip label="Produits" placement="right" hasArrow>
          <NavLink
            to="/admin/produits"
            style={({ isActive }) => ({
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "36px",
              width: "36px",
              borderRadius: "lg",
              transition: "all 0.2s",
              backgroundColor: isActive ? accentBg : "transparent",
              color: isActive ? accentFg : mutedFg,
              textDecoration: "none",
              _hover: { color: 'chakra-body-text' },
            })}
          >
          <ListFilter className="h-3.5 w-3.5" />
            <VisuallyHidden>Produits</VisuallyHidden>
          </NavLink>
        </Tooltip>

        {/* Catégories */}
        <Tooltip label="Catégories" placement="right" hasArrow>
          <NavLink
            to="/admin/categories"
            style={({ isActive }) => ({
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "36px",
              width: "36px",
              borderRadius: "lg",
              transition: "all 0.2s",
              backgroundColor: isActive ? accentBg : "transparent",
              color: isActive ? accentFg : mutedFg,
              textDecoration: "none",
              _hover: { color: 'chakra-body-text' },
            })}
          >
          <ListFilter className="h-3.5 w-3.5" />
            <VisuallyHidden>Catégories</VisuallyHidden>
          </NavLink>
        </Tooltip>
      </Box>

      {/* Section basse */}
      <Box
        mt="auto"
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={4}
        px={2}
        py={{ sm: 5 }}
      >
        <Tooltip label="Paramètres" placement="right" hasArrow>
          <NavLink
            to="/admin/parametres"
            style={({ isActive }) => ({
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "36px",
              width: "36px",
              borderRadius: "lg",
              transition: "all 0.2s",
              backgroundColor: isActive ? accentBg : "transparent",
              color: isActive ? accentFg : mutedFg,
              textDecoration: "none",
              _hover: { color: 'chakra-body-text' },
            })}
          >
          <ListFilter className="h-3.5 w-3.5" />
            <VisuallyHidden>Paramètres</VisuallyHidden>
          </NavLink>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default AdminSideBar;