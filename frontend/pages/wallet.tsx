import { NextPage } from 'next';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import { useAccount, useBalance } from 'wagmi';

const WalletPage: NextPage = () => {
  const { address, isConnected, chain } = useAccount();
  
  // STB token kontrat adresini buraya girin
  const stableTokenAddress = '0x...'; 

  const { data: balance, isLoading } = useBalance({
    address: address,
    token: stableTokenAddress as `0x${string}`,
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Head>
        <title>My Wallet | Algorithmic Stablecoin</title>
      </Head>
      <Navbar />
      <main className="container mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-center mb-8">Cüzdan Bilgileri</h1>

        {isConnected ? (
          <div className="max-w-md mx-auto bg-gray-800 rounded-lg shadow-lg p-8">
            <div className="space-y-4">
              <div>
                <h3 className="text-gray-400 text-sm font-bold uppercase">Cüzdan Adresi</h3>
                <p className="text-lg break-words">{address}</p>
              </div>
              <div>
                <h3 className="text-gray-400 text-sm font-bold uppercase">Ağ</h3>
                <p className="text-lg">{chain ? chain.name : 'Bilinmiyor'}</p>
              </div>
              <div>
                <h3 className="text-gray-400 text-sm font-bold uppercase">STB Bakiye</h3>
                {isLoading ? (
                  <p className="text-lg">Yükleniyor...</p>
                ) : (
                  <p className="text-lg font-bold">{balance ? `${balance.formatted} ${balance.symbol}` : '0.00 STB'}</p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-xl">Cüzdan bilgilerini görüntülemek için lütfen cüzdanınızı bağlayın.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default WalletPage;
