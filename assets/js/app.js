// Variables
const listaTweets = document.getElementById('lista-tweets');

//Event Listeners
eventListeners();

function eventListeners() {
  //Envio del formulario
  document
    .querySelector('#formulario')
    .addEventListener('submit', agregarTweet);

  //Borrar tweets
  listaTweets.addEventListener('click', borrarTweets);

  //Contenido Cargado
  document.addEventListener('DOMContentLoaded', localStorageListo);
}

// Functions
//Agregar Tweet del formulario
function agregarTweet(e) {
  e.preventDefault();
  //leer el valor del textarea
  const tweet = document.getElementById('tweet').value;
  //Crear boton de eliminar
  const botonBorrar = document.createElement('a');
  botonBorrar.classList = 'borrar-tweet';
  botonBorrar.innerText = 'X';

  //Crear elemento y añadirle el contenido a la lista
  const li = document.createElement('li');
  li.innerText = tweet;
  //añade el boton de borrar
  li.appendChild(botonBorrar);
  //añade el tweet a la lista
  listaTweets.appendChild(li);
  //añadir al localStorage
  agregarTweetLocalStorage(tweet);
}

//Borrar tweet
function borrarTweets(e) {
  e.preventDefault();
  if (e.target.className === 'borrar-tweet') {
    e.target.parentElement.remove();
    borrarTweetsLocalStorage(e.target.parentElement.innerText);
  }
}

//Agregar Tweet desde local storage
function agregarTweetLocalStorage(tweet) {
  let tweets;
  tweets = obtenerTweetsLocalStorage();
  //añadir nuevo tweets
  tweets.push(tweet);
  //Covertir de string a arreglo para localstorage
  localStorage.setItem('tweets', JSON.stringify(tweets));
}

//Comprobar elementos en local Storage
function obtenerTweetsLocalStorage() {
  let tweets;
  if (localStorage.getItem('tweets') === null) {
    tweets = [];
  } else {
    tweets = JSON.parse(localStorage.getItem('tweets'));
  }
  return tweets;
}

//Mostror datos de local storage
function localStorageListo() {
  let tweets;
  tweets = obtenerTweetsLocalStorage();
  tweets.forEach(function (tweet) {
    const botonBorrar = document.createElement('a');
    botonBorrar.classList = 'borrar-tweet';
    botonBorrar.innerText = 'X';

    //Crear elemento y añadirle el contenido a la lista
    const li = document.createElement('li');
    li.innerText = tweet;
    //añade el boton de borrar
    li.appendChild(botonBorrar);
    //añade el tweet a la lista
    listaTweets.appendChild(li);
  });
}

//ELiminar tweet de local Storage
function borrarTweetsLocalStorage(tweet) {
  let tweets, tweetBorrar;
  //ELiminar la X del Tweet
  tweetBorrar = tweet.substring(0, tweet.length - 1);

  tweets = obtenerTweetsLocalStorage();

  tweets.forEach(function (tweet, index) {
    if (tweetBorrar === tweet) {
      tweets.splice(index, 1);
    }
  });

  localStorage.setItem('tweets', JSON.stringify(tweets));
}
