import React, { useState } from 'react';
import './publication.css';

const Publication = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null); // Pour stocker l'image
  const [comment, setComment] = useState('');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Gérer les changements du titre, contenu, commentaire et image
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);
  const handleCommentChange = (e) => setComment(e.target.value);

  // Gérer le changement de l'image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Afficher l'image sélectionnée
    }
  };

  // Ajouter un nouveau post
  const handleSubmitPost = () => {
    if (!title || !content) {
      alert('Veuillez remplir le titre et le contenu avant de publier.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const newPost = {
        id: Date.now(),
        title,
        content,
        image,
        date: new Date().toLocaleDateString(),
        reactions: {
          like: 0,
          help: 0,
          dislike: 0
        },
        comments: []
      };

      setPosts([newPost, ...posts]); // Ajouter le nouveau post au début
      setTitle('');
      setContent('');
      setImage(null); // Réinitialiser l'image
      setLoading(false);
    }, 1000); // Simuler un délai pour l'ajout du post
  };

  // Ajouter un commentaire à un post
  const handleAddComment = (postId) => {
    if (!comment) {
      alert('Veuillez écrire un commentaire avant de publier.');
      return;
    }

    const updatedPosts = posts.map((post) =>
      post.id === postId
        ? { ...post, comments: [...post.comments, { id: Date.now(), content: comment, reactions: { like: 0, help: 0, dislike: 0 } }] }
        : post
    );

    setPosts(updatedPosts);
    setComment('');
  };

  // Ajouter une réaction à un post ou un commentaire
  const handleReaction = (postId, commentId, type) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        if (commentId) {
          // Réaction à un commentaire
          return {
            ...post,
            comments: post.comments.map((comment) =>
              comment.id === commentId
                ? {
                    ...comment,
                    reactions: {
                      ...comment.reactions,
                      [type]: comment.reactions[type] + 1
                    }
                  }
                : comment
            )
          };
        } else {
          // Réaction à un post
          return {
            ...post,
            reactions: {
              ...post.reactions,
              [type]: post.reactions[type] + 1
            }
          };
        }
      }
      return post;
    });

    setPosts(updatedPosts);
  };

  return (
    <div className="publication-page">
      {/* Header de la page */}
      <div className="header">
        <h1>Publier une nouvelle discussion</h1>
      </div>

      {/* Formulaire de publication */}
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

        {/* Ajouter une image */}
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

      {/* Liste des publications */}
      <div className="posts-list">
        {posts.length === 0 ? (
          <p>Aucune publication pour le moment.</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="post">
              <div className="post-header">
                <h3>{post.title}</h3>
                <span>{post.date}</span>
              </div>
              <p>{post.content}</p>

              {/* Affichage de l'image dans le post */}
              {post.image && <img src={post.image} alt="Publication" className="post-image" />}

              {/* Réactions du post */}
              <div className="reactions">
                <button onClick={() => handleReaction(post.id, null, 'like')}>👍 {post.reactions.like}</button>
                <button onClick={() => handleReaction(post.id, null, 'dislike')}>👎 {post.reactions.dislike}</button>
              </div>

              {/* Ajouter un commentaire */}
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

              {/* Liste des commentaires */}
              <div className="comments">
                {post.comments.map((comment) => (
                  <div key={comment.id} className="comment">
                    <p>{comment.content}</p>

                    {/* Réactions du commentaire */}
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
