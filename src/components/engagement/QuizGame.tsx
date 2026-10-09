import { useState } from 'react';
import { ArrowRight, Check, RotateCcw, Trophy, X } from 'lucide-react';
import { Button, ButtonLink } from '../ui/Button';
import { quizSets } from '../../config/engagement';
import { enquiryHref } from '../../config/navigation';
import { trackEvent } from '../../lib/analytics';
import { cn } from '../../lib/cn';

function resultMessage(score: number, total: number): string {
  if (score === total) return 'Perfect score! Your concepts are rock solid.';
  if (score >= total - 1) return 'Excellent work! Just one away from perfect.';
  if (score >= total / 2) return 'Good effort! A little revision and you’ll ace it.';
  return 'Every expert started somewhere. Try again and beat your score!';
}

interface QuizGameProps {
  /** Heading level of the quiz title, to fit the page outline. */
  headingLevel?: 'h2' | 'h3';
  className?: string;
}

export function QuizGame({ headingLevel: Heading = 'h3', className }: QuizGameProps) {
  const [setId, setSetId] = useState(quizSets[0]!.id);
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const quiz = quizSets.find((s) => s.id === setId) ?? quizSets[0]!;
  const total = quiz.questions.length;
  const question = quiz.questions[index]!;
  const answered = picked !== null;

  const restart = (nextSetId = setId) => {
    setSetId(nextSetId);
    setIndex(0);
    setPicked(null);
    setScore(0);
    setFinished(false);
  };

  const choose = (option: number) => {
    if (answered) return;
    setPicked(option);
    if (option === question.answer) setScore((s) => s + 1);
  };

  const next = () => {
    if (index + 1 < total) {
      setIndex(index + 1);
      setPicked(null);
    } else {
      setFinished(true);
      trackEvent('quiz_completed', { quiz: quiz.id, score, total });
    }
  };

  return (
    <div className={cn('rounded-[2rem] border border-line bg-white p-6 shadow-lift sm:p-9', className)}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Heading className="text-xl sm:text-2xl">Quick quiz</Heading>
        <div role="group" aria-label="Choose your class" className="flex flex-wrap gap-2">
          {quizSets.map((s) => (
            <button
              key={s.id}
              type="button"
              aria-pressed={s.id === setId}
              onClick={() => restart(s.id)}
              className={cn(
                'rounded-full border px-3.5 py-1.5 text-sm font-semibold transition-colors',
                s.id === setId ? 'border-forest bg-forest text-white' : 'border-line bg-beige-50 text-deep hover:border-forest/40',
              )}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {finished ? (
        <div role="status" className="animate-pop mt-8 flex flex-col items-center rounded-card bg-forest-50 px-6 py-10 text-center">
          <span className="grid size-16 place-items-center rounded-full bg-gold text-deep">
            <Trophy aria-hidden="true" className="size-8" />
          </span>
          <p className="mt-5 text-3xl font-extrabold text-deep">
            {score} / {total}
          </p>
          <p className="mt-2 max-w-sm text-muted">{resultMessage(score, total)}</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button variant="outline" onClick={() => restart()} icon={<RotateCcw aria-hidden="true" className="size-4" />}>
              Play again
            </Button>
            <ButtonLink href={enquiryHref} iconRight={<ArrowRight aria-hidden="true" className="size-4" />}>
              Learn with us
            </ButtonLink>
          </div>
        </div>
      ) : (
        <div key={`${quiz.id}-${index}`} className="animate-pop mt-8">
          <div className="flex items-center justify-between text-sm font-semibold text-muted">
            <span>
              Question {index + 1} of {total}
            </span>
            <span>Score: {score}</span>
          </div>
          <div
            role="progressbar"
            aria-label="Quiz progress"
            aria-valuemin={0}
            aria-valuemax={total}
            aria-valuenow={index + (answered ? 1 : 0)}
            className="mt-2 h-2 overflow-hidden rounded-full bg-beige"
          >
            <div
              className="h-full rounded-full bg-gold transition-[width] duration-500"
              style={{ width: `${((index + (answered ? 1 : 0)) / total) * 100}%` }}
            />
          </div>

          <p className="mt-6 text-lg font-bold text-deep sm:text-xl">{question.question}</p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {question.options.map((option, i) => {
              const isCorrect = i === question.answer;
              const isPicked = i === picked;
              return (
                <li key={option}>
                  <button
                    type="button"
                    onClick={() => choose(i)}
                    disabled={answered}
                    className={cn(
                      'flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3.5 text-left font-semibold transition-colors disabled:cursor-default',
                      !answered && 'border-line bg-beige-50 text-deep hover:border-forest hover:bg-forest-50',
                      answered && isCorrect && 'border-forest bg-forest text-white',
                      answered && isPicked && !isCorrect && 'border-danger bg-danger-50 text-danger',
                      answered && !isPicked && !isCorrect && 'border-line bg-white text-muted',
                    )}
                  >
                    {option}
                    {answered && isCorrect && <Check aria-hidden="true" className="size-5 shrink-0" />}
                    {answered && isPicked && !isCorrect && <X aria-hidden="true" className="size-5 shrink-0" />}
                  </button>
                </li>
              );
            })}
          </ul>

          <div aria-live="polite">
            {answered && (
              <div className="animate-pop mt-6 flex flex-col gap-4 rounded-2xl bg-beige-50 p-5 sm:flex-row sm:items-center sm:justify-between">
                <p>
                  <strong className={picked === question.answer ? 'text-forest' : 'text-danger'}>
                    {picked === question.answer ? 'Correct!' : `Not quite. The answer is ${question.options[question.answer]}.`}
                  </strong>{' '}
                  <span className="text-muted">{question.explanation}</span>
                </p>
                <Button onClick={next} size="sm" className="shrink-0" iconRight={<ArrowRight aria-hidden="true" className="size-4" />}>
                  {index + 1 < total ? 'Next question' : 'See my score'}
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
