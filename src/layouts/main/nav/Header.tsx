import classNames from 'classnames';
import { motion } from 'framer-motion';
import { NAV_ITEM } from '@/src/utils/constant';
import { Link, animateScroll as scroll } from 'react-scroll';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import logoImage from '@/public/Logo-Main-image.png';
import Image from 'next/image';
import { PATH_AUTH, PATH_DASHBOARD } from '@/src/routes/path';
import { getUserProfile } from '@/src/services/user';
import Cookies from 'js-cookie';

const Header = () => {
  const accessTokenFromCookie: string | undefined = Cookies.get('accessToken');

  const [scrollNav, setScrollNav] = useState(false);
  const [username, setUsername] = useState('');
  const router = useRouter();

  const changeNav = () => {
    if (window.scrollY >= 100) {
      setScrollNav(true);
    } else {
      setScrollNav(false);
    }
  };
  useEffect(() => {
    if (accessTokenFromCookie) {
      getUserProfile(accessTokenFromCookie)
        .then((response) => {
          setUsername(response?.message[0]?.username);
        })
        .catch((error) => {
          console.error('Error fetching user profile:', error);
        });
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', changeNav);
  }, []);

  const handleClick = (navItem: string) => {
    if (navItem !== 'Hall of Fame' && navItem !== 'About Us') return;
    router.push(navItem === 'Hall of Fame' ? PATH_AUTH.hallOfFame : PATH_AUTH.aboutUs);
  };

  return (
    <div className="flex md:justify-center sticky z-50 transition ease-in-out delay-0 w-full top-0 backdrop-blur-sm">
      <nav
        id={`${scrollNav ? 'nav_div_down' : 'nav_div'} `}
        className={classNames(
          'flex justify-between text-white items-center font-bold  px-2 py-1 transition-all absolute',
          {
            'top-0 rounded-none w-full border-b border-gray-400 border-opacity-50 bg-gradient-to-r from-black-400 to-black-300':
              scrollNav,
            'top-2 rounded-[5rem] w-[98vw] sm:w-[95vw] md:w-[95vw] lg:w-[80vw]  border-b border-purple-400 bg-black-500':
              !scrollNav,
          },
        )}
      >
        <div className="w-[50%] md:w-[auto] flex justify-between items-center">
          <Image src={logoImage} alt="logo" className="rounded-3xl w-[85%] md:w-[12vw]" />
        </div>
        <ul className="hidden justify-center md:flex items-center">
          {NAV_ITEM.map((name, index) => (
            <div key={name + index}>
              <motion.li
                className="transition-all ease-in-out delay-300 font-[500] cursor-pointer relative lg:mx-3 px-0.8 py-0.5 rounded-3xl hover:bg-black-100 text-white"
                whileHover={{
                  textShadow: '0px 0px 4px black',
                }}
              >
                <Link
                  activeClass="active"
                  smooth
                  spy
                  duration={500}
                  offset={-50}
                  to={name}
                  onClick={() => handleClick(name)}
                >
                  {name}
                </Link>
              </motion.li>
            </div>
          ))}
        </ul>

        <div className="w-[50%] md:w-[16vw] flex sm:w-[22vw] justify-end lg:w-[12vw]">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-indigo-500 hover:to-purple-500 text-white text-center font-bold p-2 w-[65px] rounded-full shadow-md text-sm flex gap-1"
            onClick={() => router.push(PATH_AUTH.login)}
          >
            {/* <Image
              src="https://www.transparentpng.com/thumb/google-logo/google-logo-png-icon-free-download-SUF63j.png"
              className="w-5 rounded-full"
              alt="test5"
              fill={true}
            /> */}
            <p className="m-auto">Login</p>
          </motion.button>
        </div>
      </nav>
    </div>
  );
};

export default Header;
