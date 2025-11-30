"use client"
import React from 'react';
import Link from 'next/link';

const BackButton = () => {
    return (
        <Link href="/" className="text-gray-800 py-2 rounded-lg no-underline mb-4 inline-block">
            &larr; Back to Home
        </Link>
    );
};

export default BackButton;
