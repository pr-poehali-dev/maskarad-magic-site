import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

const IMG_HERO    = "https://cdn.poehali.dev/projects/e01f95c6-fc8f-4d8d-8bca-5cf55eb0792e/files/3d20efc7-3449-4b64-9e9d-ae89e7efa6fc.jpg";
const IMG_WOMAN   = "https://cdn.poehali.dev/projects/e01f95c6-fc8f-4d8d-8bca-5cf55eb0792e/files/62292b15-bf8d-479d-a56f-11f1ab62fbe5.jpg";
const IMG_MAN     = "https://cdn.poehali.dev/projects/e01f95c6-fc8f-4d8d-8bca-5cf55eb0792e/files/c1fb8a24-252b-4809-a746-742e0531b838.jpg";
const IMG_GIRL    = "https://cdn.poehali.dev/projects/e01f95c6-fc8f-4d8d-8bca-5cf55eb0792e/files/992711b8-3cce-409f-9508-b764aba6bf16.jpg";
const IMG_KOKOSH  = "https://cdn.poehali.dev/projects/e01f95c6-fc8f-4d8d-8bca-5cf55eb0792e/files/9db05b9e-f7bf-4237-a0bf-dfd95f790d30.jpg";

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ── Декоративная SVG-ветвь (хохлома) ─────────────────────────── */
function Branch({ side }: { side: "left" | "right" }) {
  const flip = side === "right" ? "scale(-1,1)" : "";
  return (
    <svg viewBox="0 0 120 400" xmlns="http://www.w3.org/2000/svg"
      className="absolute top-0 h-full w-24 md:w-36 pointer-events-none select-none opacity-90"
      style={{ [side]: 0 }}>
      <g transform={flip} transform-origin="60 200">
        {/* main stem */}
        <path d="M60 10 C55 80 70 150 58 200 C46 250 65 320 60 390"
          stroke="#C9A227" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        {/* big leaves */}
        <ellipse cx="38" cy="70" rx="18" ry="9" fill="#C9A227" transform="rotate(-30 38 70)"/>
        <ellipse cx="78" cy="120" rx="16" ry="8" fill="#C9A227" transform="rotate(25 78 120)"/>
        <ellipse cx="35" cy="175" rx="20" ry="9" fill="#C9A227" transform="rotate(-20 35 175)"/>
        <ellipse cx="80" cy="230" rx="17" ry="8" fill="#C9A227" transform="rotate(30 80 230)"/>
        <ellipse cx="36" cy="290" rx="19" ry="8" fill="#C9A227" transform="rotate(-25 36 290)"/>
        <ellipse cx="78" cy="345" rx="16" ry="8" fill="#C9A227" transform="rotate(20 78 345)"/>
        {/* small berries */}
        <circle cx="30" cy="55" r="6" fill="#CC2222"/>
        <circle cx="22" cy="48" r="4.5" fill="#CC2222"/>
        <circle cx="36" cy="44" r="4" fill="#CC2222"/>
        <circle cx="82" cy="105" r="6" fill="#CC2222"/>
        <circle cx="90" cy="98" r="4.5" fill="#CC2222"/>
        <circle cx="76" cy="97" r="4" fill="#CC2222"/>
        <circle cx="28" cy="260" r="6" fill="#CC2222"/>
        <circle cx="20" cy="253" r="4.5" fill="#CC2222"/>
        <circle cx="34" cy="252" r="4" fill="#CC2222"/>
        <circle cx="84" cy="315" r="6" fill="#CC2222"/>
        <circle cx="92" cy="308" r="4.5" fill="#CC2222"/>
        {/* tiny leaf tips */}
        <ellipse cx="26" cy="68" rx="8" ry="4" fill="#B8911E" transform="rotate(-45 26 68)" opacity=".8"/>
        <ellipse cx="84" cy="130" rx="8" ry="4" fill="#B8911E" transform="rotate(45 84 130)" opacity=".8"/>
        <ellipse cx="26" cy="192" rx="8" ry="4" fill="#B8911E" transform="rotate(-40 26 192)" opacity=".8"/>
        <ellipse cx="86" cy="244" rx="8" ry="4" fill="#B8911E" transform="rotate(40 86 244)" opacity=".8"/>
        <ellipse cx="28" cy="300" rx="8" ry="4" fill="#B8911E" transform="rotate(-35 28 300)" opacity=".8"/>
      </g>
    </svg>
  );
}

