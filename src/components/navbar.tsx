'use client';

import Link from 'next/link';
import { axiosClient } from '@/utils/axiosClient';
import { useState, useEffect, MouseEvent } from 'react';
import initializePusher from '@/hooks/pusher';

interface Article {
  id: number;
  title: string;
}

export default function Navbar() {
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [notifications,setNotification] = useState<Article[]>([]);
  
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axiosClient.get('/api/category');
        setCategories(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategory();
  }, []);

  useEffect(() => {
    const pusher = initializePusher();
    var channel = pusher.subscribe('articles');
    channel.bind('NewArticle',function(article:Article){
      const audio = new Audio('new-notification-7-210334.mp3');
      audio.play();
      setNotification((prevNotification)=> [article,...prevNotification])
    })
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
}, []);



  const toggleCategoryDropdown = () => {
    setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
  };

  const toggleNotificationDropdown = () => {
    setIsNotificationDropdownOpen(!isNotificationDropdownOpen);
  };

  const closeDropdowns = (event: MouseEvent) => {
    if (
      event.target instanceof HTMLElement &&
      !event.target.closest('#categoryDropdown') &&
      !event.target.closest('#notificationDropdown')
    ) {
      setIsCategoryDropdownOpen(false);
      setIsNotificationDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', closeDropdowns);
    return () => {
      document.removeEventListener('click', closeDropdowns);
    };
  }, []);

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
          <div className="relative hidden md:block">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
              <span className="sr-only">Search icon</span>
            </div>
            <input type="text" id="search-navbar" className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..."/>
          </div>
        </div>

        <button
          data-collapse-toggle="navbar-dropdown"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-dropdown"
          aria-expanded={isCategoryDropdownOpen || isNotificationDropdownOpen}
          onClick={() => {
            setIsCategoryDropdownOpen(false);
            setIsNotificationDropdownOpen(false);
          }}
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
        </button>

        <div className={`hidden w-full md:block md:w-auto ${isCategoryDropdownOpen || isNotificationDropdownOpen ? 'block' : ''}`} id="navbar-dropdown">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link href="/" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent" aria-current="page">Home</Link>
            </li>
            <li className="relative">
              <button
                id="categoryDropdown"
                className="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                onClick={toggleCategoryDropdown}
              >
                Category
                <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                </svg>
              </button>
              <div id="categoryDropdownMenu" className={`z-10 ${isCategoryDropdownOpen ? 'block' : 'hidden'} font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 absolute right-0`}>
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="categoryDropdown">
                  {categories.map(category => (
                    <li key={category.id}>
                      <Link href={{ pathname: '/', query: { category: category.name } }} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{category.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
            <li className="relative">
              <button
                id="notificationDropdown"
                className="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                onClick={toggleNotificationDropdown}
              >
                Notifications
                <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                </svg>
              </button>
              <div id="notificationDropdownMenu" className={`z-10 ${isNotificationDropdownOpen ? 'block' : 'hidden'} font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 absolute right-0`}>
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="notificationDropdown">
                {notifications.length === 0 ? (
            <li>No new notifications</li>
          ) : (
            notifications.map((notification) => (
              <li key={notification.id}>
                <Link href={'/article/'+notification.id} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                  <div>
                    <h3 className="font-semibold">{notification.title}</h3>
                  </div>
                </Link>
              </li>
            ))
          )}
                </ul>
              </div>
            </li>
            <li>
              <Link href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Login</Link>
            </li>
            <li>
              <Link href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Sign In</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
