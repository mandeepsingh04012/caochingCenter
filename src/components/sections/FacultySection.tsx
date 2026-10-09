import { GraduationCap } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { team } from '../../config/content';
import { cn } from '../../lib/cn';

const initials = (name: string) =>
  name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2);

const avatarTones = ['from-forest to-deep text-gold', 'from-gold to-[#c79a45] text-deep'];

interface FacultySectionProps {
  className?: string;
}

export function FacultySection({ className }: FacultySectionProps) {
  if (team.length === 0) return null;
  return (
    <section aria-labelledby="faculty-heading" className={cn('section-y relative overflow-hidden bg-white', className)}>
      <div aria-hidden="true" className="bg-dots absolute top-0 right-0 h-64 w-80 [mask-image:linear-gradient(to_bottom_left,black,transparent)]" />
      <div className="container-page relative">
        <SectionHeading
          id="faculty-heading"
          eyebrow="Meet our faculty"
          title="Experienced teachers who care"
          intro="Our teachers bring years of school classroom experience, so lessons are structured, familiar and focused on what students need to succeed."
        />
        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {team.map((member, i) => (
            <li
              key={member.name}
              className="reveal group relative flex flex-col gap-6 overflow-hidden rounded-card border border-line bg-beige-50 p-7 transition-shadow hover:shadow-lift sm:flex-row sm:p-8"
            >
              {member.photo ? (
                <img
                  src={member.photo}
                  alt={`Portrait of ${member.name}`}
                  loading="lazy"
                  width={160}
                  height={160}
                  className="size-28 shrink-0 rounded-2xl object-cover"
                />
              ) : (
                <span
                  aria-hidden="true"
                  className={cn(
                    'grid size-28 shrink-0 place-items-center rounded-2xl bg-gradient-to-br text-4xl font-extrabold shadow-soft transition-transform duration-300 group-hover:-rotate-3',
                    avatarTones[i % avatarTones.length],
                  )}
                >
                  {initials(member.name)}
                </span>
              )}
              <div>
                <h3 className="text-xl">{member.name}</h3>
                <p className="mt-0.5 flex items-center gap-1.5 text-sm font-semibold text-gold-700">
                  <GraduationCap aria-hidden="true" className="size-4" />
                  {member.role}
                </p>
                <p className="mt-4 leading-relaxed text-muted">{member.bio}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {member.highlights.map((h) => (
                    <li key={h} className="rounded-full border border-forest/15 bg-white px-3 py-1 text-xs font-semibold text-forest">
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
