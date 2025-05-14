import { motion } from 'framer-motion'
import { PlusIcon, LockClosedIcon } from '@heroicons/react/24/outline'
import Header from '../components/Header'

const Dashboard = () => {
  // Sample passwords data - replace with your actual data
  const passwords = [
    { id: 1, name: 'Gmail', username: 'anuar@gmail.com' },
    { id: 2, name: 'GitHub', username: 'anuar-dev' },
    { id: 3, name: 'Netflix', username: 'anuar@example.com' }
  ]

  // Import the Header component

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
              <button className="flex items-center gap-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
                <PlusIcon className="h-4 w-4" />
                Add New
              </button>
            </div>

            {/* Passwords List */}
            <ul className="divide-y divide-slate-100">
              {passwords.map((password) => (
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
              ))}
            </ul>
          </motion.section>
        </div>
      </motion.div>
    </>
  )
}

export default Dashboard