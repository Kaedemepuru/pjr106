// Scroll-reveal
const observer = new IntersectionObserver(
  (entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  }),
  { threshold: 0.12 }
);

function observeRevealElements() {
  document.querySelectorAll('.card, .about-inner, .works-header, .contact h2, .contact p, .contact-btn')
    .forEach((element) => {
      if (!element.classList.contains('reveal')) {
        element.classList.add('reveal');
      }
      observer.observe(element);
    });
}

observeRevealElements();

const translations = {
  cn: {
    navWorks: '作品',
    navAbout: '關於',
    navContact: '聯絡',
    heroEyebrow: 'pj R106 2026',
    heroTitle: '基動計畫<br /><span>No.R106</span>',
    worksHeading: '課程作品: ',
    worksSubheading: '每一幀，都是一次選擇。',
    aboutEyebrow: '基動計畫 R106',
    aboutTitle: '關於本網站',
    contactHeading: '有專案想聊？',
    contactText: '歡迎來信或私訊，期待與你合作。',
    contactBtn: '寫信給我',
    learnMore: '了解作品→',
    detailBack: '← 返回',
    cardHint: ''
  },
  en: {
    navWorks: 'Works',
    navAbout: 'About',
    navContact: 'Contact',
    heroEyebrow: 'pj R106 2026',
    heroTitle: 'Animation Project<br /><span>No. R106</span>',
    worksHeading: 'Works: ',
    worksSubheading: 'Every frame is a deliberate choice.',
    aboutEyebrow: 'pj R106',
    aboutTitle: 'About the Website',
    contactHeading: 'Have a project in mind?',
    contactText: 'Feel free to contact me, I would love to collaborate.',
    contactBtn: 'Write to me',
    learnMore: 'tap for more info→',
    detailBack: '← Back',
    cardHint: ''
  }
};

const pageContent = {
  cn: {
    aboutMainText: '',
    contactText: ''
  },
  en: {
    aboutMainText: '',
    contactText: ''
  },
  contactEmail: 'your@email.com'
};

const works = [
  {
    id: 'work01',
    tagCN: '作品',
    tagEN: 'Work',
    titleCN: '',
    titleEN: '',
    descCN: '',
    descEN: '',
    cover: 'works/work01/cover.png',
    preview: 'works/work01/preview.gif',
    youtubeUrl: '',
    href: 'work.html?work=work01',
    coverRatio: '16:9'
  },
  {
    id: 'work02',
    tagCN: '作品',
    tagEN: 'Work',
    titleCN: '',
    titleEN: '',
    descCN: '',
    descEN: '',
    cover: 'works/work02/cover.png',
    preview: 'works/work02/preview.gif',
    youtubeUrl: '',
    href: 'work.html?work=work02',
    coverRatio: '1:1'
  },
  {
    id: 'work03',
    tagCN: '作品',
    tagEN: 'Work',
    titleCN: '',
    titleEN: '',
    descCN: '',
    descEN: '',
    cover: 'works/work03/cover.png',
    preview: 'works/work03/preview.gif',
    youtubeUrl: '',
    href: 'work.html?work=work03',
    coverRatio: '4:3'
  },
  {
    id: 'work04',
    tagCN: '作品',
    tagEN: 'Work',
    titleCN: '',
    titleEN: '',
    descCN: '',
    descEN: '',
    cover: 'works/work04/cover.png',
    preview: 'works/work04/preview.gif',
    youtubeUrl: '',
    href: 'work.html?work=work04',
    coverRatio: '3:4'
  },
  {
    id: 'work05',
    tagCN: '作品',
    tagEN: 'Work',
    titleCN: '',
    titleEN: '',
    descCN: '',
    descEN: '',
    cover: 'works/work05/cover.png',
    preview: 'works/work05/preview.gif',
    youtubeUrl: '',
    href: 'work.html?work=work05',
    coverRatio: '16:9'
  }
];

function getFallbackTitle(id, lang) {
  const number = id.replace('work', '');
  return lang === 'en' ? `Work ${number}` : `作品 ${number}`;
}

