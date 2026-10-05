import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Container, Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { BLOG_POSTS } from "@/content/blog";
import { routing } from "@/i18n/routing";
import { Clock, ArrowLeft, User, Calendar, Share2 } from "lucide-react";
import Image from "next/image";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    BLOG_POSTS.map((p) => ({
      locale,
      slug: p.slug,
    }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} — BAFIK Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <main className="min-h-screen bg-bg pt-28 pb-20">
      <Section size="sm" tone="default">
        <Container>
          <div className="mx-auto max-w-3xl">
            {/* Back link */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs font-semibold text-grey hover:text-navy transition-colors mb-6"
            >
              <ArrowLeft size={14} />
              Retour aux actualités
            </Link>

            <Eyebrow>{post.categoryLabel}</Eyebrow>
            <h1 className="mt-3 text-balance text-2xl font-black text-navy md:text-4xl leading-tight">
              {post.title}
            </h1>

            {/* Author info */}
            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-grey border-b border-navy/10 pb-6">
              <div className="flex items-center gap-2">
                <div className="grid h-8 w-8 place-items-center rounded-full bg-teal text-white">
                  <User size={14} />
                </div>
                <div>
                  <p className="font-bold text-navy">{post.author.name}</p>
                  <p className="text-[11px] text-grey">{post.author.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 ml-auto">
                <span className="flex items-center gap-1.5">
                  <Calendar size={13} />
                  {post.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={13} />
                  {post.readTime} min de lecture
                </span>
              </div>
            </div>

            {/* Hero Cover */}
            <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-3xl bg-navy/5 shadow-md">
              <Image
                src={post.cover}
                alt={post.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 800px"
              />
            </div>

            {/* Article Content */}
            <div className="mt-10 space-y-6 text-base text-ink/80 leading-relaxed font-normal">
              {post.content.map((paragraph, i) => (
                <p key={i} className="text-base md:text-lg">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* CTA Box */}
            <div className="mt-14 rounded-3xl border border-teal/20 bg-gradient-to-br from-navy to-navy-2 p-8 text-white shadow-xl">
              <h3 className="text-xl font-bold">
                Vous préparez un congrès ou un symposium médical ?
              </h3>
              <p className="mt-2 text-sm text-white/80">
                Nos équipes techniques et scientifiques vous accompagnent dans toute l'Afrique de l'Ouest et Centrale.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button href="/contact" variant="primary" size="md">
                  Demander un devis
                </Button>
                <Button href="/services" variant="ghost" size="md">
                  Découvrir nos services
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
