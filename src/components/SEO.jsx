import Head from 'next/head';

export default function SEO({
  title = '梯子玩资料库｜梯子推荐2026、稳定梯子与机场梯子资料',
  description = '面向关注梯子推荐2026、稳定梯子、机场梯子和梯子vpn资料的中文读者的静态文档站。以 /airport-recommend/ 为全站核心，围绕年度推荐资料、服务规则与购买前核验项组织文档。',
  canonical = 'https://tiziwan.wiki/',
  ogImage = 'https://tiziwan.wiki/tiziwan_icon.png',
  type = 'website',
  schemaData = null,
}) {
  const fullTitle = title.includes('梯子玩资料库') ? title : `${title} - 梯子玩资料库`;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {/* OpenGraph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content="梯子玩资料库" />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* JSON-LD Schema */}
      {schemaData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      )}
    </Head>
  );
}
