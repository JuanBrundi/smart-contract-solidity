const assert = require("assert")
const ganache = require("ganache")
const { Web3 } = require("web3")
const web3 = new Web3(ganache.provider())
const { abi, evm } = require("../compile")

let accounts;
let inbox;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  
  inbox = await new web3.eth.Contract(abi)
    .deploy({
      data: evm.bytecode.object,
      arguments: ["Halo"]
    })
    .send({
      from: accounts[0],
      gas: "1000000"
    })
})

describe("Inbox", () => {
  it("deploy contract", () => {
    console.log(inbox)
  })
})
