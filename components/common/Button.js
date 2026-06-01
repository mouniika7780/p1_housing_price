import { Loader2 } from "lucide-react";

const variantStyles = {
  primary:"bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white focus:ring-indigo-500 disabled:bg-indigo-300",
  secondary:"bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-800 border border-slate-300 focus:ring-slate-400 disabled:bg-slate-50",
  danger:"bg-red-600 hover:bg-red-700 active:bg-red-800 text-white focus:ring-red-500 disabled:bg-red-300",
  transparent:"bg-transparent hover:bg-slate-100 active:bg-slate-200 text-slate-600 focus:ring-slate-300 disabled:opacity-50",
  success:"bg-green-600 hover:bg-green-700 active:bg-green-800 text-white focus:ring-green-500 disabled:bg-green-300",
};

const sizeStyles = {
  sm:"px-3 py-1.5 text-sm rounded-sm",
  md:"px-4 py-2 text-base rounded-md",
  lg:"px-6 py-3 text-lg rounded-lg",
};

export const Button = ({
  variant = "primary",
  size = "md",
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth=false,
  children,
  disabled,
  className="",
  ...props
}) => {


  return (
    <button 
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      aria-disabled={disabled || isLoading}
      className={`inline-flex items-center justify-center gap-2 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${variantStyles[variant]} ${sizeStyles[size]} ${fullWidth ? "w-full" : ""} ${className} `}
      {...props}
    >
      {isLoading && <Loader2 size={16} className="animate-spin" aria-hidden="true"/> }
      {!isLoading && leftIcon && <span aria-hidden="true" className="shrink-0">{leftIcon}</span>}
      <span>{children}</span>
      {!isLoading && rightIcon && <span aria-hidden="true" className="shrink-0">{rightIcon}</span>}
    </button>
  );
};