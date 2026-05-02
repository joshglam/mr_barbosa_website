import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { caseyConfig } from '@/lib/config';
import { getAllBlogPosts, blogCategoryLabels } from '@/lib/blog';
import { heroImage } from '@/lib/images';

export const metadata: Metadata = {
  title: 'Blog',
  description: `Style notes, studio updates, and grooming tips from Mr. Barbosa Mens Hair Salon on the Chelsea / Flatiron border in NYC.`,
};

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <div className="bg-black">
      <section className="relative overflow-hidden border-b border-neutral-800 py-24 sm:py-32">
        <Image
          src={heroImage('blog')}
          alt="Mr. Barbosa Blog"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative mx-auto max-w-5xl px-4 text-center">
          <h1 className="text-4xl font-bold text-white">Blog</h1>
          <p className="mt-4 text-lg text-neutral-200">
            Style notes, studio updates, and the occasional grooming tip.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4">
          {posts.length === 0 ? (
            <p className="text-center text-neutral-400">
              New posts coming soon. In the meantime, follow along on Instagram.
            </p>
          ) : (
            <div className="grid gap-8 md:grid-cols-2">
              {posts.map((post) => (
                <article
                  key={post.slug}
                  className="group rounded-xl border border-neutral-800 bg-neutral-950 transition-all hover:border-white"
                >
                  <Link href={`/blog/${post.slug}`} className="block p-6">
                    <div className="flex items-center gap-3">
                      <span className="rounded-full border border-neutral-800 px-3 py-1 text-xs font-medium text-neutral-300">
                        {blogCategoryLabels[post.category]}
                      </span>
                      <span className="text-xs text-neutral-500">{post.readTime} read</span>
                    </div>
                    <h2 className="mt-4 text-xl font-bold text-white">
                      {post.title}
                    </h2>
                    <p className="mt-2 text-neutral-400 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs text-neutral-500">
                        {new Date(post.publishedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                      <span className="text-sm font-medium text-white inline-flex items-center">
                        Read more
                        <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="border-t border-neutral-800 bg-neutral-950 py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-2xl font-bold text-white">Ready for the chair?</h2>
          <p className="mt-4 text-neutral-300">Reserve your appointment online.</p>
          <div className="mt-6">
            <a
              href={caseyConfig.bookingUrl}
              target="_blank"
              rel="noopener"
              className="inline-block rounded-lg bg-white px-6 py-3 font-semibold text-black transition-colors hover:bg-neutral-200"
            >
              Book Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
