import React, { useState } from 'react'
import Greeter from '../artifacts/contracts/Greeter.sol/Greeter.json'
import { ethers } from 'ethers'

function Home() {
  const greeterAddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512'
  const [greeting, setNewGreeting] = useState('')
  const [outputText, setOutputText] = useState('')

  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' })
    console.log('called requestAccount')
  }

  async function getGreeting() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      console.log({ provider })
      const contract = new ethers.Contract(
        greeterAddress,
        Greeter.abi,
        provider,
      )
      try {
        const data = await contract.greet()
        console.log('data: ', data)
        setOutputText(data)
      } catch (err) {
        console.log('err: ', err)
        setOutputText(err)
      }
    }
  }

  async function setGreeting() {
    console.log('setGreeting called()')
    if (!greeting) return
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      console.log({ provider })
      const signer = provider.getSigner()
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer)
      const transaction = await contract.setGreeting(greeting)
      await transaction.wait()
      getGreeting()
    }
  }

  return (
    <div>
      <div>
        <div className="flex mb-4">
          {/* 1 of 3 Columns  */}
          <div className="w-1/3  h-12"></div>
          {/* 2 of 3 Columns  */}
          <div className="w-1/3  h-12">
            <div className="Headline container mx-auto">
              <h1 className="m-4 font-semibold text-xl dark:text-gray-300">
                Hello React &amp; Hardhat
              </h1>
            </div>
            <div className="">
              <form className="Form">
                <div className="Greeter">
                  <div className="mb-4">
                    <input
                      type="text"
                      className="Input"
                      onChange={(e) => setNewGreeting(e.target.value)}
                    ></input>
                  </div>
                </div>
              </form>
              <button className="Button" onClick={setGreeting}>
                {/* <button className="Button" onClick={setGreeting}> */}
                Save Greeting
              </button>
              <button className="Button" onClick={getGreeting}>
                Show Greeting
              </button>
            </div>
            <div className="text-white">{outputText}</div>
          </div>
          {/* 3 of 3 Columns  */}
          <div className="w-1/3  h-12"></div>
        </div>
      </div>
    </div>
  )
}

export default Home
