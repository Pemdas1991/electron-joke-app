const { ipcRenderer } = require('electron');

const fetchJokeButton = document.getElementById('fetchJokeButton');
const tweetContainer = document.getElementById('tweetContainer');

fetchJokeButton.addEventListener('click', () => {
  ipcRenderer.send('fetchJoke');
});

ipcRenderer.on('joke', (event, joke) => {
  const tweet = document.createElement('div');
  tweet.className = 'tweet';

  const tweetHeader = document.createElement('div');
  tweetHeader.className = 'tweet-header';

  const tweetAvatar = document.createElement('div');
  tweetAvatar.className = 'tweet-avatar';

  const tweetUsername = document.createElement('div');
  tweetUsername.className = 'tweet-username';
  tweetUsername.innerText = 'Joke Bot';

  const tweetText = document.createElement('div');
  tweetText.className = 'tweet-text';
  tweetText.innerText = joke;

  const tweetDate = document.createElement('div');
  tweetDate.className = 'tweet-date';
  tweetDate.innerText = new Date().toLocaleString();

  tweetHeader.appendChild(tweetAvatar);
  tweetHeader.appendChild(tweetUsername);
  tweet.appendChild(tweetHeader);
  tweet.appendChild(tweetText);
  tweet.appendChild(tweetDate);

  tweetContainer.insertBefore(tweet, tweetContainer.firstChild);
});
