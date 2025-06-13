# Algoritmik Stablecoin Projesi Kurulum ve Çalıştırma Rehberi

<img src="https://wearetheartmakers.com/img/mUSD.png" alt="mUSD Logo" width="100" />


Bu rehber, Algoritmik Stablecoin projesini sıfırdan kurmak, yapılandırmak, deploy etmek ve çalıştırmak için gereken tüm adımları içermektedir.

## 📌 Projeye Genel Bakış

Bu proje, fiyatı 1 USD'ye sabitlenmiş, algoritmik olarak yönetilen bir stablecoin sistemidir. Sistem; akıllı kontratlar, bir backend API'si ve bir frontend kullanıcı arayüzünden oluşur.

- **Smart Contracts (`/smart-contracts`):** Solidity ile yazılmış, Hardhat ile geliştirilmiş ve BNB Chain Testnet'e deploy edilecek olan `StableToken` ve `Stabilizer` kontratları.
- **Backend (`/backend`):** Python (FastAPI) ile geliştirilmiş, mint/burn işlemleri ve rezerv sorgulamaları için bir REST API.
- **Frontend (`/frontend`):** Next.js, React ve TailwindCSS ile oluşturulmuş, kullanıcıların cüzdan bağlayıp sistemle etkileşime girebildiği arayüz.

---

## ⚙️ 1. Ön Gereksinimler

Başlamadan önce sisteminizde aşağıdaki araçların kurulu olduğundan emin olun:

- [Node.js](https://nodejs.org/en/) (v18 veya üstü)
- [Python](https://www.python.org/downloads/) (v3.8 veya üstü) ve `pip` paket yöneticisi
- [MetaMask](https://metamask.io/) tarayıcı eklentisi (BNB Chain Testnet'e ayarlanmış ve test BNB'si yüklenmiş)

---

## 🛠️ 2. Kurulum ve Bağımlılıklar

Projenin tüm parçaları için bağımlılıkları kurun.

### a. Ana Proje ve Script'ler

Projenin ana dizininde `ethers` ve `dotenv` gibi genel bağımlılıkları kurun.

```bash
npm install
```

### b. Akıllı Kontratlar

`smart-contracts` dizinine girerek Hardhat ve OpenZeppelin bağımlılıklarını kurun.

```bash
cd smart-contracts
npm install
cd ..
```

### c. Frontend

`frontend` dizinine girerek Next.js ve diğer React bağımlılıklarını kurun.

```bash
cd frontend
npm install
cd ..
```

### d. Backend

Backend için bir sanal ortam (virtual environment) oluşturup Python bağımlılıklarını kurun.

```bash
# Sanal ortam oluştur (macOS/Linux)
python3 -m venv backend/venv
# Sanal ortamı aktive et (macOS/Linux)
source backend/venv/bin/activate

# Sanal ortam oluştur (Windows)
python -m venv backend\venv
# Sanal ortamı aktive et (Windows)
backend\venv\Scripts\activate

# Bağımlılıkları kur
pip install -r backend/requirements.txt
```
*Not: Backend komutlarını çalıştırırken sanal ortamın aktif olduğundan emin olun.*

---

## 🔑 3. Yapılandırma (.env)

Akıllı kontratları deploy etmek için hassas bilgilerinizi içeren bir ortam değişkenleri dosyası oluşturmanız gerekir.

1.  `smart-contracts` dizini içinde `.env` adında bir dosya oluşturun.
2.  Dosyanın içeriğini aşağıdaki gibi doldurun:

    ```env
    # BNB Chain Testnet için bir RPC URL'si. Alchemy veya Infura'dan alabilirsiniz.
    BSC_TESTNET_RPC_URL="https://data-seed-prebsc-1-s1.binance.org:8545/"

    # Deploy için kullanacağınız cüzdanın özel anahtarı (private key).
    # MetaMask'tan alabilirsiniz. DİKKAT: Bu anahtarı kimseyle paylaşmayın!
    PRIVATE_KEY="YOUR_METAMASK_PRIVATE_KEY"

    # Kontratları BscScan'de doğrulamak için API anahtarınız. BscScan'den alabilirsiniz.
    BSCSCAN_API_KEY="YOUR_BSCSCAN_API_KEY"
    ```

---

## 🚀 4. Akıllı Kontratları Deploy Etme

1.  **Kontratları Derleyin:**
    `smart-contracts` dizinindeyken aşağıdaki komutu çalıştırın:

    ```bash
    cd smart-contracts
    npx hardhat compile
    ```

2.  **BNB Testnet'e Deploy Edin:**
    Deploy betiğini çalıştırın. Bu işlem cüzdanınızdan küçük bir miktar test BNB'si harcayacaktır.

    ```bash
    npx hardhat run scripts/deploy.js --network bscTestnet
    ```

3.  **Adresleri Güncelleyin:**
    Deploy işlemi tamamlandığında, konsolda `StableToken` ve `Stabilizer` kontratlarının adreslerini göreceksiniz. Bu adresleri aşağıdaki dosyalara kopyalayın:
    - `deploy/bnb-testnet-config.json` -> `stableTokenAddress` ve `stabilizerAddress` alanları.
    - `frontend/pages/mint-burn.tsx` -> `stableTokenAddress` ve `stabilizerAddress` sabitleri.
    - `frontend/pages/wallet.tsx` -> `stableTokenAddress` sabiti.

---

## 🖥️ 5. Servisleri Çalıştırma

Tüm servisleri ayrı terminallerde çalıştırın.

### a. Backend API Sunucusu

Projenin ana dizinindeyken (ve Python sanal ortamı aktifken) aşağıdaki komutu çalıştırın:

```bash
uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload
```
Sunucu `http://localhost:8000` adresinde çalışmaya başlayacaktır.

### b. Frontend Geliştirme Sunucusu

`frontend` dizinindeyken aşağıdaki komutu çalıştırın:

```bash
cd frontend
npm run dev
```
Uygulama `http://localhost:3000` adresinde açılacaktır. Tarayıcınızdan bu adrese giderek arayüzü görüntüleyebilirsiniz.

---

## 🤖 6. Oracle Bot'unu Çalıştırma (İsteğe Bağlı)

Fiyat dengeleme mekanizmasını test etmek için `price-oracle-bot.js` betiğini çalıştırabilirsiniz. Bu betik, `Stabilizer` kontratına sahte bir fiyat göndererek arz ayarlaması yapar.

*Not: Bu betiği çalıştırmadan önce 4. adımda deploy ettiğiniz kontrat adreslerini `deploy/bnb-testnet-config.json` dosyasına eklediğinizden emin olun.*

Projenin ana dizinindeyken aşağıdaki komutu çalıştırın:

```bash
node scripts/price-oracle-bot.js
```

Bu adımları tamamladıktan sonra, tüm sistem çalışır durumda olacaktır. Frontend üzerinden cüzdanınızı bağlayabilir, rezervleri görüntüleyebilir ve (backend üzerinden simüle edilen) mint/burn işlemlerini gerçekleştirebilirsiniz.
