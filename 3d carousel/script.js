(function () {
  'use strict';

  const get = (target) => {
    return document.querySelector(target);
  };

  const cellCount = 6;
  let selectIndex = 0;
  const carousel = get('.carousel');
  const prevButton = get('.prev_button');
  const nextButton = get('.next_button');

  const rotateCarousel = () => {
    // 실제로는 반대로 각도를 돌려야 정방향으로 회전함
    const angle = (selectIndex / cellCount) * -360;
    carousel.style.transform = `translateZ(-346px) rotateY(${angle}deg)`;
  };

  prevButton.addEventListener('click', () => {
    selectIndex--;
    rotateCarousel();
  });

  nextButton.addEventListener('click', () => {
    selectIndex++;
    rotateCarousel();
  });
})();
