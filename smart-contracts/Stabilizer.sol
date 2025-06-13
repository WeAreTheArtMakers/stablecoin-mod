// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./StableToken.sol";

/**
 * @title Stabilizer
 * @dev Bu kontrat, StableToken'ın fiyatını bir oracle'a göre izler ve
 * fiyatı hedef fiyata (örn. 1$) sabitlemek için token arzını ayarlar.
 * Fiyat > Hedef Fiyat => Arzı artır (mint)
 * Fiyat < Hedef Fiyat => Arzı azalt (burn)
 */
contract Stabilizer is Ownable {
    StableToken public stableToken;
    address public priceOracle;
    uint256 public targetPrice = 1 * 1e18; // Hedef fiyat: 1 USD (18 ondalık basamakla)
    uint256 public adjustmentFactor = 5; // Ayarlama hassasiyeti (binde 5)

    // Fiyat güncellendiğinde tetiklenir
    event PriceUpdated(uint256 newPrice);
    // Arz ayarlandığında tetiklenir
    event SupplyAdjusted(int256 amount);

    constructor(address stableTokenAddress, address initialOwner) Ownable(initialOwner) {
        stableToken = StableToken(stableTokenAddress);
        priceOracle = msg.sender; // Başlangıçta oracle deploy eden kişidir
    }

    /**
     * @dev Oracle'dan mevcut fiyatı alır (Bu örnekte sahte bir fonksiyon).
     * Gerçek bir uygulamada bu, Chainlink gibi bir oracle'dan veri çeker.
     */
    function getCurrentPrice() public view returns (uint256) {
        // Bu örnekte, oracle adresi sahte fiyatı doğrudan saklıyor gibi davranıyoruz.
        // Gerçek bir senaryoda, oracle kontratından bir fonksiyon çağrılır.
        // Bu kısmı basit tutmak için, sahibi tarafından güncellenen bir fiyat varsayalım.
        // Bu yüzden `updatePrice` fonksiyonunu ekliyoruz.
        // Şimdilik sabit bir fiyat döndürelim, `updatePrice` ile güncellenebilsin.
        return 1 * 1e18; // Varsayılan 1$
    }

    /**
     * @dev Fiyatı manuel olarak güncellemek için sahte fonksiyon (sadece oracle).
     * @param newPrice Yeni fiyat.
     */
    function updatePrice(uint256 newPrice) external {
        require(msg.sender == priceOracle, "Only the oracle can update the price");
        // Gerçekte bu fonksiyon olmaz, oracle verisi okunurdu. Test için eklenmiştir.
        // Bu fonksiyonu çağırmak yerine, `price-oracle-bot.js` bu kontratı çağıracak.
        // Bu yüzden bu fonksiyonu `adjustSupply` olarak değiştirmek daha mantıklı.
        // Bot doğrudan `adjustSupply`'ı çağıracak ve fiyatı parametre olarak geçirecek.
        emit PriceUpdated(newPrice);
    }
    
    /**
     * @dev Token arzını mevcut fiyata göre ayarlar.
     * Bu fonksiyonun bir bot tarafından periyodik olarak çağrılması beklenir.
     * @param currentPrice Oracle'dan alınan güncel fiyat.
     */
    function adjustSupply(uint256 currentPrice) external {
        require(msg.sender == priceOracle, "Only the oracle can adjust supply");

        int256 priceDifference = int256(currentPrice) - int256(targetPrice);

        if (priceDifference == 0) {
            return; // Fiyat hedefte, değişiklik yok.
        }

        uint256 totalSupply = stableToken.totalSupply();
        // Ayarlama miktarını hesapla: (Fark / Hedef Fiyat) * Toplam Arz * Hassasiyet
        int256 adjustmentAmount = (priceDifference * int256(totalSupply) * int256(adjustmentFactor)) / (int256(targetPrice) * 1000);

        if (adjustmentAmount > 0) {
            // Fiyat yüksek, arzı artır (mint)
            stableToken.mint(owner(), uint256(adjustmentAmount));
            emit SupplyAdjusted(adjustmentAmount);
        } else if (adjustmentAmount < 0) {
            // Fiyat düşük, arzı azalt (burn)
            uint256 amountToBurn = uint256(-adjustmentAmount);
            if (stableToken.balanceOf(address(this)) >= amountToBurn) {
                stableToken.burn(address(this), amountToBurn);
                emit SupplyAdjusted(adjustmentAmount);
            }
        }
    }

    /**
     * @dev Oracle kontratının adresini günceller. Sadece sahip tarafından.
     * @param _newOracle Yeni oracle adresi.
     */
    function setPriceOracle(address _newOracle) external onlyOwner {
        priceOracle = _newOracle;
    }

    /**
     * @dev Yakma işlemleri için kontrata token yatırma.
     */
    function depositTokens(uint256 amount) external {
        stableToken.transferFrom(msg.sender, address(this), amount);
    }

    /**
     * @dev Kontratın sahibi tarafından acil durumlarda token çekme.
     */
    function withdrawTokens(address to, uint256 amount) external onlyOwner {
        require(stableToken.balanceOf(address(this)) >= amount, "Insufficient balance");
        stableToken.transfer(to, amount);
    }

    /**
     * @dev Kontratın Ether alabilmesi için.
     */
    receive() external payable {}
}
