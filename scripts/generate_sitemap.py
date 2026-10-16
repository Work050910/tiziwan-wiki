import json
from datetime import datetime

today = datetime.now().strftime('%Y-%m-%d')
base_url = "https://tiziwan.wiki"

urls = [
    f"{base_url}/",
    f"{base_url}/airport-recommend/",
    f"{base_url}/ladder-recommend-2026/",
    f"{base_url}/stable-ladder/",
    f"{base_url}/airport-ladder/",
    f"{base_url}/ladder-vpn/",
    f"{base_url}/faq/",
    f"{base_url}/about/",
]

# 28 airports
with open('src/data/airports.json', 'r', encoding='utf-8') as f:
    airports = json.load(f)

for ap in airports:
    urls.append(f"{base_url}/airport-recommend/{ap['slug']}/")

# 54 articles
with open('src/data/articles.json', 'r', encoding='utf-8') as f:
    articles = json.load(f)

for art in articles:
    urls.append(f"{base_url}/{art['category']}/{art['slug']}/")

sitemap_xml = ['<?xml version="1.0" encoding="UTF-8"?>']
sitemap_xml.append('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')

for u in urls:
    # Set priority & changefreq
    if u == f"{base_url}/" or u == f"{base_url}/airport-recommend/":
        priority = "1.0"
        freq = "daily"
    elif u.count('/') == 4 and not u.endswith('.html'): # category pages
        priority = "0.9"
        freq = "daily"
    elif "/airport-recommend/" in u:
        priority = "0.8"
        freq = "weekly"
    else:
        priority = "0.8"
        freq = "weekly"

    sitemap_xml.append('  <url>')
    sitemap_xml.append(f'    <loc>{u}</loc>')
    sitemap_xml.append(f'    <lastmod>{today}</lastmod>')
    sitemap_xml.append(f'    <changefreq>{freq}</changefreq>')
    sitemap_xml.append(f'    <priority>{priority}</priority>')
    sitemap_xml.append('  </url>')

sitemap_xml.append('</urlset>')

with open('public/sitemap.xml', 'w', encoding='utf-8') as f:
    f.write('\n'.join(sitemap_xml))

print(f"Generated public/sitemap.xml with {len(urls)} URLs. No /service/ found.")
