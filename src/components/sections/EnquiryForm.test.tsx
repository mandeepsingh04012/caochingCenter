import { describe, expect, it, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EnquiryForm } from './EnquiryForm';
import { renderWithRouter } from '../../test/render';
import { courses } from '../../config/courses';

async function fillValidForm(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/parent or guardian name/i), 'Asha Verma');
  await user.type(screen.getByLabelText(/mobile number/i), '98765 43210');
  await user.selectOptions(screen.getByLabelText(/student’s class/i), '10');
  await user.click(screen.getByLabelText(/whatsapp/i));
  await user.click(screen.getByRole('checkbox'));
}

describe('EnquiryForm', () => {
  it('shows inline errors for required fields and focuses the first invalid field', async () => {
    const user = userEvent.setup();
    renderWithRouter(<EnquiryForm endpoint="https://example.test" whatsappNumber={null} />);
    await user.click(screen.getByRole('button', { name: /send enquiry/i }));

    expect(screen.getByText(/enter the parent or guardian’s name/i)).toBeInTheDocument();
    expect(screen.getByText(/please enter a mobile number/i)).toBeInTheDocument();
    expect(screen.getByText(/select the student’s class/i)).toBeInTheDocument();
    expect(screen.getByText(/choose how you would like us to contact you/i)).toBeInTheDocument();
    expect(screen.getByText(/confirm that we may contact you/i)).toBeInTheDocument();

    const name = screen.getByLabelText(/parent or guardian name/i);
    expect(name).toHaveFocus();
    expect(name).toHaveAttribute('aria-invalid', 'true');
    expect(name).toHaveAccessibleDescription(/enter the parent or guardian’s name/i);
  });

  it('validates Indian mobile numbers', async () => {
    const user = userEvent.setup();
    renderWithRouter(<EnquiryForm endpoint="https://example.test" />);
    const mobile = screen.getByLabelText(/mobile number/i);
    await user.type(mobile, '12345');
    await user.tab();
    expect(screen.getByText(/valid 10-digit indian mobile number/i)).toBeInTheDocument();
    await user.clear(mobile);
    await user.type(mobile, '9876543210');
    await user.tab();
    expect(screen.queryByText(/valid 10-digit indian mobile number/i)).not.toBeInTheDocument();
  });

  it('submits to the endpoint, shows a loading state, then success', async () => {
    const user = userEvent.setup();
    let resolve!: (r: Response) => void;
    const fetchImpl = vi.fn(() => new Promise<Response>((r) => (resolve = r)));
    renderWithRouter(<EnquiryForm endpoint="https://example.test/enquiry" fetchImpl={fetchImpl as unknown as typeof fetch} />);
    await fillValidForm(user);
    await user.click(screen.getByRole('button', { name: /send enquiry/i }));

    expect(screen.getByRole('button', { name: /sending/i })).toBeDisabled();
    resolve(new Response('{}', { status: 200 }));
    expect(await screen.findByText(/your enquiry has been sent/i)).toBeInTheDocument();
    const body = JSON.parse((fetchImpl.mock.calls[0] as unknown as [string, RequestInit])[1].body as string);
    expect(body).toMatchObject({ parentName: 'Asha Verma', mobile: '+919876543210', studentClass: '10', contactMethod: 'whatsapp' });
  });

  it('keeps the data and offers alternatives when submission fails', async () => {
    const user = userEvent.setup();
    const fetchImpl = vi.fn().mockResolvedValue(new Response('', { status: 503 }));
    renderWithRouter(<EnquiryForm endpoint="https://example.test" whatsappNumber="9876500000" fetchImpl={fetchImpl} />);
    await fillValidForm(user);
    await user.click(screen.getByRole('button', { name: /send enquiry/i }));

    expect(await screen.findByRole('alert')).toHaveTextContent(/could not be sent/i);
    expect(screen.queryByText(/your enquiry has been sent/i)).not.toBeInTheDocument();
    expect(screen.getByLabelText(/parent or guardian name/i)).toHaveValue('Asha Verma');
    const fallback = screen.getByRole('link', { name: /send via whatsapp/i });
    expect(fallback.getAttribute('href')).toMatch(/^https:\/\/wa\.me\/919876500000\?text=/);
  });

  it('without an endpoint, prepares a WhatsApp message and never claims it was sent', async () => {
    const user = userEvent.setup();
    const fetchImpl = vi.fn();
    renderWithRouter(<EnquiryForm endpoint={null} whatsappNumber="+91 98765 00000" fetchImpl={fetchImpl} />);
    expect(screen.getByText(/nothing is sent until you press send in whatsapp/i)).toBeInTheDocument();

    await fillValidForm(user);
    await user.click(screen.getByRole('button', { name: /continue on whatsapp/i }));

    expect(fetchImpl).not.toHaveBeenCalled();
    expect(screen.getByText(/has not been sent yet/i)).toBeInTheDocument();
    expect(screen.queryByText(/your enquiry has been sent/i)).not.toBeInTheDocument();
    const link = screen.getByRole('link', { name: /open whatsapp to send/i });
    const url = new URL(link.getAttribute('href')!);
    expect(url.origin + url.pathname).toBe('https://wa.me/919876500000');
    const text = url.searchParams.get('text')!;
    expect(text).toContain('Parent/Guardian: Asha Verma');
    expect(text).toContain('Mobile: +919876543210');
    expect(text).toContain('Programme: Class 10 Board Preparation');
  });

  it('shows a clear notice instead of the form when no submission route is configured', () => {
    renderWithRouter(<EnquiryForm endpoint={null} whatsappNumber={null} phoneNumber={null} />);
    expect(screen.getByText(/online enquiries are not available yet/i)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /send|continue/i })).not.toBeInTheDocument();
  });

  it('pre-selects the class for a single-class course', () => {
    const class10 = courses.find((c) => c.classes.length === 1 && c.classes[0] === 10)!;
    renderWithRouter(<EnquiryForm course={class10} endpoint="https://example.test" />);
    expect(screen.getByLabelText(/student’s class/i)).toHaveValue('10');
  });

  it('limits class options to the selected programme', async () => {
    const foundation = courses.find((c) => c.classes.length === 3)!;
    renderWithRouter(<EnquiryForm course={foundation} endpoint="https://example.test" />);
    const options = Array.from((screen.getByLabelText(/student’s class/i) as HTMLSelectElement).options).map((o) => o.value);
    expect(options).toEqual(['', '6', '7', '8']);
    await waitFor(() => expect(screen.getByLabelText(/student’s class/i)).toHaveValue(''));
  });
});
