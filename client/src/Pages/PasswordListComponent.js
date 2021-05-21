import * as React from 'react'
import { ethers } from 'ethers'
import PasswordManager from '../artifacts/contracts/PasswordManager.sol/PasswordManager.json'
import { Input } from '../components/input'

function PasswordListComponent() {
  // const contractAddress = process.env.REACT_APP_CONTRACTADDRESS
  // console.log(process.env)
  const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'
  const [masterPassword, setMasterPassword] = React.useState('')
  const [visibility, setVisibility] = React.useState()
  const [refresh, setRefresh] = React.useState(0)
  const [entries, setEntries] = React.useState([])

  var sha256 = require('crypto-js/sha256')
  var CryptoJS = require('crypto-js')

  function decryptPassword(password) {
    var bytes = CryptoJS.AES.decrypt(
      password.toString(),
      masterPassword.toString(),
    )
    var plaintext = bytes.toString(CryptoJS.enc.Utf8)
    return plaintext
  }

  function changeVisibility(id) {
    visibility === id ? setVisibility(null) : setVisibility(id)
  }

  async function fetchPasswords() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(
        contractAddress,
        PasswordManager.abi,
        provider,
      )
      try {
        const numberOfEntries = await contract.getNumberOfPasswords()
        const list = []
        var id = 0
        for (var i = 0; i < numberOfEntries; i++) {
          id++
          const title = await contract.fetchTitle(i)
          const username = await contract.fetchUsername(i)
          const password = await contract.fetchPassword(i)
          list.push({ id, title, username, password })
        }
        setEntries(list)
      } catch (err) {
        console.log('error 😭: ', err)
      }
    }
  }

  React.useEffect(() => fetchPasswords(), [refresh])

  return (
    <div>
      <div className="Container-1">
        <form className="m-3 Form">
          <Input
            label="Masterpassword"
            type="password"
            onChange={(e) =>
              setMasterPassword(sha256(e.target.value).toString())
            }
          ></Input>
        </form>
        <div className="col-span-1 m-4">
          {entries.map((item, _key) => {
            return (
              <div
                onClick={() => changeVisibility(item.id)}
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
                      ? decryptPassword(item.password)
                      : // decryptPassword(item.password)
                        // JSON.stringify(item.password).replace(
                        //   /^"(.+(?="$))"$/,
                        //   '$1',
                        // ),
                        // )
                        '••••••'}
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
