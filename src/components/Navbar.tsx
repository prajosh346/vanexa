import { useEffect, useState } from 'react'

import { clearStoredSession, getStoredSession, logoutUser } from '../lib/api'

const navigateTo = (path: string) => {
  window.history.pushState({}, '', path)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [logoutNotice, setLogoutNotice] = useState(() => sessionStorage.getItem('vanexa_logout_notice') ?? '')
  const session = getStoredSession()
  const isAuthenticated = Boolean(session?.token)
  const dashboardPath = session?.role === 'ADMIN' ? '/admin/dashboard' : session?.role === 'AUTHOR' ? '/author/dashboard' : '/admin/login'

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'About', href: '/about' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ]

  useEffect(() => {
    if (!logoutNotice) return
    sessionStorage.removeItem('vanexa_logout_notice')
    const timer = window.setTimeout(() => setLogoutNotice(''), 5000)
    return () => window.clearTimeout(timer)
  }, [logoutNotice])

  const handleLogout = async () => {
    if (isLoggingOut) return
    setIsLoggingOut(true)

    let notice = 'Signed out on this device. Server token revocation could not be confirmed.'
    try {
      const revoked = await logoutUser()
      notice = revoked ? 'You have been signed out.' : 'Your local session has been cleared.'
    } catch {
      clearStoredSession()
    } finally {
      sessionStorage.setItem('vanexa_logout_notice', notice)
      setIsLoggingOut(false)
      navigateTo('/')
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-40 border-b border-[#2c2417] bg-black/95 backdrop-blur-md">
      <div className="container flex items-center justify-between gap-4 py-2">
        <button type="button" onClick={() => navigateTo('/')} className="brand-mark flex shrink-0 items-center">
          <img src="/Vanexa.png" alt="VANEXA Studio" className="h-20 w-20 shrink-0 object-contain md:h-24 md:w-24" />
        </button>

        <nav className="hidden items-center gap-8 text-sm font-medium text-[#edf6ff] md:flex">
          {navItems.map((item) => (
            <button key={item.href} type="button" onClick={() => navigateTo(item.href)} className="transition hover:text-[#d7b15d]">
              {item.label}
            </button>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {isAuthenticated ? (
            <>
              <button type="button" onClick={() => navigateTo(dashboardPath)} className="inline-flex items-center rounded-full border border-[#d7b15d] bg-transparent px-4 py-2.5 text-sm font-semibold text-[#edf6ff] transition hover:border-[#f0cb7a] hover:text-[#f0cb7a]">
                Dashboard
              </button>
              <button type="button" disabled={isLoggingOut} onClick={() => { void handleLogout() }} className="inline-flex items-center rounded-full border border-[#d7b15d] bg-transparent px-4 py-2.5 text-sm font-semibold text-[#edf6ff] transition hover:border-[#f0cb7a] hover:text-[#f0cb7a] disabled:cursor-not-allowed disabled:opacity-50">
                {isLoggingOut ? 'Signing out...' : 'Logout'}
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => navigateTo('/admin/login')}
              className="inline-flex items-center rounded-full border border-[#d7b15d] bg-transparent px-4 py-2.5 text-sm font-semibold text-[#edf6ff] transition hover:border-[#f0cb7a] hover:text-[#f0cb7a]"
            >
              Login
            </button>
          )}
          <button
            type="button"
            onClick={() => navigateTo('/contact')}
            className="inline-flex items-center rounded-full bg-[#d7b15d] px-5 py-3 text-lg font-bold text-[#10264d] shadow-[0_10px_22px_rgba(215,177,93,0.18)] transition hover:brightness-105"
          >
            Get Started
          </button>
        </div>

        <div className="md:hidden">
          <button
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-md border border-[#3a4e7d] bg-[#1a335b] p-2 text-[#edf6ff] transition hover:bg-[#223b67]"
          >
            {isOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {logoutNotice && (
        <div role="status" aria-live="polite" className="fixed left-1/2 top-28 z-50 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 rounded-xl border border-[#e8dfcf] bg-white px-5 py-4 text-sm font-semibold text-[#1a1917] shadow-lg">
          {logoutNotice}
        </div>
      )}

      {isOpen && (
        <div className="border-t border-[#2a3d68] bg-[#10264d] md:hidden">
          <nav className="container flex flex-col py-4 text-base font-medium text-[#edf6ff]">
            {navItems.map((item) => (
              <button
                key={item.href}
                type="button"
                onClick={() => {
                  setIsOpen(false)
                  navigateTo(item.href)
                }}
                className="border-b border-[#243c68] px-1 py-3 text-left last:border-b-0 transition hover:text-[#d7b15d]"
              >
                {item.label}
              </button>
            ))}
            {isAuthenticated ? (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false)
                    navigateTo(dashboardPath)
                  }}
                  className="mt-2 inline-flex items-center justify-center rounded-full border border-[#d7b15d] bg-transparent px-5 py-3 text-base font-bold text-[#edf6ff]"
                >
                  Dashboard
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false)
                    void handleLogout()
                  }}
                  disabled={isLoggingOut}
                  className="mt-2 inline-flex items-center justify-center rounded-full border border-[#d7b15d] bg-transparent px-5 py-3 text-base font-bold text-[#edf6ff] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isLoggingOut ? 'Signing out...' : 'Logout'}
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false)
                  navigateTo('/admin/login')
                }}
                className="mt-2 inline-flex items-center justify-center rounded-full border border-[#d7b15d] bg-transparent px-5 py-3 text-base font-bold text-[#edf6ff]"
              >
                Login
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                setIsOpen(false)
                navigateTo('/contact')
              }}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-[#d7b15d] px-5 py-3 text-base font-bold text-[#10264d] shadow-[0_10px_22px_rgba(215,177,93,0.18)]"
            >
              Get Started
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}
