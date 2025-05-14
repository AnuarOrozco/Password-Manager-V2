import { motion } from 'framer-motion'
import { HomeIcon, KeyIcon, LockClosedIcon, Cog6ToothIcon } from '@heroicons/react/24/outline'

const Header = () => {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-md rounded-full shadow-sm z-50 w-max"
    >
      <nav className="flex items-center justify-center p-2">
        <ul className="flex space-x-1 px-1">
          {[
            {
              icon: <HomeIcon className="h-5 w-5" />,
              name: 'Home',
              path: '/'
            },
            {
              icon: <KeyIcon className="h-5 w-5" />,
              name: 'Passwords',
              path: '/Dashboard'
            },
            {
              icon: <LockClosedIcon className="h-5 w-5" />,
              name: 'Generator',
              path: '/Generator'
            },
            {
              icon: <Cog6ToothIcon className="h-5 w-5" />,
              name: 'Settings',
              path: '/settings'
            }
          ].map((item, index) => (
            <motion.li
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <a href={item.path} className="flex items-center justify-center text-sm font-medium text-gray-700">
                {item.icon}
                <span className="sr-only">{item.name}</span>
              </a>
            </motion.li>
          ))}
        </ul>
      </nav>
    </motion.header>
  )
}

export default Header