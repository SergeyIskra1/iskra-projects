import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowRight,
  Building2,
  ChevronDown,
  FileText,
  Mail,
  MessageCircle,
  Phone,
  Send,
  X,
} from 'lucide-react';
import './styles.css';

const categories = [
  { title: 'Блок-контейнеры', slug: 'blok-konteynery', text: 'Блок-контейнеры, бытовки бюджетного сегмента и под заказ, согласно ТЗ заказчика.' },
  { title: 'Модульные офисы', slug: 'modulnye-ofisy', text: 'Офисы продаж, АБК, административные помещения и штабы строительства.' },
  { title: 'Общежития и вахтовые городки', slug: 'obshchezhitiya', text: 'Жилые и бытовые комплексы для персонала, вахтовых и строительных городков.' },
  { title: 'КПП и проходные', slug: 'kpp', text: 'Посты охраны, проходные, диспетчерские и помещения контроля доступа.' },
  { title: 'Сантехнические модули', slug: 'santekhnicheskie-moduli', text: 'Душевые, туалеты, раздевалки и сушилки для объектов без стационарной инфраструктуры.' },
  { title: 'Индивидуальные проекты', slug: 'individualnye-proekty', text: 'Объекты по вашему ТЗ, планировке, региону поставки и требованиям эксплуатации. Также модули негабаритных размеров по индивидуальному расчету.' },
];

const services = [
  { title: 'Доставка', slug: 'dostavka', text: 'Подберем транспорт и способ выгрузки под габариты модулей и регион поставки.', details: 'Доставка считается отдельно. На расчет влияет регион, количество модулей, габариты и способ разгрузки.' },
  { title: 'Монтаж', slug: 'montazh', text: 'Соберем модули, произведем монтаж блок-контейнеров в единое модульное здание.', details: 'Производим монтаж блочно-модульного здания из блок-контейнеров, согласно ТЗ заказчика в проектном порядке.' },
  { title: 'Фундамент', slug: 'fundament', text: 'Поможем выбрать основание: сваи, ленточный фундамент модульного здания, монолитный фундамент.', details: 'Тип основания зависит от грунта, размеров здания, а также этажности.' },
  { title: 'Электрика', slug: 'elektrika', text: 'Произведем монтаж электроснабжения внутри здания и уличного освещения.', details: 'Монтаж электроснабжения выполняется с предоставлением однолинейной схемы электрики.' },
  { title: 'Водоснабжение', slug: 'vodosnabzhenie', text: 'Произведем монтаж водоснабжения внутри здания с выводом труб для дальнейшего подключения к внешнему источнику.', details: 'Для объекта предоставляются схемы ОВ и решения по подключению водоснабжения.' },
  { title: 'Канализация', slug: 'kanalizaciya', text: 'Подготовим выводы и решения для подключения сантехнических модулей к внешнему источнику канализации.', details: 'Произведем монтаж водоотведения с предоставлением схем ВК.' },
  { title: 'Вентиляция', slug: 'ventilyaciya', text: 'Произведем монтаж приточно-вытяжной системы вентиляции.', details: 'Решение подбирается под назначение здания, количество помещений и условия эксплуатации.' },
  { title: 'Пожарная безопасность', slug: 'pozharnaya-bezopasnost', text: 'Учитываем требования пожарной безопасности, производим монтаж автоматической пожарной системы и слаботочных систем.', details: 'В состав работ могут входить автоматическая пожарная система, СКУД и СКС.' },
];

const workStages = [
  ['01', 'Заявка или ТЗ', 'Вы присылаете размер, комплектацию, назначение объекта, количество модулей и регион.'],
  ['02', 'Расчет', 'Подготавливаем расчет с учетом логистики и монтажных работ.'],
  ['03', 'Договор и оплата', 'Фиксируем условия, сроки и комплектацию. Постановка заказа в производство после оплаты авансового платежа.'],
  ['04', 'Производство', 'Изготовление блок-контейнера занимает 4-5 рабочих дней с момента поступления средств на расчетный счет.'],
  ['05', 'Доставка и монтаж', 'Организуем поставку по России и выполняем дополнительные работы по согласованным условиям.'],
];

const faq = [
  ['Что продается в первую очередь?', 'Базовый продукт - блок-контейнер. Из двух и более модулей собираются блочно-модульные здания.'],
  ['Сколько занимает производство?', 'Изготовление блок-контейнера занимает 4-5 рабочих дней с момента поступления средств на расчетный счет.'],
  ['Можно ли заказать нестандартную ширину?', 'Да. Модули нестандартной ширины и индивидуальные размеры рассчитываются отдельно по ТЗ.'],
  ['Что нужно для расчета?', 'Размер, комплектация, количество модулей, регион и перечень необходимых услуг.'],
];

