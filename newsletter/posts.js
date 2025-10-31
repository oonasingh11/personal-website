const formatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});

export const posts = [
  {
    slug: 'how-card-payments-work',
    title: 'How Card Payments Work',
    date: '2025-10-31',
    summary: 'A guided tour through the actors, fees, and protocols that let every card swipe go through.'
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
