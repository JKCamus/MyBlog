import Link from 'next/link'

const Sidebar = () => {
  const menuItems = [
    { name: 'User', href: '/cms/user' },
    { name: 'Tags', href: '/cms/tags' },
    { name: 'Notes', href: '/cms/notes' },
  ]

  return (
    <div className="hidden h-full max-h-screen min-w-[280px] max-w-[280px] flex-wrap overflow-auto rounded bg-gray-50 pt-5 shadow-md dark:bg-gray-900/70 dark:shadow-gray-800/40 sm:flex">
      <div className="px-6 py-4">
        <ul>
          {menuItems.map((item) => (
            <li key={item.name} className="mb-2">
              <Link
                href={item.href}
                className="mb-2 font-bold uppercase text-gray-700 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-500"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
