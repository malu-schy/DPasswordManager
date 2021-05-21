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
  // console.log(sha256('Hello'))
  var CryptoJS = require('crypto-js')

  var privateKey = masterPassword.toString()
  // Encrypt
  var ciphertext = CryptoJS.AES.encrypt(password, privateKey).toString()
  console.log('ciphertext: ' + ciphertext)

  // Decrypt
  // var bytes = CryptoJS.AES.decrypt(ciphertext.toString(), 'secret key 123')
  // console.log('bytes ' + bytes)
  // var plaintext = bytes.toString(CryptoJS.enc.Utf8)

  // console.log(plaintext)

  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' })
  }

  async function createPassword() {
    console.log('create Password called()')
    if (!password) return
    if (typeof window.ethereum !== 'undefined') {
      console.log('made it')
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      console.log({ provider })
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
      console.log('ciphertext send to bc: ' + ciphertext)
      await transaction.wait()
      addToast(title)
    }
  }

  return (
    <div>
      <div className="Container-1">
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
        {/* TODO: Modal instead of Form */}
        <form className="m-3 Form">
          <Input
            label="Masterpassword"
            type="password"
            onChange={(e) => setMasterPassword(sha256(e.target.value))}
          ></Input>
          <button
            type="button"
            className="Button"
            onClick={console.log('My Masterpassword: ' + masterPassword)}
          >
            Send Masterpassword
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreatePasswordComponent
