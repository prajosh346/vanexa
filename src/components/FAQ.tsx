const faqs = [
  {
    q: 'What services does VANEXA provide?',
    a: 'VANEXA provides complete digital growth services, including SEO, Website Development, Google Business Profile optimization, Content Writing, and Graphics Design. Our services can be used individually or combined based on your business requirements.'
  },
  {
    q: 'Can VANEXA help my business grow online?',
    a: 'Yes. We help businesses improve their online visibility, website presence, search rankings, local discovery, content quality, and overall digital presence. Our approach focuses on building a strong digital foundation and achieving sustainable growth.'
  },
  {
    q: 'How long does SEO take to show results?',
    a: 'SEO is a long-term process, and results vary depending on your website, competition, industry, keywords, current authority, and other factors. Some improvements may appear earlier, while meaningful organic growth generally requires consistent optimization over time.'
  },
  {
    q: 'Can you guarantee a #1 position on Google?',
    a: 'No. Google rankings cannot be guaranteed because search results are influenced by Google\'s algorithms, competition, search trends, user behavior, and other external factors. Our goal is to implement effective SEO strategies that improve your website\'s visibility, rankings, organic traffic, and overall search performance.'
  },
  {
    q: 'Do you develop SEO-friendly websites?',
    a: 'Yes. We build websites with SEO, performance, responsiveness, user experience, and search-engine-friendly structure in mind.'
  },
  {
    q: 'Do you provide Google Business Profile services?',
    a: 'Yes. We help businesses with Google Business Profile creation, optimization, business information, categories, local SEO, content, and overall local visibility.'
  },
  {
    q: 'Can you manage both my website and SEO?',
    a: 'Yes. Combining website development with SEO can create a stronger digital foundation. We can help with the website, technical SEO, on-page optimization, content, and ongoing improvements.'
  },
  {
    q: 'Do you provide content for SEO?',
    a: 'Yes. We provide SEO-focused website content, blog articles, service-page content, meta titles, meta descriptions, and other digital content based on your business and target audience.'
  },
  {
    q: 'Do you design logos and marketing creatives?',
    a: 'Yes. Our graphics design services include logo design, social media creatives, banners, website graphics, marketing materials, and basic brand identity requirements.'
  },
  {
    q: 'Can I choose only one service?',
    a: 'Absolutely. You can choose a single service such as SEO, website development, Google Business Profile optimization, content writing, or graphics design. We can also create a customized combination based on your business goals.'
  },
  {
    q: 'How do you decide which services my business needs?',
    a: 'We first understand your business, target audience, current online presence, competition, and goals. Based on this, we recommend the services and strategy that can provide the most value.'
  },
  {
    q: 'How long does website development take?',
    a: 'The timeline depends on the website\'s size, features, content, design requirements, and revisions. After understanding your requirements, we provide an estimated timeline before starting the project.'
  },
  {
    q: 'Will my website work on mobile devices?',
    a: 'Yes. Our websites are designed to be responsive, providing a suitable experience across desktops, tablets, and mobile devices.'
  },
  {
    q: 'Can VANEXA work with businesses outside Pune?',
    a: 'Yes. Although VANEXA is based in Pune, Maharashtra, we can work with businesses from different locations through remote communication and digital collaboration.'
  },
  {
    q: 'How can I get started with VANEXA?',
    a: 'Simply contact us and tell us about your business, current digital presence, and goals. We will understand your requirements and discuss the most suitable approach for your business.'
  },
  {
    q: 'Do you offer customized packages?',
    a: 'Yes. Instead of forcing every business into the same package, we can create a service combination based on your requirements, goals, and budget.'
  },
  {
    q: 'Do you provide ongoing support?',
    a: 'Yes. Depending on the selected service, ongoing support, maintenance, optimization, and improvement can be discussed as part of the project or service plan.'
  },
  {
    q: 'What makes VANEXA different?',
    a: 'VANEXA brings SEO, websites, local visibility, content, and design together under one digital growth approach. Our focus is not simply to create a website or improve a ranking — it is to help build a digital presence that supports visibility, credibility, customer reach, and business growth.'
  }
]

export default function FAQ() {
  return (
    <section id="faq" className="section bg-[#f4f7ff]">
      <div className="container">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#0b63ff]">FAQ</p>
            <h2 className="text-3xl font-bold text-[#071033] md:text-4xl">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((item, index) => (
              <details
                key={item.q}
                className="group overflow-hidden rounded-[24px] border border-[#dfe9ff] bg-white shadow-[0_8px_24px_rgba(30,64,175,0.04)]"
                open={index === 0}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-left text-base font-semibold text-[#071033] md:text-lg md:p-6">
                  <span className="pr-3 leading-snug">{item.q}</span>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#edf4ff] text-lg font-medium text-[#0b63ff] transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="border-t border-[#edf4ff] px-5 pb-5 pt-4 text-sm leading-7 text-[#384868] md:px-6 md:text-base">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
