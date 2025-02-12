import React, { useState } from 'react'; // Import des hooks React
import { Box, Text, Button, Link, Grid, Image, Flex } from '@chakra-ui/react'; // Import des composants Chakra UI
import { Link as RouterLink } from 'react-router-dom'; // Import de Link pour navigation
import VehicleCard from '../components/VehicleCard'; // Composant pour afficher un véhicule sous forme de carte

function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // État pour gérer l'authentification de l'utilisateur

  // Fonction pour basculer entre connexion et déconnexion
  const handleLoginLogout = () => {
    setIsLoggedIn(!isLoggedIn); // Alterne l'état de connexion
  };

  return (
    <Box bg="white" p={5}>
      {/* Barre de navigation */}
      <Flex justify="space-between" align="center" bg="blue.500" p={4} color="white">
        <Text fontSize="2xl" fontWeight="bold">M-Motors</Text>
        <Flex>
          {/* Liens de navigation */}
          <Button as={RouterLink} to="/" bg="transparent" color="white" mr={4}>Accueil</Button>
          <Button as={RouterLink} to="/vehicles" bg="transparent" color="white" mr={4}>Véhicules</Button>
          <Button as={RouterLink} to="/contact" bg="transparent" color="white" mr={4}>Contact</Button>
          {/* Bouton de connexion/déconnexion */}
          <Button onClick={handleLoginLogout} bg="transparent" color="white">
            {isLoggedIn ? 'Déconnexion' : 'Connexion'}
          </Button>
          {/* Lien d'inscription */}
          {!isLoggedIn && (
            <Link as={RouterLink} to="/signup" color="white" ml={4}>
              S'inscrire
            </Link>
          )}
        </Flex>
      </Flex>

      {/* Titre de la page */}
      <Text fontSize="4xl" fontWeight="bold" mt={5} mb={5} color="blue.500">
        Découvrez nos véhicules disponibles
      </Text>

      {/* Grille des véhicules */}
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        {/* Exemple de cartes de véhicules */}
        <VehicleCard vehicle={{ id: 1, name: 'Véhicule 1', price: '15000 €', image: 'path/to/image' }} />
        <VehicleCard vehicle={{ id: 2, name: 'Véhicule 2', price: '18000 €', image: 'path/to/image' }} />
        <VehicleCard vehicle={{ id: 3, name: 'Véhicule 3', price: '20000 €', image: 'path/to/image' }} />
      </Grid>
    </Box>
  );
}

export default HomePage;