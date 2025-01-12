import { ButtonHTMLAttributes, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent';
  children: ReactNode;
}

export const Button = ({ variant = 'primary', children, ...props }: ButtonProps) => {
  const baseStyle = "px-4 py-2 rounded-lg font-medium transition-all duration-200 ease-in-out";
  const variants = {
    primary: "bg-blue-500 hover:bg-blue-600 text-white",
    secondary: "bg-green-500 hover:bg-green-600 text-white",
    accent: "bg-purple-500 hover:bg-purple-600 text-white"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyle} ${variants[variant]}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}; 