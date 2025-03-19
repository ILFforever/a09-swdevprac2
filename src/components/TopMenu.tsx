import styles from './topmenu.module.css'
import Image from 'next/image'
import TopMenuItem from './TopMenuItem';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import { Link } from '@mui/material';

export default async function TopMenu(){

    const session = await getServerSession(authOptions)

    return (
        <div className={styles.menucontainer}>
            {/* Sign-in/Sign-out on the left side */}
            <div className={styles.leftSide}>
                {session 
                    ? <Link href="/api/auth/signout?callbackUrl=/" className={styles.menuItem}>
                        Sign-Out of {session.user?.name}
                      </Link>
                    : <Link href="/api/auth/signin?callbackUrl=/" className={styles.menuItem}>
                         Sign-In
                        </Link>
                }
            </div>
            
            {/* Right side with navigation items and logo */}
            <div className={styles.rightSide}>
                <TopMenuItem title='About' pageRef='/about'/>
                <TopMenuItem title='Booking' pageRef='/booking'/>
                <Image 
                    src={'/img/logo.png'}
                    className={styles.logoimg}
                    alt='logo'
                    width={30}
                    height={30}
                    style={{ objectFit: 'contain' }}
                />
            </div>
        </div>
    );
}