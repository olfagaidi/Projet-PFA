import React, { useState } from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, Button, IconButton, Box } from '@mui/material';
import { ThumbUp, ThumbDown } from '@mui/icons-material';

const eventsData = [
  {
    id: 1,
    title: "Marathon de Santé",
    description: "Rejoignez-nous pour un marathon de bien-être pour sensibiliser à la santé cardiovasculaire.",
    participants: 120,
    imageUrl: "/images/santé.avif",
  },
  {
    id: 2,
    title: "Atelier Yoga pour Débutants",
    description: "Un atelier de yoga pour débutants, destiné à améliorer la flexibilité et la relaxation.",
    participants: 80,
    imageUrl: "/images/sann.avif",
  },
  {
    id: 3,
    title: "Conférence sur l'Alimentation Saine",
    description: "Apprenez comment une alimentation saine peut améliorer votre bien-être général.",
    participants: 45,
    imageUrl: "/images/sant.avif",
  },
];

export default function Sante() {
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
        Événements de Santé
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
