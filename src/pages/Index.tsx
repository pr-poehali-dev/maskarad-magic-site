import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const SHOP_IMG   = "https://cdn.poehali.dev/projects/e01f95c6-fc8f-4d8d-8bca-5cf55eb0792e/bucket/94b1a99b-8033-402d-a308-1dc3fc8bde9d.jpg";
const FANS_IMG   = "https://cdn.poehali.dev/projects/e01f95c6-fc8f-4d8d-8bca-5cf55eb0792e/bucket/d4058e44-58d4-4a0b-9fad-e51907dd14c4.jpg";
const FESTIVAL_IMG = "https://cdn.poehali.dev/projects/e01f95c6-fc8f-4d8d-8bca-5cf55eb0792e/bucket/5f816800-1881-4360-82ea-aa86b5cb1520.jpg";
const KIDS_IMG   = "https://cdn.poehali.dev/projects/e01f95c6-fc8f-4d8d-8bca-5cf55eb0792e/bucket/c12c2e20-6d28-4b10-896f-6f04b1f0fc9e.jpg";
const DANCE_IMG  = "https://cdn.poehali.dev/projects/e01f95c6-fc8f-4d8d-8bca-5cf55eb0792e/bucket/970a0b77-d821-44bd-bcf1-b3112b9afee3.jpg";

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setInView(true);
    }, { threshold });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function BirchDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-5">
      <div className="h-px w-12 bg-gradient-to-r from-transparent to-[hsl(43,55%,60%)]" />
      <span className="text-[hsl(355,60%,45%)] text-sm select-none">✦</span>
      <span className="text-[hsl(100,25%,45%)] text-sm select-none">🌿</span>
      <span className="text-[hsl(355,60%,45%)] text-sm select-none">✦</span>
      <div className="h-px w-12 bg-gradient-to-l from-transparent to-[hsl(43,55%,60%)]" />
    </div>
  );
}

function SectionTitle({ label, title, subtitle }: { label: string; title: string; subtitle?: string }) {
  return (
    <div className="text-center mb-14">
      <span className="inline-block text-xs font-semibold tracking-[0.35em] uppercase text-[hsl(355,60%,45%)] mb-3">
        {label}
      </span>
      <h2 className="font-cormorant text-4xl md:text-5xl font-semibold text-foreground leading-tight mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-muted-foreground text-base max-w-xl mx-auto leading-relaxed">{subtitle}</p>
      )}
      <BirchDivider />
    </div>
  );
}

