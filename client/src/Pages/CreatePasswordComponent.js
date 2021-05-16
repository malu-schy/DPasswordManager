import * as React from 'react'
// import { ethers } from "ethers";

function CreatePasswordComponent() {
  // const contractAddress = process.env.REACT_APP_CONTRACTADDRESS;
  // console.log(process.env);

  const [password, setPassword] = React.useState('')
  const [passwords, setPasswords] = React.useState([
    'Facebook',
    'Instagram',
    'LinkedIn',
  ])
  const [visibility, setVisibility] = React.useState(false)
  const [buttonText, setButtonText] = React.useState('Show Password')
  const passwordList = []

  //TODO
  //Change to specific id!!!
  function changeVisibility() {
    if (visibility == false) {
      setVisibility(true)
    } else if (visibility == true) {
      setVisibility(false)
    }
  }

  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' })
  }

  async function fetchPasswords() {}

  async function createPassword() {}

  async function deletePassword(id) {}

  return (
    <div>
      <div className="flex mb-4 inset-0 flex items-center justify-center">
        <div className="flex flex-wrap">
          <div className="col-span-1 m-4">
            <form className="bg-white dark:bg-gray-700 shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="PasswordManager">
                <div className="mb-4 text-left text-gray-700 dark:text-gray-300">
                  <label>Titel</label>
                  <input type="text" className="Input"></input>
                </div>
                <div className="mb-4 text-left text-gray-700 dark:text-gray-300">
                  <label>Username</label>
                  <input type="text" className="Input"></input>
                </div>
                <div className="mb-4 text-left text-gray-700 dark:text-gray-300">
                  <label>Password</label>
                  <input type="password" className="Input"></input>
                </div>
                <button className="m-4 bg-blue-300 dark:bg-blue-800 hover:bg-blue-400 dark:hover:bg-blue-700 text-white dark:text-gray-200 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  Save Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePasswordComponent
