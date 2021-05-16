import React, { useState } from 'react'
import Greeter from '../artifacts/contracts/Greeter.sol/Greeter.json'
import { ethers } from 'ethers'

function Home() {
  const greeterAddress = '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0'
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
              <form className="bg-white dark:bg-gray-700 shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="Greeter">
                  <div className="mb-4">
                    <input
                      type="text"
                      className="Input"
                      onChange={(e) => setNewGreeting(e.target.value)}
                    ></input>
                  </div>
                  <button
                    className="m-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={setGreeting}
                  >
                    Save Greeting
                  </button>
                  <button
                    className="m-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={getGreeting}
                  >
                    Show Greeting
                  </button>
                </div>
              </form>
            </div>
            <div>{outputText}</div>
          </div>
          {/* 3 of 3 Columns  */}
          <div className="w-1/3  h-12"></div>
        </div>
      </div>
    </div>
  )
}

export default Home
