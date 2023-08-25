'use client';
import dynamic from 'next/dynamic';
import Footer from '../footer/Footer';

const Header = dynamic(() => import('./Header'));

type MainLayoutProps = {
  children?: React.ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
