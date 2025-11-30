"use client"
import React from 'react';
import { Grid } from '@mui/material';

const HomeSkeleton = () => {
    return (
        <section style={{ margin: 20 }}>
            <Grid container spacing={4}>
                {Array.from(new Array(12)).map((_, index) => (
                    <Grid key={index} item size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                        <div className="animate-pulse">
                            <div className="h-48 bg-gray-200 rounded-lg mb-4" style={{height: "350px"}}></div>
                            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                        </div>
                    </Grid>
                ))}
            </Grid>
        </section>
    );
};

export default HomeSkeleton;
