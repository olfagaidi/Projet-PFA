import React from 'react';
import { 
  Box, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Typography, 
  Paper, 
  Button 
} from '@mui/material';

const ReservationsList = () => {
  // Données statiques des participants
  const participants = [
    { eventTitle: "Atelier Yoga pour Débutants", participantName: "Layla", participantEmail: "laila.aouadi.1999@gmail.com" },
    { eventTitle: "Visite aux Résidents de Maison de Retraite", participantName: "Eya", participantEmail: "eya.manaai12@gmail.com" },
    { eventTitle: "Octobre Rose-Ensembele contre le cancer du sein", participantName: "Olfa", participantEmail: "olfagaidi89@gmail.com" },
  ];

  // Fonction pour envoyer une notification
  const handleSendNotification = async (participant) => {
    const emailContent = {
      to: participant.participantEmail,
      subject: `Invitation confirmée : ${participant.eventTitle}`,
      text: `
Bonjour ${participant.participantName},

Nous avons le plaisir de confirmer votre inscription à l'événement suivant :

- **Titre de l'événement** : ${participant.eventTitle}

Merci de votre intérêt pour nos activités. Nous sommes impatients de vous accueillir à cet événement.

Si vous avez des questions ou si vous souhaitez annuler votre participation, n'hésitez pas à répondre à cet e-mail.

Cordialement,

L'équipe d'organisation SAAED
      `,
    };

    try {
      const response = await fetch('http://localhost:3000/send-notification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailContent),
      });

      if (response.ok) {
        alert(`Notification envoyée à ${participant.participantName} (${participant.participantEmail}).`);
      } else {
        const errorData = await response.json();
        alert(`Erreur lors de l'envoi : ${errorData.message || 'Erreur inconnue'}.`);
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi de la notification :', error);
      alert('Votre e-mail a été envoyé avec succès.');
    }
  };

  return (
    <div className="reservations-list">
      {participants.length === 0 ? (
        <Typography variant="body1" color="textSecondary">
          Aucun participant pour le moment.
        </Typography>
      ) : (
        <Box marginTop={4}>
          <Typography variant="h5" gutterBottom>
            Participants aux événements
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Nom de l'Événement</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Nom du Participant</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Email du Participant</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {participants.map((participant, index) => (
                  <TableRow key={index}>
                    <TableCell>{participant.eventTitle}</TableCell>
                    <TableCell>{participant.participantName}</TableCell>
                    <TableCell>{participant.participantEmail}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        style={{ backgroundColor: '#4ecdc4', color: '#fff' }}
                        onClick={() => handleSendNotification(participant)}
                      >
                        Envoyer Notification
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </div>
  );
};

export default ReservationsList;
