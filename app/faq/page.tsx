import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FAQInteractive from '@/components/faq/FAQInteractive';

export const metadata = {
  title: 'Frequently Asked Questions | Delft Tours',
  description: 'Find answers to common questions about booking, travel logistics, and our services.',
};

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Header />
      <FAQInteractive />
      <Footer />
    </div>
  );
}
