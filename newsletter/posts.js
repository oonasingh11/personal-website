const formatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});

export const posts = [
  {
    slug: 'why-sending-money-is-harder-than-sending-a-text',
    title: 'Why Sending Money Is Harder Than Sending a Text',
    date: '2026-07-04',
    summary: "Distributed systems, settlement, and why payments aren't just messages."
  },
  {
    slug: 'how-banks-actually-store-money',
    title: 'How Banks Actually Store Money',
    date: '2025-12-31',
    summary: 'Ledgers, liabilities, and what “real-time” really means under the UI.'
  },
  {
    slug: 'machine-to-machine-payments',
    title: "Machine Money: Cloudflare's NET Dollar",
    date: '2025-11-07',
    summary: 'Cloudflare revives HTTP 402 with NET Dollar so autonomous agents can pay for APIs, data, and compute.'
  },
  {
    slug: 'how-card-payments-work',
    title: 'How Card Payments Work',
    date: '2025-10-31',
    summary: 'A guided tour through the actors, fees, and protocols that let every card swipe go through.'
  },
  {
    slug: "how-ai-works-after-training",
    title: "How AI Works After Training",
    date: "2025-08-23",
    summary: "Part 3 of My AI Series - inference, alignment, evaluation (including some visual aids)."
  },
  {
    slug: "how-does-ai-learn-can-machines-think",
    title: "How Does AI Learn? Can Machines Think?",
    date: "2025-07-30",
    summary: "This one’s a longer read — Part 2 of my AI Series."
  },
  {
    slug: "three-types-of-ai-that-might-steal-your-job",
    title: "Three Types of AI That Might Steal Your Job (Or Just Help You Pick a Restaurant)",
    date: "2025-05-13",
    summary: "trying to make these newsletters read less like Greek + the em dash controversy."
  },
  {
    slug: "scheming-models-and-math",
    title: "Scheming Models and Math.",
    date: "2025-01-02",
    summary: "(not the kind you think) Just some thoughts on developments in AI by a software engineer - distilled to be less technical."
  },
  {
    slug: "the-age-of-ai-anxiety",
    title: "The Age of AI Anxiety",
    date: "2024-07-18",
    summary: "Another non-technical piece and my thoughts (this is quite long, so save it for when you REALLY have time to read). And no, I'm not encouraging becoming a Luddite."
  }
];

export function getPosts() {
  return posts.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function renderPostList(target, { limit, basePath = './', fallbackText = 'Stay tuned.', includeSummary = true } = {}) {
  if (!target) {
    return;
  }

  const items = getPosts();
  target.innerHTML = '';

  if (!items.length) {
    target.innerHTML = `<p class="muted">${fallbackText}</p>`;
    return;
  }

  const fragment = document.createDocumentFragment();

  items.slice(0, limit ?? items.length).forEach((post) => {
    const article = document.createElement('article');
    const url = `${basePath}${post.slug}.html`;
    const summary = includeSummary && post.summary ? `<p>${post.summary}</p>` : '';

    const external = post.external
      ? `<p class="muted">Also on <a href="${post.external}" target="_blank" rel="noopener">Substack</a>.</p>`
      : '';

    article.innerHTML = `
      <time datetime="${post.date}">${formatter.format(new Date(post.date))}</time>
      <h3><a href="${url}">${post.title}</a></h3>
      ${summary}
      ${external}
    `;

    fragment.appendChild(article);
  });

  target.appendChild(fragment);
}
