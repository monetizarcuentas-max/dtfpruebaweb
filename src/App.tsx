import React, { useState, useEffect } from 'react';
import { 
  Printer, 
  Layers, 
  Zap, 
  Users, 
  MapPin, 
  Phone, 
  Instagram, 
  Facebook, 
  ChevronRight, 
  CheckCircle2,
  Menu,
  X,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Calculator from './components/Calculator';
import logo from './logo.png';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isCalculator = location.pathname === '/cotizar';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '/#inicio' },
    { name: 'Servicios', href: '/#servicios' },
    { name: 'Ventajas', href: '/#ventajas' },
    { name: 'Contacto', href: '/#contacto' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/80 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <img src={logo} alt="DTF Venado Logo" className="h-10 w-auto" />
          <span className="text-2xl font-black tracking-tighter group-hover:text-brand-accent transition-colors">
            DTF <span className="text-brand-accent">VENADO</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {!isCalculator && navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-sm font-bold uppercase tracking-widest hover:text-brand-accent transition-colors"
            >
              {link.name}
            </a>
          ))}
          <Link 
            to="/cotizar" 
            className={`px-6 py-2 rounded-full font-bold transition-all ${
              isCalculator 
                ? 'bg-zinc-100 text-zinc-400 cursor-not-allowed' 
                : 'bg-brand-accent text-white hover:bg-brand-accent/90 shadow-lg shadow-brand-accent/20'
            }`}
          >
            Cotizar
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-zinc-900"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-zinc-100 overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {!isCalculator && navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-xl font-bold"
                >
                  {link.name}
                </a>
              ))}
              <Link 
                to="/cotizar"
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-brand-accent text-white p-4 rounded-2xl text-center font-bold"
              >
                Cotizar Ahora
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const tryImages = ["/portada.png", "/portada.jpg", "/public/portada.png", "/src/portada.png"];
  const [imageIndex, setImageIndex] = useState(0);
  const fallbackImage = "https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=800";

  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-zinc-50 -z-10 rounded-l-[100px] hidden lg:block" />
      
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-accent/10 text-brand-accent rounded-full text-xs font-bold uppercase tracking-wider mb-6">
            <Zap size={14} />
            Tecnología de Vanguardia
          </div>
          <h1 className="text-5xl md:text-7xl font-bold leading-[0.9] mb-6">
            Tu creatividad, <br />
            <span className="text-brand-accent">nuestra tecnología.</span>
          </h1>
          <p className="text-lg text-zinc-600 mb-8 max-w-lg">
            Especialistas en impresión y estampado de alta calidad. Soluciones personalizadas en DTF textil y DTF UV para empresas, diseñadores y emprendedores.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#servicios" className="btn-primary flex items-center gap-2">
              Ver Servicios <ArrowRight size={18} />
            </a>
            <Link to="/cotizar" className="btn-secondary">
              Cotizar Ahora
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl bg-zinc-100">
            <img 
              src={imageIndex < tryImages.length ? tryImages[imageIndex] : fallbackImage} 
              alt="Spider-Man DTF Venado" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              onError={() => {
                if (imageIndex < tryImages.length) {
                  setImageIndex(imageIndex + 1);
                }
              }}
            />
          </div>
          <div className="absolute -bottom-6 -left-6 glass p-6 rounded-2xl shadow-lg max-w-[200px]">
            <p className="text-sm font-bold mb-1">Calidad Premium</p>
            <p className="text-xs text-zinc-500">Colores vibrantes y máxima durabilidad en cada impresión.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    {
      title: "Impresión DTF Textil",
      desc: "Ideal para prendas, merchandising, uniformes y artículos personalizados.",
      icon: <Printer className="text-brand-accent" size={32} />,
      image: "/servicio-1.png",
      fallback: "https://picsum.photos/seed/tshirt-print/600/400"
    },
    {
      title: "Impresión DTF UV",
      desc: "Impresión directa sobre superficies rígidas como botellas, mates, acrílicos y más.",
      icon: <Layers className="text-brand-accent" size={32} />,
      image: "/servicio-2.png",
      fallback: "https://picsum.photos/seed/uv-printing/600/400"
    },
    {
      title: "Estampado y Aplicación",
      desc: "Asesoramiento en materiales, temperaturas y técnicas de transferencia.",
      icon: <Zap className="text-brand-accent" size={32} />,
      image: "/servicio-3.png",
      fallback: "https://picsum.photos/seed/heat-press/600/400"
    },
    {
      title: "Venta de Sustratos",
      desc: "Amplia variedad de productos listos para personalizar: mates, botellas, tazas.",
      icon: <Users className="text-brand-accent" size={32} />,
      image: "/servicio-4.png",
      fallback: "https://picsum.photos/seed/sublimation-products/600/400"
    }
  ];

  return (
    <section id="servicios" className="py-24 bg-zinc-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Nuestros Servicios</h2>
          <p className="text-zinc-600 max-w-2xl mx-auto">
            Ofrecemos soluciones integrales de personalización utilizando la tecnología más avanzada del mercado.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-zinc-100 flex flex-col h-full"
            >
              <div className="mb-6">{service.icon}</div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-zinc-600 text-sm mb-6 flex-grow">{service.desc}</p>
              <div className="rounded-xl overflow-hidden h-32">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = service.fallback;
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Advantages = () => {
  const advantages = [
    "Sin pedido mínimo: desde una sola unidad",
    "Colores intensos y duraderos",
    "Amplia variedad de materiales y formatos",
    "Atención personalizada y asesoramiento técnico",
    "Producción ágil y entregas seguras"
  ];

  return (
    <section id="ventajas" className="py-24">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div className="order-2 lg:order-1">
          <div className="aspect-video rounded-3xl overflow-hidden shadow-xl">
            <img 
              src="/taller.png" 
              alt="Nuestro Taller" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://picsum.photos/seed/dtf-workshop/800/600";
              }}
            />
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">¿Por qué elegir <span className="text-brand-accent">DTF Venado</span>?</h2>
          <div className="space-y-4">
            {advantages.map((adv, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircle2 className="text-brand-accent mt-1 shrink-0" size={20} />
                <p className="text-lg text-zinc-700">{adv}</p>
              </div>
            ))}
          </div>
          <Link to="/cotizar" className="btn-primary mt-10 inline-block">
            Cotizar Ahora
          </Link>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contacto" className="py-24 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-12">Estamos en Venado Tuerto</h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-12">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center">
                <MapPin size={32} className="text-brand-accent" />
              </div>
              <div className="text-center">
                <p className="text-zinc-400 text-sm uppercase font-bold tracking-widest mb-1">Ubicación</p>
                <p className="text-lg">Rodríguez Peña 120<br />Venado Tuerto, Santa Fe</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center">
                <Phone size={32} className="text-brand-accent" />
              </div>
              <div className="text-center">
                <p className="text-zinc-400 text-sm uppercase font-bold tracking-widest mb-1">WhatsApp</p>
                <p className="text-lg">+54 9 3462 XXX-XXX</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 border-t border-zinc-100">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2">
          <img src={logo} alt="DTF Venado Logo" className="h-8 w-auto" />
          <span className="text-xl font-black tracking-tighter">
            DTF <span className="text-brand-accent">VENADO</span>
          </span>
        </div>
        
        <div className="flex gap-6">
          <a href="#" className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center hover:bg-brand-accent hover:text-white hover:border-brand-accent transition-all">
            <Instagram size={20} />
          </a>
          <a href="#" className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center hover:bg-brand-accent hover:text-white hover:border-brand-accent transition-all">
            <Facebook size={20} />
          </a>
        </div>

        <p className="text-zinc-500 text-sm">
          © {new Date().getFullYear()} DTF Venado. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white text-zinc-900 selection:bg-brand-accent selection:text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Services />
              <Advantages />
              <Contact />
              <Footer />
            </>
          } />
          <Route path="/cotizar" element={<Calculator />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