function getFallbackProfile(id, lang) {
  const number = id.replace('work', '');
  return lang === 'en'
    ? `Details for Work ${number} will be added soon.`
    : `作品 ${number} 的詳細說明即將補上。`;
}

function normalizeRatio(value) {
  if (!value) return '16 / 9';
  const text = String(value).trim();
  if (text.includes('/')) return text.replace('/', ' / ');
  if (text.includes(':')) return text.replace(':', ' / ');
  return `${text} / 1`;
}

function getYouTubeEmbedUrl(url) {
  try {
    const parsedUrl = new URL(url);
    let videoId = '';

    if (parsedUrl.hostname === 'youtu.be') {
      videoId = parsedUrl.pathname.slice(1);
    } else if (parsedUrl.hostname === 'www.youtube.com' || parsedUrl.hostname === 'youtube.com') {
      videoId = parsedUrl.searchParams.get('v') || '';
      if (parsedUrl.pathname.startsWith('/shorts/')) {
        videoId = parsedUrl.pathname.split('/')[2] || '';
      }
    }

    return videoId ? `https://www.youtube.com/embed/${encodeURIComponent(videoId)}` : '';
  } catch (error) {
    return '';
  }
}

async function loadImageAspectRatio(url) {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => {
      const ratio = image.naturalWidth && image.naturalHeight
        ? `${image.naturalWidth} / ${image.naturalHeight}`
        : '16 / 9';
      resolve(ratio);
    };
    image.onerror = () => resolve('16 / 9');
    image.src = url;
  });
}

async function loadTextFile(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Unable to load text file');
    return (await response.text()).trim();
  } catch (error) {
    return '';
  }
}

async function loadWorksData() {
  for (const work of works) {
    work.titleCN = (await loadTextFile(`works/${work.id}/title_cn.txt`)) || getFallbackTitle(work.id, 'cn');
    work.titleEN = (await loadTextFile(`works/${work.id}/title_en.txt`)) || getFallbackTitle(work.id, 'en');
    work.descCN = (await loadTextFile(`works/${work.id}/profile_cn.txt`)) || getFallbackProfile(work.id, 'cn');
    work.descEN = (await loadTextFile(`works/${work.id}/profile_en.txt`)) || getFallbackProfile(work.id, 'en');
    work.youtubeUrl = getYouTubeEmbedUrl(await loadTextFile(`works/${work.id}/url.txt`));

    const ratioText = (await loadTextFile(`works/${work.id}/cover_ratio.txt`))?.trim();
    if (ratioText) {
      work.coverRatio = ratioText;
    } else {
      work.coverRatio = await loadImageAspectRatio(work.cover);
    }
  }
}

async function loadPageContent() {
  pageContent.cn.aboutMainText = (await loadTextFile('maintext_cn.txt')) || '這是展覽介紹。';
  pageContent.en.aboutMainText = (await loadTextFile('maintext_en.txt')) || 'This is the exhibition introduction.';
  const contactText = (await loadTextFile('contact.txt'))?.trim();
  pageContent.cn.contactText = contactText || '歡迎聯絡。';
  pageContent.en.contactText = contactText || 'Feel free to contact me.';
  const emailMatch = contactText?.match(/([\w.-]+@[\w.-]+\.[A-Za-z]{2,})/);
  pageContent.contactEmail = emailMatch ? emailMatch[1] : 'your@email.com';
}

function getSelectedLang(lang) {
  return lang === 'en' ? 'en' : 'cn';
}

function applyTranslations(lang) {
  const selectedLang = getSelectedLang(lang);
  const texts = translations[selectedLang];
  document.documentElement.lang = selectedLang === 'en' ? 'en' : 'zh-TW';

  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const key = element.dataset.i18n;
    if (texts[key]) {
      element.innerHTML = texts[key];
    }
  });

  document.querySelectorAll('.lang-btn').forEach((button) => {
    button.classList.toggle('active', button.dataset.lang === selectedLang);
  });

  renderAboutAndContact(selectedLang);
  renderWorks(selectedLang);
  loadDetailPage(selectedLang);

  localStorage.setItem('portfolio-lang', selectedLang);
}

