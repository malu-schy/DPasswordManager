import * as React from 'react'
import { ethers } from 'ethers'
import PasswordManager from '../artifacts/contracts/PasswordManager.sol/PasswordManager.json'
import { Input } from '../components/input'
import useToastContext from '../hooks/useToastContext'

function CreatePasswordComponent() {
  const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'
  // process.env.REACT_APP_CONTRACTADDRESS
  // console.log(process.env);

  const [password, setPassword] = React.useState('')
  const [username, setUsername] = React.useState('')
  const [title, setTitle] = React.useState('')
  const addToast = useToastContext()
  // const newPassword = React.useState({ title, username, password })

  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' })
  }

  async function createPassword() {
    addToast(title)
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
      const transaction = await contract.setPassword(title, username, password)
      await transaction.wait()
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
      </div>
    </div>
  )
}

export default CreatePasswordComponent
