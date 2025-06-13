import React from 'react';
import Link from 'next/link';
import WalletConnect from './WalletConnect';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          <Link href="/">
            <a>STB Coin</a>
          </Link>
        </div>
        <div className="hidden md:flex items-center space-x-6 text-lg">
          <Link href="/mint-burn">
            <a className="text-gray-300 hover:text-white transition duration-300">Mint/Burn</a>
          </Link>
          <Link href="/reserve">
            <a className="text-gray-300 hover:text-white transition duration-300">Rezerv</a>
          </Link>
          <Link href="/wallet">
            <a className="text-gray-300 hover:text-white transition duration-300">Cüzdan</a>
          </Link>
          <Link href="/nft-assets">
            <a className="text-gray-300 hover:text-white transition duration-300">NFT Varlıkları</a>
          </Link>
        </div>
        <div className="flex items-center">
          <WalletConnect />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
