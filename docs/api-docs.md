# Stablecoin API Documentation

Bu doküman, Algorithmic Stablecoin projesinin backend API'si için endpoint'leri ve veri modellerini açıklar.

**Base URL:** `http://localhost:8000/api`

---

## 1. Reserve Endpoints

### `GET /reserve`

Sistemin mevcut rezerv durumunu ve teminatlandırma oranını getirir.

- **Method:** `GET`
- **Endpoint:** `/api/reserve`
- **Başarılı Yanıt (200 OK):**
  ```json
  {
    "total_reserve_usd": 12500000.50,
    "total_supply_stb": 10000000.00,
    "collateral_ratio": 1.25
  }
  ```
- **Veri Modeli:**
  - `total_reserve_usd` (float): Rezervdeki toplam varlıkların USD cinsinden değeri.
  - `total_supply_stb` (float): Dolaşımdaki toplam StableToken (STB) miktarı.
  - `collateral_ratio` (float): Teminatlandırma oranı.

---

## 2. Mint Endpoints

### `POST /mint-request`

Kullanıcının teminat yatırması karşılığında yeni token basılması (mint) için bir istek oluşturur.

- **Method:** `POST`
- **Endpoint:** `/api/mint-request`
- **İstek Body'si:**
  ```json
  {
    "amount_usd": 1000.00,
    "user_wallet_address": "0x123..."
  }
  ```
- **Veri Modeli:**
  - `amount_usd` (float, gerekli): Yatırılan ve karşılığında token mint edilecek USD miktarı.
  - `user_wallet_address` (string, gerekli): Token'ların gönderileceği kullanıcının cüzdan adresi.
- **Başarılı Yanıt (200 OK):**
  ```json
  {
    "success": true,
    "message": "1000.0 STB token başarıyla mint edildi ve 0x123... adresine gönderildi.",
    "transaction_hash": "0xabc..."
  }
  ```

---

## 3. Burn Endpoints

### `POST /burn-request`

Kullanıcının STB token'larını yakarak karşılığında teminatını geri alması için bir istek oluşturur.

- **Method:** `POST`
- **Endpoint:** `/api/burn-request`
- **İstek Body'si:**
  ```json
  {
    "amount_stb": 500.00,
    "user_wallet_address": "0x123..."
  }
  ```
- **Veri Modeli:**
  - `amount_stb` (float, gerekli): Yakılacak olan StableToken (STB) miktarı.
  - `user_wallet_address` (string, gerekli): Token'ları yakan kullanıcının cüzdan adresi.
- **Başarılı Yanıt (200 OK):**
  ```json
  {
    "success": true,
    "message": "500.0 STB token başarıyla yakıldı. Fiat transferi başlatıldı.",
    "transaction_hash": "0xdef..."
  }
