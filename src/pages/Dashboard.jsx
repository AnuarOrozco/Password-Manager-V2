import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { PlusIcon, LockClosedIcon, XMarkIcon, EyeIcon, EyeSlashIcon, PencilSquareIcon, CheckIcon, TrashIcon } from '@heroicons/react/24/outline'
import Header from '../components/Header'
import Footer from '../components/Footer'

const Dashboard = () => {
  const [passwords, setPasswords] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newPassword, setNewPassword] = useState({
    name: '',
    username: '',
    password: ''
  })
  const [viewingPassword, setViewingPassword] = useState(null)
  const [editingPassword, setEditingPassword] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const [editForm, setEditForm] = useState({
    name: '',
    username: '',
    password: ''
  })

  // Load passwords on component mount
  useEffect(() => {
    fetchPasswords()
  }, [])

const fetchPasswords = async () => {
  try {
    const response = await fetch('/api/passwords');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    setPasswords(data);
  } catch (error) {
    console.error('Error fetching passwords:', error);
  }
}

  const handleAddPassword = async () => {
    if (newPassword.name && newPassword.username && newPassword.password) {
      try {
        const response = await fetch('http://localhost:3001/api/passwords', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newPassword),
        })
        const data = await response.json()
        setPasswords([...passwords, { ...newPassword, id: data.id }])
        setNewPassword({ name: '', username: '', password: '' })
        setIsModalOpen(false)
      } catch (error) {
        console.error('Error adding password:', error)
      }
    }
  }

  const handleViewPassword = (password) => {
    setViewingPassword(password)
    setEditingPassword(null)
    setShowPassword(false)
  }

  const handleEditPassword = (password) => {
    setEditingPassword(password.id)
    setEditForm({
      name: password.name,
      username: password.username,
      password: password.password
    })
    setShowPassword(true)
  }

  const handleSaveEdit = async (id) => {
    try {
      await fetch(`http://localhost:3001/api/passwords/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editForm),
      })
      setPasswords(passwords.map(p => 
        p.id === id ? { ...p, ...editForm } : p
      ))
      setEditingPassword(null)
      setViewingPassword(null)
    } catch (error) {
      console.error('Error updating password:', error)
    }
  }

  const handleDeletePassword = async (id) => {
    try {
      await fetch(`http://localhost:3001/api/passwords/${id}`, {
        method: 'DELETE'
      })
      setPasswords(passwords.filter(p => p.id !== id))
      setViewingPassword(null)
    } catch (error) {
      console.error('Error deleting password:', error)
    }
  }

  const handleCancelEdit = () => {
    setEditingPassword(null)
    setViewingPassword(null)
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
                      <button 
                        onClick={() => handleViewPassword(password)}
                        className="text-sm text-blue-500 hover:text-blue-600"
                      >
                        View
                      </button>
                    </div>

                    {/* Password Detail View */}
                    {viewingPassword?.id === password.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-4 pt-4 border-t border-slate-100"
                      >
                        {editingPassword === password.id ? (
                          <div className="space-y-3">
                            <div>
                              <label className="block text-sm font-medium text-slate-700 mb-1">Site Name</label>
                              <input
                                type="text"
                                value={editForm.name}
                                onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                                className="w-full px-3 py-2 border border-slate-300 rounded-md"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-slate-700 mb-1">Username</label>
                              <input
                                type="text"
                                value={editForm.username}
                                onChange={(e) => setEditForm({...editForm, username: e.target.value})}
                                className="w-full px-3 py-2 border border-slate-300 rounded-md"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                              <div className="relative">
                                <input
                                  type={showPassword ? "text" : "password"}
                                  value={editForm.password}
                                  onChange={(e) => setEditForm({...editForm, password: e.target.value})}
                                  className="w-full px-3 py-2 border border-slate-300 rounded-md pr-10"
                                />
                                <button 
                                  onClick={() => setShowPassword(!showPassword)}
                                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                                >
                                  {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                                </button>
                              </div>
                            </div>
                            <div className="flex justify-between pt-2">
                              <button
                                onClick={() => handleDeletePassword(password.id)}
                                className="flex items-center gap-1 px-3 py-1 text-sm bg-red-100 hover:bg-red-200 text-red-600 rounded-md"
                              >
                                <TrashIcon className="h-4 w-4" />
                                Delete
                              </button>
                              <div className="flex gap-2">
                                <button
                                  onClick={handleCancelEdit}
                                  className="px-3 py-1.5 text-slate-700 hover:bg-slate-100 rounded-md"
                                >
                                  Cancel
                                </button>
                                <button
                                  onClick={() => handleSaveEdit(password.id)}
                                  className="px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-md flex items-center gap-1"
                                >
                                  <CheckIcon className="h-4 w-4" />
                                  Save
                                </button>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium text-slate-700">Password:</span>
                              <div className="flex items-center">
                                <span className="font-mono">
                                  {showPassword ? password.password : '••••••••'}
                                </span>
                                <button 
                                  onClick={() => setShowPassword(!showPassword)}
                                  className="ml-2 text-slate-400 hover:text-slate-600"
                                >
                                  {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                                </button>
                              </div>
                            </div>
                            <div className="flex justify-end pt-2">
                              <button
                                onClick={() => handleEditPassword(password)}
                                className="flex items-center gap-1 px-3 py-1 text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md"
                              >
                                <PencilSquareIcon className="h-4 w-4" />
                                Edit
                              </button>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}
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
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={newPassword.password}
                      onChange={(e) => setNewPassword({...newPassword, password: e.target.value})}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                      placeholder="Enter your password"
                    />
                    <button 
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                    </button>
                  </div>
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
      <Footer />
    </>
  )
}

export default Dashboard