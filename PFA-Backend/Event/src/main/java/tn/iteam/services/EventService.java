package tn.iteam.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EventService {
    @Autowired
    private JavaMailSender mailSender;
    public void sendEmail(String to , String subject, String body){
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        message.setFrom("saaedtunis@gmail.com");
        mailSender.send(message);
    }
}
