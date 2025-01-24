import { useState, FC, ReactNode } from 'react';

interface DropdownProps {
    label: string;
    children: ReactNode;
}

export const Dropdown: FC<DropdownProps> = ({ label, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const onBlurDiv = () => {
        setTimeout(()=>{
                setIsOpen(false);
            }, 150)
        }

    return (
        <div className="relative inline-block text-left">
            <button
                onClick={toggleDropdown}
                onBlur={onBlurDiv}
                className="inline-flex justify-center w-full rounded-md border border-gray-900 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 "
            >
                {label}
                <svg
                    className="-mr-1 ml-2 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>

            {isOpen && (
                <div
                    className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 focus:outline-hidden"
                    role="menu" aria-orientation="vertical" aria-labelledby="menu-button">
                    <div className="py-1" role="none">
                        {children}
                    </div>
                </div>
            )}
        </div>
    );
};