"use client"
import React from 'react';

type InstructionsProps = {
    instructions: string;
};

const Instructions: React.FC<InstructionsProps> = ({ instructions }) => {
    return (
        <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Instructions</h2>
            <p className="text-gray-700 leading-relaxed">{instructions}</p>
        </div>
    );
};

export default Instructions;
