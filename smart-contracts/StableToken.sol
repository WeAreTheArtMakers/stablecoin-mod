// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title StableToken
 * @dev ERC20 tabanlı, mint/burn edilebilir stablecoin.
 * Sadece sahip (owner) olan adres (Stabilizer kontratı) mint ve burn işlemi yapabilir.
 */
contract StableToken is ERC20, Ownable {
    constructor(address initialOwner) ERC20("Stable Token", "STB") Ownable(initialOwner) {
    }

    /**
     * @dev Yeni token'lar oluşturur. Sadece sahip tarafından çağrılabilir.
     * @param to Token'ların gönderileceği adres.
     * @param amount Oluşturulacak token miktarı.
     */
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    /**
     * @dev Mevcut token'ları yakar. Sadece sahip tarafından çağrılabilir.
     * @param from Token'ların yakılacağı adres.
     * @param amount Yakılacak token miktarı.
     */
    function burn(address from, uint256 amount) public onlyOwner {
        _burn(from, amount);
    }
}
