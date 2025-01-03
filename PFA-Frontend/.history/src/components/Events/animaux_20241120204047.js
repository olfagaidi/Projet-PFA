import React, { useState } from 'react'; 
import { Grid, Card, CardContent, CardMedia, Typography, Button, IconButton, Box, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material'; 
import { ThumbUp, ThumbDown } from '@mui/icons-material';

const eventsData = [
  {
    id: 1,
    title: "Journée d'Adoption d'Animaux",
    description: "Rejoignez-nous pour une journée d'adoption où vous pouvez rencontrer des animaux à la recherche de foyers aimants. Des chiens, des chats et d'autres animaux attendent une nouvelle famille.",
    participants: 50,
    imageUrl: "/images/dayanim.avif", 
  },
  {
    id: 2,
    title: "Promenade Communautaire des Chiens",
    description: "Participez à notre promenade communautaire pour les chiens. Apportez votre chien ou adoptez-en un sur place pour une balade conviviale et une bonne action !",
    participants: 80,
    imageUrl: "/images/anim1.avif", 
  },
  {
    id: 3,
    title: "Collecte de Fonds pour les Animaux Abandonnés",
    description: "Aidez à collecter des fonds pour les animaux abandonnés en participant à notre événement de collecte. Les fonds seront utilisés pour soutenir les refuges et les soins vétérinaires.",
    participants: 100,
    imageUrl: "/images/anim2.avif", 
  },
];

export default function Animaux() {
  const [likedEvents, setLikedEvents] = useState(new Set());
  const [registeredEvents, setRegisteredEvents] = useState(new Set());
  const [openForm, setOpenForm] = useState(false);
  const [formData, setFormData] = useState({
    isOldParticipant: '',
    howCanHelp: '',
    cv: null,
  });
  const [selectedEvent, setSelectedEvent] = useState(null);  // Nouveau state pour l'événement sélectionné
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleLike = (eventId) => {
    setLikedEvents((prevLikes) => {
      const newLikes = new Set(prevLikes);
      if (newLikes.has(eventId)) {
        newLikes.delete(eventId); 
      } else {
        newLikes.add(eventId); 
      }
      return newLikes;
    });
  };

  const handleRegister = (eventId) => {
    const event = eventsData.find((e) => e.id === eventId);
    setSelectedEvent(event);  // Mémorise l'événement sélectionné
    setRegisteredEvents((prevRegistrations) => {
      const newRegistrations = new Set(prevRegistrations);
      if (newRegistrations.has(eventId)) {
        newRegistrations.delete(eventId); 
      } else {
        newRegistrations.add(eventId); 
        setOpenForm(true); // Ouvre le formulaire lors de l'inscription
      }
      return newRegistrations;
    });
  };

  const handleSubmitForm = () => {
    // Envoi des données du formulaire (ici nous simulons simplement la soumission)
    console.log("Form data submitted: ", formData);
    setSnackbarOpen(true); // Affiche le message de remerciement
    setOpenForm(false); // Ferme le formulaire
    // Vous pouvez ajouter ici l'appel à une API pour envoyer un e-mail de notification si nécessaire
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
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
                    {registeredEvents.has(event.id) ? "Désactiver" : "Participer"}
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

      {/* Formulaire d'inscription */}
      <Dialog open={openForm} onClose={() => setOpenForm(false)}>
        <DialogTitle>Formulaire d'Inscription</DialogTitle>
        <DialogContent>
          {/* Affichage du nom de l'événement en haut du formulaire */}
          {selectedEvent && (
            <Typography variant="h6" gutterBottom>
              Vous participez à : <strong>{selectedEvent.title}</strong>
            </Typography>
          )}
          
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Êtes-vous un participant ancien ?</InputLabel>
                <Select
                  name="isOldParticipant"
                  value={formData.isOldParticipant}
                  onChange={handleFormChange}
                  label="Êtes-vous un participant ancien ?"
                >
                  <MenuItem value="">
                    <em>Veuillez choisir</em>
                  </MenuItem>
                  <MenuItem value="oui">Oui</MenuItem>
                  <MenuItem value="non">Non</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Comment pouvons-nous vous aider ?"
                name="howCanHelp"
                value={formData.howCanHelp}
                onChange={handleFormChange}
                fullWidth
                margin="normal"
                multiline
                rows={4}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="CV (Si applicable)"
                name="cv"
                type="file"
                onChange={(e) => setFormData({ ...formData, cv: e.target.files[0] })}
                fullWidth
                margin="normal"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenForm(false)} color="secondary">
            Annuler
          </Button>
          <Button onClick={handleSubmitForm} color="primary">
            Soumettre
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar pour message de remerciement */}
      <Snackbar
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        message="Merci pour votre inscription ! Vous recevrez une notification par e-mail bientôt."
        autoHideDuration={4000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Positionnement en haut et centré
      />
    </Box>
  );
}
