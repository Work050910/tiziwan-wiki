import json, os

os.makedirs('public', exist_ok=True)

with open('src/data/airports.json', 'r', encoding='utf-8') as f:
    airports = json.load(f)

with open('src/data/articles.json', 'r', encoding='utf-8') as f:
    articles = json.load(f)

domain = "https://tiziwan.wiki"
urls = [
    f"{domain}/",
    f"{domain}/airport-recommend/",
    f"{domain}/faq/",
    f"{domain}/about/",
    f"{domain}/ladder-recommend-2026/",
    f"{domain}/stable-ladder/",
    f"{domain}/airport-ladder/",
    f"{domain}/ladder-vpn/",
    f"{domain}/service/",
]

# 28 Airport pages
for a in airports:
    urls.append(f"{domain}/airport-recommend/{a['slug']}/")

# 60 Articles
for art in articles:
    urls.append(f"{domain}/{art['category']}/{art['slug']}/")

# XML Sitemap
sitemap_lines = ['<?xml version="1.0" encoding="UTF-8"?>',
                 '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']

for u in urls:
    priority = "1.0" if u in [f"{domain}/", f"{domain}/airport-recommend/"] else ("0.8" if "/airport-recommend/" in u else "0.7")
    sitemap_lines.append(f'  <url>\n    <loc>{u}</loc>\n    <lastmod>2026-10-12</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>{priority}</priority>\n  </url>')

sitemap_lines.append('</urlset>')
sitemap_xml = "\n".join(sitemap_lines)

with open('public/sitemap.xml', 'w', encoding='utf-8') as f:
    f.write(sitemap_xml)

robots_txt = f"""User-agent: *
Allow: /

Sitemap: {domain}/sitemap.xml
"""

with open('public/robots.txt', 'w', encoding='utf-8') as f:
    f.write(robots_txt)

print(f"Generated sitemap.xml with {len(urls)} URLs and robots.txt in public/")
