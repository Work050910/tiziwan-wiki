import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="zh-CN">
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/svg+xml" href="/icon.svg" />
        <link rel="apple-touch-icon" href="/tiziwan_icon.png" />
        <meta name="theme-color" content="#0284c7" />
      </Head>
      <body className="bg-slate-50 text-slate-800">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
