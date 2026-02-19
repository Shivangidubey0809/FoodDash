import React from 'react';
import { Loader } from 'lucide-react';

export const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center py-12">
      <Loader className="animate-spin w-8 h-8 text-blue-500" />
    </div>
  );
};

interface Props {
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ children, className = '' }: Props) => {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      {children}
    </div>
  );
};

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

export const Button = ({ 
  children, 
  onClick, 
  className = '', 
  variant = 'primary',
  disabled = false 
}: ButtonProps) => {
  const baseClasses = 'px-4 py-2 rounded font-medium transition-colors';
  const variantClasses = variant === 'primary' 
    ? 'bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-400'
    : 'bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:bg-gray-300';
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses} ${className}`}
    >
      {children}
    </button>
  );
};

export const Input = ({ 
  className = '', 
  ...props 
}: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      {...props}
    />
  );
};

export const Select = ({ 
  className = '', 
  children,
  ...props 
}: React.SelectHTMLAttributes<HTMLSelectElement>) => {
  return (
    <select
      className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      {...props}
    >
      {children}
    </select>
  );
};
