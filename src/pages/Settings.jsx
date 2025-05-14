import { useState } from 'react'
import { motion } from 'framer-motion'
import { Cog6ToothIcon, MoonIcon, SunIcon, ShieldCheckIcon, BellIcon, TrashIcon } from '@heroicons/react/24/outline'
import Header from '../components/Header'

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [autoLock, setAutoLock] = useState(5) // minutes

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
              App <span className="font-medium">Settings</span>
            </h1>
          </motion.header>

          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm overflow-hidden"
          >
            <div className="p-6 border-b border-slate-100">
              <h2 className="text-xl font-medium text-slate-800 flex items-center gap-2">
                <Cog6ToothIcon className="h-5 w-5 text-blue-500" />
                Preferences
              </h2>
            </div>

            <div className="divide-y divide-slate-100">
              {/* Dark Mode Toggle */}
              <div className="p-6 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  {darkMode ? (
                    <MoonIcon className="h-5 w-5 text-purple-500" />
                  ) : (
                    <SunIcon className="h-5 w-5 text-amber-500" />
                  )}
                  <span>Dark Mode</span>
                </div>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${darkMode ? 'bg-blue-500' : 'bg-slate-200'}`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-1'}`}
                  />
                </button>
              </div>

              {/* Notifications */}
              <div className="p-6 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <BellIcon className="h-5 w-5 text-blue-500" />
                  <span>Notifications</span>
                </div>
                <button
                  onClick={() => setNotifications(!notifications)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notifications ? 'bg-blue-500' : 'bg-slate-200'}`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notifications ? 'translate-x-6' : 'translate-x-1'}`}
                  />
                </button>
              </div>

              {/* Auto Lock */}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <ShieldCheckIcon className="h-5 w-5 text-blue-500" />
                  <span>Auto Lock After</span>
                </div>
                <div className="flex items-center gap-4">
                  {[1, 5, 10, 30].map((minutes) => (
                    <button
                      key={minutes}
                      onClick={() => setAutoLock(minutes)}
                      className={`px-4 py-2 rounded-lg ${autoLock === minutes ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-700'}`}
                    >
                      {minutes} min
                    </button>
                  ))}
                </div>
              </div>

              {/* Dangerous Zone */}
              <div className="p-6 bg-red-50">
                <h3 className="text-red-800 font-medium flex items-center gap-2 mb-4">
                  <TrashIcon className="h-5 w-5" />
                  Dangerous Zone
                </h3>
                <div className="space-y-3">
                  <button className="w-full px-4 py-3 bg-white border border-red-200 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
                    Export All Passwords
                  </button>
                  <button className="w-full px-4 py-3 bg-white border border-red-200 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
                    Delete All Passwords
                  </button>
                  <button className="w-full px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </motion.section>
        </div>
      </motion.div>
    </>
  )
}

export default Settings