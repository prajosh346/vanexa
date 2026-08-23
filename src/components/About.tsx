
export default function About(){
  return (
    <section id="about" className="section">
      <div className="container grid md:grid-cols-3 gap-8 items-start">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-semibold">We Don't Just Build Digital Presence. We Build Digital Growth.</h2>
          <p className="text-gray-600 mt-4 max-w-2xl">Your website, search visibility, content and brand should work together — not separately. VANEXA brings these digital services together to create a stronger online presence for your business.</p>
        </div>
        <div className="grid gap-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold">Strategy</h4>
            <p className="text-sm text-gray-600 mt-1">Every project starts with understanding the business and its goals.</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold">Visibility</h4>
            <p className="text-sm text-gray-600 mt-1">We help businesses become easier to discover online.</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold">Growth</h4>
            <p className="text-sm text-gray-600 mt-1">Everything we build is focused on creating long-term business value.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
