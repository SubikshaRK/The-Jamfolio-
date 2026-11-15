const storefrontScene = document.getElementById("storefrontScene");
const interiorScene = document.getElementById("interiorScene");
const storefront = document.getElementById("storefront");
const enterButton = document.getElementById("enterButton");
const doorButton = document.getElementById("doorButton");
const backButton = document.getElementById("backButton");
let isTransitioning = false;

function enterShop() {
  if (isTransitioning) return;
  isTransitioning = true;
  storefront.classList.add("is-opening");
  window.setTimeout(() => {
    storefrontScene.hidden = true;
    interiorScene.hidden = false;
    interiorScene.classList.add("is-visible");
    isTransitioning = false;
  }, 950);
}
function returnToStorefront() {
  interiorScene.classList.remove("is-visible");
  interiorScene.hidden = true;
  storefrontScene.hidden = false;
  storefront.classList.remove("is-opening");
  window.scrollTo({ top: 0, behavior: "smooth" });
}
enterButton.addEventListener("click", enterShop);
doorButton.addEventListener("click", enterShop);
backButton.addEventListener("click", returnToStorefront);

const portfolioScene = document.getElementById("portfolioScene");
const exploreCounterButton = document.getElementById("exploreCounterButton");
const backToShopButton = document.getElementById("backToShopButton");
function showPortfolioCounter() {
  interiorScene.classList.remove("is-visible");
  interiorScene.hidden = true;
  portfolioScene.hidden = false;
  requestAnimationFrame(() => portfolioScene.classList.add("is-visible"));
}
function returnToStockedShop() {
  closeCollage();
  portfolioScene.classList.remove("is-visible");
  window.setTimeout(() => {
    portfolioScene.hidden = true;
    interiorScene.hidden = false;
    interiorScene.classList.add("is-visible");
  }, 450);
}
exploreCounterButton.addEventListener("click", showPortfolioCounter);
backToShopButton.addEventListener("click", returnToStockedShop);

const jarButtons = [...document.querySelectorAll(".jar-choice[data-category]")];
const jamSpread = document.getElementById("jamSpread");
const toastContent = document.getElementById("toastContent");
const contentEyebrow = document.getElementById("contentEyebrow");
const contentTitle = document.getElementById("contentTitle");
const contentBody = document.getElementById("contentBody");
const collage = document.getElementById("portfolioCollage");
const collageDimmer = document.getElementById("collageDimmer");
let selectionTimer;

