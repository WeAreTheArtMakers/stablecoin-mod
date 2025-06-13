import { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

interface ReserveData {
  total_reserve_usd: number;
  total_supply_stb: number;
  collateral_ratio: number;
}

const ReservePage: NextPage = () => {
  const [data, setData] = useState<ReserveData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReserveData = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8000/api/reserve');
        if (!response.ok) {
          throw new Error('Rezerv verileri alınamadı.');
        }
        const result: ReserveData = await response.json();
        setData(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReserveData();
    // Verileri periyodik olarak güncellemek için bir interval ayarlayabilirsiniz.
    const interval = setInterval(fetchReserveData, 30000); // 30 saniyede bir
    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Head>
        <title>System Reserve | Algorithmic Stablecoin</title>
      </Head>
      <Navbar />
      <main className="container mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-center mb-8">Sistem Rezervleri</h1>

        {loading && <p className="text-center text-lg">Veriler yükleniyor...</p>}
        {error && <p className="text-center text-lg text-red-500">Hata: {error}</p>}

        {data && (
          <div className="max-w-2xl mx-auto bg-gray-800 rounded-lg shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
              <div className="p-4 bg-gray-700 rounded-lg">
                <h3 className="text-gray-400 text-sm font-bold uppercase">Toplam Rezerv</h3>
                <p className="text-3xl font-bold text-green-400">{formatCurrency(data.total_reserve_usd)}</p>
              </div>
              <div className="p-4 bg-gray-700 rounded-lg">
                <h3 className="text-gray-400 text-sm font-bold uppercase">Toplam Arz (STB)</h3>
                <p className="text-3xl font-bold">{formatNumber(data.total_supply_stb)}</p>
              </div>
            </div>
            <div className="mt-8 p-4 bg-gray-700 rounded-lg text-center">
              <h3 className="text-gray-400 text-sm font-bold uppercase">Teminatlandırma Oranı</h3>
              <p className={`text-4xl font-bold ${data.collateral_ratio >= 1 ? 'text-green-400' : 'text-red-500'}`}>
                {(data.collateral_ratio * 100).toFixed(2)}%
              </p>
              <p className="text-gray-500 mt-2">
                Bu oran, dolaşımdaki her bir STB'nin ne kadarının rezervlerle desteklendiğini gösterir.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ReservePage;
