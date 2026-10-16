import os

cat_slugs = [
    "ladder-recommend-2026",
    "stable-ladder",
    "airport-ladder",
    "ladder-vpn",
    "service"
]

for cat in cat_slugs:
    file_path = f"src/pages/{cat}/[slug].jsx"
    content = f"""import ArticleDetail from '@/components/ArticleDetail';
import articlesData from '@/data/articles.json';
import faqsData from '@/data/faqs.json';

export default function ArticlePage({{ article, relatedArticles, relatedFaqs, openSearch }}) {{
  return (
    <ArticleDetail
      article={{article}}
      relatedArticles={{relatedArticles}}
      relatedFaqs={{relatedFaqs}}
      openSearch={{openSearch}}
    />
  );
}}

export async function getStaticPaths() {{
  const paths = articlesData
    .filter((a) => a.category === '{cat}')
    .map((a) => ({{
      params: {{ slug: a.slug }},
    }}));
  return {{ paths, fallback: false }};
}}

export async function getStaticProps({{ params }}) {{
  const article = articlesData.find((a) => a.slug === params.slug);
  const relatedArticles = articlesData
    .filter((a) => a.category === '{cat}' && a.slug !== params.slug)
    .slice(0, 4);
  const relatedFaqs = faqsData.slice(0, 3);
  return {{
    props: {{
      article,
      relatedArticles,
      relatedFaqs,
    }},
  }};
}}
"""
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Created {file_path}")