function setupLanguageSwitch() {
  document.querySelectorAll('.lang-btn').forEach((button) => {
    button.addEventListener('click', () => {
      applyTranslations(button.dataset.lang);
    });
  });
}

function renderAboutAndContact(lang) {
  const selectedLang = getSelectedLang(lang);
  const aboutMainText = document.querySelector('[data-about-main]');
  if (aboutMainText) {
    aboutMainText.textContent = pageContent[selectedLang].aboutMainText;
  }

  const contactInfo = document.querySelector('[data-contact-info]');
  if (contactInfo) {
    contactInfo.textContent = pageContent[selectedLang].contactText;
  }

  const contactBtn = document.querySelector('.contact-btn');
  if (contactBtn) {
    contactBtn.setAttribute('href', `mailto:${pageContent.contactEmail}`);
  }
}

function renderWorks(lang) {
  const worksGrid = document.getElementById('works-grid');
  if (!worksGrid) return;

  const selectedLang = getSelectedLang(lang);
  const texts = translations[selectedLang];
  worksGrid.innerHTML = works.map((work) => {
    const title = selectedLang === 'en' ? work.titleEN : work.titleCN;
    const tag = selectedLang === 'en' ? work.tagEN : work.tagCN;
    const linkText = selectedLang === 'en' ? translations.en.learnMore : translations.cn.learnMore;
    const mediaMarkup = `
      <div class="card-media" style="--cover-ratio: ${normalizeRatio(work.coverRatio)};">
        <img class="card-cover" src="${work.cover}" alt="${title}" loading="lazy" />
        <img class="card-preview" src="${work.preview}" alt="${title} preview" loading="lazy" />
      </div>`;

    return `
      <article class="card card--featured">
        <a class="card-link-wrapper" href="${work.href}">
          ${mediaMarkup}
          <div class="card-body">
            <span class="card-tag">${tag}</span>
            <h3 class="card-title">${title}</h3>
            <span class="card-link">${linkText}</span>
          </div>
        </a>
      </article>`;
  }).join('');

  observeRevealElements();
}

async function loadDetailPage(lang) {
  const selectedLang = getSelectedLang(lang);
  const detailTitle = document.getElementById('detail-title');
  const detailProfile = document.getElementById('detail-profile');
  const backLink = document.querySelector('.back-link');

  if (!detailTitle && !detailProfile && !backLink) return;

  const params = new URLSearchParams(window.location.search);
  const workId = params.get('work') || 'work01';
  const work = works.find((item) => item.id === workId);
  if (!work) return;

  if (!work.titleCN || !work.titleEN || !work.descCN || !work.descEN) {
    await loadWorksData();
  }

  const selectedWork = works.find((item) => item.id === workId);
  if (!selectedWork) return;

  if (detailTitle) {
    detailTitle.textContent = selectedLang === 'en' ? selectedWork.titleEN : selectedWork.titleCN;
  }

  if (detailProfile) {
    detailProfile.textContent = selectedLang === 'en' ? selectedWork.descEN : selectedWork.descCN;
  }

  if (backLink) {
    backLink.textContent = selectedLang === 'en' ? translations.en.detailBack : translations.cn.detailBack;
  }

  const videoFrame = document.querySelector('.detail-video iframe');
  if (videoFrame) {
    videoFrame.setAttribute('src', selectedWork.youtubeUrl || 'about:blank');
    videoFrame.setAttribute('title', selectedLang === 'en' ? `${selectedWork.titleEN} video` : `${selectedWork.titleCN} 影片`);
  }
}

setupLanguageSwitch();

// Nav 滚动变深
const nav = document.querySelector('.nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.style.borderBottomColor = window.scrollY > 10 ? 'var(--border)' : 'transparent';
  }, { passive: true });
}

(async function initializePortfolio() {
  await loadPageContent();
  await loadWorksData();
  const initialLang = localStorage.getItem('portfolio-lang') || (navigator.language.startsWith('en') ? 'en' : 'cn');
  applyTranslations(initialLang);
})();
