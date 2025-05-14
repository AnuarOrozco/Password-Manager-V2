import { motion } from 'framer-motion'

export default function App() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50"
    >
      <main className="container mx-auto px-4 py-8">
        <motion.h1 
          className="text-3xl font-bold text-gray-800 mb-6"
          whileHover={{ scale: 1.02 }}
        >
          Key Guard
        </motion.h1>
        
        <motion.section
          className="bg-white p-6 rounded-lg shadow-sm"
          whileHover={{ y: -2 }}
        >
          <h2 className="text-xl font-semibold mb-4">Start Building</h2>
          <p className="text-gray-600">
            Edit this component to begin your project.
          </p>
        </motion.section>
      </main>
    </motion.div>
  )
}