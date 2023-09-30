import { useCallback, useEffect, useRef, useState } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")


// useRef Hook
  const passwordRef = useRef(null);

  const passwordGenerator= useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str+= "0123456789"
    if (charAllowed) str+= "~`!@#$%^&*()_+-{}[]"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random()*str.length +1)
      pass = pass+str.charAt(char)
    }
    setPassword(pass)

  },[length, numberAllowed, charAllowed, setPassword])

  const copyPassword= useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,length)
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
    passwordGenerator()
  },[length, numberAllowed, charAllowed, setPassword])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded p-4 my-8 text-orange-500 bg-slate-500'>
        <h1 className='text-4xl text-center text-white my-3'>Password Generator</h1>
        <input type="text" value={password} className='outline-none w-10/12 max-w-md py-1 px-3' placeholder='password' readOnly ref={passwordRef}/>
        <button className='outline-none bg-blue-800 text-white px-3 py-1 shrink-0 active:bg-blue-600' onClick={copyPassword}>Copy</button>
        <div className='flex text-white gap-x-2 my-3'>
          <div className=' flex items-center gap-x-1'>
            <input type="range" min={6} max={30} value={length} className='cursor-pointer' onChange={(e)=>setLength(e.target.value)}/>
            <label>Length:{length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" defaultChecked={numberAllowed} onChange={()=>setNumberAllowed((prev)=>!prev)} />
            <label>Number</label>
          </div>
          <div className='flex items-center gap-x-1'>
          <input type="checkbox" defaultChecked={charAllowed} onChange={()=>setCharAllowed((prev)=>!prev)}/>   <label>Character</label>
          </div>
        </div>

      </div>
    </>
  )
}

export default App
