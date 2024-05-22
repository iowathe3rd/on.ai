"use client";

import { buttonVariants } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import MobileNav from './MobileNav';

const Navbar = () => {
  const { isSignedIn } = useUser()

  return (
    <nav className='sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all'>
      <div className='container'>
        <div className='flex h-14 items-center justify-between border-b border-zinc-200'>
          <Link
            href='/'
            className='flex z-40 font-semibold'>
            <span className='text-blue-600'>ON.AI</span>
          </Link>

          <MobileNav isAuth={!!isSignedIn} />

          <div className='hidden items-center space-x-4 sm:flex'>
            {!isSignedIn ? (
              <>
                <Link
                  href={"/sign-in"}
                  className={buttonVariants({
                    variant: 'ghost',
                    size: 'sm',
                  })}>

                  Войти
                </Link>
                <Link
                  href={"/sign-up"}
                  className={buttonVariants({
                    size: 'sm',
                  })}>
                  Начать{' '}
                  <ArrowRight className='ml-1.5 h-5 w-5' />
                </Link>
              </>
            ) : (
              <>
                <Link
                  href='/dashboard'
                  className={buttonVariants({
                    variant: 'ghost',
                    size: 'sm',
                  })}>
                  Админ-панель
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
