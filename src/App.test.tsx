import { describe, expect, it } from 'vitest';
import { fireEvent, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderRoute } from './test/render';
import { courses } from './config/courses';
import { mainNav } from './config/navigation';
import { reviewsAreSamples } from './config/testimonials';

describe('navigation', () => {
  it('renders the header navigation with all main links', () => {
    renderRoute('/');
    const nav = screen.getByRole('navigation', { name: 'Main' });
    for (const item of mainNav) {
      expect(within(nav).getByRole('link', { name: item.label })).toHaveAttribute('href', item.to);
    }
    expect(screen.getAllByRole('link', { name: /enquire now/i }).length).toBeGreaterThan(0);
  });

  it('navigates between pages and marks the active link', async () => {
    const user = userEvent.setup();
    renderRoute('/');
    const nav = screen.getByRole('navigation', { name: 'Main' });
    await user.click(within(nav).getByRole('link', { name: 'Courses' }));
    expect(screen.getByRole('heading', { level: 1, name: /school tuition for classes 6–10/i })).toBeInTheDocument();
    expect(within(nav).getByRole('link', { name: 'Courses' })).toHaveAttribute('aria-current', 'page');

    await user.click(within(nav).getByRole('link', { name: 'FAQs' }));
    expect(screen.getByRole('heading', { level: 1, name: /frequently asked questions/i })).toBeInTheDocument();
  });

  it('opens and closes the mobile menu accessibly', async () => {
    const user = userEvent.setup();
    renderRoute('/');
    const toggle = screen.getByRole('button', { name: /open menu/i });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    const panel = document.getElementById(toggle.getAttribute('aria-controls')!)!;
    expect(panel).not.toBeVisible();

    await user.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(panel).toBeVisible();
    expect(within(panel).getByRole('link', { name: 'Home' })).toHaveFocus();

    await user.keyboard('{Escape}');
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(toggle).toHaveFocus();
  });

  it('closes the mobile menu after navigating', async () => {
    const user = userEvent.setup();
    renderRoute('/');
    await user.click(screen.getByRole('button', { name: /open menu/i }));
    const mobileNav = screen.getByRole('navigation', { name: 'Mobile' });
    await user.click(within(mobileNav).getByRole('link', { name: 'About Us' }));
    expect(screen.getByRole('heading', { level: 1, name: /new coaching centre/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /open menu/i })).toHaveAttribute('aria-expanded', 'false');
  });

  it('shows a 404 page for unknown routes and unknown courses', () => {
    renderRoute('/does-not-exist');
    expect(screen.getByRole('heading', { level: 1, name: /couldn’t find that page/i })).toBeInTheDocument();
  });

  it('shows a 404 for an unknown course slug', () => {
    renderRoute('/courses/class-11');
    expect(screen.getByRole('heading', { level: 1, name: /couldn’t find that page/i })).toBeInTheDocument();
  });

  it.each(['/', '/courses', '/our-approach', '/about', '/faqs', '/contact', '/privacy-policy', '/fun-zone', ...courses.map((c) => `/courses/${c.slug}`)])(
    '%s has exactly one h1, a skip link and a main landmark',
    (path) => {
      renderRoute(path);
      expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
      expect(screen.getByRole('link', { name: /skip to main content/i })).toHaveAttribute('href', '#main');
      expect(screen.getByRole('main')).toBeInTheDocument();
      // Every image needs alt text; decorative SVGs must be hidden from assistive tech.
      document.querySelectorAll('img').forEach((img) => expect(img).toHaveAttribute('alt'));
      document.querySelectorAll('main svg').forEach((svg) => expect(svg).toHaveAttribute('aria-hidden', 'true'));
    },
  );
});

