import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/e01f95c6-fc8f-4d8d-8bca-5cf55eb0792e/files/2b656d8c-ca58-4c9a-b99f-79037be0c17f.jpg";
const KOKOSHNIK_IMG = "https://cdn.poehali.dev/projects/e01f95c6-fc8f-4d8d-8bca-5cf55eb0792e/files/9db05b9e-f7bf-4237-a0bf-dfd95f790d30.jpg";
const ATELIER_IMG = "https://cdn.poehali.dev/projects/e01f95c6-fc8f-4d8d-8bca-5cf55eb0792e/files/e1019a64-db2c-4346-91bb-68794c681fe4.jpg";

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true);
    }, { threshold });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function SectionTitle({ label, title, subtitle }: { label: string; title: string; subtitle?: string }) {
  return (
    <div className="text-center mb-12">
      <span className="inline-block text-xs font-semibold tracking-[0.3em] uppercase text-terracotta mb-3 opacity-80">
        {label}
      </span>
      <h2 className="font-cormorant text-4xl md:text-5xl font-semibold text-foreground leading-tight mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
      )}
      <div className="divider-ornament max-w-xs mx-auto mt-5">
        <span className="text-gold text-xl">✦</span>
      </div>
    </div>
  );
}

const navLinks = [
  { href: "#services", label: "Услуги" },
  { href: "#gallery", label: "Галерея" },
  { href: "#about", label: "О мастерской" },
  { href: "#process", label: "Как заказать" },
  { href: "#reviews", label: "Отзывы" },
  { href: "#delivery", label: "Доставка" },
  { href: "#contacts", label: "Контакты" },
];

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const services = useInView();
  const gallery = useInView();
  const about = useInView();
  const process = useInView();
  const reviews = useInView();
  const delivery = useInView();
  const contacts = useInView();

  return (
    <div className="min-h-screen ornament-bg font-golos">

      {/* NAV */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-border" : "bg-transparent"}`}>
        <div className="container max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <a href="#" className="font-cormorant text-2xl font-semibold text-terracotta tracking-wide">
            Маскарадный <span className="gold-text">Бум</span>
          </a>
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((l) => (
              <button key={l.href} onClick={() => scrollTo(l.href)}
                className="text-sm text-foreground/70 hover:text-terracotta transition-colors duration-200 hover:font-medium">
                {l.label}
              </button>
            ))}
          </nav>
          <button onClick={() => scrollTo("#contacts")}
            className="hidden lg:block btn-primary px-5 py-2 rounded-full text-sm font-medium">
            Заказать костюм
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden text-foreground">
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>
        {menuOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur border-t border-border px-4 pb-4 pt-2">
            {navLinks.map((l) => (
              <button key={l.href} onClick={() => scrollTo(l.href)}
                className="block w-full text-left py-3 text-foreground/80 hover:text-terracotta border-b border-border/40 last:border-0">
                {l.label}
              </button>
            ))}
            <button onClick={() => scrollTo("#contacts")}
              className="mt-3 w-full btn-primary px-5 py-2.5 rounded-full text-sm font-medium text-center">
              Заказать костюм
            </button>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="hero-pattern min-h-screen flex items-center relative overflow-hidden pt-16">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-gold/10 blur-3xl animate-float" />
          <div className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-rose/10 blur-3xl animate-float delay-300" />
        </div>

        <div className="container max-w-7xl mx-auto px-4 py-20 grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/70 border border-gold/30 rounded-full px-4 py-1.5 mb-6 animate-fade-in">
              <span className="text-gold text-sm">✦</span>
              <span className="text-sm text-terracotta font-medium">Ручная работа с 2005 года</span>
            </div>
            <h1 className="font-cormorant text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.1] text-foreground mb-6 animate-fade-in-up">
              Народные<br/>
              <span className="gold-text">костюмы</span><br/>
              и кокошники
            </h1>
            <p className="text-lg text-foreground/70 leading-relaxed mb-8 max-w-lg animate-fade-in-up delay-200">
              Мастерская «Маскарадный Бум» — создаём уникальные народные костюмы и кокошники с душой. 
              Каждое изделие — произведение искусства ручной работы, которое хранит тепло и традиции.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-300">
              <button onClick={() => scrollTo("#contacts")}
                className="btn-primary px-8 py-3.5 rounded-full font-semibold text-base">
                Заказать костюм
              </button>
              <button onClick={() => scrollTo("#gallery")}
                className="px-8 py-3.5 rounded-full font-semibold text-base border-2 border-terracotta/40 text-terracotta hover:bg-terracotta/5 transition-all duration-200">
                Смотреть галерею
              </button>
            </div>
            <div className="flex items-center gap-8 mt-10 animate-fade-in-up delay-500">
              {[["500+", "костюмов создано"], ["20", "лет опыта"], ["100%", "ручная работа"]].map(([num, text]) => (
                <div key={num}>
                  <div className="font-cormorant text-3xl font-semibold gold-text">{num}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{text}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative animate-scale-in delay-200">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img src={HERO_IMG} alt="Народный костюм" className="w-full h-[500px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-terracotta/20 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 border border-gold/20 animate-float">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                  <span className="text-lg">👑</span>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Премиум-качество</div>
                  <div className="text-sm font-semibold text-foreground">Каждый стежок вручную</div>
                </div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-4 border border-rose/20 animate-float delay-200">
              <div className="text-center">
                <div className="text-2xl mb-1">⭐</div>
                <div className="font-cormorant text-2xl font-semibold text-foreground">5.0</div>
                <div className="text-xs text-muted-foreground">оценка клиентов</div>
              </div>
            </div>
          </div>
        </div>

        <button onClick={() => scrollTo("#services")}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-terracotta transition-colors animate-float">
          <span className="text-xs tracking-widest uppercase">Узнать больше</span>
          <Icon name="ChevronDown" size={20} />
        </button>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 bg-white" ref={services.ref}>
        <div className="container max-w-7xl mx-auto px-4">
          <div className={`transition-all duration-700 ${services.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <SectionTitle
              label="Что мы делаем"
              title="Наши услуги"
              subtitle="От эскиза до готового костюма — каждая работа уникальна и создаётся специально для вас"
            />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "👗", title: "Народные костюмы", desc: "Русские, украинские, белорусские и другие народные костюмы. Точное следование историческим традициям с современным комфортом.", badge: "Популярное" },
              { icon: "👑", title: "Кокошники", desc: "Традиционные и авторские кокошники для праздников, фотосессий, свадеб и сценических выступлений. Жемчуг, вышивка, бисер.", badge: "Хит" },
              { icon: "🎭", title: "Карнавальные костюмы", desc: "Яркие, запоминающиеся образы для маскарадов, утренников и корпоративных праздников. Детские и взрослые размеры.", badge: null },
              { icon: "🌸", title: "Сценические костюмы", desc: "Костюмы для ансамблей, театральных постановок и выступлений. Учитываем особенности сцены и движения.", badge: null },
              { icon: "💍", title: "Свадебные образы", desc: "Стилизованные народные образы для невест и свадебной церемонии в русском стиле. Незабываемая красота.", badge: null },
              { icon: "✂️", title: "Подгонка и ремонт", desc: "Реставрация старых костюмов, подгонка по фигуре, восстановление вышивки и декора. Бережное отношение к каждому изделию.", badge: null },
            ].map((s, i) => (
              <div key={i}
                className={`card-hover bg-cream rounded-2xl p-6 border border-gold/20 relative overflow-hidden transition-all duration-700 ${services.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${i * 100}ms` }}>
                {s.badge && (
                  <span className="absolute top-4 right-4 bg-rose/10 text-rose text-xs font-semibold px-2.5 py-1 rounded-full border border-rose/20">
                    {s.badge}
                  </span>
                )}
                <div className="text-4xl mb-4">{s.icon}</div>
                <h3 className="font-cormorant text-xl font-semibold text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-24 bg-[hsl(38,40%,95%)]" ref={gallery.ref}>
        <div className="container max-w-7xl mx-auto px-4">
          <div className={`transition-all duration-700 ${gallery.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <SectionTitle
              label="Готовые работы"
              title="Галерея коллекций"
              subtitle="Каждый костюм — отдельная история. Смотрите наши работы и вдохновляйтесь"
            />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { img: HERO_IMG, title: "Русский народный сарафан", tag: "Народный" },
              { img: KOKOSHNIK_IMG, title: "Кокошники ручной работы", tag: "Кокошники" },
              { img: ATELIER_IMG, title: "Мастерская в процессе работы", tag: "Ателье" },
              { img: HERO_IMG, title: "Праздничный костюм", tag: "Праздничный" },
              { img: KOKOSHNIK_IMG, title: "Свадебный кокошник", tag: "Свадебный" },
              { img: ATELIER_IMG, title: "Сценический костюм", tag: "Сценический" },
            ].map((item, i) => (
              <div key={i}
                className={`group relative rounded-2xl overflow-hidden shadow-md card-hover cursor-pointer transition-all duration-700 ${gallery.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${i * 80}ms` }}>
                <img src={item.img} alt={item.title} className="w-full h-48 md:h-64 object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-terracotta/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                  <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">{item.tag}</span>
                  <p className="text-white text-sm font-medium mt-1">{item.title}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <button onClick={() => scrollTo("#contacts")}
              className="btn-primary px-8 py-3 rounded-full font-semibold">
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
              <div className="relative rounded-3xl overflow-hidden shadow-xl">
                <img src={ATELIER_IMG} alt="Мастерская" className="w-full h-[450px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-cream/40 via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-5 border border-gold/20">
                <div className="font-cormorant text-4xl font-bold gold-text">20+</div>
                <div className="text-sm text-muted-foreground mt-1">лет создаём<br/>чудеса</div>
              </div>
            </div>

            <div className={`transition-all duration-700 delay-200 ${about.inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
              <span className="inline-block text-xs font-semibold tracking-[0.3em] uppercase text-terracotta mb-3 opacity-80">О нас</span>
              <h2 className="font-cormorant text-4xl md:text-5xl font-semibold text-foreground leading-tight mb-6">
                История мастерской<br/>
                <span className="gold-text">«Маскарадный Бум»</span>
              </h2>
              <p className="text-foreground/70 leading-relaxed mb-4">
                Наша мастерская основана в 2005 году с одной простой мечтой — вернуть людям радость от настоящих народных костюмов. 
                Мы убеждены: каждый человек достоин почувствовать себя частью великой культурной традиции.
              </p>
              <p className="text-foreground/70 leading-relaxed mb-8">
                За двадцать лет работы мы создали более 500 уникальных изделий. Наши мастерицы — профессионалы с многолетним опытом, 
                влюблённые в своё дело. Мы используем только натуральные ткани и материалы, следуем историческим традициям 
                и добавляем современный комфорт.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: "🧵", text: "Натуральные ткани и материалы" },
                  { icon: "📐", text: "Индивидуальные мерки и подгонка" },
                  { icon: "🎨", text: "Авторские эскизы и дизайн" },
                  { icon: "🚀", text: "Срочное изготовление" },
                ].map((f, i) => (
                  <div key={i} className="flex items-start gap-3 bg-cream rounded-xl p-3">
                    <span className="text-xl">{f.icon}</span>
                    <span className="text-sm text-foreground/80 leading-tight">{f.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="py-24 bg-[hsl(38,40%,95%)]" ref={process.ref}>
        <div className="container max-w-7xl mx-auto px-4">
          <div className={`transition-all duration-700 ${process.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <SectionTitle
              label="Как мы работаем"
              title="Процесс создания заказа"
              subtitle="От первого звонка до готового костюма — прозрачно, комфортно и без сюрпризов"
            />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-gold/30 via-gold/60 to-gold/30" />
            {[
              { icon: "💬", title: "Консультация", desc: "Обсуждаем ваш образ, пожелания и бюджет. Помогаем с выбором стиля и материалов." },
              { icon: "📋", title: "Эскиз и замеры", desc: "Создаём индивидуальный эскиз, снимаем все необходимые мерки для идеальной посадки." },
              { icon: "✂️", title: "Создание", desc: "Мастерицы шьют и вышивают ваш костюм с любовью, соблюдая все детали и нюансы." },
              { icon: "✨", title: "Примерка и выдача", desc: "Примеряете готовый костюм, при необходимости вносим правки. Упаковываем с заботой." },
            ].map((p, i) => (
              <div key={i}
                className={`relative transition-all duration-700 ${process.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${i * 120}ms` }}>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gold/20 text-center card-hover">
                  <div className="relative inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gold/20 to-terracotta/20 rounded-full mb-4">
                    <span className="text-3xl">{p.icon}</span>
                    <span className="absolute -top-1 -right-1 w-6 h-6 bg-terracotta rounded-full flex items-center justify-center text-white text-xs font-bold">{i + 1}</span>
                  </div>
                  <h3 className="font-cormorant text-xl font-semibold text-foreground mb-2">{p.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className={`text-center mt-12 transition-all duration-700 delay-500 ${process.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <button onClick={() => scrollTo("#contacts")}
              className="btn-primary px-10 py-4 rounded-full font-semibold text-lg">
              Начать заказ сейчас
            </button>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-24 bg-white" ref={reviews.ref}>
        <div className="container max-w-7xl mx-auto px-4">
          <div className={`transition-all duration-700 ${reviews.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <SectionTitle
              label="Отзывы"
              title="Что говорят клиенты"
              subtitle="Более 500 довольных заказчиков по всей России"
            />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Анна К.", city: "Москва", text: "Заказывала кокошник на свадьбу. Результат превзошёл все ожидания! Настоящая ручная работа, всё вышито жемчугом вручную. Получила море комплиментов.", stars: 5, date: "Март 2024" },
              { name: "Елена М.", city: "Санкт-Петербург", text: "Делали народные костюмы для целого ансамбля — 12 штук. Все изготовлены идеально, в срок, с учётом всех пожеланий. Рекомендуем всей труппой!", stars: 5, date: "Февраль 2024" },
              { name: "Ирина С.", city: "Екатеринбург", text: "Брала сарафан для дочки на утренник. Качество потрясающее, ткань натуральная, ребёнок был самым красивым! Обязательно вернёмся за новым заказом.", stars: 5, date: "Январь 2024" },
              { name: "Татьяна Р.", city: "Казань", text: "Обратились для корпоратива в русском стиле. Восемь костюмов для сотрудников — все разные, все шикарные. Коллеги были в восторге!", stars: 5, date: "Декабрь 2023" },
              { name: "Светлана В.", city: "Новосибирск", text: "Долго искала мастерскую для театрального костюма. Здесь поняли с полуслова, воплотили именно то, что я хотела. Буду рекомендовать всем коллегам.", stars: 5, date: "Ноябрь 2023" },
              { name: "Наталья П.", city: "Ростов-на-Дону", text: "Красивый кокошник на новый год — получила настоящий подарок от мастерской. Доставка быстрая, упаковка бережная. Спасибо за душу в каждом изделии!", stars: 5, date: "Октябрь 2023" },
            ].map((r, i) => (
              <div key={i}
                className={`bg-cream rounded-2xl p-6 border border-gold/20 card-hover transition-all duration-700 ${reviews.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: r.stars }).map((_, j) => (
                    <span key={j} className="text-gold text-sm">★</span>
                  ))}
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed mb-4 italic">"{r.text}"</p>
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
      <section id="delivery" className="py-24 bg-gradient-to-br from-[hsl(38,40%,95%)] to-[hsl(40,30%,97%)]" ref={delivery.ref}>
        <div className="container max-w-7xl mx-auto px-4">
          <div className={`transition-all duration-700 ${delivery.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <SectionTitle
              label="Доставка"
              title="Доставляем по всей России"
              subtitle="Бережно упакуем и отправим ваш заказ любым удобным способом"
            />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { icon: "🏪", title: "Самовывоз", desc: "Заберите заказ лично из нашей мастерской. Примерка на месте, при необходимости — правки.", tag: "Бесплатно" },
              { icon: "📦", title: "СДЭК", desc: "Доставка в любой город России. Отслеживание посылки онлайн. Надёжная упаковка.", tag: "2–5 дней" },
              { icon: "🚚", title: "Почта России", desc: "Доставка по всей стране, включая отдалённые регионы. Уведомление о поступлении.", tag: "5–14 дней" },
              { icon: "⚡", title: "Экспресс", desc: "Срочная доставка курьером по городу. Идеально для срочных заказов и мероприятий.", tag: "День в день" },
            ].map((d, i) => (
              <div key={i}
                className={`bg-white rounded-2xl p-6 border border-gold/20 text-center card-hover transition-all duration-700 ${delivery.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="text-4xl mb-3">{d.icon}</div>
                <span className="inline-block bg-gold/15 text-terracotta text-xs font-semibold px-2.5 py-1 rounded-full mb-3">{d.tag}</span>
                <h3 className="font-cormorant text-xl font-semibold text-foreground mb-2">{d.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{d.desc}</p>
              </div>
            ))}
          </div>
          <div className={`bg-white rounded-2xl p-6 border border-gold/20 flex flex-col md:flex-row gap-6 items-center justify-between transition-all duration-700 delay-400 ${delivery.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            {[
              { icon: "🎁", title: "Упаковка в подарок", desc: "Каждый заказ упакуем в красивую коробку с тканевой лентой. Идеально для подарка!" },
              { icon: "🔄", title: "Возврат и обмен", desc: "Если что-то не так — поправим бесплатно. Ваше полное удовлетворение — наш приоритет." },
              { icon: "💳", title: "Удобная оплата", desc: "Наличные, карта, онлайн-перевод. Предоплата 50% для старта, остаток при получении." },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <span className="text-3xl">{item.icon}</span>
                <div>
                  <h4 className="font-cormorant text-xl font-semibold text-foreground mb-1">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
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
            <SectionTitle
              label="Связаться с нами"
              title="Оставить заявку"
              subtitle="Напишите нам — ответим в течение часа и поможем воплотить ваш образ"
            />
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className={`transition-all duration-700 delay-200 ${contacts.inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
              <form className="bg-cream rounded-3xl p-8 border border-gold/20 shadow-sm" onSubmit={(e) => e.preventDefault()}>
                <h3 className="font-cormorant text-2xl font-semibold text-foreground mb-6">Заявка на костюм</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-foreground/70 mb-1.5 block">Ваше имя *</label>
                    <input type="text" placeholder="Введите имя"
                      className="w-full bg-white border border-gold/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta/50 transition-all" />
                  </div>
                  <div>
                    <label className="text-sm text-foreground/70 mb-1.5 block">Телефон *</label>
                    <input type="tel" placeholder="+7 (___) ___-__-__"
                      className="w-full bg-white border border-gold/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta/50 transition-all" />
                  </div>
                  <div>
                    <label className="text-sm text-foreground/70 mb-1.5 block">Тип заказа</label>
                    <select className="w-full bg-white border border-gold/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta/50 transition-all text-foreground/80">
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
                    <label className="text-sm text-foreground/70 mb-1.5 block">Расскажите о своём заказе</label>
                    <textarea rows={4} placeholder="Опишите желаемый образ, размеры, сроки..."
                      className="w-full bg-white border border-gold/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta/50 transition-all resize-none" />
                  </div>
                  <button type="submit"
                    className="w-full btn-primary py-4 rounded-xl font-semibold text-base">
                    Отправить заявку
                  </button>
                  <p className="text-xs text-muted-foreground text-center">
                    Нажимая кнопку, вы соглашаетесь на обработку персональных данных
                  </p>
                </div>
              </form>
            </div>

            <div className={`space-y-6 transition-all duration-700 delay-300 ${contacts.inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
              <div className="bg-cream rounded-2xl p-6 border border-gold/20">
                <h3 className="font-cormorant text-2xl font-semibold text-foreground mb-5">Контакты мастерской</h3>
                <div className="space-y-4">
                  {[
                    { icon: "Phone", label: "Телефон", value: "+7 (xxx) xxx-xx-xx", href: "tel:+7xxxxxxxxxx" },
                    { icon: "Mail", label: "Email", value: "info@maskaradboom.ru", href: "mailto:info@maskaradboom.ru" },
                    { icon: "MapPin", label: "Адрес мастерской", value: "Москва, ул. Примерная, д. 1", href: "#" },
                    { icon: "Clock", label: "Режим работы", value: "Пн–Сб: 10:00–19:00", href: "#" },
                  ].map((c, i) => (
                    <a key={i} href={c.href}
                      className="flex items-start gap-4 group hover:bg-white rounded-xl p-3 -mx-3 transition-colors duration-200">
                      <div className="w-10 h-10 bg-terracotta/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-terracotta/20 transition-colors">
                        <Icon name={c.icon} size={18} className="text-terracotta" />
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">{c.label}</div>
                        <div className="text-sm font-medium text-foreground">{c.value}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <div className="bg-cream rounded-2xl p-6 border border-gold/20">
                <h4 className="font-cormorant text-xl font-semibold text-foreground mb-4">Мы в мессенджерах</h4>
                <div className="flex flex-col gap-3">
                  {[
                    { name: "WhatsApp", icon: "MessageCircle", color: "bg-green-50 text-green-700 border-green-200 hover:bg-green-100" },
                    { name: "Telegram", icon: "Send", color: "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100" },
                    { name: "ВКонтакте", icon: "Users", color: "bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100" },
                  ].map((m, i) => (
                    <button key={i}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium transition-colors duration-200 ${m.color}`}>
                      <Icon name={m.icon} size={18} />
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
      <footer className="bg-[hsl(22,30%,18%)] text-white py-12">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="font-cormorant text-2xl font-semibold mb-3">
                Маскарадный <span className="gold-text">Бум</span>
              </div>
              <p className="text-sm text-white/60 leading-relaxed">
                Мастерская народных костюмов и кокошников. Ручная работа с 2005 года.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-widest text-white/50 mb-4">Разделы</h4>
              <div className="space-y-2">
                {navLinks.map((l) => (
                  <button key={l.href} onClick={() => scrollTo(l.href)}
                    className="block text-sm text-white/70 hover:text-white transition-colors">
                    {l.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-widest text-white/50 mb-4">Контакты</h4>
              <div className="space-y-2 text-sm text-white/70">
                <div>+7 (xxx) xxx-xx-xx</div>
                <div>info@maskaradboom.ru</div>
                <div>Москва, ул. Примерная, д. 1</div>
                <div>Пн–Сб: 10:00–19:00</div>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/40">© 2024 Маскарадный Бум. Все права защищены.</p>
            <p className="text-xs text-white/40">Пошив народных костюмов и кокошников на заказ</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
