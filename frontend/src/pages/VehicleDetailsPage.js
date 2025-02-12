import React from 'react';  // Import de React
import { Box, Image, Text } from '@chakra-ui/react';  // Import des composants Chakra UI
import { useParams } from 'react-router-dom';  // Import du hook useParams

// Page pour afficher les détails d'un véhicule
function VehicleDetailsPage() {
  const { id } = useParams();  // Récupère l'ID du véhicule depuis l'URL

  // Exemple de données de véhicule (vous pouvez les récupérer depuis l'API)
  const vehicle = { id, name: 'Vehicle Name', price: '20000', image: 'path/to/image' };

  return (
    <Box p={5}>
      <Image src={vehicle.image} alt={vehicle.name} />  {/* Affichage de l'image du véhicule */}
      <Text fontSize="3xl">{vehicle.name}</Text>  {/* Affichage du nom du véhicule */}
      <Text fontSize="xl">Prix: {vehicle.price} €</Text>  {/* Affichage du prix */}
    </Box>
  );
}

export default VehicleDetailsPage;  // Export du composant pour qu'il soit utilisé dans App.js