const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // 1. StableToken kontratını deploy et
  const stableTokenFactory = await ethers.getContractFactory("StableToken");
  // Kurucuya deployer'ın adresini veriyoruz, çünkü sahipliği daha sonra transfer edeceğiz.
  const stableToken = await stableTokenFactory.deploy(deployer.address);
  await stableToken.waitForDeployment();
  const stableTokenAddress = await stableToken.getAddress();
  console.log("StableToken deployed to:", stableTokenAddress);

  // 2. Stabilizer kontratını deploy et
  const stabilizerFactory = await ethers.getContractFactory("Stabilizer");
  // Kurucuya StableToken adresini ve deployer adresini veriyoruz.
  const stabilizer = await stabilizerFactory.deploy(stableTokenAddress, deployer.address);
  await stabilizer.waitForDeployment();
  const stabilizerAddress = await stabilizer.getAddress();
  console.log("Stabilizer deployed to:", stabilizerAddress);

  // 3. StableToken'ın sahipliğini Stabilizer kontratına devret
  console.log("Transferring ownership of StableToken to Stabilizer...");
  const tx = await stableToken.transferOwnership(stabilizerAddress);
  await tx.wait();
  console.log("Ownership of StableToken transferred to Stabilizer contract.");

  // 4. Stabilizer kontratının oracle'ını deployer olarak ayarla (test için)
  // Bu zaten kurucuda yapılıyor ama yine de doğrulayalım.
  const oracleAddress = await stabilizer.priceOracle();
  console.log(`The price oracle for Stabilizer is set to: ${oracleAddress}`);
  if (oracleAddress.toLowerCase() === deployer.address.toLowerCase()) {
    console.log("Oracle address is correctly set to the deployer's address.");
  } else {
     console.warn("Warning: Oracle address is not the deployer. Manual setup may be required.");
  }

  console.log("\nDeployment complete!");
  console.log("----------------------------------------------------");
  console.log("StableToken Address:", stableTokenAddress);
  console.log("Stabilizer Address:", stabilizerAddress);
  console.log("Run the following command to verify the contracts on BscScan:");
  console.log(`npx hardhat verify --network bscTestnet ${stableTokenAddress} "${deployer.address}"`);
  console.log(`npx hardhat verify --network bscTestnet ${stabilizerAddress} "${stableTokenAddress}" "${deployer.address}"`);
  console.log("----------------------------------------------------");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