const navLinks = [
  { href: "#services", label: "Услуги" },
  { href: "#gallery",  label: "Галерея" },
  { href: "#about",    label: "О нас" },
  { href: "#process",  label: "Как заказать" },
  { href: "#reviews",  label: "Отзывы" },
  { href: "#delivery", label: "Доставка" },
  { href: "#contacts", label: "Контакты" },
];

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const services = useInView();
  const gallery  = useInView();
  const about    = useInView();
  const process  = useInView();
  const reviews  = useInView();
  const delivery = useInView();
  const contacts = useInView();

  return (
    <div className="min-h-screen font-golos ornament-bg">

      {/* NAV */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[hsl(45,30%,98%)]/95 backdrop-blur-md shadow-sm border-b border-[hsl(40,20%,84%)]"
          : "bg-[hsl(45,30%,98%)]/80 backdrop-blur-sm"
      }`}>
        <div className="h-1 w-full bg-gradient-to-r from-[hsl(355,60%,45%)] via-[hsl(43,60%,52%)] to-[hsl(100,25%,40%)]" />
        <div className="container max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 font-cormorant text-xl font-semibold text-foreground tracking-wide">
            <span className="text-[hsl(100,25%,40%)]">🌿</span>
            Маскарадный <span className="gold-text ml-1">Бум</span>
          </a>
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((l) => (
              <button key={l.href} onClick={() => scrollTo(l.href)}
                className="text-sm text-foreground/65 hover:text-[hsl(20,45%,35%)] transition-colors duration-200 font-medium">
                {l.label}
              </button>
            ))}
          </nav>
          <div className="hidden lg:flex items-center">
            <button onClick={() => scrollTo("#contacts")}
              className="btn-primary px-5 py-2 rounded-sm text-sm font-semibold tracking-wide">
              Заказать костюм
            </button>
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden text-foreground">
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>
        {menuOpen && (
          <div className="lg:hidden bg-[hsl(45,30%,98%)] border-t border-[hsl(40,20%,84%)] px-4 pb-5 pt-2">
            {navLinks.map((l) => (
              <button key={l.href} onClick={() => scrollTo(l.href)}
                className="block w-full text-left py-3 text-foreground/75 hover:text-[hsl(20,45%,35%)] border-b border-[hsl(40,20%,84%)]/60 last:border-0 font-medium">
                {l.label}
              </button>
            ))}
            <button onClick={() => scrollTo("#contacts")}
              className="mt-4 w-full btn-primary px-5 py-3 rounded-sm text-sm font-semibold text-center tracking-wide">
              Заказать костюм
            </button>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="hero-pattern min-h-screen flex items-center relative overflow-hidden pt-16">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-4 w-1 h-48 bg-gradient-to-b from-[hsl(40,15%,88%)] to-transparent rounded-full opacity-60" />
          <div className="absolute top-16 left-7 w-0.5 h-36 bg-gradient-to-b from-[hsl(40,15%,85%)] to-transparent rounded-full opacity-40" />
          <div className="absolute top-24 right-6 w-1 h-52 bg-gradient-to-b from-[hsl(40,15%,88%)] to-transparent rounded-full opacity-55" />
          <div className="absolute bottom-10 left-1/4 w-64 h-64 rounded-full bg-[hsl(100,30%,85%)]/12 blur-3xl animate-float" />
          <div className="absolute top-1/3 right-1/4 w-56 h-56 rounded-full bg-[hsl(43,60%,85%)]/15 blur-3xl animate-float delay-400" />
        </div>

        <div className="container max-w-7xl mx-auto px-4 py-20 grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/70 border border-[hsl(40,20%,82%)] rounded-sm px-4 py-1.5 mb-7 animate-fade-in">
              <span className="text-base">🌿</span>
              <span className="text-sm text-[hsl(20,45%,35%)] font-medium tracking-wide">ООО «Маскарадный Бум» · с 2005 года</span>
            </div>

            <h1 className="font-cormorant text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.08] text-foreground mb-7 animate-fade-in-up">
              Народные<br/>
              <span className="gold-text">костюмы</span><br/>
              <span className="text-[hsl(355,55%,42%)]">и кокошники</span>
            </h1>

            <p className="text-base text-foreground/65 leading-[1.8] mb-8 max-w-lg animate-fade-in-up delay-200">
              Фабрика русских народных костюмов. Шьём по индивидуальным меркам и продаём
              готовые изделия — от льняного сарафана до расшитого кокошника.
              Каждое изделие несёт тепло родной земли.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-300">
              <button onClick={() => scrollTo("#contacts")}
                className="btn-primary px-8 py-3.5 rounded-sm font-semibold text-base tracking-wide">
                Заказать костюм
              </button>
              <button onClick={() => scrollTo("#gallery")}
                className="px-8 py-3.5 rounded-sm font-semibold text-base border border-[hsl(20,45%,35%)] text-[hsl(20,45%,35%)] hover:bg-[hsl(20,45%,35%)]/6 transition-all duration-200 tracking-wide">
                Смотреть галерею
              </button>
            </div>

            <div className="flex items-center gap-6 mt-10 pt-8 border-t border-[hsl(40,20%,84%)] animate-fade-in-up delay-500">
              {[["500+", "костюмов создано"], ["20", "лет опыта"], ["100%", "ручная работа"]].map(([num, text]) => (
                <div key={num}>
                  <div className="font-cormorant text-3xl font-semibold gold-text">{num}</div>
                  <div className="text-xs text-muted-foreground mt-0.5 leading-snug">{text}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative animate-scale-in delay-200">
            <div className="grid grid-cols-2 gap-3">
              <div className="relative rounded-sm overflow-hidden shadow-xl col-span-2 h-60 border border-[hsl(40,20%,82%)]">
                <img src={FANS_IMG} alt="Народные костюмы" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(20,45%,20%)]/35 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <span className="bg-[hsl(45,30%,98%)]/90 text-[hsl(20,45%,35%)] text-xs font-semibold px-3 py-1.5 rounded-sm tracking-wide">
                    🌿 Готовые коллекции
                  </span>
                </div>
              </div>
              <div className="relative rounded-sm overflow-hidden shadow-lg h-44 border border-[hsl(40,20%,82%)]">
                <img src={FESTIVAL_IMG} alt="Фестиваль" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(20,45%,20%)]/30 via-transparent to-transparent" />
              </div>
              <div className="relative rounded-sm overflow-hidden shadow-lg h-44 border border-[hsl(40,20%,82%)]">
                <img src={KIDS_IMG} alt="Детские" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(355,55%,30%)]/35 via-transparent to-transparent" />
                <div className="absolute bottom-2 left-2">
                  <span className="text-white text-xs font-semibold drop-shadow">Детские костюмы</span>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-5 -left-5 bg-[hsl(45,30%,98%)] rounded-sm shadow-lg p-4 border border-[hsl(40,20%,82%)] animate-float">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-sm bg-[hsl(43,60%,52%)]/15 flex items-center justify-center text-lg">🧵</div>
                <div>
                  <div className="text-xs text-muted-foreground">Натуральные ткани</div>
                  <div className="text-sm font-semibold text-foreground">Лён · Хлопок · Шёлк</div>
                </div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 bg-[hsl(45,30%,98%)] rounded-sm shadow-lg p-3.5 border border-[hsl(40,20%,82%)] animate-float delay-300 text-center">
              <div className="font-cormorant text-2xl font-semibold text-foreground">5.0</div>
              <div className="flex justify-center gap-0.5 my-0.5">
                {Array.from({length:5}).map((_,i)=><span key={i} className="text-[hsl(43,60%,52%)] text-xs">★</span>)}
              </div>
              <div className="text-xs text-muted-foreground">оценка</div>
            </div>
          </div>
        </div>

        <button onClick={() => scrollTo("#services")}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-[hsl(20,45%,35%)] transition-colors animate-float">
          <span className="text-xs tracking-widest uppercase">Узнать больше</span>
          <Icon name="ChevronDown" size={18} />
        </button>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 bg-white" ref={services.ref}>
        <div className="container max-w-7xl mx-auto px-4">
          <div className={`transition-all duration-700 ${services.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <SectionTitle label="Что мы делаем" title="Наши услуги" subtitle="От льняного сарафана до расшитого кокошника — каждое изделие создаётся с любовью" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: "👗", title: "Народные костюмы",     desc: "Русские, украинские, белорусские и другие народные костюмы. Историческая точность и современный комфорт.",                            badge: "Популярное", bg: "bg-[hsl(38,35%,94%)]", border: "border-[hsl(40,25%,80%)]" },
              { icon: "👑", title: "Кокошники",             desc: "Традиционные и авторские кокошники для праздников, фотосессий, свадеб и выступлений. Жемчуг, вышивка, бисер.",                      badge: "Хит",        bg: "bg-[hsl(43,40%,95%)]", border: "border-[hsl(43,35%,80%)]" },
              { icon: "🎭", title: "Карнавальные костюмы", desc: "Яркие образы для маскарадов, утренников и корпоративных праздников. Детские и взрослые размеры.",                                    badge: null,         bg: "bg-[hsl(100,18%,95%)]", border: "border-[hsl(100,18%,80%)]" },
              { icon: "🌸", title: "Сценические костюмы",  desc: "Костюмы для ансамблей, театральных постановок и выступлений. Учитываем особенности сцены и движения.",                               badge: null,         bg: "bg-[hsl(355,25%,96%)]", border: "border-[hsl(355,25%,84%)]" },
              { icon: "💍", title: "Свадебные образы",      desc: "Стилизованные народные образы для невест и свадебной церемонии в русском стиле.",                                                    badge: null,         bg: "bg-[hsl(200,25%,95%)]", border: "border-[hsl(200,20%,82%)]" },
              { icon: "✂️", title: "Подгонка и ремонт",    desc: "Реставрация старых костюмов, подгонка по фигуре, восстановление вышивки и декора.",                                                   badge: null,         bg: "bg-[hsl(25,28%,95%)]", border: "border-[hsl(25,25%,82%)]" },
            ].map((s, i) => (
              <div key={i}
                className={`card-hover ${s.bg} rounded-sm p-6 border ${s.border} relative overflow-hidden transition-all duration-700 ${services.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${i * 90}ms` }}>
                {s.badge && (
                  <span className="absolute top-4 right-4 bg-[hsl(355,58%,45%)] text-white text-xs font-semibold px-2.5 py-1 rounded-sm">
                    {s.badge}
                  </span>
                )}
                <div className="text-3xl mb-4">{s.icon}</div>
                <h3 className="font-cormorant text-xl font-semibold text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-24 bg-[hsl(38,25%,94%)]" ref={gallery.ref}>
        <div className="container max-w-7xl mx-auto px-4">
          <div className={`transition-all duration-700 ${gallery.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <SectionTitle label="Готовые работы" title="Галерея коллекций" subtitle="Каждый костюм — отдельная история земли и традиции" />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { img: FANS_IMG,     title: "Болельщики в народном стиле", tag: "Праздник" },
              { img: FESTIVAL_IMG, title: "Ансамбль на фестивале",        tag: "Фестиваль" },
              { img: KIDS_IMG,     title: "Детские народные костюмы",     tag: "Детские" },
              { img: DANCE_IMG,    title: "Танцевальный ансамбль",        tag: "Сценические" },
              { img: SHOP_IMG,     title: "Наш салон-магазин",            tag: "Магазин" },
              { img: FESTIVAL_IMG, title: "Русские народные сарафаны",    tag: "Народные" },
            ].map((item, i) => (
              <div key={i}
                className={`group relative rounded-sm overflow-hidden shadow-md card-hover cursor-pointer border border-[hsl(40,20%,80%)] transition-all duration-700 ${gallery.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${i * 80}ms` }}>
                <img src={item.img} alt={item.title} className="w-full h-48 md:h-64 object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(20,45%,15%)]/65 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-2.5 left-2.5">
                  <span className="bg-[hsl(45,30%,98%)]/88 text-[hsl(20,45%,35%)] text-xs font-semibold px-2.5 py-1 rounded-sm tracking-wide">{item.tag}</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-3 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                  <p className="text-white text-sm font-medium">{item.title}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <button onClick={() => scrollTo("#contacts")}
              className="btn-primary px-8 py-3.5 rounded-sm font-semibold tracking-wide">
              Хочу такой костюм
            </button>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 bg-white" ref={about.ref}>
        <div className="container max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className={`relative transition-all duration-700 ${about.inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
              <div className="relative rounded-sm overflow-hidden shadow-xl border border-[hsl(40,20%,80%)]">
                <img src={SHOP_IMG} alt="Наш магазин" className="w-full h-[460px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(20,45%,20%)]/20 via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white rounded-sm shadow-lg p-5 border border-[hsl(40,20%,80%)]">
                <div className="font-cormorant text-4xl font-bold gold-text">20+</div>
                <div className="text-sm text-muted-foreground mt-1 leading-snug">лет создаём<br/>чудеса</div>
              </div>
              <div className="absolute -top-5 -left-5 bg-[hsl(355,58%,45%)] text-white rounded-sm shadow-lg p-4">
                <div className="font-cormorant text-3xl font-bold">500+</div>
                <div className="text-xs mt-0.5 text-white/80 leading-snug">костюмов<br/>в наличии</div>
              </div>
            </div>

            <div className={`transition-all duration-700 delay-200 ${about.inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
              <span className="inline-block text-xs font-semibold tracking-[0.35em] uppercase text-[hsl(355,58%,45%)] mb-3">О нас</span>
              <h2 className="font-cormorant text-4xl md:text-5xl font-semibold text-foreground leading-tight mb-2">Мастерская</h2>
              <h2 className="font-cormorant text-4xl md:text-5xl font-semibold leading-tight mb-6">
                <span className="gold-text">«Маскарадный Бум»</span>
              </h2>
              <p className="text-foreground/65 leading-[1.85] mb-4 text-sm">
                Наша фабрика основана в 2005 году с одной простой мечтой — вернуть людям
                радость от настоящих народных костюмов. Мы убеждены: каждый человек достоин
                почувствовать себя частью великой культурной традиции.
              </p>
              <p className="text-foreground/65 leading-[1.85] mb-8 text-sm">
                За двадцать лет мы создали более 500 уникальных изделий. Наши мастерицы —
                профессионалы с многолетним опытом, влюблённые в своё дело. Только натуральные
                ткани, исторические традиции и современный комфорт.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: "🌾", text: "Натуральный лён и хлопок" },
                  { icon: "📐", text: "Индивидуальные мерки" },
                  { icon: "🎨", text: "Авторские эскизы" },
                  { icon: "🌿", text: "Ручная вышивка" },
                ].map((f, i) => (
                  <div key={i} className="flex items-start gap-3 bg-[hsl(38,35%,94%)] border border-[hsl(40,25%,82%)] rounded-sm p-3">
                    <span className="text-lg">{f.icon}</span>
                    <span className="text-sm text-foreground/75 leading-tight">{f.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="py-24 bg-[hsl(38,25%,94%)]" ref={process.ref}>
        <div className="container max-w-7xl mx-auto px-4">
          <div className={`transition-all duration-700 ${process.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <SectionTitle label="Как мы работаем" title="Путь от мечты до костюма" subtitle="Прозрачно, комфортно и без лишних слов — как на ярмарке в добрые времена" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 relative">
            <div className="hidden lg:block absolute top-[2.2rem] left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-[hsl(355,55%,55%)]/30 via-[hsl(43,60%,55%)] to-[hsl(355,55%,55%)]/30" />
            {[
              { icon: "💬", title: "Консультация",     desc: "Обсуждаем образ, пожелания и бюджет. Помогаем выбрать стиль и материалы." },
              { icon: "📋", title: "Эскиз и замеры",   desc: "Создаём индивидуальный эскиз, снимаем мерки для идеальной посадки." },
              { icon: "🧵", title: "Создание",          desc: "Мастерицы шьют и вышивают ваш костюм с любовью, соблюдая каждую деталь." },
              { icon: "✨", title: "Примерка и выдача", desc: "Примеряете костюм, вносим правки при необходимости. Упаковываем с заботой." },
            ].map((p, i) => (
              <div key={i}
                className={`relative transition-all duration-700 ${process.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${i * 110}ms` }}>
                <div className="bg-white rounded-sm p-6 shadow-sm border border-[hsl(40,20%,82%)] text-center card-hover">
                  <div className="relative inline-flex items-center justify-center w-16 h-16 bg-[hsl(38,35%,93%)] border border-[hsl(40,25%,80%)] rounded-sm mb-4">
                    <span className="text-2xl">{p.icon}</span>
                    <span className="absolute -top-2 -right-2 w-6 h-6 bg-[hsl(355,58%,45%)] rounded-sm flex items-center justify-center text-white text-xs font-bold">{i + 1}</span>
                  </div>
                  <h3 className="font-cormorant text-xl font-semibold text-foreground mb-2">{p.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className={`text-center mt-12 transition-all duration-700 delay-500 ${process.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <button onClick={() => scrollTo("#contacts")}
              className="btn-primary px-10 py-4 rounded-sm font-semibold text-base tracking-wide">
              Начать заказ
            </button>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-24 bg-white" ref={reviews.ref}>
        <div className="container max-w-7xl mx-auto px-4">
          <div className={`transition-all duration-700 ${reviews.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <SectionTitle label="Отзывы" title="Слова благодарности" subtitle="Более 500 довольных заказчиков по всей России" />
          </div>
          <div className="grid md:grid-cols-2 gap-5 mb-8">
            {[
              { img: KIDS_IMG,  name: "Ирина С.", city: "Екатеринбург",   text: "Брала сарафан для дочки на утренник. Качество потрясающее, ткань натуральная — ребёнок был самым красивым!" },
              { img: DANCE_IMG, name: "Елена М.", city: "Санкт-Петербург", text: "Делали народные костюмы для целого ансамбля — 12 штук. Все изготовлены идеально, в срок, с учётом всех пожеланий!" },
            ].map((r, i) => (
              <div key={i}
                className={`relative rounded-sm overflow-hidden shadow-lg border border-[hsl(40,20%,80%)] card-hover transition-all duration-700 ${reviews.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${i * 150}ms` }}>
                <img src={r.img} alt={r.name} className="w-full h-60 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(20,45%,12%)]/75 via-[hsl(20,45%,12%)]/15 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="flex gap-0.5 mb-2">{Array.from({length:5}).map((_,j)=><span key={j} className="text-[hsl(43,65%,58%)]">★</span>)}</div>
                  <p className="text-white/90 text-sm leading-relaxed mb-3 italic">«{r.text}»</p>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-sm bg-[hsl(43,60%,52%)] flex items-center justify-center text-white font-semibold text-sm font-cormorant">{r.name[0]}</div>
                    <div>
                      <div className="text-white text-sm font-semibold">{r.name}</div>
                      <div className="text-white/60 text-xs">{r.city}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { name: "Анна К.",    city: "Москва",         text: "Заказывала кокошник на свадьбу. Результат превзошёл все ожидания! Настоящая ручная работа, всё вышито жемчугом.", date: "Март 2024",    bg: "bg-[hsl(38,35%,95%)] border-[hsl(40,25%,82%)]" },
              { name: "Татьяна Р.", city: "Казань",         text: "Обратились для корпоратива в русском стиле. Восемь костюмов — все разные, все шикарные. Коллеги в восторге!",    date: "Декабрь 2023", bg: "bg-[hsl(43,40%,96%)] border-[hsl(43,30%,82%)]" },
              { name: "Наталья П.", city: "Ростов-на-Дону", text: "Красивый кокошник на Новый год. Доставка быстрая, упаковка бережная. Спасибо за душу в каждом изделии!",        date: "Октябрь 2023", bg: "bg-[hsl(100,15%,95%)] border-[hsl(100,15%,82%)]" },
            ].map((r, i) => (
              <div key={i}
                className={`${r.bg} rounded-sm p-6 border card-hover transition-all duration-700 ${reviews.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="flex gap-0.5 mb-3">{Array.from({length:5}).map((_,j)=><span key={j} className="text-[hsl(43,60%,52%)] text-sm">★</span>)}</div>
                <p className="text-sm text-foreground/70 leading-[1.8] mb-4 italic">«{r.text}»</p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-foreground">{r.name}</div>
                    <div className="text-xs text-muted-foreground">{r.city}</div>
                  </div>
                  <div className="text-xs text-muted-foreground">{r.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DELIVERY */}
      <section id="delivery" className="py-24 bg-[hsl(38,25%,94%)]" ref={delivery.ref}>
        <div className="container max-w-7xl mx-auto px-4">
          <div className={`transition-all duration-700 ${delivery.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <SectionTitle label="Доставка" title="Доставляем по всей России" subtitle="Бережно упакуем и отправим ваш заказ любым удобным способом" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {[
              { icon: "🏪", title: "Самовывоз",    desc: "Заберите заказ лично из нашей мастерской. Примерка на месте.",              tag: "Бесплатно",   bg: "bg-white border-[hsl(100,18%,78%)]" },
              { icon: "📦", title: "СДЭК",          desc: "Доставка в любой город России. Отслеживание посылки онлайн.",               tag: "2–5 дней",    bg: "bg-white border-[hsl(200,25%,78%)]" },
              { icon: "🚚", title: "Почта России",  desc: "Доставка по всей стране, включая отдалённые регионы.",                      tag: "5–14 дней",   bg: "bg-white border-[hsl(40,25%,78%)]" },
              { icon: "⚡", title: "Экспресс",      desc: "Срочная доставка курьером по городу. Идеально для мероприятий.",            tag: "День в день", bg: "bg-white border-[hsl(355,30%,78%)]" },
            ].map((d, i) => (
              <div key={i}
                className={`${d.bg} rounded-sm p-6 border text-center card-hover transition-all duration-700 ${delivery.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${i * 90}ms` }}>
                <div className="text-3xl mb-3">{d.icon}</div>
                <span className="inline-block bg-[hsl(38,35%,93%)] text-[hsl(20,45%,35%)] text-xs font-semibold px-2.5 py-1 rounded-sm mb-3 border border-[hsl(40,25%,80%)]">{d.tag}</span>
                <h3 className="font-cormorant text-xl font-semibold text-foreground mb-2">{d.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{d.desc}</p>
              </div>
            ))}
          </div>
          <div className={`bg-white rounded-sm p-6 border border-[hsl(43,35%,78%)] shadow-sm flex flex-col md:flex-row gap-6 items-start md:items-center justify-between transition-all duration-700 delay-400 ${delivery.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            {[
              { icon: "🎁", title: "Упаковка в подарок",  desc: "Каждый заказ упакуем в красивую коробку с тканевой лентой." },
              { icon: "🔄", title: "Возврат и обмен",      desc: "Если что-то не так — поправим бесплатно. Ваше удовлетворение — приоритет." },
              { icon: "💳", title: "Удобная оплата",       desc: "Наличные, карта, перевод. Предоплата 50%, остаток при получении." },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <h4 className="font-cormorant text-lg font-semibold text-foreground mb-1">{item.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 bg-white" ref={contacts.ref}>
        <div className="container max-w-7xl mx-auto px-4">
          <div className={`transition-all duration-700 ${contacts.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <SectionTitle label="Связаться с нами" title="Оставить заявку" subtitle="Напишите нам — ответим в течение часа и поможем воплотить ваш образ" />
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className={`transition-all duration-700 delay-200 ${contacts.inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
              <form className="bg-[hsl(38,35%,95%)] rounded-sm p-8 border border-[hsl(40,25%,82%)] shadow-sm" onSubmit={(e) => e.preventDefault()}>
                <h3 className="font-cormorant text-2xl font-semibold text-foreground mb-6">Заявка на костюм</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-foreground/65 mb-1.5 block">Ваше имя *</label>
                    <input type="text" placeholder="Введите имя"
                      className="w-full bg-white border border-[hsl(40,25%,78%)] rounded-sm px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(20,45%,35%)]/20 focus:border-[hsl(20,45%,35%)]/50 transition-all" />
                  </div>
                  <div>
                    <label className="text-sm text-foreground/65 mb-1.5 block">Телефон *</label>
                    <input type="tel" placeholder="+7 (___) ___-__-__"
                      className="w-full bg-white border border-[hsl(40,25%,78%)] rounded-sm px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(20,45%,35%)]/20 focus:border-[hsl(20,45%,35%)]/50 transition-all" />
                  </div>
                  <div>
                    <label className="text-sm text-foreground/65 mb-1.5 block">Тип заказа</label>
                    <select className="w-full bg-white border border-[hsl(40,25%,78%)] rounded-sm px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(20,45%,35%)]/20 focus:border-[hsl(20,45%,35%)]/50 transition-all text-foreground/75">
                      <option value="">Выберите тип</option>
                      <option>Народный костюм</option>
                      <option>Кокошник</option>
                      <option>Карнавальный костюм</option>
                      <option>Сценический костюм</option>
                      <option>Свадебный образ</option>
                      <option>Другое</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm text-foreground/65 mb-1.5 block">Расскажите о своём заказе</label>
                    <textarea rows={4} placeholder="Опишите желаемый образ, размеры, сроки..."
                      className="w-full bg-white border border-[hsl(40,25%,78%)] rounded-sm px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(20,45%,35%)]/20 focus:border-[hsl(20,45%,35%)]/50 transition-all resize-none" />
                  </div>
                  <button type="submit"
                    className="w-full btn-primary py-4 rounded-sm font-semibold text-base tracking-wide">
                    Отправить заявку
                  </button>
                  <p className="text-xs text-muted-foreground text-center">
                    Нажимая кнопку, вы соглашаетесь на обработку персональных данных
                  </p>
                </div>
              </form>
            </div>

            <div className={`space-y-5 transition-all duration-700 delay-300 ${contacts.inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
              <div className="bg-[hsl(38,35%,95%)] rounded-sm p-6 border border-[hsl(40,25%,82%)]">
                <h3 className="font-cormorant text-2xl font-semibold text-foreground mb-5">Контакты мастерской</h3>
                <div className="space-y-4">
                  {[
                    { icon: "Phone",  label: "Телефон",          value: "+7 (xxx) xxx-xx-xx",          href: "tel:+7xxxxxxxxxx" },
                    { icon: "Globe",  label: "Сайт",             value: "maskaradboom.ru",              href: "https://maskaradboom.ru" },
                    { icon: "MapPin", label: "Адрес мастерской", value: "Москва, ул. Примерная, д. 1", href: "#" },
                    { icon: "Clock",  label: "Режим работы",     value: "Пн–Сб: 10:00–19:00",          href: "#" },
                  ].map((c, i) => (
                    <a key={i} href={c.href}
                      className="flex items-start gap-4 group hover:bg-white rounded-sm p-3 -mx-3 transition-colors duration-200">
                      <div className="w-10 h-10 bg-[hsl(20,45%,35%)]/10 rounded-sm flex items-center justify-center flex-shrink-0 group-hover:bg-[hsl(20,45%,35%)]/18 transition-colors">
                        <Icon name={c.icon} size={17} className="text-[hsl(20,45%,35%)]" />
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">{c.label}</div>
                        <div className="text-sm font-semibold text-foreground">{c.value}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-sm p-6 border border-[hsl(40,25%,82%)] shadow-sm">
                <h4 className="font-cormorant text-xl font-semibold text-foreground mb-4">Мы в мессенджерах</h4>
                <div className="flex flex-col gap-3">
                  {[
                    { name: "WhatsApp",  icon: "MessageCircle", cls: "bg-green-50  text-green-800  border-green-200  hover:bg-green-100" },
                    { name: "Telegram",  icon: "Send",          cls: "bg-sky-50    text-sky-800    border-sky-200    hover:bg-sky-100" },
                    { name: "ВКонтакте", icon: "Users",         cls: "bg-indigo-50 text-indigo-800 border-indigo-200 hover:bg-indigo-100" },
                  ].map((m, i) => (
                    <button key={i}
                      className={`flex items-center gap-3 px-4 py-3 rounded-sm border text-sm font-medium transition-colors duration-200 ${m.cls}`}>
                      <Icon name={m.icon} size={17} />
                      Написать в {m.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[hsl(25,28%,18%)] text-white py-12">
        <div className="h-1 w-full bg-gradient-to-r from-[hsl(355,60%,45%)] via-[hsl(43,60%,52%)] to-[hsl(100,25%,40%)] mb-12" />
        <div className="container max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="font-cormorant text-2xl font-semibold mb-1 flex items-center gap-2">
                <span className="text-[hsl(100,30%,60%)]">🌿</span>
                Маскарадный <span className="gold-text ml-1">Бум</span>
              </div>
              <p className="text-xs text-white/40 mb-3">ООО «Маскарадный Бум»</p>
              <p className="text-sm text-white/55 leading-relaxed">
                Фабрика русских народных костюмов. Ручная работа с 2005 года.
              </p>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-white/35 mb-4">Навигация</h4>
              <div className="space-y-2">
                {navLinks.map((l) => (
                  <button key={l.href} onClick={() => scrollTo(l.href)}
                    className="block text-sm text-white/55 hover:text-white transition-colors">
                    {l.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-white/35 mb-4">Контакты</h4>
              <div className="space-y-2 text-sm text-white/55">
                <div>📞 +7 (xxx) xxx-xx-xx</div>
                <div>🌐 maskaradboom.ru</div>
                <div>⏰ Пн–Сб: 10:00–19:00</div>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-xs text-white/30">© 2005–2026 ООО «Маскарадный Бум». Все права защищены.</p>
            <p className="text-xs text-white/30 italic">Матушка-земля · Белая берёзонька · Ручная работа</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
