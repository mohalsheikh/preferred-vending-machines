// generate-sitemap.js
const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');

const links = [
  { url: '/', changefreq: 'daily', priority: 1 },
  { url: '/about', changefreq: 'monthly', priority: 0.8 },
  { url: '/services', changefreq: 'monthly', priority: 0.8 },
  { url: '/products', changefreq: 'monthly', priority: 0.8 },
  { url: '/solutions', changefreq: 'monthly', priority: 0.8 },
  { url: '/technology', changefreq: 'monthly', priority: 0.8 },
  { url: '/faq', changefreq: 'monthly', priority: 0.8 },
  { url: '/contact', changefreq: 'monthly', priority: 0.8 }
];

const sitemap = new SitemapStream({ hostname: 'https://preferredvendingmachines.com/' });

streamToPromise(sitemap).then(sm =>
  createWriteStream('./public/sitemap.xml').write(sm.toString())
);

links.forEach(link => sitemap.write(link));
sitemap.end();
