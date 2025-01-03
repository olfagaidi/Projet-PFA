import React, { useState } from 'react';
import './Chatbot.css'

const BenevolatChatbot = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Bonjour ! Je suis là pour répondre à vos questions sur le bénévolat.' },
    { sender: 'bot', text: 'Dans quel domaine souhaitez-vous faire du bénévolat ? Santé, Animaux, Social ?' },
  ]);
  const [userInput, setUserInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [userResponses, setUserResponses] = useState([]);

  // Fonction pour gérer la soumission de la réponse de l'utilisateur
  const handleUserSubmit = (event) => {
    event.preventDefault();

    const newMessages = [...messages, { sender: 'user', text: userInput }];

    // Logique des questions
    if (userResponses.length === 0) {
      newMessages.push({
        sender: 'bot',
        text: `Merci pour votre choix, vous souhaitez faire du bénévolat dans le domaine de ${userInput}. Pourquoi voulez-vous participer à un événement ?`,
      });
      setUserResponses([...userResponses, userInput]);
    } else if (userResponses.length === 1) {
      newMessages.push({
        sender: 'bot',
        text: `Merci pour votre réponse. Quel événement vous intéresse ?`,
      });
      setUserResponses([...userResponses, userInput]);
    } else if (userResponses.length === 2) {
      newMessages.push({
        sender: 'bot',
        text: `Avez-vous des questions concernant l'événement ? Par exemple : la date, les détails de l'événement, ou si vous souhaitez partager un événement avec nous.`,
      });
      setUserResponses([...userResponses, userInput]);
    } else {
      newMessages.push({
        sender: 'bot',
        text: `Merci pour vos réponses ! Si vous avez d'autres questions, n'hésitez pas à les poser.`,
      });
      setUserResponses([...userResponses, userInput]);
    }

    setMessages(newMessages);
    setUserInput('');
  };

  // Fonction pour basculer l'état d'ouverture du chatbot
  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button className="chatbot-toggle-button" onClick={toggleChatbot}>
        {isOpen ? '❌' : '💬'}
      </button>

      {isOpen && (
        <div className="chatbot-container">
          <h3 className="chatbot-title">Chatbot Bénévolat</h3>

          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={message.sender === 'bot' ? 'chatbot-message-bot' : 'chatbot-message-user'}
              >
                <strong>{message.sender === 'bot' ? 'Bot' : 'Vous'} :</strong>
                <p>{message.text}</p>
              </div>
            ))}
          </div>

          <form onSubmit={handleUserSubmit}>
            <input
              className="chatbot-input"
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Tapez votre réponse..."
            />
            <button className="chatbot-submit-button" type="submit">
              Envoyer
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default BenevolatChatbot;
