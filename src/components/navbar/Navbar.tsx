import {useContext} from "react";
import {ProductContext} from "../../store/ProductContext.ts";

export const Navbar = () => {
    const {cart} = useContext(ProductContext)
    return (
        <header
            className="flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white text-sm py-3">
            <nav className="max-w-[85rem] w-full mx-auto px-4 flex flex-wrap basis-full items-center justify-between">
                <a className="text-gray-900 sm:order-1 flex-none text-xl font-semibold focus:outline-none focus:opacity-80"
                   href='/'>
                    TECOPOS
                </a>
                <div id="hs-navbar-alignment"
                     className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:grow-0 sm:basis-auto sm:block sm:order-2"
                     aria-labelledby="hs-navbar-alignment-collapse">
                    <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:mt-0 sm:ps-5">
                        <a href="/cart"
                            className="py-4 px-3 relative border-2 border-transparent text-gray-800 rounded-full hover:text-gray-400 focus:outline-none focus:text-gray-500 transition duration-150 ease-in-out"
                            aria-label="Cart">
                            <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round"
                                 strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                            </svg>
                            <span className="absolute inset-0 object-right-top -mr-6">
                                {
                                    cart.length > 0 &&
                                    <div className="inline-flex items-center px-1.5 py-0.5 border-2 border-white rounded-full text-xs font-semibold leading-4 bg-red-500 text-white">
                                        {cart.length}
                                    </div>
                                }
                          </span>
                        </a>
                    </div>
                </div>
            </nav>
        </header>
    );
};