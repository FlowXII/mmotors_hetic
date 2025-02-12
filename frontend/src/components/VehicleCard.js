import React from 'react'; // Import de React
import { Box, Image, Text, Button } from '@chakra-ui/react'; // Import des composants Chakra UI
import { Link as RouterLink } from 'react-router-dom'; // Import du Link pour la navigation

// Composant pour afficher un véhicule
function VehicleCard({ vehicle }) {
  return (
    <Box bg="gray.100" p={5} borderRadius="md" boxShadow="md">
      <Image src={vehicle.image} alt={vehicle.name} borderRadius="md" />
      <Text fontSize="xl" fontWeight="bold" mt={4}>
        {vehicle.name}
      </Text>
      <Text fontSize="lg" color="blue.500">{vehicle.price}</Text>
      <Button mt={4} colorScheme="blue" as={RouterLink} to={`/vehicle/${vehicle.id}`}>
        Voir les détails
      </Button>
    </Box>
  );
}

export default VehicleCard; // Export du composant pour qu'il soit utilisé dans d'autres fichiers