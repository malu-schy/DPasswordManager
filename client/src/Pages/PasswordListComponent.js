import * as React from 'react'

function PasswordListComponent() {
  const contractAddress = process.env.REACT_APP_CONTRACTADDRESS
  console.log(process.env)

  const [password, setPassword] = React.useState('')
  const [passwords, setPasswords] = React.useState([
    { id: 1, title: 'Facebook', username: 'bla@blub.de', password: 'Flasche1' },
    {
      id: 2,
      title: 'Instagram',
      username: 'bla@blub.de',
      password: 'Fl1',
    },
    { id: 3, title: 'LinkedIn', username: 'bla@blub.de', password: 'Flasche2' },
  ])
  const [visibility, setVisibility] = React.useState()
  const [buttonText, setButtonText] = React.useState('Show Password')
  const passwordList = []

  function changeVisibility(id) {
    if (visibility === id) {
      setVisibility(null)
    } else {
      setVisibility(id)
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
      <div className=" flex mb-4 inset-0 flex items-center justify-center">
        <div className="flex flex-wrap">
          <div className="col-span-1 m-4">
            <div className="PasswordList">
              {passwords.map((item, _key) => {
                return (
                  <div
                    onClick={() => changeVisibility(item.id)}
                    className="cursor-pointer flex gap-3 text-left bg-gray-100 dark:bg-gray-700 mb-3 p-5 rounded-3xl text-gray-700 dark:text-gray-300 w-60"
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
                        {JSON.stringify(item.title).replace(
                          /^"(.+(?="$))"$/,
                          '$1',
                        )}
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
      </div>
    </div>
  )
}

export default PasswordListComponent