const products = [
  { title: 'Блок-контейнер 6 x 2.4 x 2.5 м', slug: 'bk-6x24', category: 'blok-konteynery', price: 'от 145 500 ₽', meta: '1 модуль' },
  { title: 'Блок-контейнер 12 x 2.4 м', slug: 'bk-12x24', category: 'blok-konteynery', price: 'от 251 000 ₽', meta: '1 модуль' },
  { title: 'Блок-контейнер нестандартной ширины до 3 метров', slug: 'bk-individualnaya-shirina', category: 'individualnye-proekty', price: 'индивидуально', meta: 'ширина, длина и планировка по запросу заказчика' },
  { title: 'Модульный офис из 2 блоков', slug: 'ofis-2-modulya', category: 'modulnye-ofisy', price: 'от 520 000 ₽', meta: '2 модуля · планировка согласно схеме заказчика' },
  { title: 'Офис продаж из 4 модулей', slug: 'ofis-prodazh-4-modulya', category: 'modulnye-ofisy', price: 'от 25 000 ₽ за м2', meta: '4 модуля · open space + санузел' },
  { title: 'Вахтовый городок для персонала', slug: 'vahtovyy-gorodok', category: 'obshchezhitiya', price: 'от 25 000 ₽ за м2', meta: 'от 6 модулей · проживание и быт' },
  { title: 'Общежитие из 12 модулей', slug: 'obshchezhitie-12-moduley', category: 'obshchezhitiya', price: 'от 25 000 ₽ за м2', meta: '12 модулей · спальные комнаты' },
  { title: 'КПП', slug: 'kpp', category: 'kpp', price: 'от 25 000 ₽ за м2', meta: '1-2 модуля · проходная' },
  { title: 'Сантехнический модуль', slug: 'santekhnicheskiy-modul', category: 'santekhnicheskie-moduli', price: 'от 25 000 ₽ за м2', meta: 'душевые · туалеты · раздевалка' },
  { title: 'Складские помещения', slug: 'skladskie-pomeshcheniya', category: 'individualnye-proekty', price: 'индивидуально', meta: 'под хранение, оборудование и инженерные системы' },
];

const contactChannels = [
  { title: 'Телефон', href: 'tel:+79897257788', icon: Phone, text: '+7 989 725-77-88' },
  { title: 'Telegram', href: 'https://t.me/gss_modul', icon: Send, text: '@gss_modul' },
  { title: 'MAX', href: 'https://max.ru/u/f9LHodD0cOI-tNk1llaOsGzv2jwfODx7cfRaWwXr3bL_GByF-26fUWXS5yg', icon: MessageCircle, text: 'MAX' },
  { title: 'Почта', href: 'mailto:info@example.ru', icon: Mail, text: 'info@example.ru' },
];

const articles = [
  { title: 'Как выбрать блок-контейнер для стройплощадки', slug: 'kak-vybrat-blok-konteyner' },
  { title: 'Что влияет на стоимость модульного здания', slug: 'stoimost-modulnogo-zdaniya' },
  { title: 'Как организуется доставка модулей по России', slug: 'dostavka-moduley-po-rossii' },
];

const requisites = [
  ['Компания', 'Общество с ограниченной ответственностью «ГрандСервисСтрой» (ООО «ГСС»)'],
  ['Генеральный директор', 'Магелланов Максим Евгеньевич, действует на основании Устава'],
  ['Главный бухгалтер', 'Магелланов Максим Евгеньевич'],
  ['Юридический адрес', '346471, Ростовская область, Октябрьский р-н, с.п. Мокрологское, х. Маркин, ул. Садовая, двлд. 34'],
  ['ИНН', '6125033796'],
  ['КПП', '612501001'],
  ['ОГРН', '1226100025040'],
  ['Р/сч', '40702810452090004826 в ЮГО-ЗАПАДНЫЙ БАНК ПАО СБЕРБАНК'],
  ['БИК', '046015602'],
  ['К/сч', '30101810600000000602'],
  ['ОКПО', '79032575'],
  ['ОКВЭД', '25.11'],
];

const categoryBySlug = Object.fromEntries(categories.map((item) => [item.slug, item]));
const productBySlug = Object.fromEntries(products.map((item) => [item.slug, item]));
const articleBySlug = Object.fromEntries(articles.map((item) => [item.slug, item]));

function navigate(path) {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
  const hash = path.includes('#') ? path.split('#')[1] : '';
  if (hash) {
    window.setTimeout(() => document.getElementById(hash)?.scrollIntoView({ block: 'start' }), 0);
  } else {
    window.scrollTo(0, 0);
  }
}

function Link({ href, children, className }) {
  return (
    <a
      href={href}
      className={className}
      onClick={(event) => {
        if (href.startsWith('/')) {
          event.preventDefault();
          navigate(href);
        }
      }}
    >
      {children}
    </a>
  );
}

function Breadcrumbs({ items }) {
  return (
    <nav className="breadcrumbs" aria-label="Хлебные крошки">
      {items.map((item, index) => (
        <React.Fragment key={`${item.label}-${index}`}>
          {item.href ? <Link href={item.href}>{item.label}</Link> : <span>{item.label}</span>}
          {index < items.length - 1 && <span>/</span>}
        </React.Fragment>
      ))}
    </nav>
  );
}

