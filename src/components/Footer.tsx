import Link from "next/link";
import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-10 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand Column */}
        <div className="flex flex-col space-y-4">
          <h2 className="text-xl font-bold tracking-wider uppercase">Butterflies Trends</h2>
          <p className="text-gray-400 text-sm max-w-sm">
            Curating the finest fashion trends. Unleash your inner beauty with our exclusive collections.
          </p>
          <p className="text-gray-500 text-xs mt-4">
            &copy; {currentYear} Butterflies Trends. All rights reserved.
          </p>
        </div>

        {/* Shop Column */}
        <div className="flex flex-col space-y-4">
          <h3 className="text-lg font-semibold uppercase tracking-wider">Shop</h3>
          <ul className="flex flex-col space-y-2 text-sm text-gray-400">
            <li>
              <Link href="/" className="hover:text-white transition-colors duration-200">
                Home
              </Link>
            </li>
            <li>
              <Link href="/collections" className="hover:text-white transition-colors duration-200">
                Collections
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-white transition-colors duration-200">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white transition-colors duration-200">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal Column */}
        <div className="flex flex-col space-y-4">
          <h3 className="text-lg font-semibold uppercase tracking-wider">Legal</h3>
          <ul className="flex flex-col space-y-2 text-sm text-gray-400">
            <li>
              <Link href="/policies/privacy-policy" className="hover:text-white transition-colors duration-200">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/policies/terms-of-service" className="hover:text-white transition-colors duration-200">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/policies/refund-policy" className="hover:text-white transition-colors duration-200">
                Refund Policy
              </Link>
            </li>
            <li>
              <Link href="/policies/shipping-policy" className="hover:text-white transition-colors duration-200">
                Shipping Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
