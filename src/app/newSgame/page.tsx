"use client";
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Page = () => {
    const router = useRouter();

    useEffect(() => {
        router.push('/singlePlayer');
    }, []);

    return (
        <div>
            {/* 轉場 */}
        </div>
    );
};

export default Page;