const portfolioContent = {
  education: {
    flavour: "Strawberry", jam: "assets/toast/jam-strawberry.png", title: "Learning, always",
    body: `<p>Two complementary degrees, one curious mind.</p><p><strong>SRM Institute of Science and Technology</strong><br>B.Tech · Computer Science & Engineering (AI/ML)<br><small>Expected 2028</small></p><p><strong>Indian Institute of Management Bangalore</strong><br>BBA · Digital Business & Entrepreneurship<br><small>Expected 2029</small></p>`,
    cards: [
      {kind:"photo", image:"assets/portfolio/srm-campus.jpg", title:"SRM Institute of Science & Technology", note:"Computer Science & Engineering · AI/ML"},
      {kind:"note", title:"Two lenses, one direction", note:"Technology helps me understand what can be built. Business helps me think about why it should be built and who it serves."},
      {kind:"photo", image:"assets/portfolio/iimb-campus.jpg", title:"IIM Bangalore", note:"Digital Business & Entrepreneurship"}
    ]
  },
  experience: {
    flavour: "Blueberry", jam: "assets/toast/jam-blueberry.png", title: "Making things happen",
    body: `<p><strong>Founder & Creative Director · Rarekey Labs</strong></p><p>A creative studio where ideas move from conversations to campaigns and production.</p><p>I work across creative direction, client communication, campaign planning, content strategy, pitching, budgeting, production and team coordination.</p>`,
    cards: [
      {kind:"photo", image:"assets/portfolio/rarekey-logo.jpg", title:"Rarekey Labs", note:"Independent creative studio"},
      {kind:"photo", image:"assets/portfolio/rarekey-production.jpg", title:"On set", note:"Production environment & shoot preparation"},
      {kind:"photo", image:"assets/portfolio/rarekey-shoot.jpg", title:"Behind the camera", note:"Coordinating visual production"},
      {kind:"photo", image:"assets/portfolio/rarekey-workstation.jpg", title:"At the worktable", note:"Planning, editing & creative development"},
      {kind:"note", title:"What I bring together", note:"Creative direction · Client relationships · Campaign thinking · Production management · Budgeting · Team coordination"}
    ]
  },
  projects: {
    flavour: "Marmalade", jam: "assets/toast/jam-marmalade.png", title: "Things I've been building",
    body: `<p>A mix of independent product exploration and collaborative technical projects.</p><p><strong>Orvia</strong> — an adaptive goal scheduler for students, designed to plan around competing goals, commitments and changing schedules.</p><p><strong>BuzzTrader</strong> — a FinBERT-based stock-news sentiment analysis dashboard.</p>`,
    cards: [
      {kind:"photo", image:"assets/portfolio/buzztrader-dashboard.jpg", title:"BuzzTrader · Stock intelligence", note:"FinBERT sentiment · correlation · divergence analysis"},
      {kind:"note", title:"Orvia · Adaptive Goal Scheduler", note:"An independent product initiative exploring weekly planning, task dependencies, capacity-aware scheduling and schedule revisions. My work spans product concept, requirements, feature planning and implementation coordination."},
      {kind:"note", title:"Other explorations", note:"AI Budget Analyzer — collaborative exploration of AI-assisted budgeting.\n\nVisitor Entry & Gatepass — collaborative system concept for managing visitor access."},
      {kind:"tag", title:"Technical ingredients", note:"Python · FastAPI · Next.js · CP-SAT · FinBERT · Machine Learning"}
    ]
  },
  skills: {
    flavour: "Raspberry", jam: "assets/toast/jam-raspberry.png", title: "A mixed skill set",
    body: `<p>I enjoy moving between the creative, commercial and technical sides of a problem.</p><p><strong>Business & strategy:</strong> planning, pitching, budgeting, client communication and coordination.</p><p><strong>Creative:</strong> creative direction, content strategy, visual storytelling and production.</p><p><strong>Product & technology:</strong> product ideation, PRDs, Python, HTML, CSS, SQL, machine learning and AI tools.</p>`,
    cards: [
      {kind:"note", title:"Business & strategy", note:"Campaign planning · Client management · Pitching · Budgeting · Project coordination"},
      {kind:"note", title:"Creative practice", note:"Creative direction · Content strategy · Visual storytelling · Production planning"},
      {kind:"note", title:"Product thinking", note:"Problem framing · Product ideation · PRD writing · Feature planning · User-focused thinking"},
      {kind:"tag", title:"Technology toolkit", note:"Python · HTML · CSS · SQL · Machine Learning · AI tools"}
    ]
  },
  achievements: {
    flavour: "Apricot", jam: "assets/toast/jam-apricot.png", title: "Little wins along the way",
    body: `<p>Every little win, competition and experience has added something to who I am today.</p><p><strong>Academic:</strong> Secured third rank in my school Class 12 examinations.</p><p><strong>Competitions:</strong> Participated in and won multiple competitions throughout my school and college years.</p><p><strong>Public speaking:</strong> Won multiple first-place English oratorical awards and one third-place award.</p><p><strong>Leadership:</strong> Led my school Kho-Kho team for two years.</p><p><strong>Performance:</strong> College group dance team — third prize at Gojan Festopia 2026.</p><p><strong>And more:</strong> Countless experiences, recognitions, team moments and memories that don't fit into one list.</p>`,
    cards: [
      {kind:"photo", image:"assets/portfolio/college-dance-team.jpg", title:"The team", note:"College dance team · LIBA, Chennai"},
      {kind:"photo", image:"assets/portfolio/dance-award.jpg", title:"A stage-earned memory", note:"Group dance · Inter & Intra Collegiate Cultural Fests"},
      {kind:"note", title:"Beyond the classroom", note:"Public speaking, team sport and performance have all taught me to prepare, collaborate and show up for a team."},
      {kind:"tag", title:"Other milestones", note:"Class 12 school third rank · English oratorical awards · Two years as school Kho-Kho team leader"}
    ]
  },
  certifications: {
    flavour: "Blackberry", jam: "assets/toast/jam-blackberry.png", title: "Things I've learned",
    body: `<p>A growing collection of courses and structured learning beyond the classroom.</p><p><strong>Machine Learning Using Python</strong> · Simplilearn SkillUp · 24 Oct 2026</p><p><strong>Fundamentals of Operating Systems</strong> · Udemy · 22 Oct 2025</p><p><strong>Python Data Structures & Algorithms + LeetCode Exercises</strong> · Udemy · 15 Oct 2025</p>`,
    cards: [
      {kind:"certificate", image:"assets/portfolio/cert-machine-learning.jpg", title:"Machine Learning Using Python", note:"Simplilearn SkillUp · 24 October 2026"},
      {kind:"certificate", image:"assets/portfolio/cert-operating-systems.jpg", title:"Fundamentals of Operating Systems", note:"Udemy · 22 October 2025"},
      {kind:"certificate", image:"assets/portfolio/cert-python-dsa.jpg", title:"Python Data Structures & Algorithms + LeetCode Exercises", note:"Udemy · 15 October 2025"}
    ]
  }
};

