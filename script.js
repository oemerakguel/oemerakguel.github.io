document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("#menu a");
  const sections = document.querySelectorAll(".section");

  links.forEach((link, index) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetSection = sections[index];

      const targetPosition = targetSection.offsetLeft;
      const currentPosition = window.scrollX;

      let startTime = null;

      function animateScroll(currentTime) {
        if (!startTime) startTime = currentTime;
        const elapsedTime = currentTime - startTime;

        const easeInOutQuad = (t, b, c, d) => {
          t /= d / 2;
          if (t < 1) return (c / 2) * t * t + b;
          t--;
          return (-c / 2) * (t * (t - 2) - 1) + b;
        };

        const duration = 1000;
        const distance = targetPosition - currentPosition;
        const scrollValue = easeInOutQuad(
          elapsedTime,
          currentPosition,
          distance,
          duration
        );

        window.scrollTo(scrollValue, 0);

        if (elapsedTime < duration) {
          requestAnimationFrame(animateScroll);
        }
      }

      requestAnimationFrame(animateScroll);
    });
  });

});


let restart = document.querySelector('#restartButton');
restart.addEventListener('click', restartAnimation, false);

function restartAnimation(event) {
  let skillFills = document.querySelectorAll('.skill-fill');

  skillFills.forEach(skillFill => {

    skillFill.style.animationName = 'none';

    requestAnimationFrame(() => {
      skillFill.style.animationName = '';

    });
  });
}

let restartsquare = document.querySelector('#squareButton');
restartsquare.addEventListener('click', restartSquares, false);

function restartSquares(event) {
  let square = document.querySelectorAll('.item');

  square.forEach(squares => {

    squares.style.animationName = 'none';

    
    requestAnimationFrame(() => {
      squares.style.animationName = '';
    });
  });
}