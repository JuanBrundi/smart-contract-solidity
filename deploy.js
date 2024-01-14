const HDWalletProvider = require("@truffle/hdwallet-provider");
const { Web3 } = require("web3")
const { abi, evm } = require("./compile")

const sheetphrase = "horse permit mimic enable shadow fame catalog want walk almost play afford"
const goerliNetwork = "https://sepolia.infura.io/v3/ae4f23b606344f10bb6a8e6c3427a100"

const provider = new HDWalletProvider(sheetphrase, goerliNetwork)

const web3 = new Web3(provider)

const deploy = async () => {
  try {
    const accounts = await web3.eth.getAccounts();
    const addressFrom = accounts[0]

    console.log("Deployment from: ", addressFrom)
    const deployedContract = await new web3.eth.Contract(abi)
      .deploy({
        data: evm.bytecode.object,
        arguments: ["Halo"]
      })
      .send({
        from: addressFrom,
        gas: "1000000"
      })

      console.log("Deployed to: ", deployedContract.options.address)
  } catch (error) {
    console.log("DEBUG error", error)
  } finally {
    provider.engine.stop();
  }
}

deploy()
