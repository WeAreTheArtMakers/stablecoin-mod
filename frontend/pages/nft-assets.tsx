import { NextPage } from 'next';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import { useAccount } from 'wagmi';

// Sahte NFT verisi
const mockNfts = [
  { id: 1, name: 'CryptoPunk #1234', image: 'https://via.placeholder.com/150/92c952', collection: 'CryptoPunks' },
  { id: 2, name: 'Bored Ape #5678', image: 'https://via.placeholder.com/150/771796', collection: 'Bored Ape Yacht Club' },
  { id: 3, name: 'Art Blocks #9012', image: 'https://via.placeholder.com/150/24f355', collection: 'Art Blocks' },
];

const NftAssetsPage: NextPage = () => {
  const { isConnected } = useAccount();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Head>
        <title>NFT Assets | Algorithmic Stablecoin</title>
      </Head>
      <Navbar />
      <main className="container mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-center mb-8">NFT Varlıkları</h1>

        {isConnected ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {mockNfts.map((nft) => (
              <div key={nft.id} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <img src={nft.image} alt={nft.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="font-bold text-lg">{nft.name}</h3>
                  <p className="text-gray-400 text-sm">{nft.collection}</p>
                </div>
              </div>
            ))}
             <div className="text-center col-span-full mt-4">
                <p className="text-gray-500">Not: Bu veriler sahtedir ve sadece gösterim amaçlıdır.</p>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-xl">NFT varlıklarınızı görüntülemek için lütfen cüzdanınızı bağlayın.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default NftAssetsPage;
