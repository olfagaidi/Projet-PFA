package tn.iteam.contoller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.iteam.services.EventService;

@RestController
@RequestMapping("api/events")
@CrossOrigin(origins = "http://localhost:3000")
public class EventController {
    @Autowired
    private EventService eventService;
    @PostMapping("/{eventId}/register")
    public String registerForEvent(@PathVariable Long eventId, @RequestParam String name){
        // Préparer l'e-mail
        String subject = "Confirmation d'inscription à l'événement";
        String body = "Bonjour,\n\nVotre inscription à l'événement #" + eventId + " a été acceptée.\n"
                + "Nous sommes ravis de vous compter parmi nous !\n\n"
                + "Cordialement,\nL'équipe organisatrice.";

        // Envoyer l'e-mail
        eventService.sendEmail(name, subject, body);

        return "Inscription réussie et e-mail envoyé à " + name;
    }
}
