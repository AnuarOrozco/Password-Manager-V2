import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.8 }}
      viewport={{ once: true }}
      className="py-8 text-center text-slate-500 text-sm"
    >
      <p>© {new Date().getFullYear()} Personal Password Vault • Not affiliated with any company</p>
    </motion.footer>
  );
};

export default Footer;