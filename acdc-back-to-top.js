(function() {
  // Injeta o CSS
  const style = document.createElement('style');
  style.textContent = `
    .btt-container {
      position: fixed;
      bottom: 96px;
      right: 25px;
      z-index: 9999;
      width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      opacity: 0;
      visibility: hidden;
      transform: scale(0.8);
      padding: 0;
      margin: 0;
      border: none;
      background: transparent;
      border-radius: 50%;
      transition: opacity 0.4s ease, visibility 0.4s ease, transform 0.3s ease;
    }

    .btt-container.is-visible {
      opacity: 1;
      visibility: visible;
      transform: scale(1);
    }

    .btt-container:hover {
      transform: translateY(-5px);
    }

    .btt-progress-svg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      transform: rotate(-90deg);
    }

    .btt-progress-circle {
      fill: rgba(0, 0, 0, 0.8);
      stroke: #25d366;
      stroke-width: 4;
      transition: stroke-dashoffset 0.1s linear;
    }

    .btt-icon {
      position: relative;
      z-index: 2;
      width: 20px;
      height: 20px;
      fill: none;
      stroke: #ffffff;
      stroke-width: 3;
      stroke-linecap: round;
      stroke-linejoin: round;
      transition: stroke 0.3s;
    }
  `;
  document.head.appendChild(style);

  // Cria o botão
  const btt = document.createElement('button');
  btt.type = 'button';
  btt.className = 'btt-container';
  btt.id = 'back-to-top';
  btt.title = 'Voltar ao Topo';
  btt.setAttribute('aria-label', 'Voltar ao topo');
  btt.innerHTML = `
    <svg class="btt-progress-svg" viewBox="0 0 50 50">
      <circle class="btt-progress-circle" cx="25" cy="25" r="23"></circle>
    </svg>
    <svg class="btt-icon" viewBox="0 0 24 24">
      <polyline points="18 15 12 9 6 15"></polyline>
    </svg>
  `;
  document.body.appendChild(btt);

  const circle = btt.querySelector('.btt-progress-circle');
  const totalLength = 2 * Math.PI * circle.r.baseVal.value;
  circle.style.strokeDasharray = totalLength;
  circle.style.strokeDashoffset = totalLength;

  let ticking = false;

  function updateScroll() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    btt.classList.toggle('is-visible', scrollTop > 300);

    if (docHeight > 0) {
      const progress = scrollTop / docHeight;
      circle.style.strokeDashoffset = totalLength - (progress * totalLength);
    }
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateScroll);
      ticking = true;
    }
  }, { passive: true });

  btt.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();
