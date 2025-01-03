package tn.iteam.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.iteam.Services.PublicationService;
import tn.iteam.entities.Commentaire;
import tn.iteam.entities.Post;
import tn.iteam.entities.Reaction;
import tn.iteam.entities.UserInfo;

import java.util.List;

@RestController
@RequestMapping("/api/publications")
@CrossOrigin(origins = "http://localhost:3000")
public class PublicationController {
    @Autowired
    private PublicationService publicationService;
    @GetMapping
    public List<Post> getAllPosts(){
        return publicationService.getAllPosts();
    }
    @PostMapping("/create")
    public Post createPost(@RequestBody Post post){
        UserInfo user = new UserInfo();
        return publicationService.createPost(user, post.getTitle(), post.getContent());
    }
    @PostMapping("/{postId}/comment")
    public Commentaire addComment(@PathVariable Long postId, @RequestBody String content){
        return publicationService.addComment(postId, content);
    }
    @PostMapping("/{postId}/reaction")
    public Reaction addReaction(@PathVariable Long postId, @RequestParam(required = false) Long commentId, @RequestParam String type){
        return publicationService.addReaction(postId, commentId, type);
    }
}
