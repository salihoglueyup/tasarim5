import Link from 'next/link';
import Image from 'next/image';
export default function PostGrid({ posts }: { posts: any[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      {posts.map((post) => {
        const cat = post.category;
        return (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
            <div className="w-full aspect-[16/9] rounded-[2rem] mb-5 overflow-hidden relative border border-gray-200/50 dark:border-white/10 shadow-sm">
              <Image src={post.image || '/images/hero-poster-v5.webp'} alt={post.title} width={800} height={450} sizes="(max-width: 768px) 100vw, 50vw" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              {cat && (
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-slate-900 font-bold px-4 py-1.5 rounded-full text-xs shadow-sm">
                  {cat.name}
                </div>
              )}
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors leading-tight">
              {post.title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-light mt-2 line-clamp-2">{post.description}</p>
          </Link>
        );
      })}
    </div>
  );
}