/* ── Декоративный разделитель ───────────────────────────────────── */
function GoldDivider({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-4 justify-center mb-10">
      <div className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-transparent to-[#C9A227]" />
      <div className="flex items-center gap-3">
        <span className="text-[#C9A227] text-lg">❧</span>
        <h2 className="font-cormorant text-3xl md:text-4xl font-semibold text-white tracking-wide">{title}</h2>
        <span className="text-[#C9A227] text-lg scale-x-[-1] inline-block">❧</span>
      </div>
      <div className="h-px flex-1 max-w-[120px] bg-gradient-to-l from-transparent to-[#C9A227]" />
    </div>
  );
}

/* ── Карточка коллекции ─────────────────────────────────────────── */
function CollectionCard({ img, title, delay, inView }: { img: string; title: string; delay: number; inView: boolean }) {
  return (
    <div className={`group relative overflow-hidden rounded-xl border border-[#C9A227]/40 cursor-pointer transition-all duration-700 hover:border-[#C9A227] hover:shadow-[0_0_30px_rgba(201,162,39,0.25)]`}
      style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(40px)", transition: `opacity .7s ease ${delay}ms, transform .7s ease ${delay}ms` }}>
      {/* gold corner ornaments */}
      <span className="absolute top-2 left-2 text-[#C9A227] text-lg z-10 opacity-70">✦</span>
      <span className="absolute top-2 right-2 text-[#C9A227] text-lg z-10 opacity-70">✦</span>
      <span className="absolute bottom-2 left-2 text-[#C9A227] text-lg z-10 opacity-70">✦</span>
      <span className="absolute bottom-2 right-2 text-[#C9A227] text-lg z-10 opacity-70">✦</span>
      <img src={img} alt={title} className="w-full h-64 md:h-80 object-cover group-hover:scale-105 transition-transform duration-500"/>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"/>
      <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
        <p className="font-cormorant text-xl font-semibold text-white leading-tight">{title}</p>
      </div>
    </div>
  );
}

const navLinks = [
  { href: "#catalog", label: "Каталог" },
  { href: "#about", label: "О нас" },
  { href: "#process", label: "Как заказать" },
  { href: "#reviews", label: "Отзывы" },
  { href: "#delivery", label: "Доставка" },
  { href: "#contacts", label: "Контакты" },
];

export default function Dark() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [reviewIdx, setReviewIdx] = useState(0);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const catalog   = useInView();
  const about     = useInView();
  const process   = useInView();
  const reviews   = useInView();
  const delivery  = useInView();
  const contacts  = useInView();

  const reviewList = [
    { name: "Анна Петрова", city: "Москва", text: "Потрясающее качество! Кокошник вышит вручную, каждая деталь продумана. На свадьбе все гости были в восторге от образа.", stars: 5 },
    { name: "Елена Молчанова", city: "Санкт-Петербург", text: "Заказывала для всей семьи на народный праздник. Костюмы сшиты идеально, ткань натуральная и дышащая. Спасибо мастерицам!", stars: 5 },
    { name: "Ирина Соколова", city: "Казань", text: "Делали сценические костюмы для ансамбля. 10 комплектов — все выполнены в срок, все идеально сидят. Будем заказывать ещё!", stars: 5 },
    { name: "Татьяна Орлова", city: "Екатеринбург", text: "Сарафан для дочки на утренник — просто чудо! Ребёнок был счастлив. Качество намного лучше магазинных вариантов.", stars: 5 },
  ];

  return (
    <div className="min-h-screen bg-[#0D0D0D] font-golos text-white overflow-x-hidden">

      {/* NAV */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-black/90 backdrop-blur-md border-b border-[#C9A227]/20" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <a href="#" className="font-cormorant text-2xl font-bold text-white tracking-widest uppercase">
            Маскарадный <span style={{ color: "#C9A227" }}>Бум</span>
          </a>
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((l) => (
              <button key={l.href} onClick={() => scrollTo(l.href)}
                className="text-sm text-white/70 hover:text-[#C9A227] transition-colors duration-200 tracking-wide">
                {l.label}
              </button>
            ))}
          </nav>
          <div className="hidden lg:flex items-center gap-3">
            <button onClick={() => navigate("/")}
              title="Светлая версия"
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#C9A227]/40 text-[#C9A227]/70 hover:border-[#C9A227] hover:text-[#C9A227] text-sm font-medium transition-all duration-200">
              <Icon name="Sun" size={15} />
              <span>Светлая</span>
            </button>
            <button onClick={() => scrollTo("#contacts")}
              className="px-5 py-2 rounded-full text-sm font-semibold border border-[#C9A227] text-[#C9A227] hover:bg-[#C9A227] hover:text-black transition-all duration-200">
              Заказать
            </button>
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden">
            <Icon name={menuOpen ? "X" : "Menu"} size={24} className="text-white" />
          </button>
        </div>
        {menuOpen && (
          <div className="lg:hidden bg-black/95 border-t border-[#C9A227]/20 px-4 pb-4 pt-2">
            {navLinks.map((l) => (
              <button key={l.href} onClick={() => scrollTo(l.href)}
                className="block w-full text-left py-3 text-white/80 hover:text-[#C9A227] border-b border-white/5 last:border-0">
                {l.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background texture */}
        <div className="absolute inset-0 bg-[#0D0D0D]">
          <div className="absolute inset-0 opacity-30"
            style={{ backgroundImage: "radial-gradient(ellipse at 30% 50%, #8B1A1A 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, #1A1A0A 0%, transparent 60%)" }}/>
        </div>

        {/* Branch ornaments */}
        <div className="absolute inset-y-0 left-0 w-24 md:w-40 z-10">
          <Branch side="left" />
        </div>
        <div className="absolute inset-y-0 right-0 w-24 md:w-40 z-10">
          <Branch side="right" />
        </div>

        <div className="max-w-7xl mx-auto px-4 w-full pt-20 pb-10 grid lg:grid-cols-2 gap-8 items-center relative z-20">
          {/* Text */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-[#C9A227]"/>
              <span className="font-cormorant text-[#C9A227] text-xl tracking-widest">Каталог</span>
              <div className="h-px w-8 bg-[#C9A227]"/>
            </div>
            <h1 className="font-cormorant text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] text-white mb-6"
              style={{ textShadow: "0 0 40px rgba(201,162,39,0.2)" }}>
              Русские<br/>народные<br/>
              <span style={{ color: "#C9A227" }}>костюмы</span>
            </h1>
            <p className="text-white/60 text-lg mb-8 max-w-md mx-auto lg:mx-0">
              Традиционная одежда ручной работы с душой.<br/>Кокошники, сарафаны, рубахи и карнавальные наряды.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button onClick={() => scrollTo("#catalog")}
                className="px-8 py-3.5 rounded-full font-semibold text-base bg-[#C9A227] text-black hover:bg-[#E0B830] transition-all duration-200 hover:shadow-[0_0_20px_rgba(201,162,39,0.5)]">
                Перейти в каталог
              </button>
              <button onClick={() => scrollTo("#contacts")}
                className="px-8 py-3.5 rounded-full font-semibold text-base border border-[#C9A227]/50 text-[#C9A227] hover:border-[#C9A227] hover:bg-[#C9A227]/10 transition-all duration-200">
                Оставить заявку
              </button>
            </div>

            <div className="flex items-center gap-8 mt-10 justify-center lg:justify-start">
              {[["500+", "костюмов"], ["20", "лет опыта"], ["⭐ 5.0", "оценка"]].map(([v, l]) => (
                <div key={v} className="text-center">
                  <div className="font-cormorant text-2xl font-bold text-[#C9A227]">{v}</div>
                  <div className="text-xs text-white/50 mt-0.5">{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero image */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg">
              <div className="absolute -inset-1 rounded-2xl border border-[#C9A227]/30"/>
              <div className="absolute -inset-3 rounded-2xl border border-[#C9A227]/10"/>
              <img src={IMG_HERO} alt="Народные костюмы" className="w-full h-[480px] object-cover rounded-2xl relative z-10"/>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-[#0D0D0D]/40 via-transparent to-transparent z-20"/>
            </div>
          </div>
        </div>

        {/* scroll hint */}
        <button onClick={() => scrollTo("#catalog")}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[#C9A227]/60 hover:text-[#C9A227] transition-colors z-20 animate-bounce">
          <Icon name="ChevronDown" size={22} />
        </button>
      </section>

      {/* CATALOG */}
      <section id="catalog" className="py-24 relative" ref={catalog.ref}>
        <div className="absolute inset-y-0 left-0 w-20 md:w-32 z-10 opacity-50">
          <Branch side="left" />
        </div>
        <div className="absolute inset-y-0 right-0 w-20 md:w-32 z-10 opacity-50">
          <Branch side="right" />
        </div>
        <div className="max-w-6xl mx-auto px-8 md:px-16 relative z-20">
          <div className={`transition-all duration-700 ${catalog.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <GoldDivider title="Каталог" />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <CollectionCard img={IMG_WOMAN}  title="Коллекция для женщин"  delay={0}   inView={catalog.inView}/>
            <CollectionCard img={IMG_MAN}    title="Коллекция для мужчин"  delay={100} inView={catalog.inView}/>
            <CollectionCard img={IMG_GIRL}   title="Коллекция для девочек" delay={200} inView={catalog.inView}/>
            <CollectionCard img={IMG_KOKOSH} title="Кокошники и аксессуары" delay={300} inView={catalog.inView}/>
          </div>
          <div className={`text-center mt-10 transition-all duration-700 delay-400 ${catalog.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <button onClick={() => scrollTo("#contacts")}
              className="px-10 py-3.5 rounded-full font-semibold bg-[#C9A227] text-black hover:bg-[#E0B830] transition-all duration-200 hover:shadow-[0_0_20px_rgba(201,162,39,0.4)]">
              Смотреть все
            </button>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 bg-[#111111]" ref={about.ref}>
        <div className="max-w-6xl mx-auto px-4">
          <div className={`transition-all duration-700 ${about.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <GoldDivider title="О мастерской" />
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className={`transition-all duration-700 delay-100 ${about.inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
              <div className="relative">
                <div className="absolute -inset-2 rounded-2xl border border-[#C9A227]/20"/>
                <img src={IMG_WOMAN} alt="О мастерской" className="w-full h-[420px] object-cover rounded-xl"/>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/60 via-transparent to-transparent"/>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-black/60 backdrop-blur rounded-xl p-4 border border-[#C9A227]/30">
                    <div className="font-cormorant text-3xl font-bold text-[#C9A227]">20+</div>
                    <div className="text-sm text-white/70">лет создаём волшебные костюмы</div>
                  </div>
                </div>
              </div>
            </div>
            <div className={`transition-all duration-700 delay-200 ${about.inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
              <p className="text-[#C9A227] text-xs tracking-[0.3em] uppercase font-semibold mb-3">История и традиции</p>
              <h3 className="font-cormorant text-4xl font-semibold text-white mb-6 leading-tight">
                Мастерская «Маскарадный Бум» — <span style={{ color: "#C9A227" }}>хранители традиций</span>
              </h3>
              <p className="text-white/65 leading-relaxed mb-4">
                С 2005 года мы создаём народные костюмы, которые восхищают. Каждое изделие — это ручная работа 
                профессиональных мастериц, влюблённых в русскую культуру и традиции.
              </p>
              <p className="text-white/65 leading-relaxed mb-8">
                Мы используем натуральные ткани — лён, хлопок, шёлк — и украшаем костюмы настоящей вышивкой, 
                жемчугом и бисером. Каждый заказ уникален, каждый кокошник — произведение искусства.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: "🧵", text: "Натуральные ткани" },
                  { icon: "✋", text: "Только ручная работа" },
                  { icon: "📐", text: "Индивидуальный пошив" },
                  { icon: "🎨", text: "Авторские эскизы" },
                ].map((f) => (
                  <div key={f.text} className="flex items-center gap-3 bg-white/5 rounded-xl p-3 border border-white/10">
                    <span className="text-xl">{f.icon}</span>
                    <span className="text-sm text-white/80">{f.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-24 relative">
        <div className="absolute inset-y-0 left-0 w-20 md:w-32 z-0 opacity-40"><Branch side="left"/></div>
        <div className="absolute inset-y-0 right-0 w-20 md:w-32 z-0 opacity-40"><Branch side="right"/></div>
        <div className="max-w-6xl mx-auto px-8 md:px-16 relative z-10">
          <GoldDivider title="Наши услуги" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: "👗", title: "Народные костюмы", desc: "Русские, украинские, белорусские костюмы. Точные исторические детали и современный комфорт." },
              { icon: "👑", title: "Кокошники", desc: "Традиционные и авторские кокошники с жемчугом, вышивкой и бисером для любого повода." },
              { icon: "🎭", title: "Карнавальные наряды", desc: "Яркие костюмы для праздников, утренников и корпоративов. Дети и взрослые." },
              { icon: "🌸", title: "Сценические костюмы", desc: "Для ансамблей и театральных постановок. Выдерживают интенсивные выступления." },
              { icon: "💍", title: "Свадебные образы", desc: "Стилизованные народные образы для невест. Уникальная красота в день торжества." },
              { icon: "✂️", title: "Ремонт и реставрация", desc: "Подгонка по фигуре, восстановление вышивки, реставрация старых изделий." },
            ].map((s, i) => (
              <div key={i} className="group bg-[#111] border border-[#C9A227]/20 rounded-xl p-6 hover:border-[#C9A227]/60 hover:bg-[#161208] transition-all duration-300 hover:shadow-[0_0_20px_rgba(201,162,39,0.1)]">
                <div className="text-3xl mb-4">{s.icon}</div>
                <h3 className="font-cormorant text-xl font-semibold text-white mb-2 group-hover:text-[#C9A227] transition-colors">{s.title}</h3>
                <p className="text-sm text-white/55 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="py-24 bg-[#111111]" ref={process.ref}>
        <div className="max-w-6xl mx-auto px-4">
          <div className={`transition-all duration-700 ${process.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <GoldDivider title="Как сделать заказ" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: "💬", step: "01", title: "Консультация", desc: "Обсуждаем образ, пожелания и бюджет. Помогаем с выбором стиля." },
              { icon: "📋", step: "02", title: "Эскиз и замеры", desc: "Создаём индивидуальный эскиз, снимаем мерки для идеальной посадки." },
              { icon: "✂️", step: "03", title: "Пошив", desc: "Мастерицы создают ваш костюм вручную с вниманием к каждой детали." },
              { icon: "✨", step: "04", title: "Примерка", desc: "Примеряете готовый костюм. При необходимости вносим правки." },
            ].map((p, i) => (
              <div key={i}
                className="relative bg-[#0D0D0D] border border-[#C9A227]/20 rounded-2xl p-6 text-center hover:border-[#C9A227]/50 transition-all duration-300"
                style={{ opacity: process.inView ? 1 : 0, transform: process.inView ? "translateY(0)" : "translateY(30px)", transition: `opacity .7s ease ${i * 130}ms, transform .7s ease ${i * 130}ms` }}>
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#C9A227] text-black text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center">{p.step}</div>
                <div className="text-4xl mt-3 mb-4">{p.icon}</div>
                <h3 className="font-cormorant text-xl font-semibold text-white mb-2">{p.title}</h3>
                <p className="text-sm text-white/55 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
          <div className={`text-center mt-12 transition-all duration-700 delay-500 ${process.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <button onClick={() => scrollTo("#contacts")}
              className="px-10 py-4 rounded-full font-semibold text-lg bg-[#C9A227] text-black hover:bg-[#E0B830] transition-all hover:shadow-[0_0_25px_rgba(201,162,39,0.5)]">
              Начать заказ
            </button>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-24 relative" ref={reviews.ref}>
        <div className="absolute inset-y-0 left-0 w-20 md:w-32 z-0 opacity-40"><Branch side="left"/></div>
        <div className="absolute inset-y-0 right-0 w-20 md:w-32 z-0 opacity-40"><Branch side="right"/></div>
        <div className="max-w-5xl mx-auto px-8 md:px-16 relative z-10">
          <div className={`transition-all duration-700 ${reviews.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <GoldDivider title="Отзывы покупателей" />
          </div>
          <div className="relative">
            <div className="grid md:grid-cols-2 gap-5">
              {reviewList.slice(reviewIdx, reviewIdx + 2).map((r, i) => (
                <div key={i}
                  className="bg-[#111] border border-[#C9A227]/25 rounded-2xl p-6 hover:border-[#C9A227]/50 transition-all duration-300"
                  style={{ opacity: reviews.inView ? 1 : 0, transition: `opacity .7s ease ${i * 150}ms` }}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-[#C9A227]/20 border border-[#C9A227]/40 flex items-center justify-center font-cormorant text-[#C9A227] text-xl font-bold">
                      {r.name[0]}
                    </div>
                    <div>
                      <div className="font-semibold text-white text-sm">{r.name}</div>
                      <div className="text-xs text-white/50">{r.city}</div>
                    </div>
                    <div className="ml-auto flex gap-0.5">
                      {Array.from({ length: r.stars }).map((_, j) => (
                        <span key={j} className="text-[#C9A227] text-sm">★</span>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-white/65 leading-relaxed italic">"{r.text}"</p>
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-3 mt-8">
              <button onClick={() => setReviewIdx(Math.max(0, reviewIdx - 2))}
                className="w-10 h-10 rounded-full border border-[#C9A227]/40 text-[#C9A227] hover:bg-[#C9A227]/10 transition-colors flex items-center justify-center">
                <Icon name="ChevronLeft" size={18} />
              </button>
              {[0, 2].map((idx) => (
                <button key={idx} onClick={() => setReviewIdx(idx)}
                  className={`w-3 h-3 rounded-full transition-all ${reviewIdx === idx ? "bg-[#C9A227] scale-125" : "bg-white/20 hover:bg-white/40"}`}/>
              ))}
              <button onClick={() => setReviewIdx(Math.min(reviewList.length - 2, reviewIdx + 2))}
                className="w-10 h-10 rounded-full border border-[#C9A227]/40 text-[#C9A227] hover:bg-[#C9A227]/10 transition-colors flex items-center justify-center">
                <Icon name="ChevronRight" size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* DELIVERY */}
      <section id="delivery" className="py-24 bg-[#111111]" ref={delivery.ref}>
        <div className="max-w-6xl mx-auto px-4">
          <div className={`transition-all duration-700 ${delivery.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <GoldDivider title="Доставка" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {[
              { icon: "🏪", title: "Самовывоз", tag: "Бесплатно", desc: "Заберите из мастерской, примерка на месте." },
              { icon: "📦", title: "СДЭК", tag: "2–5 дней", desc: "По всей России. Отслеживание онлайн." },
              { icon: "🚚", title: "Почта России", tag: "5–14 дней", desc: "Доставка в любой регион страны." },
              { icon: "⚡", title: "Экспресс", tag: "День в день", desc: "Срочная курьерская доставка по городу." },
            ].map((d, i) => (
              <div key={i} className="bg-[#0D0D0D] border border-[#C9A227]/20 rounded-xl p-5 text-center hover:border-[#C9A227]/50 transition-all duration-300"
                style={{ opacity: delivery.inView ? 1 : 0, transform: delivery.inView ? "translateY(0)" : "translateY(30px)", transition: `opacity .7s ease ${i * 100}ms, transform .7s ease ${i * 100}ms` }}>
                <div className="text-3xl mb-3">{d.icon}</div>
                <span className="inline-block bg-[#C9A227]/15 text-[#C9A227] text-xs font-semibold px-3 py-1 rounded-full mb-3 border border-[#C9A227]/30">{d.tag}</span>
                <h3 className="font-cormorant text-xl font-semibold text-white mb-1">{d.title}</h3>
                <p className="text-xs text-white/50 leading-relaxed">{d.desc}</p>
              </div>
            ))}
          </div>
          <div className="bg-[#0D0D0D] border border-[#C9A227]/20 rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-center justify-around">
            {[
              { icon: "🎁", title: "Подарочная упаковка", desc: "Красивая коробка с лентой — идеально для подарка" },
              { icon: "🔄", title: "Гарантия качества", desc: "Бесплатные правки до вашего полного довольства" },
              { icon: "💳", title: "Удобная оплата", desc: "Предоплата 50%, остаток при получении" },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-4 text-left">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <h4 className="font-cormorant text-lg font-semibold text-[#C9A227] mb-0.5">{item.title}</h4>
                  <p className="text-xs text-white/55">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 relative" ref={contacts.ref}>
        <div className="absolute inset-y-0 left-0 w-20 md:w-32 z-0 opacity-40"><Branch side="left"/></div>
        <div className="absolute inset-y-0 right-0 w-20 md:w-32 z-0 opacity-40"><Branch side="right"/></div>
        <div className="max-w-5xl mx-auto px-8 md:px-16 relative z-10">
          <div className={`transition-all duration-700 ${contacts.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <GoldDivider title="Оставить заявку" />
          </div>
          <div className="grid lg:grid-cols-2 gap-10">
            <div className={`transition-all duration-700 delay-100 ${contacts.inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
              <form className="bg-[#111] border border-[#C9A227]/25 rounded-2xl p-7 space-y-4" onSubmit={(e) => e.preventDefault()}>
                <h3 className="font-cormorant text-2xl font-semibold text-white mb-2">Заявка на костюм</h3>
                {[
                  { label: "Ваше имя *", type: "text", placeholder: "Введите имя" },
                  { label: "Телефон *", type: "tel", placeholder: "+7 (___) ___-__-__" },
                ].map((f) => (
                  <div key={f.label}>
                    <label className="text-xs text-white/50 mb-1.5 block">{f.label}</label>
                    <input type={f.type} placeholder={f.placeholder}
                      className="w-full bg-black/40 border border-[#C9A227]/20 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#C9A227]/60 focus:ring-1 focus:ring-[#C9A227]/30 transition-all"/>
                  </div>
                ))}
                <div>
                  <label className="text-xs text-white/50 mb-1.5 block">Тип заказа</label>
                  <select className="w-full bg-black/40 border border-[#C9A227]/20 rounded-xl px-4 py-3 text-sm text-white/80 focus:outline-none focus:border-[#C9A227]/60 transition-all">
                    <option value="" className="bg-black">Выберите тип</option>
                    <option className="bg-black">Народный костюм</option>
                    <option className="bg-black">Кокошник</option>
                    <option className="bg-black">Карнавальный костюм</option>
                    <option className="bg-black">Сценический костюм</option>
                    <option className="bg-black">Свадебный образ</option>
                    <option className="bg-black">Другое</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-white/50 mb-1.5 block">Расскажите о своём заказе</label>
                  <textarea rows={4} placeholder="Опишите желаемый образ, размеры, сроки..."
                    className="w-full bg-black/40 border border-[#C9A227]/20 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#C9A227]/60 transition-all resize-none"/>
                </div>
                <button type="submit"
                  className="w-full py-4 rounded-xl font-semibold text-base bg-[#C9A227] text-black hover:bg-[#E0B830] transition-all hover:shadow-[0_0_20px_rgba(201,162,39,0.4)]">
                  Отправить заявку
                </button>
              </form>
            </div>

            <div className={`space-y-5 transition-all duration-700 delay-200 ${contacts.inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
              <div className="bg-[#111] border border-[#C9A227]/25 rounded-2xl p-6">
                <h3 className="font-cormorant text-xl font-semibold text-[#C9A227] mb-5">Контакты</h3>
                {[
                  { icon: "Phone", label: "Телефон", value: "+7 (xxx) xxx-xx-xx", href: "#" },
                  { icon: "Mail", label: "Email", value: "info@maskaradboom.ru", href: "#" },
                  { icon: "MapPin", label: "Адрес", value: "Москва, ул. Примерная, д. 1", href: "#" },
                  { icon: "Clock", label: "Часы работы", value: "Пн–Сб: 10:00–19:00", href: "#" },
                ].map((c) => (
                  <div key={c.label} className="flex items-start gap-3 py-3 border-b border-white/5 last:border-0">
                    <div className="w-9 h-9 bg-[#C9A227]/10 border border-[#C9A227]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name={c.icon} size={16} className="text-[#C9A227]"/>
                    </div>
                    <div>
                      <div className="text-xs text-white/40">{c.label}</div>
                      <div className="text-sm text-white/90">{c.value}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-[#111] border border-[#C9A227]/25 rounded-2xl p-6">
                <h4 className="font-cormorant text-xl font-semibold text-white mb-4">Мессенджеры</h4>
                <div className="flex flex-col gap-3">
                  {[
                    { name: "WhatsApp", icon: "MessageCircle", cls: "border-green-600/40 text-green-400 hover:bg-green-900/20" },
                    { name: "Telegram", icon: "Send", cls: "border-blue-500/40 text-blue-400 hover:bg-blue-900/20" },
                    { name: "ВКонтакте", icon: "Users", cls: "border-indigo-500/40 text-indigo-400 hover:bg-indigo-900/20" },
                  ].map((m) => (
                    <button key={m.name}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium transition-colors ${m.cls}`}>
                      <Icon name={m.icon} size={17}/>
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
      <footer className="bg-black border-t border-[#C9A227]/20 py-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="font-cormorant text-2xl font-bold text-white tracking-widest uppercase mb-3">
                Маскарадный <span style={{ color: "#C9A227" }}>Бум</span>
              </div>
              <p className="text-sm text-white/40">Мастерская народных костюмов и кокошников. Ручная работа с 2005 года.</p>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-4">Разделы</h4>
              <div className="space-y-2">
                {navLinks.map((l) => (
                  <button key={l.href} onClick={() => scrollTo(l.href)}
                    className="block text-sm text-white/50 hover:text-[#C9A227] transition-colors">{l.label}</button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-4">Контакты</h4>
              <div className="space-y-1.5 text-sm text-white/50">
                <div>+7 (xxx) xxx-xx-xx</div>
                <div>info@maskaradboom.ru</div>
                <div>Москва, ул. Примерная, д. 1</div>
                <div>Пн–Сб: 10:00–19:00</div>
              </div>
            </div>
          </div>
          <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-xs text-white/25">© 2024 Маскарадный Бум. Все права защищены.</p>
            <div className="flex items-center gap-2">
              <div className="h-px w-12 bg-[#C9A227]/30"/>
              <span className="text-[#C9A227]/50 text-sm">✦</span>
              <div className="h-px w-12 bg-[#C9A227]/30"/>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}