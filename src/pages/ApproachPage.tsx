import { PageHeader } from '../components/sections/PageHeader';
import { ApproachProcess } from '../components/sections/ApproachProcess';
import { WhyChoose } from '../components/sections/WhyChoose';
import { CtaBand } from '../components/sections/CtaBand';
import { pageMeta } from '../config/seo';
import { useDocumentMeta } from '../lib/seo';

export default function ApproachPage() {
  useDocumentMeta(pageMeta.approach);
  return (
    <>
      <PageHeader
        eyebrow="Our teaching approach"
        title="A clear, consistent way of learning"
        intro="Every topic at Tejas Academy follows the same four-step cycle — so students build understanding first, then strengthen it through practice, evaluation and focused improvement."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Our Approach' }]}
      />
      <ApproachProcess detailed />
      <section aria-labelledby="parents-role-heading" className="section-y bg-beige-50">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="eyebrow mb-4">Working with parents</p>
            <h2 id="parents-role-heading" className="text-3xl sm:text-4xl">
              Keeping parents informed
            </h2>
          </div>
          <div className="space-y-5 text-lg leading-relaxed text-muted">
            <p>
              We believe a child&rsquo;s progress is strongest when teachers and parents work together. Our evaluation
              step is designed to make learning visible, so strengths and gaps can be discussed openly.
            </p>
            <p>
              Parents are welcome to contact us with questions about their child&rsquo;s learning, and to speak with our
              team before admission about how classes are conducted.
            </p>
          </div>
        </div>
      </section>
      <WhyChoose />
      <CtaBand
        title="See if our approach suits your child"
        text="Talk to our team about your child’s class, subjects and learning needs."
      />
    </>
  );
}
