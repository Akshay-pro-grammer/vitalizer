 async function sendMessage() {
    const message = document.getElementById('userMessage').value;
    displayMessage('user', message); 
    document.getElementById('userMessage').value = ''; 

    try {
      const response = await fetch('/chat/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });

      const data = await response.json();
      displayMessage('bot', data.response); 
    } catch (error) {
      console.error('Error:', error);
      displayMessage('bot', "Sorry, something went wrong.");
    }
  }

  function displayMessage(sender, text) {
    const messagesContainer = document.getElementById('messages');
    const messageElement = document.createElement('div');
    messageElement.className = sender === 'user' ? 'text-right' : 'text-left';
    messageElement.classList.add('my-2', 'px-4', 'py-2', 'rounded');

    if (sender === 'user') {
      messageElement.classList.add('bg-blue-400', 'text-white', 'dark:bg-blue-700');
  } else {
      messageElement.classList.add('bg-gray-400', 'text-white', 'dark:bg-gray-700');
  }
    messageElement.classList.add('text-black');
    messageElement.innerHTML = text.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>").replace(/\* /g, "<br>");
    messagesContainer.appendChild(messageElement);
    const element=document.createElement('strong');
    element.innerText="\n~"+sender;
    messageElement.appendChild(element);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }