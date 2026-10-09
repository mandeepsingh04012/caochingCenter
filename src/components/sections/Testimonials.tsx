import { Quote, Star } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { ButtonLink } from '../ui/Button';
import { GoogleIcon } from '../icons/GoogleIcon';
import { googleReviews, googleReviewUrl, reviewsAreSamples, studentTestimonials } from '../../config/testimonials';
import { cn } from '../../lib/cn';

function SampleBadge({ className }: { className?: string }) {
  if (!reviewsAreSamples) return null;
  return (
    <span className={cn('rounded-full bg-gold-100 px-2.5 py-0.5 text-[0.7rem] font-bold tracking-wide text-gold-700 uppercase', className)}>
      Sample
    </span>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5">
      <span className="sr-only">Rated {rating} out of 5</span>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          aria-hidden="true"
          className={cn('size-4', i < rating ? 'text-[#fbbc04]' : 'text-line')}
          fill="currentColor"
          strokeWidth={0}
        />
      ))}
    </span>
  );
}

export function Testimonials() {
  if (studentTestimonials.length === 0 && googleReviews.length === 0) return null;
  const average = googleReviews.length
    ? googleReviews.reduce((sum, r) => sum + r.rating, 0) / googleReviews.length
    : null;

  return (
    <section aria-labelledby="testimonials-heading" className="section-y relative overflow-hidden bg-beige">
      <div aria-hidden="true" className="bg-dots absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div className="container-page relative">
        <SectionHeading
          id="testimonials-heading"
          eyebrow="Student & parent voices"
          title="What our learners say"
          align="center"
          intro={
            reviewsAreSamples
              ? 'Sample reviews are shown below while we collect feedback from our first batch of students and parents.'
              : 'Feedback from the students and families who learn with us.'
          }
        />

        {studentTestimonials.length > 0 && (
          <ul className="mt-14 grid gap-6 md:grid-cols-3">
            {studentTestimonials.map((t) => (
              <li key={t.name} className="reveal relative flex flex-col rounded-card bg-white p-7 shadow-soft transition-transform duration-300 hover:-translate-y-1 motion-reduce:hover:translate-y-0">
                <Quote aria-hidden="true" className="size-9 text-gold" fill="currentColor" strokeWidth={0} />
                <blockquote className="mt-4 flex-1 text-lg leading-relaxed text-ink">“{t.quote}”</blockquote>
                <div className="mt-6 flex items-center justify-between gap-3 border-t border-line pt-5">
                  <p>
                    <span className="block font-bold text-deep">{t.name}</span>
                    <span className="text-sm text-muted">{t.detail}</span>
                  </p>
                  <SampleBadge />
                </div>
              </li>
            ))}
          </ul>
        )}

        {googleReviews.length > 0 && (
          <div className="mt-16 rounded-[2rem] border border-line bg-white p-6 shadow-soft sm:p-10">
            <div className="flex flex-col gap-6 border-b border-line pb-8 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <span className="grid size-14 place-items-center rounded-2xl bg-beige-50">
                  <GoogleIcon className="size-8" />
                </span>
                <div>
                  <h3 className="flex flex-wrap items-center gap-2 text-xl">
                    Google reviews <SampleBadge />
                  </h3>
                  {average !== null && (
                    <p className="mt-1 flex items-center gap-2 text-sm text-muted">
                      <span className="text-lg font-bold text-deep">{average.toFixed(1)}</span>
                      <Stars rating={Math.round(average)} />
                      <span>
                        {googleReviews.length} {reviewsAreSamples ? 'sample ' : ''}
                        {googleReviews.length === 1 ? 'review' : 'reviews'}
                      </span>
                    </p>
                  )}
                </div>
              </div>
              {googleReviewUrl && (
                <ButtonLink href={googleReviewUrl} variant="outline" size="sm" icon={<GoogleIcon className="size-4" />}>
                  Review us on Google
                </ButtonLink>
              )}
            </div>
            <ul className="mt-8 grid gap-6 md:grid-cols-3">
              {googleReviews.map((r) => (
                <li key={r.author} className="reveal rounded-2xl bg-beige-50 p-6">
                  <div className="flex items-center gap-3">
                    <span aria-hidden="true" className="grid size-10 place-items-center rounded-full bg-forest font-bold text-gold">
                      {r.author[0]}
                    </span>
                    <div>
                      <p className="font-semibold text-deep">{r.author}</p>
                      <Stars rating={r.rating} />
                    </div>
                  </div>
                  <p className="mt-4 leading-relaxed text-muted">{r.text}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