function Header({ onLead }) {
  return (
    <header className="site-header">
      <div className="nav-row full">
        <Link className="logo" href="/">
          <img src="/logo-gss-modul-final.png" alt="ГСС-Модуль" />
        </Link>

        <nav className="main-nav" aria-label="Основная навигация">
          <Link href="/">Главная</Link>
          <div className="nav-item">
            <Link href="/catalog">Каталог <ChevronDown size={16} /></Link>
            <div className="dropdown">
              {categories.map((item) => (
                <Link href={`/catalog/${item.slug}`} key={item.slug}>{item.title}</Link>
              ))}
            </div>
          </div>
          <Link href="/objects">Готовые объекты</Link>
          <div className="nav-item">
            <Link href="/services">Услуги <ChevronDown size={16} /></Link>
            <div className="dropdown compact">
              {services.map((item) => (
                <Link href={`/services#${item.slug}`} key={item.slug}>{item.title}</Link>
              ))}
            </div>
          </div>
          <Link href="/about">О компании</Link>
          <Link href="/blog">Блог</Link>
          <Link href="/contacts">Контакты</Link>
        </nav>

        <div className="header-actions">
          <div className="quick-contact-icons" aria-label="Быстрые контакты">
            {contactChannels.filter((channel) => channel.title !== 'Телефон').map((channel) => {
              const Icon = channel.icon;
              return (
                <a href={channel.href} target={channel.href.startsWith('http') ? '_blank' : undefined} rel={channel.href.startsWith('http') ? 'noreferrer' : undefined} aria-label={channel.title} key={channel.title}>
                  <Icon size={17} />
                </a>
              );
            })}
          </div>
          <div className="nav-item contact-menu">
            <button className="messenger" type="button"><MessageCircle size={17} /> Написать <ChevronDown size={16} /></button>
            <div className="dropdown compact align-right">
              {contactChannels.filter((channel) => channel.title !== 'Телефон').map((channel) => {
                const Icon = channel.icon;
                return (
                  <a href={channel.href} target={channel.href.startsWith('http') ? '_blank' : undefined} rel={channel.href.startsWith('http') ? 'noreferrer' : undefined} key={channel.title}>
                    <Icon size={16} /> {channel.text}
                  </a>
                );
              })}
            </div>
          </div>
          <a className="phone" href="tel:+79897257788"><Phone size={17} /> +7 989 725-77-88</a>
          <button className="primary small" onClick={() => onLead('Получить расчет')}>Получить расчет</button>
        </div>
      </div>
    </header>
  );
}

function Hero({ onLead }) {
  return (
    <section className="hero section">
      <div className="hero-copy">
        <div className="eyebrow">Собственное производство модульных зданий</div>
        <h1>Модульные здания заводского качества</h1>
        <p>
          Производим бытовки, блок-контейнеры, блочно-модульные здания.
          Напрямую от производителя. Собственное производство. Контроль на
          каждом этапе, монтаж и доставка по всей стране.
        </p>
        <div className="hero-actions">
          <Link className="primary" href="/catalog">Перейти в каталог</Link>
          <button className="secondary" onClick={() => onLead('Получить расчет')}>Получить расчет</button>
        </div>
        <div className="hero-points">
          <span>Бытовки, блок-контейнеры и дачные домики по индивидуальным заказам</span>
          <span>Производим монтаж модульных зданий на объекте заказчика</span>
          <span>Логистика по всей стране и ближнему зарубежью</span>
        </div>
      </div>

      <div className="wire-visual" aria-label="Изображение модульного здания">
        <div className="image-placeholder">Фото готового модульного здания</div>
      </div>
    </section>
  );
}

function HomePage({ onLead }) {
  return (
    <>
      <Hero onLead={onLead} />
      <CatalogPreview onLead={onLead} />
      <ClientsAndTenderBlock onLead={onLead} />
      <EstimateFactors onLead={onLead} />
      <PopularProducts onLead={onLead} />
      <WorkStages />
      <ServicesPreview />
      <AboutPreview onLead={onLead} />
      <TrustBlocks />
      <FaqBlock />
      <BlogPreview />
      <FinalCta onLead={onLead} />
    </>
  );
}

