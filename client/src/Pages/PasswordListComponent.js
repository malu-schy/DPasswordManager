import * as React from 'react'
import { ethers } from 'ethers'
import PasswordManager from '../artifacts/contracts/PasswordManager.sol/PasswordManager.json'

function PasswordListComponent() {
  // const contractAddress = process.env.REACT_APP_CONTRACTADDRESS
  // console.log(process.env)
  const contractAddress = '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0'
  const [password, setPassword] = React.useState('')
  const [passwords, setPasswords] = React.useState([
    { id: 1, title: 'Facebook', username: 'bla@blub.de', password: 'Flasche1' },
    { id: 2, title: 'Instagram', username: 'bla@blub.de', password: 'Fl1' },
    { id: 3, title: 'LinkedIn', username: 'bla@blub.de', password: 'Flasche2' },
  ])
  const [visibility, setVisibility] = React.useState()
  const [buttonText, setButtonText] = React.useState('Show Password')
  const passwordList = []

  function changeVisibility(id) {
    visibility === id ? setVisibility(null) : setVisibility(id)
  }

  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' })
    console.log('called requestAccount')
  }

  async function fetchPasswords() {
    console.log('fetch pw called')
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      console.log({ provider })
      const contract = new ethers.Contract(
        contractAddress,
        PasswordManager.abi,
        provider,
      )
      try {
        const data0 = await contract.fetchTitle(1)
        const data1 = await contract.fetchUsername(1)
        const data2 = await contract.fetchPassword(1)
        console.log('data0: ', data0)
        console.log('data1: ', data1)
        console.log('data2: ', data2)
      } catch (err) {
        console.log('error 😭: ', err)
      }
    }
  }

  async function deletePassword(id) {}

  return (
    <div>
      <div className="Container-1">
        <div className="col-span-1 m-4">
          {passwords.map((item, _key) => {
            return (
              <div
                onClick={fetchPasswords}
                // onClick={() => changeVisibility(item.id)}
                className="DivPointer"
                key={_key}
              >
                <div>
                  {visibility === item.id ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  )}
                </div>
                <div>
                  <p className="font-semibold text-lg">
                    {JSON.stringify(item.title).replace(/^"(.+(?="$))"$/, '$1')}
                  </p>
                  <p className="text-xs">
                    {JSON.stringify(item.username).replace(
                      /^"(.+(?="$))"$/,
                      '$1',
                    )}
                  </p>
                  <p className="text-xs mt-1">
                    {visibility === item.id
                      ? JSON.stringify(item.password).replace(
                          /^"(.+(?="$))"$/,
                          '$1',
                        )
                      : '••••••'}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default PasswordListComponent
