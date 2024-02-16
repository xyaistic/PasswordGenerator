import React, { useCallback, useEffect, useRef, useState } from 'react'

const App = () => {

  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")
  const passRef = useRef(null)
  const [copied, setCopied] = useState(false)

  const copyText = () => {
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 5000);
  }


  const copyPassowrd = useCallback(() => {
    passRef.current?.select()
    copyText()
    window.navigator.clipboard.writeText(password)
  }, [password])


  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*()_+-=[]{}|;:',.<>?~/`"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])


  return (
    <>
      <div className="bg-zinc-900 h-screen flex flex-col items-center justify-center gap-0 ">
        <h1 className='text-white text-3xl mb-4'>Password Generator</h1>
        <div className="flex  justify-center bg-grey-500">
          <input type="text" id="hs-trailing-button-add-on"
            name="hs-trailing-button-add-on"
            readOnly
            value={password}
            placeholder='Password'
            ref={passRef}
            class="py-3 px-4  w-96 rounded-s-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:text-zinc-900 dark:focus:ring-gray-600" />

          <button onClick={copyPassowrd} className='py-3 px-4 w-20 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-e-md border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'>
            {copied ? (
              <i class="fa-solid fa-copy"></i>
            ) : (
              'Copy'
            )}
          </button>
        </div>
        <div className="flex justify-center bg-white-800 pt-5 ">
          <input type="range"
            min={8}
            mix={12}
            className='cursor-pointer'
            value={length}
            onChange={(e) => {
              setLength(e.target.value)
            }} />
          <h1 className='text-white ml-3'>{length}</h1>

          <fieldset>
            <legend className="sr-only">Checkboxes</legend>

            <div className="gap-5 ml-3 flex items-center">
              <label htmlFor="Option1" className="flex cursor-pointer items-start gap-4">
                <div className="flex items-center">
                  &#8203;
                  <input type="checkbox"
                    defaultChecked={false}
                    onChange={() => {
                      setNumberAllowed((prev) => !prev)
                    }}
                    className="size-4 rounded border-gray-300"
                    id="Option1" />

                </div>

                <div>
                  <strong className="font-medium text-white"> Number </strong>
                </div>
              </label>

              <label htmlFor="Option2" className="flex cursor-pointer items-start gap-4">
                <div className="flex items-center">
                  &#8203;
                  <input type="checkbox"
                    defaultChecked={false}
                    onChange={() => {
                      setCharAllowed((prev) => !prev)
                    }} className="size-4 rounded border-gray-300" id="Option2" />
                </div>

                <div>
                  <strong className="font-medium text-white"> Character </strong>
                </div>
              </label>

              <label htmlFor="Option3" className="flex cursor-pointer items-start gap-4">
                <div className="flex items-center">
                  &#8203;
                  <input type="checkbox" className="size-4 rounded border-gray-300" id="Option3" />
                </div>

                <div>
                  <strong className="font-medium text-white"> Symbols </strong>
                </div>
              </label>
            </div>
          </fieldset>
        </div>
      </div>
    </>
  )
}

export default App

