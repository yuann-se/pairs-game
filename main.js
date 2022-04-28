window.addEventListener('DOMContentLoaded', () => {

    const givenArray = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
    let shuffledArray;

    function shuffle(array) {
        let currentIndex = array.length, temporaryValue, randomIndex;
      
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
      
        return array;
      }
      
      shuffledArray = shuffle(givenArray);

      const cards = document.querySelectorAll('.card');
      let lastTwoCards = [];

      for (let i = 0; i < cards.length; ++i) {
          cards[i].children[0].textContent = shuffledArray[i];
          cards[i].setAttribute('id', `${i}`);
      };
      

      cards.forEach((card) => {
      card.addEventListener('click', () => {
          card.classList.add('is-flipped');
        
        if (lastTwoCards.length === 2) {
            if (document.getElementById(`${lastTwoCards[0]}`).children[0].textContent !== document.getElementById(`${lastTwoCards[1]}`).children[0].textContent) {
                document.getElementById(`${lastTwoCards[0]}`).classList.remove('is-flipped');
                document.getElementById(`${lastTwoCards[1]}`).classList.remove('is-flipped');
            }
            lastTwoCards = [];
        }

        if (lastTwoCards.length < 2) {
            lastTwoCards.push(card.attributes.id.value);
        }

        if (document.querySelectorAll('.is-flipped').length === 16) {
            setTimeout(() => {
                document.querySelector('.row').style.display = 'none';
            document.querySelector('.success-img').style.display = 'block';
            }, 1000)
            
        }


      })
    })












});