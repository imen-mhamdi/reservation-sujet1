// Sélectionner l'élément HTML avec la classe 'container'
const container = document.querySelector('.container');

// Sélectionner tous les sièges qui ne sont pas occupés à l'intérieur des rangées
const seats = document.querySelectorAll('.row .seat:not(.occupied)');

// Sélectionner l'élément HTML avec l'id 'count' pour afficher le nombre de sièges sélectionnés
const count = document.getElementById('count');

// Sélectionner l'élément HTML avec l'id 'total' pour afficher le coût total des sièges sélectionnés
const total = document.getElementById('total');

// Sélectionner l'élément HTML avec l'id 'movie' pour choisir le film
const movieSelect = document.getElementById('movie');

// Ajouter un écouteur d'événements pour le clic sur le conteneur
container.addEventListener('click', (e) => {
    // Vérifier si l'élément cliqué est un siège non occupé
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
      // Basculer l'état de sélection du siège
      e.target.classList.toggle('selected');
      // Mettre à jour le nombre de sièges sélectionnés et le coût total
      updateSelectedCount();
    }
  });

// Initialiser le prix du billet avec la valeur du film sélectionné
let ticketPrice = +movieSelect.value;

// Fonction pour sauvegarder le prix du film sélectionné dans le stockage local
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

// Fonction pour mettre à jour le nombre de sièges sélectionnés et le coût total
function updateSelectedCount() {
  // Sélectionner tous les sièges qui sont actuellement sélectionnés
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  // Créer un tableau des indices des sièges sélectionnés
  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  // Sauvegarder les indices des sièges sélectionnés dans le stockage local
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  // Calculer le nombre de sièges sélectionnés
  const selectedSeatsCount = selectedSeats.length;

  // Afficher le nombre de sièges sélectionnés et le coût total
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}


// Ajouter un écouteur d'événements pour le changement de film
movieSelect.addEventListener('change', (e) => {
  // Mettre à jour le prix du billet avec la nouvelle valeur du film
  ticketPrice = +e.target.value;
  // Sauvegarder les données du nouveau film dans le stockage local
  setMovieData(e.target.selectedIndex, e.target.value);
  // Mettre à jour le nombre de sièges sélectionnés et le coût total
  updateSelectedCount();
});


// Mettre à jour le nombre de sièges sélectionnés et le coût total au chargement initial de la page
updateSelectedCount();
