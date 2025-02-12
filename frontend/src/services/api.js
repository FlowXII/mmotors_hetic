const API_URL = 'http://localhost:8000';  // URL de l'API (backend)

export async function fetchVehicles() {
  // Fonction pour récupérer les véhicules depuis l'API
  const response = await fetch(`${API_URL}/vehicles`);
  const data = await response.json();  // Conversion de la réponse en JSON
  return data;  // Retourne les données des véhicules
}