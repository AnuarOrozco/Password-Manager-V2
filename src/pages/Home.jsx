import { motion } from "framer-motion";
import { LockClosedIcon, ShieldCheckIcon, KeyIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import Footer from "../components/Footer";
import Header from '../components/Header';

const Home = () => {
return (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100"
    >
        {/* Header Component */}
        <Header />

        {/* Main Content */}
        <main className="container mx-auto px-6 py-20 max-w-4xl">
            {/* Hero Section */}
            <motion.section
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-center mb-20"
            >
                <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="text-5xl md:text-6xl font-bold text-slate-800 mb-6"
                >
                    Secure Password Vault
                </motion.h1>
                
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="text-xl text-slate-600 max-w-2xl mx-auto mb-10"
                >
                    Your personal, encrypted password management solution
                </motion.p>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                >
                    <button className="group flex items-center justify-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 mx-auto">
                        Access Vault
                        <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </motion.div>
            </motion.section>

            {/* Features Grid */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="grid md:grid-cols-3 gap-8"
            >
                {[
                    {
                        icon: <LockClosedIcon className="h-10 w-10 text-blue-600" />,
                        title: "Military-grade Encryption",
                        description: "AES-256 encryption keeps your passwords secure"
                    },
                    {
                        icon: <ShieldCheckIcon className="h-10 w-10 text-green-600" />,
                        title: "Zero-knowledge Protocol",
                        description: "Only you have access to your master password"
                    },
                    {
                        icon: <KeyIcon className="h-10 w-10 text-purple-600" />,
                        title: "Password Generator",
                        description: "Create strong, unique passwords instantly"
                    }
                ].map((feature, index) => (
                    <motion.div
                        key={index}
                        whileHover={{ y: -5 }}
                        className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
                    >
                        <div className="flex flex-col items-center text-center">
                            <div className="mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-semibold text-slate-800 mb-2">{feature.title}</h3>
                            <p className="text-slate-600">{feature.description}</p>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </main>

        {/* Footer Component */}
        <Footer />
    </motion.div>
);
};

export default Home;