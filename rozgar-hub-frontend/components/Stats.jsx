export default function Stats() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto grid grid-cols-3 text-center gap-6">
        <div>
          <h2 className="text-3xl font-bold text-blue-600">10,000+</h2>
          <p>Workers</p>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-green-600">5,000+</h2>
          <p>Jobs Posted</p>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-yellow-500">4.9 ★</h2>
          <p>Rating</p>
        </div>
      </div>
    </section>
  );
}