function CatalogPreview({ onLead }) {
  return (
    <section className="section" id="catalog-preview">
      <div className="section-head">
        <div>
          <span className="kicker">Каталог</span>
          <h2>Выберите тип модульного объекта</h2>
          <p>В основе объекта - блок-контейнер. Выберите готовое назначение или индивидуальный проект, чтобы перейти к подходящим решениям.</p>
        </div>
        <Link className="secondary" href="/catalog">Открыть весь каталог</Link>
      </div>
      <div className="category-grid">
        {categories.map((item, index) => (
          <article className="wire-card" key={item.slug}>
            <div className="thumb"><Building2 size={28} /></div>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
            <div className="card-actions">
              <Link className="primary small" href={`/catalog/${item.slug}`}>Перейти в раздел <ArrowRight size={16} /></Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ClientsAndTenderBlock({ onLead }) {
  return (
    <section className="section two-col">
      <div>
        <span className="kicker">Для кого</span>
        <h2>Каталог подходит для бизнеса, частных клиентов и закупок</h2>
        <p>
          Типовые решения можно подобрать для стройплощадки, офиса, КПП,
          вахтового городка, частного участка или нестандартного проекта. Если
          нужен индивидуальный размер, менеджер рассчитает его по запросу клиента.
        </p>
        <div className="hero-actions">
          <Link className="secondary" href="/about">О компании и документах</Link>
          <button className="primary" onClick={() => onLead('Получить расчет')}>Получить расчет</button>
        </div>
      </div>
      <div className="trust-list">
        <div><strong>Бизнес</strong><span>офисы, АБК, КПП, вахтовые городки и модульные объекты</span></div>
        <div><strong>Частным</strong><span>бытовки для дачи, бани и индивидуальные решения</span></div>
        <div><strong>Закупки</strong><span>КП, расчет и предоставление рабочей документации</span></div>
        <div><strong>Под заказ</strong><span>нестандартные размеры доступны для любого клиента</span></div>
      </div>
    </section>
  );
}

function EstimateFactors({ onLead }) {
  return (
    <section className="section muted-section">
      <div className="section-head">
        <div>
          <span className="kicker">Расчет</span>
          <h2>Что влияет на стоимость блок-контейнера или модульного объекта</h2>
          <p>Расчет зависит от параметров объекта, состава работ и местонахождения объекта. Чем точнее исходные данные, тем быстрее менеджер подготовит предложение.</p>
        </div>
        <button className="primary" onClick={() => onLead('Получить расчет')}>Получить расчет</button>
      </div>
      <div className="factor-grid">
        {['Размер и количество блок-контейнеров', 'Базовая комплектация блок-контейнера', 'Регион доставки', 'Доставка и разгрузка', 'Монтаж, фундамент, слаботочные системы, приточно-вытяжная система вентиляции'].map((item) => (
          <div className="factor-card" key={item}>{item}</div>
        ))}
      </div>
      <div className="notice-row">
        <span>Нестандартные размеры рассчитываются индивидуально</span>
      </div>
    </section>
  );
}

function PopularProducts({ onLead }) {
  return (
    <section className="section muted-section">
      <div className="section-head">
        <div>
          <span className="kicker">Каталог объектов</span>
          <h2>Готовые решения из блок-контейнеров</h2>
        </div>
        <Link className="secondary" href="/catalog">Все позиции каталога</Link>
      </div>
      <ProductGrid products={products.slice(0, 6)} onLead={onLead} />
    </section>
  );
}

function WorkStages() {
  return (
    <section className="section">
      <div className="section-head">
        <div>
          <span className="kicker">Этапы работы</span>
          <h2>От заявки до поставки на объект</h2>
        </div>
      </div>
      <div className="stage-grid">
        {workStages.map(([number, title, text]) => (
          <div className="stage-card" key={number}>
            <strong>{number}</strong>
            <h3>{title}</h3>
            <p>{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProductGrid({ products: list, onLead }) {
  return (
    <div className="product-grid">
      {list.map((item) => (
        <article className="product-card" key={item.slug}>
          <div className="object-placeholder">Фото объекта</div>
          <h3>{item.title}</h3>
          <p>{item.meta}</p>
          <strong>{item.price}</strong>
          <div className="card-actions">
            <Link className="primary small" href={`/catalog/object/${item.slug}`}>Подробнее <ArrowRight size={16} /></Link>
          </div>
        </article>
      ))}
    </div>
  );
}

function ServicesPreview() {
  return (
    <section className="section" id="services-preview">
      <div className="section-head">
        <div>
          <span className="kicker">Услуги</span>
          <h2>Доставка, монтаж и инженерные работы для модульных объектов</h2>
          <p>На отдельной странице можно изучить, что входит в каждую услугу и когда она нужна.</p>
        </div>
        <Link className="secondary" href="/services">Перейти в услуги</Link>
      </div>
      <div className="service-grid">
        {services.slice(0, 6).map((service) => (
          <Link className="service-card" href={`/services#${service.slug}`} key={service.slug}>
            <h3>{service.title}</h3>
            <p>{service.text}</p>
            <span>Подробнее <ArrowRight size={16} /></span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function AboutPreview({ onLead }) {
  return (
    <section className="section two-col" id="about-preview">
      <div>
        <span className="kicker">О компании</span>
        <h2>Производим модульные здания на собственной площадке</h2>
        <p>
          Собственное производство важно для корпоративных заказчиков, тендеров,
          лизинговых компаний и частных клиентов: понятнее сроки, комплектация,
          договор и ответственность за результат.
        </p>
        <div className="hero-actions">
          <Link className="secondary" href="/about">Подробнее о компании</Link>
        </div>
      </div>
      <div className="trust-list">
        <div><strong>01</strong><span>Собственное производство</span></div>
        <div><strong>02</strong><span>Поставка по всей России</span></div>
        <div><strong>03</strong><span>Расчеты для бизнеса, закупок и частных клиентов</span></div>
        <div><strong>04</strong><span>Работа с тендерами, документами и лизинговыми компаниями</span></div>
      </div>
    </section>
  );
}

function TrustBlocks() {
  return (
    <section className="section">
      <div className="section-head">
        <div>
          <span className="kicker">Документы и контроль</span>
          <h2>Подтверждаем производство, комплектацию и условия поставки</h2>
        </div>
      </div>
      <div className="trust-grid">
        <div className="trust-card">
          <h3>Опыт поставок</h3>
          <p>Поставляем блок-контейнеры и модульные объекты для строительных площадок, бизнеса, закупок, вахтовых поселков и частных задач.</p>
        </div>
        <div className="trust-card">
          <h3>Документы</h3>
          <p>Предоставление сертификатов соответствия, пожарной безопасности, сейсмостойкости, рабочей документации.</p>
        </div>
        <div className="trust-card">
          <h3>Контроль производства</h3>
          <p>Каркас, материалы, отделка и комплектация проходят проверку на этапах изготовления перед отгрузкой объекта.</p>
        </div>
        <div className="trust-card">
          <h3>Поставка по России</h3>
          <p>Рассчитываем доставку, разгрузку, монтаж и дополнительные работы под регион, площадку и габариты модулей.</p>
        </div>
      </div>
    </section>
  );
}

function FaqBlock() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <section className="section muted-section">
      <div className="section-head">
        <div>
          <span className="kicker">FAQ</span>
          <h2>Частые вопросы о блок-контейнерах и модульных зданиях</h2>
        </div>
      </div>
      <div className="faq-list">
        {faq.map(([question, answer], index) => (
          <div className="faq-item" key={question}>
            <button onClick={() => setOpenFaq(openFaq === index ? -1 : index)}>
              {question} <ChevronDown size={18} />
            </button>
            {openFaq === index && <p>{answer}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}

function BlogPreview() {
  return (
    <section className="section muted-section">
      <div className="section-head">
        <div>
          <span className="kicker">Блог</span>
          <h2>Полезные статьи для тех, кто выбирает блок-контейнер или модульное здание</h2>
        </div>
        <Link className="secondary" href="/blog">Все статьи</Link>
      </div>
      <div className="blog-grid">
        {articles.map((item) => (
          <article className="wire-card small-card" key={item.slug}>
            <FileText size={28} />
            <h3>{item.title}</h3>
            <p>Разбираем, какие решения подходят под разные задачи и что нужно для расчета.</p>
            <Link className="primary small" href={`/blog/${item.slug}`}>Читать статью</Link>
          </article>
        ))}
      </div>
    </section>
  );
}

function CatalogPage({ slug, onLead }) {
  const activeCategory = slug ? categoryBySlug[slug] : null;
  const filteredProducts = activeCategory
    ? products.filter((item) => item.category === slug)
    : products;

  return (
    <PageFrame
      kicker="Каталог"
      title={activeCategory ? activeCategory.title : 'Каталог модульных зданий и блок-контейнеров'}
      text={activeCategory ? activeCategory.text : 'Выберите категорию, откройте карточку объекта и изучите подходящие решения.'}
      crumbs={[
        { label: 'Главная', href: '/' },
        { label: 'Каталог', href: '/catalog' },
        ...(activeCategory ? [{ label: activeCategory.title }] : []),
      ]}
    >
      <div className="catalog-layout">
        <aside className="sidebar">
          <h3>Разделы каталога</h3>
          <Link className={!activeCategory ? 'active' : ''} href="/catalog">Все позиции</Link>
          {categories.map((item) => (
            <Link className={slug === item.slug ? 'active' : ''} href={`/catalog/${item.slug}`} key={item.slug}>{item.title}</Link>
          ))}
        </aside>
        <div>
          <div className="section-head compact-head">
            <p>{filteredProducts.length} позиций в разделе</p>
          </div>
          <ProductGrid products={filteredProducts} onLead={onLead} />
          <Pagination />
          <InlineCta
            title="Нужен объект под ваши размеры или планировку?"
            text="Оставьте заявку, если не нашли подходящую карточку в каталоге. Менеджер уточнит задачу и подготовит предложение."
            button="Получить расчет"
            onClick={() => onLead('Получить расчет')}
          />
        </div>
      </div>
    </PageFrame>
  );
}

function Pagination() {
  return (
    <nav className="pagination" aria-label="Пагинация">
      <button className="active">1</button>
      <button>2</button>
      <button>3</button>
      <button>Следующая</button>
    </nav>
  );
}

function InlineCta({ title, text, button, onClick }) {
  return (
    <section className="inline-cta">
      <div>
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
      <button className="primary" onClick={onClick}>{button}</button>
    </section>
  );
}

function ObjectPage({ slug, onLead }) {
  const product = productBySlug[slug] || products[0];
  const related = products.filter((item) => item.slug !== product.slug).slice(0, 3);
  const [activeTab, setActiveTab] = useState('description');
  const tabContent = {
    description: ['Описание', 'Блок-контейнер используется как самостоятельное помещение или как часть блочно-модульного здания. На его базе можно организовать бытовку, пост охраны, офис, склад, сантехнический модуль или помещение для персонала. Конфигурация подбирается под задачу заказчика: назначение, количество блоков, планировку, регион доставки и условия эксплуатации.'],
    specs: ['Характеристики', 'В карточке фиксируются габариты, высота, количество модулей, тип планировки, варианты проемов, состав внутренней и наружной отделки, требования к площадке и условия эксплуатации. Для негабаритных решений ширина, длина и планировка рассчитываются по запросу заказчика.'],
    equipment: ['Комплектация', 'Базовая комплектация подбирается под назначение объекта. В расчет могут входить каркас, наружная обшивка, утепление, внутренняя отделка, окна, двери, электроснабжение, сантехнические решения, вентиляция и дополнительные слаботочные системы. Итоговый состав фиксируется в предложении.'],
    delivery: ['Доставка и монтаж', 'Доставка, разгрузка, монтаж, фундамент и подключение систем рассчитываются по запросу. Для объектов из нескольких блок-контейнеров команда выполняет стыковку модулей, монтаж на площадке заказчика и подготовку здания к дальнейшей эксплуатации.'],
  };

  return (
    <PageFrame
      kicker="Карточка объекта"
      title={product.title}
      text="Изучите параметры объекта, варианты отделки, дополнительные услуги и похожие решения из каталога."
      crumbs={[
        { label: 'Главная', href: '/' },
        { label: 'Каталог', href: '/catalog' },
        { label: product.title },
      ]}
    >
      <div className="object-detail">
        <div className="gallery-placeholder">Фотогалерея объекта</div>
        <aside className="detail-panel">
          <h3>{product.price}</h3>
          <p>{product.meta}</p>
          <p>Доставка, монтаж, фундамент рассчитываются по запросу.</p>
          <button className="primary" onClick={() => onLead({ title: 'Получить расчет', product: product.title })}>Получить расчет</button>
          <button className="ghost" onClick={() => onLead({ title: 'Получить КП', product: product.title })}>Получить КП</button>
        </aside>
      </div>
      <div className="object-info-grid">
        <div><strong>Назначение</strong><span>{product.meta}</span></div>
        <div><strong>Срок производства</strong><span>4-5 рабочих дней после поступления средств</span></div>
        <div><strong>Комплектация</strong><span>Базовая комплектация под задачу заказчика</span></div>
        <div><strong>Услуги</strong><span>Доставка, монтаж, фундамент по запросу</span></div>
      </div>
      <div className="object-tabs">
        <div className="tab-buttons">
          {Object.entries(tabContent).map(([key, [label]]) => (
            <button className={activeTab === key ? 'active' : ''} onClick={() => setActiveTab(key)} key={key}>{label}</button>
          ))}
        </div>
        <div className="tab-panel">
          <h3>{tabContent[activeTab][0]}</h3>
          <p>{tabContent[activeTab][1]}</p>
        </div>
      </div>
      <div className="finish-grid">
        <section>
          <h2>Варианты внутренней отделки</h2>
          <div className="photo-grid">
            <div>Фото внутренней отделки 1</div>
            <div>Фото внутренней отделки 2</div>
            <div>Фото внутренней отделки 3</div>
          </div>
        </section>
        <section>
          <h2>Варианты наружной отделки</h2>
          <div className="photo-grid">
            <div>Фото наружной отделки 1</div>
            <div>Фото наружной отделки 2</div>
            <div>Фото наружной отделки 3</div>
          </div>
        </section>
      </div>
      <section className="object-services">
        <h2>Услуги для монтажа модульного здания</h2>
        <div className="service-mini-grid">
          {services.slice(0, 6).map((service) => (
            <Link className="service-mini-card" href={`/services#${service.slug}`} key={service.slug}>
              <h3>{service.title}</h3>
              <span>Перейти к услуге <ArrowRight size={16} /></span>
            </Link>
          ))}
        </div>
      </section>
      <section className="related-section">
        <div className="section-head compact-head">
          <h2>Похожие объекты</h2>
          <Link className="secondary" href="/catalog">В каталог</Link>
        </div>
        <ProductGrid products={related} onLead={onLead} />
      </section>
      <FinalCta onLead={onLead} />
    </PageFrame>
  );
}

function ServicesPage({ onLead }) {
  return (
    <PageFrame
      kicker="Услуги"
      title="Услуги для поставки модульного здания"
      text="Доставка, монтаж, фундамент и коммуникации подбираются под объект, регион и условия площадки."
      crumbs={[
        { label: 'Главная', href: '/' },
        { label: 'Услуги' },
      ]}
    >
      <div className="service-list">
        {services.map((item) => (
          <section className="service-detail" id={item.slug} key={item.slug}>
            <div>
              <h2>{item.title}</h2>
              <p>{item.text}</p>
              <p>{item.details}</p>
            </div>
            <button className="secondary" onClick={() => onLead('Оставить заявку')}>Оставить заявку</button>
          </section>
        ))}
      </div>
      <InlineCta
        title="Нужны услуги вместе с поставкой объекта?"
        text="Опишите задачу и площадку. Менеджер подскажет, какие работы стоит заложить заранее."
        button="Оставить заявку"
        onClick={() => onLead('Оставить заявку')}
      />
    </PageFrame>
  );
}

function ObjectsPage({ onLead }) {
  return (
    <PageFrame
      kicker="Готовые объекты"
      title="Примеры модульных объектов для разных задач"
      text="Посмотрите готовые решения и перейдите в карточку похожего объекта."
      crumbs={[
        { label: 'Главная', href: '/' },
        { label: 'Готовые объекты' },
      ]}
    >
      <ProductGrid products={products.slice(2, 8)} onLead={onLead} />
      <Pagination />
      <InlineCta
        title="Нужен похожий объект?"
        text="Расскажите, какое помещение нужно и в каком регионе находится объект."
        button="Получить расчет"
        onClick={() => onLead('Получить расчет')}
      />
    </PageFrame>
  );
}

function AboutPage({ onLead }) {
  return (
    <PageFrame
      kicker="О компании"
      title="Производитель модульных зданий и блок-контейнеров"
      text="ГСС-Модуль производит блок-контейнеры и модульные объекты для бизнеса, строительства, госзаказов, вахтовых поселков и частных задач."
      crumbs={[
        { label: 'Главная', href: '/' },
        { label: 'О компании' },
      ]}
    >
      <div className="two-col">
        <div className="content-block">
          <h2>Собственное производство</h2>
          <p>Мы изготавливаем блок-контейнеры на собственной производственной площадке и собираем из них готовые модульные объекты: офисы, КПП, вахтовые городки, общежития, сантехнические модули и индивидуальные проекты.</p>
          <h2>Работаем с юрлицами, закупками и лизинговыми компаниями</h2>
          <p>Подготавливаем расчеты, коммерческие предложения, реквизиты и документы для согласования. Для тендерных, корпоративных заказчиков и лизинговых компаний важны прозрачные условия, сроки и состав поставки.</p>
          <h2>Поставка по всей России</h2>
          <p>Организуем поставку блок-контейнеров и модульных зданий в регионы России. Доставка, монтаж, фундамент и коммуникации рассчитываются отдельно под конкретный объект.</p>
        </div>
        <aside className="detail-panel">
          <h3>Нужен расчет или КП?</h3>
          <p>Укажите назначение объекта, размер, комплектацию и регион поставки. Менеджер подготовит предложение.</p>
          <button className="primary" onClick={() => onLead('Получить расчет')}>Получить расчет</button>
        </aside>
      </div>
    </PageFrame>
  );
}

function BlogPage({ slug }) {
  const article = slug ? articleBySlug[slug] : null;
  const similarArticles = articles.filter((item) => item.slug !== slug).slice(0, 2);

  if (article) {
    return (
      <PageFrame
        kicker="Статья"
        title={article.title}
        text="Практический материал для тех, кто выбирает блок-контейнер, модульное здание или готовое решение под задачу."
        crumbs={[
          { label: 'Главная', href: '/' },
          { label: 'Блог', href: '/blog' },
          { label: article.title },
        ]}
      >
        <div className="content-block article-body">
          <h2>Когда нужен блок-контейнер, а когда модульное здание</h2>
          <p>Если нужно одно помещение для охраны, склада, офиса на стройплощадке или временного размещения персонала, чаще всего достаточно одного блок-контейнера. Если задача шире - общежитие, АБК, вахтовый городок, санпропускник или офисный блок - объект собирают из нескольких модулей.</p>
          <h2>Какие данные подготовить перед обращением</h2>
          <p>Для первичного расчета менеджеру нужны назначение объекта, желаемые размеры, количество модулей, комплектация, регион поставки и перечень необходимых услуг: доставка, монтаж, фундамент, электрика, водоснабжение или канализация.</p>
          <h2>Почему цена считается индивидуально</h2>
          <p>Даже одинаковые по размеру модули могут отличаться по отделке, утеплению, инженерным работам, требованиям площадки и способу доставки. Поэтому каталог помогает выбрать направление, а финальное предложение готовится после уточнения задачи.</p>
          <div className="article-actions">
            <Link className="secondary" href="/catalog">Перейти в каталог</Link>
            <button className="primary" onClick={() => navigate('/contacts')}>Получить расчет</button>
          </div>
        </div>
        <section className="related-section">
          <div className="section-head compact-head">
            <h2>Похожие статьи</h2>
            <Link className="secondary" href="/blog">Все статьи</Link>
          </div>
          <div className="blog-grid">
            {similarArticles.map((item) => (
              <article className="wire-card small-card" key={item.slug}>
                <FileText size={28} />
                <h3>{item.title}</h3>
                <p>Материал по выбору, комплектации и поставке модульных объектов.</p>
                <Link className="primary small" href={`/blog/${item.slug}`}>Читать статью</Link>
              </article>
            ))}
          </div>
        </section>
        <InlineCta
          title="Нужен расчет после чтения статьи?"
          text="Опишите задачу и параметры объекта. Менеджер поможет подобрать подходящее решение."
          button="Получить расчет"
          onClick={() => navigate('/contacts')}
        />
      </PageFrame>
    );
  }

  return (
    <PageFrame
      kicker="Блог"
      title="Статьи о модульных зданиях, блок-контейнерах и комплектациях"
      text="Материалы помогают выбрать тип объекта, разобраться в комплектации и понять, какие данные нужны для расчета."
      crumbs={[
        { label: 'Главная', href: '/' },
        { label: 'Блог' },
      ]}
    >
      <div className="blog-grid">
        {articles.map((item) => (
          <article className="wire-card small-card" key={item.slug}>
            <FileText size={28} />
            <h3>{item.title}</h3>
            <p>Практические советы по выбору, комплектации и поставке модульных объектов.</p>
            <Link className="primary small" href={`/blog/${item.slug}`}>Читать статью</Link>
          </article>
        ))}
      </div>
      <Pagination />
      <section className="telegram-cta">
        <div>
          <h2>Подпишитесь на Telegram-канал</h2>
          <p>Публикуем новости производства, примеры объектов, полезные материалы и обновления каталога.</p>
        </div>
        <a className="primary" href="https://t.me/gss_modul" target="_blank" rel="noreferrer">Подписаться</a>
      </section>
    </PageFrame>
  );
}

function ContactsPage({ onLead }) {
  return (
    <PageFrame
      kicker="Контакты"
      title="Свяжитесь с нами для расчета модульного объекта"
      text="Позвоните, напишите в удобный мессенджер или оставьте заявку. Все обращения попадут менеджерам в amoCRM."
      crumbs={[
        { label: 'Главная', href: '/' },
        { label: 'Контакты' },
      ]}
    >
      <div className="contacts-grid">
        {contactChannels.map((channel) => {
          const Icon = channel.icon;
          return (
            <a href={channel.href} target={channel.href.startsWith('http') ? '_blank' : undefined} rel={channel.href.startsWith('http') ? 'noreferrer' : undefined} key={channel.title}>
              <Icon size={20} /> {channel.text}
            </a>
          );
        })}
        <button className="primary" onClick={() => onLead('Получить расчет')}>Получить расчет</button>
      </div>
      <div className="contacts-layout">
        <div className="content-block">
          <h2>Отдел продаж</h2>
          <p>Менеджер уточнит назначение объекта, размер, комплектацию, количество модулей, регион поставки и дополнительные услуги.</p>
          <h2>Производство и документы</h2>
          <p>Предоставим адрес производства, реквизиты компании, режим работы и юридическую информацию для договора, закупки или внутреннего согласования.</p>
          <h2>Для тендеров</h2>
          <p>Можно отправить ТЗ, требования закупки, проект или запрос от лизинговой компании. Подготовим данные для расчета и коммерческого предложения.</p>
          <h2>Реквизиты</h2>
          <dl className="requisites-list">
            {requisites.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="contact-form">
          <h2>Оставить заявку</h2>
          <label>
            Контакт
            <input placeholder="Телефон, мессенджер или email" />
          </label>
          <label>
            Задача
            <textarea placeholder="Что нужно изготовить, размер, регион, сроки" />
          </label>
          <button className="primary" onClick={() => onLead('Оставить заявку')}>Отправить заявку</button>
        </div>
      </div>
      <div className="map-placeholder">Карта: производство / офис / география поставок</div>
    </PageFrame>
  );
}

function PageFrame({ kicker, title, text, children, crumbs }) {
  const breadcrumbItems = crumbs || [
    { label: 'Главная', href: '/' },
    { label: kicker },
  ];

  return (
    <>
      <section className="section page-hero">
        <Breadcrumbs items={breadcrumbItems} />
        <span className="kicker">{kicker}</span>
        <h1>{title}</h1>
        <p>{text}</p>
      </section>
      <section className="section page-content">
        {children}
      </section>
    </>
  );
}

function FinalCta({ onLead }) {
  return (
    <section className="section final-cta">
      <h2>Не нашли подходящий объект в каталоге?</h2>
      <p>Опишите задачу: размер, комплектацию, количество модулей, регион поставки и перечень необходимых услуг. Подготовим расчет под ваше ТЗ.</p>
      <button className="primary" onClick={() => onLead('Получить расчет')}>Получить расчет</button>
    </section>
  );
}

function Footer({ onLead }) {
  return (
    <footer className="footer">
      <div>
        <img src="/logo-gss-modul-final.png" alt="ГСС-Модуль" />
        <p>Производство модульных зданий и блок-контейнеров.</p>
      </div>
      <div>
        <h3>Каталог</h3>
        {categories.slice(0, 4).map((item) => <Link href={`/catalog/${item.slug}`} key={item.slug}>{item.title}</Link>)}
      </div>
      <div>
        <h3>Разделы</h3>
        <Link href="/">Главная</Link>
        <Link href="/services">Услуги</Link>
        <Link href="/objects">Готовые объекты</Link>
        <Link href="/about">О компании</Link>
        <Link href="/blog">Блог</Link>
      </div>
      <div>
        <h3>Контакты</h3>
        <a href="tel:+79897257788"><Phone size={16} /> +7 989 725-77-88</a>
        <a href="https://t.me/gss_modul" target="_blank" rel="noreferrer"><Send size={16} /> @gss_modul</a>
        <a href="https://max.ru/u/f9LHodD0cOI-tNk1llaOsGzv2jwfODx7cfRaWwXr3bL_GByF-26fUWXS5yg" target="_blank" rel="noreferrer"><MessageCircle size={16} /> MAX</a>
        <a href="mailto:info@example.ru"><Mail size={16} /> info@example.ru</a>
        <button className="primary small" onClick={() => onLead('Получить расчет')}>Получить расчет</button>
      </div>
    </footer>
  );
}

function LeadModal({ lead, onClose }) {
  if (!lead) return null;
  const data = typeof lead === 'string' ? { title: lead } : lead;

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal">
        <button className="close" onClick={onClose} aria-label="Закрыть"><X size={20} /></button>
        <h2>{data.title}</h2>
        <p>Оставьте контакт. Менеджер уточнит детали и подготовит предложение.</p>
        {data.product && <div className="selected-product">Выбрано: {data.product}</div>}
        <label>
          Телефон, Telegram, MAX или почта
          <input placeholder="+7 ... / @username / email" />
        </label>
        <label>
          Что нужно
          <textarea placeholder="Например: блок-контейнер 6 x 2.4 м, офис, КПП, вахтовый городок" />
        </label>
        <button className="primary" onClick={onClose}>Отправить</button>
      </div>
    </div>
  );
}

function usePathname() {
  const [pathname, setPathname] = useState(window.location.pathname);
  React.useEffect(() => {
    const handler = () => setPathname(window.location.pathname);
    window.addEventListener('popstate', handler);
    return () => window.removeEventListener('popstate', handler);
  }, []);
  return pathname;
}

function App() {
  const [modalLead, setModalLead] = useState(null);
  const pathname = usePathname();
  const parts = useMemo(() => pathname.split('/').filter(Boolean), [pathname]);

  React.useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      window.setTimeout(() => document.getElementById(hash)?.scrollIntoView({ block: 'start' }), 0);
    }
  }, [pathname]);

  let page = <HomePage onLead={setModalLead} />;
  if (parts[0] === 'catalog' && parts[1] === 'object') page = <ObjectPage slug={parts[2]} onLead={setModalLead} />;
  else if (parts[0] === 'catalog') page = <CatalogPage slug={parts[1]} onLead={setModalLead} />;
  else if (parts[0] === 'services') page = <ServicesPage onLead={setModalLead} />;
  else if (parts[0] === 'objects') page = <ObjectsPage onLead={setModalLead} />;
  else if (parts[0] === 'about') page = <AboutPage onLead={setModalLead} />;
  else if (parts[0] === 'blog') page = <BlogPage slug={parts[1]} />;
  else if (parts[0] === 'contacts') page = <ContactsPage onLead={setModalLead} />;

  return (
    <>
      <Header onLead={setModalLead} />
      <main>{page}</main>
      <Footer onLead={setModalLead} />
      <LeadModal lead={modalLead} onClose={() => setModalLead(null)} />
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
