'use client'

import { useState, useEffect } from 'react'

type ProposalItem = {
  item_name: string
  quantity: number
  unit_price: number
  total: number
}

type Proposal = {
  narrative: string
  items: ProposalItem[]
  total: number
}

export default function Home() {
  const [clientName, setClientName] = useState('')
  const [siteNotes, setSiteNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const [proposal, setProposal] = useState<Proposal | null>(null)
  const [activeTab, setActiveTab] = useState('home')
  const [scrolled, setScrolled] = useState(false)

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Tab change handler - FIXED!
  const handleTabChange = (tab: string) => {
    console.log('Tab clicked:', tab) // Debugging
    setActiveTab(tab)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    setTimeout(() => {
      setProposal({
        narrative: `Dear ${clientName},\n\nThank you for the opportunity to work on your outdoor living project. Based on our site walk, I've developed a comprehensive scope of work.\n\nI've priced this project competitively while maintaining the quality standards Greenscape Pro is known for.\n\nWarm regards,\nMarcus Tate\nFounder, Greenscape Pro`,
        items: [
          { item_name: 'Travertine Pavers', quantity: 500, unit_price: 18.50, total: 9250 },
          { item_name: 'Base Preparation', quantity: 500, unit_price: 4.50, total: 2250 },
          { item_name: 'Gas Fire Pit', quantity: 1, unit_price: 2800, total: 2800 },
          { item_name: 'General Labor', quantity: 40, unit_price: 65, total: 2600 },
        ],
        total: 16900
      })
      setLoading(false)
    }, 2000)
  }

  // =============================================
  // HOME PAGE
  // =============================================
  const renderHomePage = () => (
    <div className="animate-fadeIn">
      <div className="text-center mb-16">
        <div className="inline-block bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full px-6 py-2 mb-4 border border-emerald-500/20">
          <span className="text-emerald-400 text-sm font-medium">🚀 AI-Powered Proposal Generator</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
          Turn Site Visits Into{' '}
          <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent bg-[length:200%] animate-gradient">
            Instant Proposals
          </span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Stop wasting days on paperwork. Generate professional proposals in minutes with Greenscape Pro's AI assistant.
        </p>
        <div className="mt-8">
          <img 
            src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1200&h=300&fit=crop"
            alt="Luxury Landscape"
            className="rounded-3xl border border-white/10 shadow-2xl w-full h-64 object-cover"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/10 hover:border-emerald-500/30 transition-all">
          <div className="text-4xl mb-2">⏱️</div>
          <div className="text-2xl font-bold text-white">6-9 Days</div>
          <div className="text-gray-400 text-sm">Traditional Quote Time</div>
        </div>
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/10 hover:border-emerald-500/30 transition-all">
          <div className="text-4xl mb-2">⚡</div>
          <div className="text-2xl font-bold text-emerald-400">2 Hours</div>
          <div className="text-gray-400 text-sm">With AI Accelerator</div>
        </div>
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/10 hover:border-emerald-500/30 transition-all">
          <div className="text-4xl mb-2">💰</div>
          <div className="text-2xl font-bold text-white">$1.9M</div>
          <div className="text-gray-400 text-sm">Annual Revenue Recovered</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10">
          <h2 className="text-2xl font-bold text-white mb-6">📝 Generate Proposal</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-300 font-medium mb-2">👤 Client Name *</label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="e.g., John Smith"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-300 font-medium mb-2">📍 Site Walk Notes *</label>
              <textarea
                required
                rows={6}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Describe the site..."
                value={siteNotes}
                onChange={(e) => setSiteNotes(e.target.value)}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-4 rounded-xl text-lg font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all disabled:opacity-50 shadow-lg hover:shadow-emerald-500/25"
            >
              {loading ? '⏳ Generating...' : '🚀 Generate Proposal'}
            </button>
          </form>
        </div>

        <div>
          {proposal ? (
            <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">📄 Your Proposal</h2>
                <span className="bg-emerald-500/20 text-emerald-400 px-4 py-1 rounded-full text-sm border border-emerald-500/30">✅ Ready</span>
              </div>
              <div className="bg-white/10 rounded-xl p-5 mb-6">
                <h3 className="text-emerald-400 font-medium mb-2 text-sm">📝 Scope Narrative</h3>
                <div className="text-gray-300 whitespace-pre-wrap text-sm">{proposal.narrative}</div>
              </div>
              <div className="bg-white/10 rounded-xl p-5">
                <h3 className="text-emerald-400 font-medium mb-3 text-sm">📊 Line Items</h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="px-3 py-2 text-left text-gray-400">Item</th>
                      <th className="px-3 py-2 text-right text-gray-400">Qty</th>
                      <th className="px-3 py-2 text-right text-gray-400">Price</th>
                      <th className="px-3 py-2 text-right text-gray-400">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {proposal.items.map((item, idx) => (
                      <tr key={idx} className="border-b border-white/5">
                        <td className="px-3 py-2 text-white">{item.item_name}</td>
                        <td className="px-3 py-2 text-right text-gray-300">{item.quantity}</td>
                        <td className="px-3 py-2 text-right text-gray-300">${item.unit_price}</td>
                        <td className="px-3 py-2 text-right text-white font-medium">${item.total}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="border-t-2 border-white/10">
                    <tr>
                      <td colSpan={3} className="px-3 py-4 text-right text-lg font-bold text-emerald-400">Total:</td>
                      <td className="px-3 py-4 text-right text-2xl font-bold text-emerald-400">${proposal.total}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          ) : (
            <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-12 border border-white/10 text-center h-full flex flex-col items-center justify-center">
              <div className="text-7xl mb-4">📋</div>
              <h3 className="text-xl font-semibold text-white mb-2">No Proposal Yet</h3>
              <p className="text-gray-400 text-sm">Fill in the details and click Generate Proposal.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  // =============================================
  // ABOUT PAGE
  // =============================================
  const AboutPage = () => (
    <div className="animate-fadeIn">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">About Greenscape Pro</h1>
        <p className="text-gray-400 text-lg">Premium outdoor living design-build company based in Phoenix, AZ</p>
      </div>

      <div className="relative rounded-3xl overflow-hidden mb-12">
        <img 
          src="https://images.unsplash.com/photo-1558618666-fcd25c85f4c9?w=1200&h=300&fit=crop"
          alt="Greenscape Pro"
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/50 to-teal-900/50 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white">🏡 Since 2018</h2>
            <p className="text-emerald-200">Transforming outdoor spaces across Phoenix</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10">
          <div className="text-6xl mb-4">🏡</div>
          <h2 className="text-2xl font-bold text-white mb-4">Our Story</h2>
          <p className="text-gray-300 leading-relaxed">
            Founded in 2018, Greenscape Pro has grown from a small landscaping crew to a premium design-build firm 
            specializing in high-end outdoor living spaces.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-emerald-400">$4.2M</div>
              <div className="text-gray-400 text-sm">Revenue (2025)</div>
            </div>
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-emerald-400">150+</div>
              <div className="text-gray-400 text-sm">Projects/Year</div>
            </div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10">
          <div className="text-6xl mb-4">👨‍🔧</div>
          <h2 className="text-2xl font-bold text-white mb-4">The Team</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <span className="text-white">Tafseer Haider</span>
              <span className="text-gray-400 text-sm">Founder & CEO</span>
            </div>
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <span className="text-white">Tafseer Haider</span>
              <span className="text-gray-400 text-sm">Office Manager</span>
            </div>
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <span className="text-white">Friend-partner</span>
              <span className="text-gray-400 text-sm">Lead Designer</span>
            </div>
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <span className="text-white">4 Crew Leads</span>
              <span className="text-gray-400 text-sm">Hardscape</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white">8 Crew Members</span>
              <span className="text-gray-400 text-sm">Full-Time</span>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-3xl p-8 border border-white/10">
          <h2 className="text-2xl font-bold text-white mb-4">🎯 Our Mission</h2>
          <p className="text-gray-300 leading-relaxed text-lg">
            To transform outdoor spaces into stunning living areas that enhance our clients' quality of life.
          </p>
        </div>
      </div>
    </div>
  )

  // =============================================
  // PROJECTS PAGE
  // =============================================
  const ProjectsPage = () => (
    <div className="animate-fadeIn">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">Our Projects</h1>
        <p className="text-gray-400 text-lg">Transforming outdoor spaces across Phoenix, AZ</p>
      </div>

      <div className="relative rounded-3xl overflow-hidden mb-12">
        <img 
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=200&fit=crop"
          alt="Featured"
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/70 to-teal-900/70 flex items-center justify-center">
          <div className="text-center">
            <span className="text-emerald-300 text-sm font-medium">⭐ FEATURED</span>
            <h2 className="text-3xl font-bold text-white">Luxury Outdoor Living</h2>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: '🏊', title: 'Luxury Pool & Patio', desc: 'Custom travertine patio with infinity pool', value: '$45,000', img: 'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=400&h=200&fit=crop' },
          { icon: '🔥', title: 'Fire Pit & Seating', desc: 'Gas fire pit with custom stone seating', value: '$28,000', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=200&fit=crop' },
          { icon: '🌴', title: 'Tropical Landscape', desc: 'Full landscape redesign with artificial turf', value: '$32,000', img: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400&h=200&fit=crop' },
          { icon: '🍳', title: 'Outdoor Kitchen', desc: 'Premium kitchen with grill and countertops', value: '$38,000', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85f4c9?w=400&h=200&fit=crop' },
          { icon: '🌿', title: 'Xeriscape Garden', desc: 'Water-efficient landscape with native plants', value: '$22,000', img: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400&h=200&fit=crop' },
          { icon: '🏗️', title: 'Retaining Walls', desc: 'Custom walls with drainage and planters', value: '$18,000', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=200&fit=crop' },
        ].map((project, idx) => (
          <div key={idx} className="bg-white/5 backdrop-blur-lg rounded-3xl overflow-hidden border border-white/10 hover:border-emerald-500/30 transition-all hover:-translate-y-1">
            <img src={project.img} alt={project.title} className="w-full h-40 object-cover" />
            <div className="p-6">
              <div className="text-4xl mb-2">{project.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
              <p className="text-gray-400 text-sm mb-3">{project.desc}</p>
              <div className="flex justify-between items-center">
                <span className="text-emerald-400 font-bold">{project.value}</span>
                <button className="text-sm text-emerald-400 hover:text-emerald-300">View →</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  // =============================================
  // CONTACT PAGE
  // =============================================
  const ContactPage = () => (
    <div className="animate-fadeIn">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">Get In Touch</h1>
        <p className="text-gray-400 text-lg">Let's bring your outdoor vision to life</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10">
          <h2 className="text-2xl font-bold text-white mb-6">📧 Send a Message</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-300 font-medium mb-2">Your Name *</label>
              <input type="text" className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="John Doe" />
            </div>
            <div>
              <label className="block text-gray-300 font-medium mb-2">Email *</label>
              <input type="email" className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="john@example.com" />
            </div>
            <div>
              <label className="block text-gray-300 font-medium mb-2">Message *</label>
              <textarea rows={4} className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Tell us about your project..." />
            </div>
            <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-4 rounded-xl text-lg font-semibold hover:shadow-lg hover:shadow-emerald-500/25 transition-all">
              📤 Send Message
            </button>
          </form>
        </div>

        <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10">
          <h2 className="text-2xl font-bold text-white mb-6">📍 Contact Info</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-white/5 rounded-xl">
              <span className="text-2xl">📍</span>
              <div>
                <div className="text-white font-medium">Address</div>
                <div className="text-gray-400 text-sm">Faisal Colony street 2, Jalalpur jattan Pakistan</div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-white/5 rounded-xl">
              <span className="text-2xl">📞</span>
              <div>
                <div className="text-white font-medium">Phone</div>
                <div className="text-gray-400 text-sm">(92) 3099709880</div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-white/5 rounded-xl">
              <span className="text-2xl">✉️</span>
              <div>
                <div className="text-white font-medium">Email</div>
                <div className="text-gray-400 text-sm">workerst6@gmail.com</div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-white/5 rounded-xl">
              <span className="text-2xl">🕐</span>
              <div>
                <div className="text-white font-medium">Hours</div>
                <div className="text-gray-400 text-sm">Mon-Fri: 7:00 AM - 6:00 PM</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  // =============================================
  // RENDER PAGE - FIXED!
  // =============================================
  const renderPage = () => {
    console.log('Rendering page:', activeTab) // Debugging
    switch(activeTab) {
      case 'home':
        return renderHomePage()
      case 'about':
        return <AboutPage />
      case 'projects':
        return <ProjectsPage />
      case 'contact':
        return <ContactPage />
      default:
        return renderHomePage()
    }
  }

  // =============================================
  // MAIN RETURN
  // =============================================
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      
      {/* NAVIGATION */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-gray-900/95 backdrop-blur-lg border-b border-white/10' : 'bg-white/5 backdrop-blur-lg border-b border-white/5'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleTabChange('home')}>
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-2 rounded-xl">
                <span className="text-2xl">🏡</span>
              </div>
              <span className="text-white font-bold text-xl">Greenscape Pro</span>
            </div>
            
            <div className="hidden md:flex items-center gap-6">
              {['Home', 'About', 'Projects', 'Contact'].map((tab) => (
                <button 
                  key={tab}
                  onClick={() => handleTabChange(tab.toLowerCase())}
                  className={`text-sm font-medium transition-all duration-300 relative ${
                    activeTab === tab.toLowerCase() 
                      ? 'text-emerald-400' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {tab}
                  {activeTab === tab.toLowerCase() && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"></span>
                  )}
                </button>
              ))}
            </div>
            
            <button 
              onClick={() => handleTabChange('contact')}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-emerald-500/25 transition-all"
            >
              Get a Quote
            </button>
          </div>
        </div>
      </nav>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {renderPage()}
      </div>

      {/* FOOTER */}
      <footer className="border-t border-white/5 mt-16 py-8 bg-white/5 backdrop-blur-lg">
        <div className="max-w-6xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p>© 2026 Greenscape Pro. All rights reserved. Built with ❤️ in Phoenix, AZ</p>
        </div>
      </footer>

      {/* STYLES */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-fadeIn { animation: fadeIn 0.6s ease-out; }
        .animate-gradient { animation: gradient 3s ease infinite; background-size: 200% 200%; }
      `}</style>
    </div>
  )
}