function renderCollage(item) {
  collage.innerHTML = item.cards.map((card, index) => {
    const delay = index * 90;
    if (card.kind === "photo" || card.kind === "certificate") {
      return `<article class="scrap-card scrap-photo ${card.kind === "certificate" ? "scrap-certificate" : ""}" style="--card-delay:${delay}ms"><img src="${card.image}" alt="${card.title}"><div class="scrap-caption"><strong>${card.title}</strong><span>${card.note}</span></div></article>`;
    }
    return `<article class="scrap-card scrap-note ${card.kind === "tag" ? "scrap-tag" : ""}" style="--card-delay:${delay}ms"><span class="scrap-pin" aria-hidden="true">✦</span><strong>${card.title}</strong><p>${card.note.replace(/\n/g,"<br>")}</p></article>`;
  }).join("");
  collage.hidden = false;
  collage.classList.remove("is-open");
  requestAnimationFrame(() => collage.classList.add("is-open"));
}

function selectPortfolioJar(category) {
  const item = portfolioContent[category];
  if (!item) return;
  window.clearTimeout(selectionTimer);
  jarButtons.forEach((button) => {
    const selected = button.dataset.category === category;
    button.classList.toggle("is-selected", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
  portfolioScene.classList.remove("has-selection", "is-spreading", "knife-down");
  collage.classList.remove("is-open");
  collage.hidden = true;
  void portfolioScene.offsetWidth;
  portfolioScene.classList.add("is-spreading");
  toastContent.hidden = true;
  jamSpread.src = item.jam;
  contentEyebrow.textContent = `${item.flavour} preserve · ${category}`;
  contentTitle.textContent = item.title;
  contentBody.innerHTML = item.body;
  selectionTimer = window.setTimeout(() => {
    portfolioScene.classList.remove("is-spreading");
    portfolioScene.classList.add("has-selection", "knife-down");
    toastContent.hidden = false;
    collageDimmer.classList.add("is-visible");
    renderCollage(item);
  }, 1150);
}

function closeCollage() {
  window.clearTimeout(selectionTimer);
  portfolioScene.classList.remove("has-selection", "is-spreading", "knife-down");
  collage.classList.remove("is-open");
  collage.hidden = true;
  collage.innerHTML = "";
  collageDimmer.classList.remove("is-visible");
  jarButtons.forEach((button) => {
    button.classList.remove("is-selected");
    button.setAttribute("aria-pressed", "false");
  });
  toastContent.hidden = true;
  contentBody.innerHTML = "";
  jamSpread.removeAttribute("src");
}

jarButtons.forEach((button) => {
  button.setAttribute("aria-pressed", "false");
  button.addEventListener("click", () => selectPortfolioJar(button.dataset.category));
});
collageDimmer.addEventListener("click", closeCollage);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && portfolioScene.classList.contains("has-selection")) closeCollage();
});
backToShopButton.addEventListener("click", closeCollage);
