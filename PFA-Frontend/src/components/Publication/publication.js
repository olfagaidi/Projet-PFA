import React, { useState } from 'react';
import './publication.css';

const Publication = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [comment, setComment] = useState('');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const staticPosts = [
    {
      id: 1,
      title: "Aide aux seniors",
      content: "Je me suis rendu dans une maison de retraite pour aider les résidents avec leurs activités.",
      volunteerTime: "12/11/2024",
      image: "/images/aide.avif",
      reactions: { like: 13, dislike: 0 },
      comments: [{ id: 1, content: "C'est très inspirant !", reactions: { like: 2, help: 0, dislike: 0 } }]
    },
    {
      id: 2,
      title: "Expérience Bénévolat Environnement",
      content: "J'ai participé à un nettoyage de plage. C'était une expérience enrichissante.",
      volunteerTime: "15/12/2024",
      image: "/images/plage.avif",
      reactions: { like: 25, dislike: 0 },
      comments: [{ id: 1, content: "Bravo pour cette initiative !", reactions: { like: 1, help: 0, dislike: 0 } }]
    },
    {
      id: 3,
      title: "Soutien à un refuge pour animaux",
      content: "J'ai passé une journée dans un refuge pour animaux en aidant à nettoyer les espaces, nourrir les chiens et chats.",
      volunteerTime: "02/01/2025",
      image: "/images/chiens.jpg", // Ajoutez ici une image représentative
      reactions: { like: 30, dislike: 1 },
      comments: [
        { id: 1, content: "Magnifique travail ! Les animaux ont besoin de soutien.", reactions: { like: 5, help: 0, dislike: 0 } },
        { id: 2, content: "Bravo ! Cela inspire à faire de même.", reactions: { like: 3, help: 0, dislike: 0 } }
      ]
    }
  ];

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);
  const handleCommentChange = (e) => setComment(e.target.value);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSubmitPost = () => {
    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();

    if (!trimmedTitle || !trimmedContent) {
      alert('Veuillez remplir tous les champs obligatoires : titre et contenu.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const newPost = {
        id: Date.now(),
        title: trimmedTitle,
        content: trimmedContent,
        image,
        volunteerTime: new Date().toLocaleDateString(), // Ajout automatique de la date
        date: new Date().toLocaleDateString(),
        reactions: { like: 0, help: 0, dislike: 0 },
        comments: []
      };

      setPosts([newPost, ...posts]);
      setTitle('');
      setContent('');
      setImage(null);
      setLoading(false);
    }, 1000);
  };

  const handleAddComment = (postId) => {
    if (!comment.trim()) {
      alert('Veuillez écrire un commentaire avant de publier.');
      return;
    }

    const updatedPosts = posts.map((post) =>
      post.id === postId
        ? { ...post, comments: [...post.comments, { id: Date.now(), content: comment.trim(), reactions: { like: 0, help: 0, dislike: 0 } }] }
        : post
    );

    setPosts(updatedPosts);
    setComment('');
  };

  const handleReaction = (postId, commentId, type) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        if (commentId) {
          return {
            ...post,
            comments: post.comments.map((comment) =>
              comment.id === commentId
                ? { ...comment, reactions: { ...comment.reactions, [type]: comment.reactions[type] + 1 } }
                : comment
            )
          };
        } else {
          return {
            ...post,
            reactions: { ...post.reactions, [type]: post.reactions[type] + 1 }
          };
        }
      }
      return post;
    });

    setPosts(updatedPosts);
  };

  return (
    <div className="publication-page">
      <div className="header">
        <h1>Publier votre expérience</h1>
      </div>

      <div className="publication-form">
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Titre de la publication"
          className="input-field"
        />
        <textarea
          value={content}
          onChange={handleContentChange}
          placeholder="Écrivez votre message..."
          className="textarea-field"
        />
        <div className="image-upload">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="image-input"
          />
          {image && <img src={image} alt="Aperçu" className="image-preview" />}
        </div>
        <button onClick={handleSubmitPost} className="submit-btn" disabled={loading}>
          {loading ? 'Publication en cours...' : 'Publier'}
        </button>
      </div>

      <div className="posts-list">
        {posts.length === 0 && staticPosts.length === 0 ? (
          <p>Aucune publication pour le moment.</p>
        ) : (
          [...staticPosts, ...posts].map((post) => (
            <div key={post.id} className="post">
              <div className="post-header">
                <h3>{post.title}</h3>
                <span>{post.date}</span>
                <span className="volunteer-time">{post.volunteerTime}</span>
              </div>
              <p>{post.content}</p>
              {post.image && <img src={post.image} alt="Publication" className="post-image" />}
              <div className="reactions">
                <button onClick={() => handleReaction(post.id, null, 'like')}>👍 {post.reactions.like}</button>
                <button onClick={() => handleReaction(post.id, null, 'dislike')}>👎 {post.reactions.dislike}</button>
              </div>
              <div className="comment-section">
                <input
                  type="text"
                  value={comment}
                  onChange={handleCommentChange}
                  placeholder="Ajouter un commentaire..."
                  className="comment-input"
                />
                <button onClick={() => handleAddComment(post.id)} className="comment-btn">Commenter</button>
              </div>
              <div className="comments">
                {post.comments.map((comment) => (
                  <div key={comment.id} className="comment">
                    <p>{comment.content}</p>
                    <div className="comment-reactions">
                      <button onClick={() => handleReaction(post.id, comment.id, 'like')}>👍 {comment.reactions.like}</button>
                      <button onClick={() => handleReaction(post.id, comment.id, 'dislike')}>👎 {comment.reactions.dislike}</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Publication;
