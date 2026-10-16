import ArticleDetail from '@/components/ArticleDetail';
import articlesData from '@/data/articles.json';
import faqsData from '@/data/faqs.json';

export default function ArticlePage({ article, relatedArticles, relatedFaqs, openSearch }) {
  return (
    <ArticleDetail
      article={article}
      relatedArticles={relatedArticles}
      relatedFaqs={relatedFaqs}
      openSearch={openSearch}
    />
  );
}

export async function getStaticPaths() {
  const paths = articlesData
    .filter((a) => a.category === 'airport-ladder')
    .map((a) => ({
      params: { slug: a.slug },
    }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const article = articlesData.find((a) => a.slug === params.slug);
  const relatedArticles = articlesData
    .filter((a) => a.category === 'airport-ladder' && a.slug !== params.slug)
    .slice(0, 4);
  const relatedFaqs = faqsData.slice(0, 3);
  return {
    props: {
      article,
      relatedArticles,
      relatedFaqs,
    },
  };
}
