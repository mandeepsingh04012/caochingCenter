import { describe, expect, it } from 'vitest';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderRoute, renderWithRouter } from '../../test/render';
import { QuizGame } from './QuizGame';
import { FactCard } from './FactCard';
import { funFacts, quizSets } from '../../config/engagement';

describe('quiz content', () => {
  it.each(quizSets)('$label has valid answers and unique options', (set) => {
    for (const q of set.questions) {
      expect(q.options[q.answer]).toBeDefined();
      expect(new Set(q.options).size).toBe(q.options.length);
    }
  });
});

describe('QuizGame', () => {
  it('scores answers, explains them and shows the final result', async () => {
    const user = userEvent.setup();
    renderWithRouter(<QuizGame />);
    const set = quizSets[0]!;

    for (const [i, q] of set.questions.entries()) {
      expect(screen.getByText(`Question ${i + 1} of ${set.questions.length}`)).toBeInTheDocument();
      // Answer the first question wrongly, the rest correctly.
      const choice = i === 0 ? (q.answer + 1) % q.options.length : q.answer;
      await user.click(screen.getByRole('button', { name: q.options[choice] }));
      expect(screen.getByText(i === 0 ? /not quite/i : /correct!/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: q.options[q.answer] })).toBeDisabled();
      await user.click(screen.getByRole('button', { name: /next question|see my score/i }));
    }

    const result = screen.getByRole('status');
    expect(within(result).getByText(`${set.questions.length - 1} / ${set.questions.length}`)).toBeInTheDocument();
    await user.click(within(result).getByRole('button', { name: /play again/i }));
    expect(screen.getByText(/question 1 of/i)).toBeInTheDocument();
  });

  it('switches between class quizzes', async () => {
    const user = userEvent.setup();
    renderWithRouter(<QuizGame />);
    const last = quizSets[quizSets.length - 1]!;
    await user.click(screen.getByRole('button', { name: last.label }));
    expect(screen.getByRole('button', { name: last.label })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByText(last.questions[0]!.question)).toBeInTheDocument();
  });
});

describe('FactCard', () => {
  it('cycles through facts in both directions', async () => {
    const user = userEvent.setup();
    renderWithRouter(<FactCard />);
    expect(screen.getByText(funFacts[0]!.title)).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /next fact/i }));
    expect(screen.getByText(funFacts[1]!.title)).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /previous fact/i }));
    await user.click(screen.getByRole('button', { name: /previous fact/i }));
    expect(screen.getByText(funFacts[funFacts.length - 1]!.title)).toBeInTheDocument();
  });
});

describe('home page additions', () => {
  it('shows the faculty, labelled sample reviews and the brain break', () => {
    renderRoute('/');
    const faculty = screen.getByRole('region', { name: /experienced teachers who care/i });
    expect(within(faculty).getByText('Shivani Mishra')).toBeInTheDocument();
    expect(within(faculty).getByText('Deepshikha Rana')).toBeInTheDocument();

    const reviews = screen.getByRole('region', { name: /what our learners say/i });
    expect(within(reviews).getAllByText('Sample').length).toBeGreaterThan(0);
    expect(within(reviews).getByText(/sample reviews are shown/i)).toBeInTheDocument();

    expect(screen.getByRole('heading', { name: /quick quiz/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /visit the fun zone/i })).toHaveAttribute('href', '/fun-zone');
  });
});
