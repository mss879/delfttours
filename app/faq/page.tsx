import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FAQInteractive from '@/components/faq/FAQInteractive';



export default function FAQPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Header />
      <FAQInteractive />
      <Footer />
    </div>
  );
}
