import React from "react";

async function getCategories() {
  const res = await fetch(
    "https://ecommerce.routemisr.com/api/v1/categories",
    {
      next: {
        revalidate: 3600,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed To Fetch Categories");
  }

  return res.json();
}

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <section className="min-h-screen bg-gradient-to-br from-emerald-950 via-emerald-900 to-black text-white py-16 px-4 overflow-hidden">
      
      {/* Glow Effects */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-emerald-500/20 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-300/10 blur-3xl rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-sm font-medium">
            Product Categories
          </span>

          <h1 className="mt-6 text-5xl md:text-7xl font-black leading-tight">
            Shop By
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-emerald-500">
              Categories
            </span>
          </h1>

          <p className="mt-6 text-zinc-300 text-lg max-w-2xl mx-auto leading-relaxed">
            Browse all categories and discover premium collections with a modern shopping experience.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {categories.data.map((category: any) => (
            <div
              key={category._id}
              className="group relative rounded-3xl overflow-hidden bg-white/10 backdrop-blur-xl border border-white/10 hover:border-emerald-400/50 transition-all duration-500 hover:-translate-y-4 hover:shadow-[0_20px_60px_rgba(16,185,129,0.35)]"
            >
              
              {/* Image */}
              <div className="relative h-80 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h2 className="text-2xl font-bold text-white group-hover:text-emerald-300 transition">
                  {category.name}
                </h2>

                <div className="mt-4 w-12 h-1 rounded-full bg-emerald-500 group-hover:w-24 transition-all duration-500" />
              </div>

              {/* Shine Effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}