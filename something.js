import fs from 'fs';
import path from 'path';
import * as cheerio from 'cheerio';

// Change this to your actual HTML file path
const htmlFilePath = path.join(process.cwd(), 'index.html');
if (!fs.existsSync(htmlFilePath)) {
  console.error(`❌ File not found: ${htmlFilePath}`);
  process.exit(1);
}
const html = fs.readFileSync(htmlFilePath, 'utf8');
const $ = cheerio.load(html);

// List of important meta tags for SEO and indexing
const requiredMetaTags = [
  'description',
  'google-site-verification',
  'citation_journal_title',
  'citation_author',
  'citation_title',
  'citation_date',
  'citation_doi'
];

// Check for required meta tags
console.log('Checking for important meta tags...');
requiredMetaTags.forEach(tag => {
  const meta = $(`meta[name="${tag}"]`);
  if (meta.length > 0) {
    console.log(`✅ Found meta tag: ${tag}`);
  } else {
    console.log(`❌ Missing meta tag: ${tag}`);
  }
});

// Check for structured data (JSON-LD)
const jsonLd = $('script[type="application/ld+json"]');
if (jsonLd.length > 0) {
  console.log('✅ Found structured data (JSON-LD).');
} else {
  console.log('❌ Missing structured data (JSON-LD).');
}

// Check for canonical link
const canonical = $('link[rel="canonical"]');
if (canonical.length > 0) {
  console.log('✅ Found canonical link.');
} else {
  console.log('❌ Missing canonical link.');
}
