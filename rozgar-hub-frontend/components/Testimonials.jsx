export default function Testimonials() {
  const reviews = [
    {
      name: "Ahmed Khan",
      role: "Electrician",
      text: "Rozgar Hub helped me find daily work near my home.",
    },
    {
      name: "Ayesha Bibi",
      role: "Tailor",
      text: "Now I get work without middlemen taking my money.",
    },
    {
      name: "Usman Ali",
      role: "Employer",
      text: "Hiring skilled workers is fast and reliable.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          What People Say
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <p className="text-gray-700 mb-4">“{r.text}”</p>
              <h4 className="font-semibold">{r.name}</h4>
              <span className="text-sm text-gray-500">{r.role}</span>
              <div className="text-yellow-500 mt-2">★★★★★</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
