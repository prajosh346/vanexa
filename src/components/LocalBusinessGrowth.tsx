const industries = [
  {
    title: 'Salons and beauty businesses',
    description: 'Improve visibility for premium services, local search, bookings and recurring appointments.',
  },
  {
    title: 'Restaurants and food businesses',
    description: 'Attract more footfall and online orders with stronger Google visibility and better content.',
  },
  {
    title: 'Retail shops and local stores',
    description: 'Present your products, promotions and store details clearly to nearby customers looking to buy.',
  },
  {
    title: 'Professional services',
    description: 'Build trust with a clear sales funnel, stronger search presence and polished brand communication.',
  },
  {
    title: 'Startups and small businesses',
    description: 'Create a focused digital foundation that helps new businesses stand out and generate leads.',
  },
  {
    title: 'Other local businesses',
    description: 'Grow your local reach with a stronger website, listing presence, fresh content and more visibility online.',
  },
];

const highlights = [
  'Google Business Profile optimization',
  'Local SEO and Google Maps visibility',
  'Website development and updation',
  'Social media management',
  'Promotional graphic design',
  'Content creation',
  'Online reputation and review management',
];

export default function LocalBusinessGrowth() {
  return (
    <section className="section bg-[#f5f2ec]">
      <div className="container">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#a96f24]">Local Growth</p>
          <h2 className="mt-3 text-3xl font-bold text-[#071033] md:text-4xl">
            Help Your Business Get Found Online
          </h2>
          <p className="mt-4 text-base leading-7 text-[#5c5750]">
            From Google visibility to a professional website, Vanexa Studio helps local businesses in Pune and beyond build a stronger digital presence, connect with customers and grow online.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {highlights.map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-[#e8dfcf] bg-white p-5 shadow-[0_14px_30px_rgba(169,111,36,0.06)]"
            >
              <div className="mb-3 h-10 w-10 rounded-full bg-[#f4ca74]/25 text-center leading-10 font-bold text-[#a96f24]">
                ✓
              </div>
              <p className="text-base font-medium text-[#071033]">{item}</p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <div className="mb-6 text-center">
            <h3 className="text-2xl font-semibold text-[#071033]">Built for local business growth</h3>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {industries.map((industry) => (
              <div
                key={industry.title}
                className="rounded-2xl border border-[#e8dfcf] bg-[#f9fbff] p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(169,111,36,0.10)]"
              >
                <h4 className="font-semibold text-[#071033]">{industry.title}</h4>
                <p className="mt-3 text-sm leading-6 text-[#5c5750]">{industry.description}</p>
                <a
                  href="#contact"
                  className="mt-5 inline-flex items-center text-sm font-semibold text-[#a96f24] transition hover:text-[#071033]"
                >
                  Discuss your project →
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
