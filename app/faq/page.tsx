import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FAQInteractive from '@/components/faq/FAQInteractive';
import { getFaqs } from '@/app/actions/faqs';

export const revalidate = 60;

export default async function FAQPage() {
  const faqs = await getFaqs(true);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Header />
      <FAQInteractive initialFaqs={faqs} />
      <Footer />
    </div>
  );
}
