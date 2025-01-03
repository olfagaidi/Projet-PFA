package tn.iteam.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.iteam.entities.Commentaire;
import tn.iteam.entities.Post;
import tn.iteam.entities.Reaction;
import tn.iteam.entities.UserInfo;
import tn.iteam.repositories.CommentRepository;
import tn.iteam.repositories.PostRepository;
import tn.iteam.repositories.ReactionRepository;
import tn.iteam.repositories.UserRepository;

import java.util.Date;
import java.util.List;

@Service
public class PublicationService {
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private ReactionRepository reactionRepository;
    @Autowired
    private UserRepository userRepository;
    public List<Post> getAllPosts(){
        return postRepository.findAll();
    }
    public Post createPost(UserInfo userInfo, String title, String content){
        Post post = new Post();
        post.setTitle(title);
        post.setContent(content);
        post.setUserInfo((List<UserInfo>) userInfo);
        post.setCreatedAt(new Date());
        return postRepository.save(post);
    }
    public Commentaire addComment(Long postId, String content){
        Post post = postRepository.findById(postId).orElseThrow();
        Commentaire comment = new Commentaire();
        comment.setContent(content);
        comment.setPost(post);
        return commentRepository.save(comment);
    }
    public Reaction addReaction(Long postId, Long commentId, String type){
        Reaction reaction = new Reaction();
        if (commentId != null){
            Commentaire comment = commentRepository.findById(commentId).orElseThrow();
            reaction.setCommentaire(comment);
        } else {
            Post post = postRepository.findById(postId).orElseThrow();
            reaction.setPost(post);
        }
        reaction.setType(type);
        return reactionRepository.save(reaction);
    }
}
