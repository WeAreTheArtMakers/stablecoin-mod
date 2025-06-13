import type { NextPage } from 'next';
import Head from 'next/head';
import Navbar from '../components/Navbar';

const Home: NextPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Head>
        <title>Algorithmic Stablecoin</title>
        <meta name="description" content="Welcome to the Algorithmic Stablecoin project." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold mb-4">
          Algoritmik Stablecoin Projesine Hoş Geldiniz
        </h1>
        <p className="text-xl text-gray-400 mb-8">
          Merkeziyetsiz finansın geleceğini keşfedin. Fiyatı 1 USD'ye sabitlenmiş,
          algoritmik olarak yönetilen bir stablecoin.
        </p>
        <div className="space-x-4">
          <a href="/mint-burn" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
            Mint & Burn
          </a>
          <a href="/reserve" className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
            Rezervleri Görüntüle
          </a>
        </div>
      </main>

      <footer className="absolute bottom-0 w-full text-center py-4 text-gray-500">
        <p>&copy; 2025 Stablecoin Project. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
