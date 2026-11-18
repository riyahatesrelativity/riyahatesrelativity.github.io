const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuButton?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));

const projectDetails = {
  tensioner: {
    kicker: 'MECHANICAL DESIGN / UNIVERSITY PROJECT',
    title: 'Track Tensioner Design',
    paragraphs: [
      'The design challenge is to develop a manually operated tensioning mechanism for a track system. The work considers how the mechanism applies tension, how it is mounted securely and how the operator interacts with it.',
      'The design process includes identifying requirements, comparing concepts, developing a CAD design and using engineering calculations to assess motion, forces, material suitability and mounting arrangements.',
      'Evidence to add: your final CAD assembly, labelled concept sketches, free-body diagram, kinematics calculations, material-selection rationale and technical drawing. Only include final dimensions and results once they have been checked against your design.'
    ]
  },
  'uk seds': {
    kicker: 'UKSEDS SATELLITE DESIGN COMPETITION / 2026–27',
    title: 'Optical Communications CubeSat',
    paragraphs: [
      'I am part of the University of Brighton team competing in the UKSEDS Satellite Design Competition 2026/27. The team mission centres on optical communications, and I contribute within the mechanical design team.',
      'The mechanical work is concerned with the spacecraft structure, component arrangement, mounting interfaces and design considerations that help the satellite withstand its operating and launch environments.',
      'As this is an ongoing team project, this portfolio will be updated as the design develops. Team contributions will be clearly distinguished from my individual work.'
    ]
  },
  bluetti: {
    kicker: 'XE421 ENGINEERING PRACTICE / GROUP INVESTIGATION',
    title: 'BLUETTI AC180 Power Station',
    paragraphs: [
      'This group investigation examines whether a portable battery power station can deliver a useful service safely, with evidence that supports a defensible engineering judgement.',
      'The test approach focuses on a controlled AC discharge, measuring delivered AC power and energy alongside displayed state of charge and external case temperature. The investigation distinguishes measured data from calculated values and manufacturer specifications.',
      'Evidence to add: approved test procedure, instrument details, original readings, power-versus-time graph, energy calculation, temperature record and evaluation. Do not present synthetic practice data as real test results.'
    ]
  }
};

const detailPanel = document.querySelector('#project-detail');
document.querySelectorAll('.project-toggle').forEach(button => {
  button.addEventListener('click', () => {
    const key = button.dataset.project;
    const detail = projectDetails[key];
    if (!detail || !detailPanel) return;
    document.querySelector('#detail-kicker').textContent = detail.kicker;
    document.querySelector('#detail-title').textContent = detail.title;
    const copy = document.querySelector('#detail-copy');
    copy.replaceChildren(...detail.paragraphs.map(text => {
      const p = document.createElement('p');
      p.textContent = text;
      return p;
    }));
    detailPanel.hidden = false;
    document.querySelectorAll('.project-toggle').forEach(item => item.setAttribute('aria-expanded', String(item === button)));
    detailPanel.scrollIntoView({behavior: 'smooth', block: 'center'});
  });
});
document.querySelector('.detail-close')?.addEventListener('click', () => {
  detailPanel.hidden = true;
  document.querySelectorAll('.project-toggle').forEach(item => item.setAttribute('aria-expanded', 'false'));
});

document.querySelector('#year').textContent = new Date().getFullYear();
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {threshold: 0.12});
document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
