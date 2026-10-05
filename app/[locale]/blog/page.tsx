import { setRequestLocale, getTranslations } from "next-intl/server";
import { Container, Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Link } from "@/i18n/navigation";
import { BLOG_POSTS } from "@/content/blog";
import { Clock, ArrowRight, User } from "lucide-react";
import Image from "next/image";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog.meta" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "blog" });

  return (
    <main className="min-h-screen bg-bg pt-28 pb-20">
      {/* Hero */}
      <Section size="sm" tone="default">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-3xl text-center mb-12">
              <Eyebrow>{t("hero.eyebrow")}</Eyebrow>
              <h1 className="mt-4 text-balance text-3xl font-black text-navy md:text-5xl">
                {t("hero.title")}
              </h1>
              <p className="mt-4 text-base text-grey md:text-lg">
                {t("hero.subtitle")}
              </p>
            </div>
          </Reveal>

          {/* Articles Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {BLOG_POSTS.map((post, index) => (
              <Reveal key={post.slug} delay={index * 0.1}>
                <article className="group flex flex-col rounded-3xl border border-navy/10 bg-white overflow-hidden shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift h-full">
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-navy/5">
                    <Image
                      src={post.cover}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="rounded-full bg-navy/80 backdrop-blur-md px-3 py-1 text-xs font-semibold text-white">
                        {post.categoryLabel}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-6 justify-between">
                    <div>
                      <div className="flex items-center gap-3 text-xs text-grey mb-3">
                        <span>{post.date}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {post.readTime} {t("readTime")}
                        </span>
                      </div>

                      <h2 className="text-lg font-bold text-navy group-hover:text-teal transition-colors">
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </h2>

                      <p className="mt-2.5 text-xs text-grey leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-navy/5 pt-4">
                      <div className="flex items-center gap-2">
                        <div className="grid h-6 w-6 place-items-center rounded-full bg-teal/10 text-teal text-xs">
                          <User size={12} />
                        </div>
                        <span className="text-xs font-medium text-navy">
                          {post.author.name}
                        </span>
                      </div>

                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-teal hover:text-teal-dark transition-colors"
                      >
                        {t("readMore")}
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}
