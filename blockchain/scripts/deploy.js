const hre = require('hardhat')

async function main() {
  const PasswordManager = await hre.ethers.getContractFactory('PasswordManager')
  const password = await PasswordManager.deploy()

  await password.deployed()

  console.log('Password deployed to:', password.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
