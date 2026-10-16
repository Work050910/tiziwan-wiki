import Header from './Header';
import Footer from './Footer';

export default function Layout({ children, openSearch }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Header openSearch={openSearch} />
      <main className="flex-1 max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1536px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {children}
      </main>
      <Footer />
    </div>
  );
}
