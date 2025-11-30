"use client"
import React from 'react';

const RecipeSkeleton = () => {
    return (
        <div className="bg-white800 min-h-screen">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
                        <div className="h-96 bg-gray-200 rounded-lg mb-6"></div>
                        <div className="h-10 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-6 bg-gray-200 rounded w-1/2 mb-6"></div>
                        <div className="space-y-4">
                            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
                            <div className="bg-gray-100 p-6 rounded-lg w-full">
                                <div className="space-y-2">
                                    <div className="h-6 bg-gray-200600 rounded"></div>
                                    <div className="h-6 bg-gray-200600 rounded"></div>
                                    <div className="h-6 bg-gray-200600 rounded"></div>
                                    <div className="h-6 bg-gray-200600 rounded"></div>
                                </div>
                            </div>
                            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
                            <div className="space-y-2">
                                <div className="h-6 bg-gray-200 rounded"></div>
                                <div className="h-6 bg-gray-200 rounded"></div>
                                <div className="h-6 bg-gray-200 rounded"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeSkeleton;
