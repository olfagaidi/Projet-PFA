import React, { useState } from 'react'; 
import { Grid, Card, CardContent, CardMedia, Typography, Button, IconButton, Box, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material'; 
import { ThumbUp, ThumbDown } from '@mui/icons-material';

const eventsData = [
  
  {
    id: 2,
    title: "Visite aux Résidents de Maison de Retraite",
    description: "Accompagnez les résidents de la maison de retraite pour une après-midi conviviale. Parlez-leur, écoutez leurs histoires et apportez un peu de réconfort aux personnes âgées.",
    participants: 40,
    imageUrl: "/images/soc5.avif",  // Remplacez par une image locale
  },
  {
    id: 3,
    title: "Atelier de Soutien Scolaire pour Enfants",
    description: "Aidez à l'éducation des enfants en donnant de votre temps pour un atelier de soutien scolaire. Votre aide permettra aux enfants de surmonter leurs difficultés académiques.",
    participants: 30,
    imageUrl: "/images/soc4.avif",  // Remplacez par une image locale
  },
    {
        id: 4,
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
        id: 6,
        title: "Distribution de Nourriture aux Réfugiés",
        description: "Venez aider à la distribution de nourriture aux réfugiés. Une petite action peut avoir un grand impact pour ceux qui en ont besoin.",
        participants: 50,
        imageUrl: "/images/soc3.avif",  // Remplacez par une image locale
      }
];

export default function Sociale() {
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
        Événements Sociaux
      </Typography>
      <Typography variante="h2" align="center">
      Rejoignez-nous pour un événement social visant à renforcer les liens communautaires et à promouvoir la solidarité. 
      <br/> Au programme : ateliers interactifs, discussions inspirantes, et activités collaboratives pour créer un impact positif et durable dans notre société.<br/>
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
                  <MenuItem value=""><em>Veuillez choisir</em></MenuItem>
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