describe('home page', () => {
  it('renders the hero, benefits, courses and approach', () => {
    renderRoute('/');
    expect(screen.getByRole('heading', { level: 1, name: /strong concepts\. brighter futures\./i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /enquire about admissions/i })).toHaveAttribute('href', '#enquiry-form');
    expect(screen.getByRole('link', { name: /explore courses/i })).toHaveAttribute('href', '/courses');
    for (const title of ['Concept-Based Learning', 'Personal Attention', 'Regular Practice', 'Progress Tracking']) {
      expect(screen.getByRole('heading', { name: title })).toBeInTheDocument();
    }
    for (const step of ['Understand', 'Practise', 'Evaluate', 'Improve']) {
      expect(screen.getByRole('heading', { level: 3, name: step })).toBeInTheDocument();
    }
    expect(screen.getByRole('heading', { name: /every child deserves the right guidance/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /give your child a stronger start/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /visit tejas academy/i })).toBeInTheDocument();
  });

  it('never shows invented statistics', () => {
    renderRoute('/');
    const text = document.body.textContent ?? '';
    expect(text).not.toMatch(/\d+\s*%|\d+\+\s*students|rank(ed)?\s*#?\d/i);
  });

  it('labels every testimonial and review as a sample while they are placeholders', () => {
    renderRoute('/');
    const reviews = screen.getByRole('region', { name: /what our learners say/i });
    if (!reviewsAreSamples) return;
    const cards = within(reviews).getAllByRole('blockquote').length;
    // One badge per student card, plus one on the Google reviews header.
    expect(within(reviews).getAllByText('Sample')).toHaveLength(cards + 1);
    expect(within(reviews).getByText(/3 sample reviews/i)).toBeInTheDocument();
  });

  it('links directions to an encoded Google Maps URL', () => {
    renderRoute('/');
    const directions = screen.getAllByRole('link', { name: /get directions/i })[0]!;
    expect(directions.getAttribute('href')).toContain(encodeURIComponent('Orris Market, Sector 89, Gurugram'));
    expect(directions).toHaveAttribute('target', '_blank');
    expect(directions).toHaveAttribute('rel', expect.stringContaining('noopener'));
  });
});

describe('courses', () => {
  it('renders one card per configured course with View and Enquire actions', () => {
    renderRoute('/courses');
    const cards = screen.getAllByRole('article');
    expect(cards).toHaveLength(courses.length);
    courses.forEach((course, i) => {
      const card = cards[i]!;
      expect(within(card).getByRole('heading', { name: new RegExp(course.title) })).toBeInTheDocument();
      expect(within(card).getByRole('link', { name: /view course/i })).toHaveAttribute('href', `/courses/${course.slug}`);
      expect(within(card).getByRole('link', { name: /enquire now/i })).toHaveAttribute(
        'href',
        `/contact?course=${course.slug}#enquiry-form`,
      );
    });
  });

  it('renders course detail sections with honest placeholders for unconfirmed details', () => {
    const course = courses[2]!;
    renderRoute(`/courses/${course.slug}`);
    expect(screen.getByRole('heading', { level: 1, name: course.title })).toBeInTheDocument();
    for (const name of [/programme overview/i, /learning objectives/i, /available subjects/i, /teaching methodology/i, /key details/i]) {
      expect(screen.getByRole('heading', { name })).toBeInTheDocument();
    }
    // Fees, timings, duration and payment are not configured yet.
    expect(screen.getAllByText(/contact us for details/i)).toHaveLength(4);
    expect(document.body.textContent).not.toMatch(/₹\s*\d/);
    expect(screen.getByRole('heading', { name: /enquire about class 10 board preparation/i })).toBeInTheDocument();
  });
});

describe('FAQ accordion', () => {
  it('expands and collapses answers and supports arrow-key navigation', async () => {
    const user = userEvent.setup();
    renderRoute('/faqs');
    const buttons = screen.getAllByRole('button', { expanded: false }).filter((b) => b.hasAttribute('aria-controls') && b.closest('main'));
    const first = buttons[0]!;
    const panel = document.getElementById(first.getAttribute('aria-controls')!)!;
    expect(panel).not.toBeVisible();

    await user.click(first);
    expect(first).toHaveAttribute('aria-expanded', 'true');
    expect(panel).toBeVisible();
    expect(panel).toHaveAttribute('role', 'region');

    fireEvent.keyDown(first, { key: 'ArrowDown' });
    expect(buttons[1]).toHaveFocus();
    fireEvent.keyDown(buttons[1]!, { key: 'ArrowUp' });
    expect(first).toHaveFocus();

    await user.keyboard('{Enter}');
    expect(first).toHaveAttribute('aria-expanded', 'false');
  });

  it('includes all required questions', () => {
    renderRoute('/faqs');
    for (const q of [
      'Which classes does Tejas Academy teach?',
      'Which subjects are available?',
      'Which curriculum or board do you follow?',
      'What are the batch timings?',
      'What are the course fees?',
      'How can I enquire about admissions?',
      'Can parents visit the centre?',
      'Is a demo class available?',
    ]) {
      expect(screen.getByRole('button', { name: q })).toBeInTheDocument();
    }
  });
});

describe('responsive helpers', () => {
  it('hides the mobile contact bar while a form field is focused', async () => {
    const user = userEvent.setup();
    renderRoute('/contact');
    const bar = screen.getByRole('navigation', { name: /quick contact/i });
    expect(bar).toHaveClass('md:hidden');
    expect(bar).not.toHaveClass('translate-y-full');
    await user.click(screen.getByLabelText(/parent or guardian name/i));
    expect(bar).toHaveClass('translate-y-full');
    await user.click(document.body);
    expect(bar).not.toHaveClass('translate-y-full');
  });
});
