"use client"
import React from 'react';
import Image from 'next/image';

type RecipeHeaderProps = {
    imageUrl: string;
    title: string;
};

const RecipeHeader: React.FC<RecipeHeaderProps> = ({ imageUrl, title }) => {
    return (
        <div className="mb-6">
            <div className="relative w-full h-96">
                <Image
                    src={imageUrl}
                    alt={title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                    unoptimized
                />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mt-4">{title}</h1>
            <p className="text-gray-500 pt-4">Quantities shown are for 1 person.</p>
        </div>
    );
};

export default RecipeHeader;
