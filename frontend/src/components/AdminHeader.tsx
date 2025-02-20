// AdminHeader.tsx

import React, { useState } from "react";
import { ListFilter, PanelLeft, PlusCircle, Search } from "lucide-react";
import {
  Breadcrumb,
  DrawerContent,
  DrawerRoot,
  DrawerTrigger,
  Button,
  Input,
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { VehicleForm, VehicleFormValues } from "../forms/VehicleForm";
import { DossierForm, DossierFormValues } from "../forms/DossierForm";
import { Vehicle } from "../types/Vehicle";
import { Dossier } from "../types/Dossier";

interface AdminHeaderProps {
  selectedTab: "vehicules" | "dossiers";
  onAddClick: (data: Vehicle | Dossier) => Promise<void>;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ selectedTab, onAddClick }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<Vehicle | Dossier | null>(null);

  const handleAddClick = () => {
    setCurrentItem(null);
    setIsDialogOpen(true);
  };

  const handleFormClose = () => {
    setIsDialogOpen(false);
  };

  const handleVehicleFormSubmit = async (data: VehicleFormValues) => {
    try {
      await onAddClick(data);
      setIsDialogOpen(false);
    } catch (error) {
      // Gestion des erreurs (ex : afficher un toast)
    }
  };

  const handleDossierFormSubmit = async (data: DossierFormValues) => {
    try {
      await onAddClick(data);
      setIsDialogOpen(false);
    } catch (error) {
      // Gestion des erreurs
    }
  };

  return (
    <header className="sticky top-0 z-30 flex flex-col gap-4 border-b bg-background px-4 sm:static sm:border-0 sm:bg-transparent sm:px-6">
      {/* En-tête et navigation */}
      <div className="flex h-14 items-center gap-4">
        <DrawerRoot>
          <DrawerTrigger asChild>
            <Button size="icon" variant="outline" className="sm:hidden">
              <PanelLeft className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </DrawerTrigger>
          <DrawerContent side="left" className="sm:max-w-xs">
            <nav className="grid gap-6 text-lg font-medium">
              <span className="sr-only">Acme Inc</span>
              <Link
                to="#"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <ListFilter className="h-3.5 w-3.5" />
                {selectedTab === "vehicules" ? "Véhicules" : "Dossiers"}
              </Link>
            </nav>
          </DrawerContent>
        </DrawerRoot>
        <Breadcrumb.Root className="hidden md:flex">
          <Breadcrumb.List>
            <Breadcrumb.Item>
              <Breadcrumb.Link asChild>
                <Link to="#">Panel</Link>
              </Breadcrumb.Link>
            </Breadcrumb.Item>
            <Breadcrumb.Separator />
            <Breadcrumb.Item>
              {selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1)}
            </Breadcrumb.Item>
          </Breadcrumb.List>
        </Breadcrumb.Root>
        <div className="relative ml-auto flex-1 md:grow-0">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Rechercher"
            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
          />
        </div>
      </div>
      <div className="flex gap-2 pb-2">
        <Button variant="customForm" size="sm" className="h-8 gap-1" onClick={handleAddClick}>
          <PlusCircle className="h-4 w-4" />
          {selectedTab === "vehicules" ? "Ajouter un véhicule" : "Ajouter un dossier"}
        </Button>

        {/* Formulaire pour ajouter un véhicule */}
        {selectedTab === "vehicules" && (
          <VehicleForm
            isOpen={isDialogOpen}
            onClose={handleFormClose}
            onSubmit={handleVehicleFormSubmit}
            defaultValues={currentItem ? (currentItem as VehicleFormValues) : undefined}
          />
        )}

        {/* Formulaire pour ajouter un dossier */}
        {selectedTab === "dossiers" && (
          <DossierForm
            isOpen={isDialogOpen}
            onClose={handleFormClose}
            onSubmit={handleDossierFormSubmit}
            defaultValues={currentItem ? (currentItem as DossierFormValues) : undefined}
          />
        )}

        {/* Menu de filtrage */}
        <MenuRoot>
          <MenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <ListFilter className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Filtrer</span>
            </Button>
          </MenuTrigger>
          <MenuContent>
            <MenuItem>Par date</MenuItem>
            <MenuItem>Par nom</MenuItem>
          </MenuContent>
        </MenuRoot>
      </div>
    </header>
  );
};

export default AdminHeader;