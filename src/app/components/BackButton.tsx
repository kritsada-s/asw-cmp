'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const BackButton = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      window.history.back();
    }
  };

  if (!isMounted) {
    return (
      <a
        href="#"
        className="border px-3 border-neutral-600 hover:bg-neutral-600 hover:text-white transition rounded text-[20px] inline-block"
      >
        ย้อนกลับ
      </a>
    );
  }

  return (
    <a
      href="#"
      onClick={handleClick}
      className="border px-3 border-neutral-600 hover:bg-neutral-600 hover:text-white transition rounded text-[20px] inline-block"
    >
      ย้อนกลับ
    </a>
  );
};

export default BackButton;