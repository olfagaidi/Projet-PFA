import React, { useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  IconButton,
  Box,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { ThumbUp, ThumbDown } from '@mui/icons-material';
import axios from 'axios';

const eventsData = [
  {
    id: 1,
    title: "Journée d'Adoption d'Animaux",
    description: "Rejoignez-nous pour une journée d'adoption où vous pouvez rencontrer des animaux à la recherche de foyers aimants.",
    participants: 50,
    imageUrl: "/images/dayanim.avif",
  },
  {
    id: 2,
    title: "Promenade Communautaire des Chiens",
    description: "Participez à notre promenade communautaire pour les chiens. Apportez votre chien ou adoptez-en un sur place !",
    participants: 80,
    imageUrl: "/images/anim1.avif",
  },
  {
    id: 3,
    title: "Collecte de Fonds pour les Animaux Abandonnés",
    description: "Aidez à collecter des fonds pour les animaux abandonnés en participant à notre événement de collecte.",
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
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleLike = (eventId) => {
    setLikedEvents((prevLikes) => {
      const newLikes = new Set(prevLikes);
      newLikes.has(eventId) ? newLikes.delete(eventId) : newLikes.add(eventId);
      return newLikes;
    });
  };

  const handleRegister = (eventId) => {
    const event = eventsData.find((e) => e.id === eventId);
    setSelectedEvent(event);
    setOpenForm(true);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 2 * 1024 * 1024) {
      alert("Le fichier doit être inférieur à 2 Mo.");
      return;
    }
    setFormData({ ...formData, cv: file });
  };

  const handleSubmitForm = async () => {
    if (!formData.isOldParticipant) {
      alert("Veuillez indiquer si vous êtes un ancien participant.");
      return;
    }
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("isOldParticipant", formData.isOldParticipant);
      formDataToSend.append("howCanHelp", formData.howCanHelp);
      formData.cv && formDataToSend.append("cv", formData.cv);

      await axios.post("http://localhost:8000/api/events/register", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSnackbarOpen(true);
      setOpenForm(false);
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
      alert("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  return (
    <Box padding={2}>
      <Typography variant="h4" align="center" gutterBottom>
        Événements Animaux
      </Typography>
      <Grid container spacing={3}>
        {eventsData.map((event) => (
          <Grid item xs={12} sm={6} md={4} key={event.id}>
            <Card>
              <CardMedia component="img" height="200" image={event.imageUrl} alt={event.title} />
              <CardContent>
                <Typography variant="h6">{event.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {event.description}
                </Typography>
                <Box marginTop={2} display="flex" justifyContent="space-between">
                  <Button
                    variant="outlined"
                    color={registeredEvents.has(event.id) ? "secondary" : "primary"}
                    onClick={() => handleRegister(event.id)}
                  >
                    Participer
                  </Button>
                  <IconButton color={likedEvents.has(event.id) ? "primary" : "default"} onClick={() => handleLike(event.id)}>
                    <ThumbUp />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Dialog open={openForm} onClose={() => setOpenForm(false)}>
        <DialogTitle>Formulaire d'Inscription</DialogTitle>
        <DialogContent>
          {selectedEvent && <Typography variant="h6">Événement : {selectedEvent.title}</Typography>}
          <FormControl fullWidth margin="normal">
            <InputLabel>Êtes-vous un participant ancien ?</InputLabel>
            <Select
              name="isOldParticipant"
              value={formData.isOldParticipant}
              onChange={(e) => setFormData({ ...formData, isOldParticipant: e.target.value })}
            >
              <MenuItem value="oui">Oui</MenuItem>
              <MenuItem value="non">Non</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Comment pouvez-vous aider ?"
            name="howCanHelp"
            value={formData.howCanHelp}
            onChange={(e) => setFormData({ ...formData, howCanHelp: e.target.value })}
            fullWidth
            margin="normal"
            multiline
            rows={4}
          />
          <TextField label="CV" name="cv" type="file" onChange={handleFileUpload} fullWidth margin="normal" />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenForm(false)} color="secondary">Annuler</Button>
          <Button onClick={handleSubmitForm} color="primary">Soumettre</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        message="Merci pour votre inscription !"
        autoHideDuration={4000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
    </Box>
  );
}
