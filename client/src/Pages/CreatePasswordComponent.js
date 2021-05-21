import * as React from 'react'
import { ethers } from 'ethers'
import PasswordManager from '../artifacts/contracts/PasswordManager.sol/PasswordManager.json'
import { Input } from '../components/input'
import useToastContext from '../hooks/useToastContext'

function CreatePasswordComponent() {
  const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'
  // process.env.REACT_APP_CONTRACTADDRESS
  // console.log(process.env);

  const [masterPassword, setMasterPassword] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [username, setUsername] = React.useState('')
  const [title, setTitle] = React.useState('')
  const addToast = useToastContext()

  var sha256 = require('crypto-js/sha256')
  var CryptoJS = require('crypto-js')
  var privateKey = masterPassword.toString()
  var ciphertext = CryptoJS.AES.encrypt(password, privateKey).toString()

  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' })
  }

  async function createPassword() {
    console.log('create Password called()')
    if (!password) return
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(
        contractAddress,
        PasswordManager.abi,
        signer,
      )
      const transaction = await contract.setPassword(
        title,
        username,
        ciphertext,
      )
      await transaction.wait()
      addToast(title)
    }
  }

  return (
    <div>
      <div className="Container-1">
        {/* TODO: Modal instead of Form */}
        <form className="m-3 Form">
          <Input
            label="Masterpassword"
            type="password"
            onChange={(e) => setMasterPassword(sha256(e.target.value))}
          ></Input>
        </form>
        <form className="Form">
          <Input label="Titel" onChange={(e) => setTitle(e.target.value)} />
          <Input
            label="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            label="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="button" onClick={createPassword} className="Button">
            Save Password
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreatePasswordComponent
