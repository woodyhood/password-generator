import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [password, setPassword] = useState('')
  const [length, setLength] = useState(16)
  const [useUpper, setUseUpper] = useState(true)
  const [useNumbers, setUseNumbers] = useState(true)
  const [useSymbols, setUseSymbols] = useState(true)
  const [strength, setStrength] = useState('')

  const generatePassword = () => {
    let chars = "abcdefghijklmnopqrstuvwxyz"
    if (useUpper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if (useNumbers) chars += "0123456789"
    if (useSymbols) chars += "!@#$%^&*()_-+=<>?"

    if (chars.length === 0) return

    const array = new Uint32Array(length)
    window.crypto.getRandomValues(array)

    let newPassword = ""
    for (let i = 0; i < length; i++) {
      newPassword += chars[array[i] % chars.length]
    }

    setPassword(newPassword)
    updateStrength(newPassword)
  }

  const updateStrength = (pwd) => {
    let score = 0
    if (pwd.length >= 12) score++
    if (/[A-Z]/.test(pwd)) score++
    if (/[0-9]/.test(pwd)) score++
    if (/[^A-Za-z0-9]/.test(pwd)) score++

    const strengthText =
      score <= 1 ? "Weak" :
      score === 2 ? "Moderate" :
      score === 3 ? "Strong" : "Very Strong"

    setStrength("Password strength: " + strengthText)
  }

  const copyPassword = () => {
    if (!password) return
    navigator.clipboard.writeText(password)
    alert("Password copied to clipboard")
  }

  useEffect(() => {
    generatePassword()
  }, [])

  return (
    <div className="container">
      <header>
        <h1>Secure Password Generator</h1>
        <p>Generate strong passwords instantly — no tracking, no storage.</p>
      </header>

      {/* TOP AD */}
      <div className="ad">
        Advertisement
        {/* AdSense block goes here */}
      </div>

      <div className="card">
        <div className="output">
          <input 
            type="text" 
            id="password" 
            value={password}
            readOnly 
          />
          <button onClick={copyPassword}>Copy</button>
        </div>

        <div className="controls">
          <label>
            Length
            <input 
              type="number" 
              id="length" 
              value={length}
              min="8" 
              max="64"
              onChange={(e) => setLength(parseInt(e.target.value) || 8)}
            />
          </label>

          <label>
            <input 
              type="checkbox" 
              id="upper" 
              checked={useUpper}
              onChange={(e) => setUseUpper(e.target.checked)}
            />
            Uppercase
          </label>

          <label>
            <input 
              type="checkbox" 
              id="numbers" 
              checked={useNumbers}
              onChange={(e) => setUseNumbers(e.target.checked)}
            />
            Numbers
          </label>

          <label>
            <input 
              type="checkbox" 
              id="symbols" 
              checked={useSymbols}
              onChange={(e) => setUseSymbols(e.target.checked)}
            />
            Symbols
          </label>
        </div>

        <button className="secondary" onClick={generatePassword}>
          Generate Password
        </button>

        <div className="strength">{strength}</div>
      </div>

      {/* BOTTOM AD */}
      <div className="ad">
        Advertisement
      </div>

      <footer>
        <p>
          This tool runs entirely in your browser.
          <br />
          <a href="#">Privacy Policy</a> ·
          <a href="#">Terms</a> ·
          <a href="#">About</a>
        </p>
      </footer>
    </div>
  )
}

export default App

