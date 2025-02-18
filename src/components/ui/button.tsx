import { ButtonHTMLAttributes, forwardRef } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'outline' | 'ghost' | 'link';
    size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'default', size = 'md', children, ...props }, ref) => {
        const baseStyle = 'font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500';

        const variantStyles = {
            default: 'bg-blue-600 hover:bg-blue-700 text-white',
            outline: 'border border-gray-300 hover:bg-gray-50 text-gray-700',
            ghost: 'hover:bg-gray-100 text-gray-700',
            link: 'text-blue-600 hover:underline'
        };

        const sizeStyles = {
            sm: 'px-3 py-1.5 text-sm rounded',
            md: 'px-4 py-2 text-base rounded-md',
            lg: 'px-6 py-3 text-lg rounded-lg'
        };

        const combinedClassName = `${baseStyle} ${variantStyles[variant]} ${sizeStyles[size]} ${className || ''}`;

        return (
            <button className={combinedClassName} ref={ref} {...props}>
                {children}
            </button>
        );
    }
);

Button.displayName = 'Button';

export { Button };