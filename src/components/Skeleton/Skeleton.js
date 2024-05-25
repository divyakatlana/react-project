
import React from 'react';
import { Skeleton } from 'primereact/skeleton';
import './Skeleton.scss';
        
const SkeletonLoader = () => {
    return (
        <div className="cardSkeleton">
                    <Skeleton height="2rem" className="mb-2"></Skeleton>
                    <Skeleton height="2rem" className="mb-2"></Skeleton>
                    <Skeleton height="2rem" className="mb-2"></Skeleton>
                    <Skeleton height="2rem" className="mb-2"></Skeleton>
                    <Skeleton height="2rem" className="mb-2"></Skeleton>
        </div>
    );
};

export default SkeletonLoader;