const { ethers } = require("ethers");
require("dotenv").config({ path: './smart-contracts/.env' }); // .env dosyasının yolunu belirtiyoruz

// Ayarlar
const config = require('../deploy/bnb-testnet-config.json');
const stabilizerAbi = require('../smart-contracts/artifacts/contracts/Stabilizer.sol/Stabilizer.json').abi;

// .env dosyasından RPC URL ve özel anahtarı al
const rpcUrl = process.env.BSC_TESTNET_RPC_URL || config.rpcUrl;
const privateKey = process.env.PRIVATE_KEY;

if (!privateKey) {
    console.error("Hata: PRIVATE_KEY .env dosyasında bulunamadı.");
    process.exit(1);
}

// Sağlayıcı ve cüzdanı ayarla
const provider = new ethers.JsonRpcProvider(rpcUrl);
const wallet = new ethers.Wallet(privateKey, provider);

// Stabilizer kontratı
const stabilizerAddress = config.stabilizerAddress; 
if (!stabilizerAddress || stabilizerAddress === "YAYINLANDIKTAN_SONRA_GUNCELLE") {
    console.error("Hata: Lütfen deploy/bnb-testnet-config.json dosyasındaki stabilizerAddress'i güncelleyin.");
    process.exit(1);
}
const stabilizerContract = new ethers.Contract(stabilizerAddress, stabilizerAbi, wallet);

/**
 * Sahte bir fiyat üretir. 1$ etrafında +/- %5'lik bir dalgalanma simüle eder.
 * @returns {BigInt} 18 ondalık basamaklı fiyat.
 */
function getMockPrice() {
    // 0.95 ile 1.05 arasında rastgele bir sayı üret
    const priceFluctuation = 0.95 + Math.random() * 0.1; 
    // Fiyatı BigInt formatına çevir (18 ondalık basamaklı)
    const mockPrice = ethers.parseUnits(priceFluctuation.toFixed(18), 18);
    return mockPrice;
}

async function main() {
    console.log("Fiyat Oracle Botu çalışıyor...");
    console.log(`Cüzdan adresi: ${wallet.address}`);
    console.log(`Stabilizer kontratı: ${stabilizerAddress}`);

    try {
        const currentPrice = getMockPrice();
        console.log(`Üretilen sahte fiyat: ${ethers.formatUnits(currentPrice, 18)} USD`);

        console.log("Stabilizer.adjustSupply fonksiyonu çağrılıyor...");
        const tx = await stabilizerContract.adjustSupply(currentPrice);
        
        console.log(`İşlem gönderildi. Hash: ${tx.hash}`);
        await tx.wait();
        console.log("İşlem onaylandı. Arz başarıyla ayarlandı.");

    } catch (error) {
        console.error("Bot çalışırken bir hata oluştu:", error.message);
    }
}

// Bu betiği periyodik olarak çalıştırmak için node-cron gibi bir kütüphane kullanabilirsiniz.
// Örnek:
// const cron = require('node-cron');
// cron.schedule('0 0 * * *', main); // Her gün gece yarısı çalıştır

main().catch(console.error);
