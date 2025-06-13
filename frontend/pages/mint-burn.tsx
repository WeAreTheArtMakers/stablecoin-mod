import { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
// ABI'ları import etmek için doğru yolu ayarlamanız gerekebilir.
// Bu örnekte, ABI'ların frontend/abi klasöründe olduğunu varsayıyoruz.
// const stableTokenAbi = require('../abi/StableToken.json'); 
// const stabilizerAbi = require('../abi/Stabilizer.json');

const MintBurnPage: NextPage = () => {
  const [mintAmount, setMintAmount] = useState('');
  const [burnAmount, setBurnAmount] = useState('');
  const [message, setMessage] = useState('');
  const { address, isConnected } = useAccount();
  
  // Bu adresleri deploy sonrası güncelleyin
  const stableTokenAddress = '0x...'; 
  const stabilizerAddress = '0x...';

  // Wagmi hook'ları ile kontrat okuma ve yazma
  // const { data: balance } = useReadContract({
  //   address: stableTokenAddress,
  //   abi: stableTokenAbi,
  //   functionName: 'balanceOf',
  //   args: [address],
  // });

  // const { writeContract } = useWriteContract();

  const handleMint = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConnected) {
      setMessage('Lütfen önce cüzdanınızı bağlayın.');
      return;
    }
    setMessage('Mint işlemi başlatılıyor...');
    try {
      // Gerçek uygulamada, önce teminat yatırma işlemi yapılır (örn. BUSD transferi).
      // Ardından backend'e istek gönderilir.
      const response = await fetch('http://localhost:8000/api/mint-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount_usd: parseFloat(mintAmount),
          user_wallet_address: address,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(`Başarılı: ${data.message} (Tx: ${data.transaction_hash})`);
      } else {
        setMessage(`Hata: ${data.detail}`);
      }
    } catch (error) {
      setMessage('Bir ağ hatası oluştu.');
    }
  };

  const handleBurn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConnected) {
      setMessage('Lütfen önce cüzdanınızı bağlayın.');
      return;
    }
    setMessage('Burn işlemi başlatılıyor...');
    try {
      // Gerçek uygulamada, önce STB token'ları yakma kontratına approve edilir.
      // Ardından backend'e istek gönderilir.
      const response = await fetch('http://localhost:8000/api/burn-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount_stb: parseFloat(burnAmount),
          user_wallet_address: address,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(`Başarılı: ${data.message} (Tx: ${data.transaction_hash})`);
      } else {
        setMessage(`Hata: ${data.detail}`);
      }
    } catch (error) {
      setMessage('Bir ağ hatası oluştu.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Head>
        <title>Mint & Burn | Algorithmic Stablecoin</title>
      </Head>
      <Navbar />
      <main className="container mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-center mb-8">Mint & Burn STB Token</h1>
        
        {/* Bakiye Göstergesi */}
        {isConnected && (
          <div className="text-center mb-8">
            <p className="text-lg">
              Cüzdan Bakiyeniz: <strong>{/* {balance ? (balance / 1e18).toFixed(2) : '0.00'} */} 0.00 STB</strong>
            </p>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Mint Card */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Mint STB</h2>
            <p className="text-gray-400 mb-4">Teminat (örn. BUSD) yatırarak 1:1 oranında STB token mint edin.</p>
            <form onSubmit={handleMint}>
              <input
                type="number"
                placeholder="Yatırılacak Tutar (USD)"
                value={mintAmount}
                onChange={(e) => setMintAmount(e.target.value)}
                className="w-full bg-gray-700 text-white p-3 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-300">
                Mint
              </button>
            </form>
          </div>

          {/* Burn Card */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Burn STB</h2>
            <p className="text-gray-400 mb-4">STB token'larınızı yakarak teminatınızı geri alın.</p>
            <form onSubmit={handleBurn}>
              <input
                type="number"
                placeholder="Yakılacak Miktar (STB)"
                value={burnAmount}
                onChange={(e) => setBurnAmount(e.target.value)}
                className="w-full bg-gray-700 text-white p-3 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition duration-300">
                Burn
              </button>
            </form>
          </div>
        </div>

        {message && (
          <div className="mt-8 text-center p-4 bg-gray-700 rounded-lg max-w-4xl mx-auto">
            <p>{message}</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default MintBurnPage;
