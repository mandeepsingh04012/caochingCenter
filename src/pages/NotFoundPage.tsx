import { ArrowRight } from 'lucide-react';
import { ButtonLink } from '../components/ui/Button';
import { pageMeta } from '../config/seo';
import { routes } from '../config/navigation';
import { useDocumentMeta } from '../lib/seo';

export default function NotFoundPage() {
  useDocumentMeta(pageMeta.notFound);
  return (
    <section className="section-y bg-beige-50">
      <div className="container-page max-w-2xl! text-center">
        <p className="eyebrow">Error 404</p>
        <h1 className="mt-4 text-4xl font-extrabold sm:text-5xl">We couldn&rsquo;t find that page</h1>
        <p className="mt-5 text-lg text-muted">The page may have moved, or the link may be incorrect.</p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href={routes.home} iconRight={<ArrowRight aria-hidden="true" className="size-4" />}>
            Go to homepage
          </ButtonLink>
          <ButtonLink href={routes.courses} variant="outline">
            View courses
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
