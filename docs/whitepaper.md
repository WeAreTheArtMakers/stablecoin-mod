# Whitepaper: Algorithmic Stablecoin (STB)

## 1. Giriş

Bu whitepaper, fiyatı 1 ABD Doları'na (USD) algoritmik olarak sabitlenmiş, merkeziyetsiz bir stablecoin olan STB'nin (Stable Token) tasarımını ve çalışma prensiplerini açıklamaktadır. STB, blockchain teknolojisinin şeffaflığından ve verimliliğinden yararlanarak, geleneksel finansal sistemlere istikrarlı bir alternatif sunmayı hedefler.

## 2. Motivasyon

Kripto para piyasalarının yüksek volatilitesi, dijital varlıkların günlük ticarette ve değer saklama aracı olarak kullanılmasının önündeki en büyük engellerden biridir. Stablecoin'ler, bu sorunu çözmek için tasarlanmıştır. STB, tamamen zincir üzerinde (on-chain) çalışan, algoritmik bir para politikası ile desteklenen, şeffaf ve denetlenebilir bir model sunar.

## 3. Sistem Mimarisi

STB ekosistemi üç ana bileşenden oluşur:

- **StableToken (STB):** Kullanıcıların elinde tuttuğu, ERC20 standardında bir token.
- **Stabilizer Kontratı:** Fiyat istikrarını sağlamak için STB'nin arzını yöneten merkezi mantık birimi.
- **Fiyat Oracle'ı:** STB'nin piyasa fiyatını güvenilir bir şekilde sisteme bildiren veri sağlayıcı.

### 3.1. Fiyat İstikrar Mekanizması

Sistemin temel amacı, STB'nin fiyatını 1 USD'de tutmaktır. Bu, basit bir arz-talep kuralı ile sağlanır:

- **Fiyat > 1 USD (Talep Artışı):** Piyasada STB'ye olan talep, arzını aşmıştır. Bu durumda, `Stabilizer` kontratı yeni STB token'ları basar (mint) ve bunları rezervleri artırmak veya sistemin sahiplerine dağıtmak için kullanır. Artan arz, fiyatın tekrar 1 USD'ye düşmesine yardımcı olur.

- **Fiyat < 1 USD (Talep Azalışı):** Piyasada STB arzı, talepten fazladır. Bu durumda, `Stabilizer` kontratı, rezervlerindeki varlıkları kullanarak piyasadan STB satın alır ve bu token'ları yakar (burn). Azalan arz, fiyatın tekrar 1 USD'ye yükselmesine yardımcı olur.

## 4. Teminatlandırma ve Rezervler

Sistem, başlangıçta kısmi veya tam teminatlandırma ile çalışabilir. Rezervler, BNB, BUSD gibi diğer kripto varlıklardan oluşur. Rezervlerin durumu ve teminatlandırma oranı (Toplam Rezerv Değeri / Toplam STB Arzı) her zaman şeffaf bir şekilde zincir üzerinde görüntülenebilir.

## 5. Mint ve Burn İşlemleri

Kullanıcılar, sisteme doğrudan katılarak STB mint edebilir veya yakabilir:

- **Mint:** Kullanıcılar, sisteme 1 USD değerinde teminat (örn. BUSD) yatırarak karşılığında 1 STB alabilirler.
- **Burn:** Kullanıcılar, 1 STB'yi sisteme geri vererek karşılığında 1 USD değerinde teminat alabilirler.

Bu işlemler, fiyatın 1 USD etrafında dar bir bantta kalmasına yardımcı olan ek bir arbitraj mekanizması sağlar.

## 6. Yönetişim

Gelecekte, sistemin yönetimi merkeziyetsiz bir otonom organizasyon (DAO) aracılığıyla topluluğa devredilebilir. Token sahipleri, sistem parametreleri (örn. ayarlama faktörü, yeni teminat türleri) üzerinde oy hakkına sahip olabilir.

## 7. Sonuç

STB, algoritmik para politikası ve şeffaf rezerv yönetimi ile istikrarlı, güvenilir ve merkeziyetsiz bir dijital para birimi sunmayı amaçlamaktadır. Bu sistem, DeFi ekosisteminde güvenli bir liman ve verimli bir değişim aracı olarak hizmet etme potansiyeline sahiptir.
