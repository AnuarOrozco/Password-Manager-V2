import { motion } from 'framer-motion'
import { useState } from 'react'
import { PlusIcon, LockClosedIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Header from '../components/Header'

const Dashboard = () => {
  const [passwords, setPasswords] = useState([
    { id: 1, name: 'Gmail', username: 'anuar@gmail.com', password: '••••••••' },
    { id: 2, name: 'GitHub', username: 'anuar-dev', password: '••••••••' },
    { id: 3, name: 'Netflix', username: 'anuar@example.com', password: '••••••••' }
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newPassword, setNewPassword] = useState({
    name: '',
    username: '',
    password: ''
  })

  const handleAddPassword = () => {
    if (newPassword.name && newPassword.username && newPassword.password) {
      setPasswords([
        ...passwords,
        {
          id: passwords.length + 1,
          name: newPassword.name,
          username: newPassword.username,
          password: '••••••••'
        }
      ])
      setNewPassword({ name: '', username: '', password: '' })
      setIsModalOpen(false)
    }
  }

  return (
    <>
      <Header />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-slate-50 p-6"
      >
        <div className="max-w-4xl mx-auto">
          {/* Welcome Header */}
          <motion.header
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-light text-slate-800">
              Welcome, <span className="font-medium">Anuar</span>
            </h1>
          </motion.header>

          {/* Passwords Section */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm overflow-hidden"
          >
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-xl font-medium text-slate-800 flex items-center gap-2">
                <LockClosedIcon className="h-5 w-5 text-blue-500" />
                Your Passwords
              </h2>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
              >
                <PlusIcon className="h-4 w-4" />
                Add New
              </button>
            </div>

            {/* Passwords List */}
            <ul className="divide-y divide-slate-100">
              {passwords.length > 0 ? (
                passwords.map((password) => (
                  <motion.li
                    key={password.id}
                    whileHover={{ backgroundColor: 'rgba(241, 245, 249, 0.5)' }}
                    className="p-4 hover:bg-slate-50/50 transition-colors cursor-pointer"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium text-slate-800">{password.name}</h3>
                        <p className="text-sm text-slate-500">{password.username}</p>
                      </div>
                      <button className="text-sm text-blue-500 hover:text-blue-600">
                        View
                      </button>
                    </div>
                  </motion.li>
                ))
              ) : (
                <motion.li
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-8 text-center text-slate-500"
                >
                  No passwords saved yet. Click "Add New" to create your first entry.
                </motion.li>
              )}
            </ul>
          </motion.section>
        </div>

        {/* Add Password Modal */}
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              className="bg-white rounded-xl w-full max-w-md"
            >
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h3 className="text-lg font-medium">Add New Password</h3>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 rounded-full hover:bg-slate-100"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Site/App Name
                  </label>
                  <input
                    type="text"
                    value={newPassword.name}
                    onChange={(e) => setNewPassword({...newPassword, name: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. Google"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Username/Email
                  </label>
                  <input
                    type="text"
                    value={newPassword.username}
                    onChange={(e) => setNewPassword({...newPassword, username: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. your@email.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    value={newPassword.password}
                    onChange={(e) => setNewPassword({...newPassword, password: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your password"
                  />
                </div>
              </div>
              
              <div className="p-6 border-t border-slate-100 flex justify-end gap-3">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddPassword}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                >
                  Save Password
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </>
  )
}

export default Dashboard