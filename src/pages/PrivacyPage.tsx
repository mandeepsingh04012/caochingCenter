import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { PageHeader } from '../components/sections/PageHeader';
import { privacyLastUpdated } from '../config/content';
import { siteConfig } from '../config/site';
import { pageMeta } from '../config/seo';
import { routes } from '../config/navigation';
import { contactLinks } from '../lib/contact';
import { useDocumentMeta } from '../lib/seo';

function PolicySection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl">{title}</h2>
      {children}
    </section>
  );
}

export default function PrivacyPage() {
  useDocumentMeta(pageMeta.privacy);
  const { name, address, enquiryEndpoint, analyticsEnabled } = siteConfig;
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        intro={`How ${name} collects, uses and protects information shared through this website.`}
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Privacy Policy' }]}
      >
        <p className="mt-6 text-sm text-muted">Last updated: {privacyLastUpdated}</p>
      </PageHeader>

      <div className="section-y bg-white">
        <div className="container-page max-w-3xl! space-y-12 leading-relaxed text-ink [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-2">
          <PolicySection title="Who we are">
            <p>
              This website is operated by {name}, a coaching centre located at {address.full}. In this policy,
              &ldquo;we&rdquo;, &ldquo;us&rdquo; and &ldquo;our&rdquo; refer to {name}.
            </p>
          </PolicySection>

          <PolicySection title="Information we collect">
            <p>When you submit an admission enquiry, we ask only for the details needed to respond:</p>
            <ul>
              <li>Parent or guardian name</li>
              <li>Mobile number</li>
              <li>The student&rsquo;s class</li>
              <li>Subject preference (optional)</li>
              <li>Preferred contact method (phone or WhatsApp)</li>
              <li>Any message you choose to include (optional)</li>
            </ul>
            <p>
              We do not ask for the student&rsquo;s name, date of birth, school or other personal details through this
              website. Please do not include sensitive information in the message field.
            </p>
          </PolicySection>

          <PolicySection title="How we use your information">
            <ul>
              <li>To respond to your enquiry by your preferred contact method</li>
              <li>To share information about classes, subjects, timings, fees and admissions you have asked about</li>
              <li>To keep a record of enquiries so we can follow up appropriately</li>
            </ul>
            <p>We do not sell your information, and we do not use it for unrelated marketing.</p>
          </PolicySection>

          <PolicySection title="How your enquiry is sent">
            {enquiryEndpoint ? (
              <p>
                Enquiries submitted through the online form are transmitted securely to a form-processing service that
                stores them on our behalf so our team can respond.
              </p>
            ) : (
              <p>
                When you use the enquiry form, your details are prepared as a WhatsApp message on your own device.
                Nothing is sent to us until you choose to send that message in WhatsApp.
              </p>
            )}
            <p>
              If you contact us on WhatsApp, your messages are also handled under WhatsApp&rsquo;s own terms and privacy
              policy.
            </p>
          </PolicySection>

          <PolicySection title="Cookies and analytics">
            {analyticsEnabled ? (
              <p>
                We use analytics tools to understand how visitors use this website, such as which pages are viewed. These
                tools may use cookies. We do not send your enquiry details to analytics services.
              </p>
            ) : (
              <p>This website does not use analytics or advertising cookies.</p>
            )}
            <p>
              If a map is shown on our website, it is provided by Google Maps, which may set its own cookies when the map
              loads.
            </p>
          </PolicySection>

          <PolicySection title="How long we keep information">
            <p>
              We keep enquiry details only for as long as needed to respond to your enquiry and for reasonable
              record-keeping, after which they are deleted.
            </p>
          </PolicySection>

          <PolicySection title="Your choices and rights">
            <p>
              You may ask us to access, correct or delete the information you have shared with us, or ask us to stop
              contacting you, at any time. We handle personal data in line with applicable Indian law, including the
              Digital Personal Data Protection Act, 2023.
            </p>
          </PolicySection>

          <PolicySection title="Contact us about privacy">
            <p>
              For any privacy request or question, please{' '}
              {contactLinks.email ? (
                <>
                  email us at{' '}
                  <a href={contactLinks.email} className="font-semibold text-forest underline underline-offset-4">
                    {siteConfig.contact.email}
                  </a>
                  ,{' '}
                </>
              ) : null}
              {contactLinks.tel ? (
                <>
                  call us on{' '}
                  <a href={contactLinks.tel} className="font-semibold text-forest underline underline-offset-4">
                    {contactLinks.phoneDisplay}
                  </a>
                  ,{' '}
                </>
              ) : null}
              visit our{' '}
              <Link to={routes.contact} className="font-semibold text-forest underline underline-offset-4">
                Contact page
              </Link>{' '}
              or speak to us in person at {address.full}.
            </p>
          </PolicySection>

          <PolicySection title="Changes to this policy">
            <p>
              We may update this policy from time to time. The latest version will always be available on this page,
              with the date it was last updated.
            </p>
          </PolicySection>
        </div>
      </div>
    </>
  );
}
