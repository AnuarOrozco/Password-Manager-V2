import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { LockClosedIcon, ClipboardDocumentIcon, CheckIcon, ArrowsRightLeftIcon } from '@heroicons/react/24/outline'
import Header from '../components/Header'

const Generator = () => {
  const [password, setPassword] = useState('')
  const [length, setLength] = useState(16)
  const [copied, setCopied] = useState(false)
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
    avoidAmbiguous: true
  })

  // Military-grade password requirements
  const generatePassword = useCallback(() => {
    const uppercase = 'ABCDEFGHJKLMNPQRSTUVWXYZ'
    const lowercase = 'abcdefghijkmnopqrstuvwxyz'
    const numbers = '23456789'
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?'
    const ambiguous = 'l1IO0'

    let chars = ''
    if (options.uppercase) chars += uppercase
    if (options.lowercase) chars += lowercase
    if (options.numbers) chars += numbers
    if (options.symbols) chars += symbols
    if (!options.avoidAmbiguous) chars += ambiguous

    // Ensure at least one character from each selected set
    let generated = ''
    if (options.uppercase) generated += uppercase.charAt(Math.floor(Math.random() * uppercase.length))
    if (options.lowercase) generated += lowercase.charAt(Math.floor(Math.random() * lowercase.length))
    if (options.numbers) generated += numbers.charAt(Math.floor(Math.random() * numbers.length))
    if (options.symbols) generated += symbols.charAt(Math.floor(Math.random() * symbols.length))

    // Fill the rest randomly
    for (let i = generated.length; i < length; i++) {
      generated += chars.charAt(Math.floor(Math.random() * chars.length))
    }

    // Shuffle the result
    setPassword(generated.split('').sort(() => 0.5 - Math.random()).join(''))
    setCopied(false)
  }, [length, options])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleOptionChange = (option) => {
    setOptions(prev => ({
      ...prev,
      [option]: !prev[option]
    }))
  }

  return (
    <>
      <Header />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-slate-50 p-6"
      >
        <div className="max-w-4xl mx-auto">
          <motion.header
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-light text-slate-800">
              Password <span className="font-medium">Generator</span>
            </h1>
            <p className="text-slate-600 mt-2">Create military-grade secure passwords</p>
          </motion.header>

          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm overflow-hidden"
          >
            <div className="p-6 border-b border-slate-100">
              <h2 className="text-xl font-medium text-slate-800 flex items-center gap-2">
                <LockClosedIcon className="h-5 w-5 text-blue-500" />
                Generate New Password
              </h2>
            </div>

            <div className="p-6 space-y-6">
              {/* Password Output */}
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-slate-100 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-lg break-all">{password || 'Your password will appear here'}</span>
                    {password && (
                      <button 
                        onClick={copyToClipboard}
                        className="text-slate-500 hover:text-blue-500 ml-2"
                        title="Copy to clipboard"
                      >
                        {copied ? (
                          <CheckIcon className="h-5 w-5 text-green-500" />
                        ) : (
                          <ClipboardDocumentIcon className="h-5 w-5" />
                        )}
                      </button>
                    )}
                  </div>
                </div>
                <button
                  onClick={generatePassword}
                  className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                  title="Generate new password"
                >
                  <ArrowsRightLeftIcon className="h-5 w-5" />
                </button>
              </div>

              {/* Length Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-slate-700">
                    Length: {length}
                  </label>
                  <span className="text-xs text-slate-500">
                    {length < 12 ? 'Weak' : length < 16 ? 'Good' : 'Strong'}
                  </span>
                </div>
                <input
                  type="range"
                  min="8"
                  max="32"
                  value={length}
                  onChange={(e) => setLength(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>8</span>
                  <span>12</span>
                  <span>16</span>
                  <span>20</span>
                  <span>24</span>
                  <span>32</span>
                </div>
              </div>

              {/* Options */}
              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={options.uppercase}
                    onChange={() => handleOptionChange('uppercase')}
                    className="form-checkbox h-5 w-5 text-blue-500 rounded"
                  />
                  <span className="text-slate-700">Uppercase (A-Z)</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={options.lowercase}
                    onChange={() => handleOptionChange('lowercase')}
                    className="form-checkbox h-5 w-5 text-blue-500 rounded"
                  />
                  <span className="text-slate-700">Lowercase (a-z)</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={options.numbers}
                    onChange={() => handleOptionChange('numbers')}
                    className="form-checkbox h-5 w-5 text-blue-500 rounded"
                  />
                  <span className="text-slate-700">Numbers (0-9)</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={options.symbols}
                    onChange={() => handleOptionChange('symbols')}
                    className="form-checkbox h-5 w-5 text-blue-500 rounded"
                  />
                  <span className="text-slate-700">Symbols (!@#$)</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={options.avoidAmbiguous}
                    onChange={() => handleOptionChange('avoidAmbiguous')}
                    className="form-checkbox h-5 w-5 text-blue-500 rounded"
                  />
                  <span className="text-slate-700">Avoid ambiguous chars (l1IO0)</span>
                </label>
              </div>

              {/* Security Tips */}
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <h3 className="font-medium text-blue-800 mb-2">Military-Grade Security Standards</h3>
                <ul className="text-sm text-blue-700 list-disc list-inside space-y-1">
                  <li>Minimum recommended length: 16 characters</li>
                  <li>Use all available character types</li>
                  <li>Avoid dictionary words and personal information</li>
                  <li>Change passwords every 90 days</li>
                  <li>Never reuse passwords across sites</li>
                </ul>
              </div>
            </div>
          </motion.section>
        </div>
      </motion.div>
    </>
  )
}

export default Generator