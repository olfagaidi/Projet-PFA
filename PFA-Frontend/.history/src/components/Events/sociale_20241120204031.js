import React, { useState } from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, Button, IconButton, Box } from '@mui/material';
import { ThumbUp, ThumbDown } from '@mui/icons-material';

const eventsData = [
 
 
    {
        id: 1,
        title: "Nettoyage Communautaire du Parc",
        description: "Rejoignez-nous pour une journée de nettoyage dans le parc local. Venez aider à préserver notre environnement tout en faisant partie d'une belle initiative communautaire.",
        participants: 120,
        imageUrl: "/images/soc1.avif",  // Remplacez par une image locale
      },
      {
        id: 5,
        title: "Collecte de Fonds pour les Sans-abris",
        description: "Participez à notre collecte de fonds pour aider les sans-abris. Chaque don compte et ensemble, nous pouvons faire la différence dans la vie de nombreuses personnes.",
        participants: 80,
        imageUrl: "/images/soc2.avif",  // Remplacez par une image locale
      },
      {
        id: 3,
        title: "Distribution de Nourriture aux Réfugiés",
        description: "Venez aider à la distribution de nourriture aux réfugiés. Une petite action peut avoir un grand impact pour ceux qui en ont besoin.",
        participants: 50,
        imageUrl: "/images/soc3.avif",  // Remplacez par une image locale
      },
      {
        id: 4,
        title: "Atelier de Soutien Scolaire pour Enfants",
        description: "Aidez à l'éducation des enfants en donnant de votre temps pour un atelier de soutien scolaire. Votre aide permettra aux enfants de surmonter leurs difficultés académiques.",
        participants: 30,
        imageUrl: "/images/soc4.avif",  // Remplacez par une image locale
      },
      {
        id: 2,
        title: "Visite aux Résidents de Maison de Retraite",
        description: "Accompagnez les résidents de la maison de retraite pour une après-midi conviviale. Parlez-leur, écoutez leurs histoires et apportez un peu de réconfort aux personnes âgées.",
        participants: 40,
        imageUrl: "/images/soc5.avif",  // Remplacez par une image locale
      },
];

export default function Sociale() {
  const [likedEvents, setLikedEvents] = useState(new Set());
  const [registeredEvents, setRegisteredEvents] = useState(new Set());

  const handleLike = (eventId) => {
    setLikedEvents((prevLikes) => {
      const newLikes = new Set(prevLikes);
      if (newLikes.has(eventId)) {
        newLikes.delete(eventId); // Si déjà aimé, on enlève le like
      } else {
        newLikes.add(eventId); // Sinon, on ajoute le like
      }
      return newLikes;
    });
  };

  const handleRegister = (eventId) => {
    setRegisteredEvents((prevRegistrations) => {
      const newRegistrations = new Set(prevRegistrations);
      if (newRegistrations.has(eventId)) {
        newRegistrations.delete(eventId); // Si déjà inscrit, on annule l'inscription
      } else {
        newRegistrations.add(eventId); // Sinon, on ajoute l'inscription
      }
      return newRegistrations;
    });
  };

  return (
    <Box padding={2}>
      <Typography variant="h4" gutterBottom align="center">
        Événements Sociaux
      </Typography>
      <Grid container spacing={3}>
        {eventsData.map((event) => (
          <Grid item xs={12} sm={6} md={4} key={event.id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={event.imageUrl}
                alt={event.title}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {event.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" paragraph>
                  {event.description}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Participants: {event.participants}
                </Typography>
                <Box marginTop={2} display="flex" justifyContent="space-between">
                  {/* Bouton d'inscription */}
                  <Button
                    variant="outlined"
                    color={registeredEvents.has(event.id) ? "secondary" : "primary"}
                    onClick={() => handleRegister(event.id)}
                  >
                    {registeredEvents.has(event.id) ? "Désactivier" : "Participer"}
                  </Button>
                  {/* Bouton de Like */}
                  <Box display="flex" alignItems="center">
                    <IconButton
                      color={likedEvents.has(event.id) ? "primary" : "default"}
                      onClick={() => handleLike(event.id)}
                    >
                      <ThumbUp />
                    </IconButton>
                    <IconButton
                      color={!likedEvents.has(event.id) ? "secondary" : "default"}
                      onClick={() => handleLike(event.id)}
                    >
                      <ThumbDown />
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
