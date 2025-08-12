import React, { useMemo, useState } from "react";

function Stat({ label, value }) {
  return (
    <div className="flex flex-col items-center p-4 rounded-2xl bg-white/70 shadow-sm">
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-sm text-gray-600 text-center">{label}</div>
    </div>
  );
}

function Step({ n, title, text }) {
  return (
    <div className="flex gap-4 items-start">
      <div className="h-9 w-9 rounded-full bg-emerald-600 text-white flex items-center justify-center font-semibold shrink-0">{n}</div>
      <div>
        <div className="font-semibold">{title}</div>
        <div className="text-gray-600 text-sm">{text}</div>
      </div>
    </div>
  );
}

const perks = [
  { title: "Бесплатная мойка", desc: "сертификат на 1 мойку на партнёрской станции" },
  { title: "Шиномонтаж -15%", desc: "скидка у партнёров на услуги шиномонтажа" },
  { title: "10 л топлива", desc: "сертификат на топливо у партнёров" },
];

export default function Landing() {
  const [quizOpen, setQuizOpen] = useState(false);
  const [wheelOpen, setWheelOpen] = useState(false);
  const [selectedPerk, setSelectedPerk] = useState(null);
  const [spinning, setSpinning] = useState(false);

  const [form, setForm] = useState({
    makeModel: "",
    year: "",
    storage: "",
    age: "",
    experience: "",
    franchise: "Без франшизы",
    contact: "",
  });

  const yearOptions = useMemo(() => {
    const now = new Date().getFullYear();
    return Array.from({ length: 25 }, (_, i) => String(now - i));
  }, []);

  function submitQuiz(e) {
    e?.preventDefault?.();
    if (!form.makeModel || !form.year || !form.storage || !form.age || !form.experience || !form.contact) {
      alert("Пожалуйста, заполните обязательные поля.");
      return;
    }
    console.log("lead_submit", form);
    setQuizOpen(false);
    alert("Спасибо! В течение 15–30 минут пришлём 3–5 предложений в WhatsApp.");
  }

  function spinWheel() {
    if (spinning) return;
    setSpinning(true);
    setSelectedPerk(null);
    const target = Math.floor(Math.random() * perks.length);
    setTimeout(() => {
      setSelectedPerk(perks[target]);
      setSpinning(false);
    }, 1200);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white text-gray-900">
      {/* NAV */}
      <header className="sticky top-0 z-30 backdrop-blur bg-white/70 border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold">SI</div>
            <div className="font-semibold">Сентрас Иншуранс • КАСКО Алматы</div>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <a href="#how" className="hover:text-emerald-700">Как это работает</a>
            <a href="#cases" className="hover:text-emerald-700">Кейсы</a>
            <a href="#stats" className="hover:text-emerald-700">Статистика</a>
            <a href="#programs" className="hover:text-emerald-700">Программы</a>
            <a href="#faq" className="hover:text-emerald-700">FAQ</a>
            <button onClick={() => setQuizOpen(true)} className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700">Рассчитать</button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1600&auto=format&fit=crop')] bg-cover bg-center opacity-20" />
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 relative">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
              КАСКО от <span className="text-emerald-700">Сентрас Иншуранс</span> в Алматы —
              <br className="hidden md:block" /> быстро и без переплат
            </h1>
            <p className="mt-4 text-lg text-gray-700">
              Я — Абай Садыкбаев, директор управления «Сентрас Иншуранс». Объясняю сложное простыми словами, подбираю понятные конфигурации. Оформление выполняют лицензированные сотрудники.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button onClick={() => setQuizOpen(true)} className="px-6 py-3 rounded-2xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700">
                Рассчитать КАСКО за 60 секунд
              </button>
              <a href="https://wa.me/77000000000" target="_blank" rel="noreferrer"
                 className="px-6 py-3 rounded-2xl border border-emerald-600 text-emerald-700 font-semibold hover:bg-emerald-50">
                Написать в WhatsApp
              </a>
            </div>
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Stat label="Должность" value="Директор управления" />
              <Stat label="Опыт в автостраховании" value="12 лет" />
              <Stat label="Оформление" value="в 1 день" />
              <Stat label="Город" value="Алматы" />
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="max-w-6xl mx-auto px-4 py-14">
        <h2 className="text-2xl md:text-3xl font-bold">Как это работает</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <Step n={1} title="Оставляете данные авто" text="Через быстрый квиз или в WhatsApp — займёт 60 секунд" />
          <Step n={2} title="Сравниваю 3–5 предложений" text="Цена, франшиза, покрытие — объясняю простым языком" />
          <Step n={3} title="Оформляем полис" text="Онлайн-оплата или офис — как вам удобно" />
        </div>
      </section>

      {/* BENEFITS */}
      <section className="bg-emerald-50 border-y">
        <div className="max-w-6xl mx-auto px-4 py-14">
          <h2 className="text-2xl md:text-3xl font-bold">Почему со мной выгодно</h2>
          <div className="mt-8 grid md:grid-cols-4 gap-6">
            <div className="p-5 bg-white rounded-2xl shadow-sm">
              <div className="font-semibold">Директор управления «Сентрас Иншуранс»</div>
              <p className="text-sm text-gray-600 mt-2">Объясняю сложное простыми словами. Оформление выполняют лицензированные сотрудники/агенты компании.</p>
            </div>
            <div className="p-5 bg-white rounded-2xl shadow-sm">
              <div className="font-semibold">Экономия до 30% с франшизой</div>
              <p className="text-sm text-gray-600 mt-2">Подскажу размер франшизы, чтобы сэкономить без потери важного покрытия.</p>
            </div>
            <div className="p-5 bg-white rounded-2xl shadow-sm">
              <div className="font-semibold">Помощь при страховом случае</div>
              <p className="text-sm text-gray-600 mt-2">Подскажу шаги и документы, сопровожу до выплаты.</p>
            </div>
            <div className="p-5 bg-white rounded-2xl shadow-sm">
              <div className="font-semibold">Оформление в 1 день</div>
              <p className="text-sm text-gray-600 mt-2">Большинство полисов оформляем в день обращения.</p>
            </div>
          </div>
        </div>
      </section>

      {/* QUIZ PREVIEW */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold">Узнайте цену КАСКО сейчас</h3>
              <p className="text-gray-600 text-sm">Заполните 6 полей — пришлю подборку в WhatsApp за 15–30 минут.</p>
            </div>
            <button onClick={() => setQuizOpen(true)} className="px-5 py-3 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700">Открыть квиз</button>
          </div>
        </div>
      </section>

      {/* CASES */}
      <section id="cases" className="max-w-6xl mx-auto px-4 py-14">
        <h2 className="text-2xl md:text-3xl font-bold">Реальные ситуации и выплаты</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="p-5 bg-white rounded-2xl shadow-sm border">
            <div className="text-sm text-emerald-700 font-semibold">Угон • Toyota Camry</div>
            <div className="mt-2 font-medium">Выплата 3,5 млн ₸</div>
            <p className="text-sm text-gray-600 mt-2">Клиент получил деньги за 7 рабочих дней. Сопровождал от заявления до выплаты.</p>
          </div>
          <div className="p-5 bg-white rounded-2xl shadow-sm border">
            <div className="text-sm text-emerald-700 font-semibold">Стекло • Lexus RX</div>
            <div className="mt-2 font-medium">Замена без справок</div>
            <p className="text-sm text-gray-600 mt-2">По доп.покрытию. Подсказал, как оформить быстро без лишних поездок.</p>
          </div>
          <div className="p-5 bg-white rounded-2xl shadow-sm border">
            <div className="text-sm text-emerald-700 font-semibold">ДТП • Mazda CX-5</div>
            <div className="mt-2 font-medium">Ремонт за счёт страховой</div>
            <p className="text-sm text-gray-600 mt-2">Организовал осмотр, согласование, ремонт на партнёрском СТО.</p>
          </div>
        </div>
      </section>

      {/* STATS (демо) */}
      <section id="stats" className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-14">
          <h2 className="text-2xl md:text-3xl font-bold">ДТП: ориентиры для выбора покрытия</h2>
          <p className="text-sm text-gray-600 mt-2">Демо‑данные для MVP. Перед запуском заменим на официальные источники.</p>
          <div className="mt-8 grid md:grid-cols-4 gap-6">
            <div className="p-5 bg-emerald-50 rounded-2xl border">
              <div className="text-sm text-emerald-700 font-semibold">Алматы</div>
              <div className="text-2xl font-bold mt-1">~1,5 млн авто</div>
              <div className="text-xs text-gray-600 mt-2">Оценка автопарка города. Для примера.</div>
            </div>
            <div className="p-5 bg-emerald-50 rounded-2xl border">
              <div className="text-sm text-emerald-700 font-semibold">Казахстан (год)</div>
              <div className="text-2xl font-bold mt-1">~31 600 ДТП</div>
              <div className="text-xs text-gray-600 mt-2">Иллюстративная цифра. Заменим на официальный отчёт.</div>
            </div>
            <div className="p-5 bg-emerald-50 rounded-2xl border">
              <div className="text-sm text-emerald-700 font-semibold">Города‑лидеры</div>
              <div className="text-2xl font-bold mt-1">Алматы • Астана • Шымкент</div>
              <div className="text-xs text-gray-600 mt-2">Показываем географию риска. Обновим источники при релизе.</div>
            </div>
            <div className="p-5 bg-emerald-50 rounded-2xl border">
              <div className="text-sm text-emerald-700 font-semibold">Выплаты по ОСАГО</div>
              <div className="text-2xl font-bold mt-1">~130 тыс. случаев</div>
              <div className="text-xs text-gray-600 mt-2">Демо‑оценка для визуализации масштаба рынка.</div>
            </div>
          </div>
          <div className="text-[11px] text-gray-500 mt-4">*Демо‑данные для MVP. В проде укажем точные цифры и ссылки на источники.</div>
        </div>
      </section>

      {/* PROGRAMS */}
      <section id="programs" className="bg-emerald-50 border-y">
        <div className="max-w-6xl mx-auto px-4 py-14">
          <h2 className="text-2xl md:text-3xl font-bold">Специальные программы сервиса</h2>
          <p className="text-sm text-gray-700 mt-2">Маркетинговые пакеты. Оформление полисов — по действующим правилам страхования «Сентрас Иншуранс».</p>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className="p-5 bg-white rounded-2xl shadow-sm border">
              <div className="text-sm text-emerald-700 font-semibold">EV Care • электромобили</div>
              <div className="font-medium mt-1">Поддержка китайских брендов (BYD, Zeekr и др.)</div>
              <ul className="list-disc list-inside text-sm text-gray-600 mt-2 space-y-1">
                <li>Учёт стоимости кузовных деталей и электроники</li>
                <li>Партнёр: установка wallbox/диагностика HV-системы</li>
                <li>Памятка по эвакуации/зарядке</li>
              </ul>
              <button onClick={() => setQuizOpen(true)} className="mt-4 px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm font-medium">Рассчитать под мой EV</button>
            </div>
            <div className="p-5 bg-white rounded-2xl shadow-sm border">
              <div className="text-sm text-emerald-700 font-semibold">Первый полис</div>
              <div className="font-medium mt-1">Для новых автовладельцев</div>
              <ul className="list-disc list-inside text-sm text-gray-600 mt-2 space-y-1">
                <li>Голосовой разбор 30–45 сек: что обязательно, где экономить</li>
                <li>Партнёрские бонусы: мойка/шинный сервис</li>
                <li>PDF‑чек‑лист «Что делать при ДТП»</li>
              </ul>
              <button onClick={() => setQuizOpen(true)} className="mt-4 px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm font-medium">Хочу первый расчёт</button>
            </div>
            <div className="p-5 bg-white rounded-2xl shadow-sm border">
              <div className="text-sm text-emerald-700 font-semibold">Продление+</div>
              <div className="font-medium mt-1">Для действующих клиентов</div>
              <ul className="list-disc list-inside text-sm text-gray-600 mt-2 space-y-1">
                <li>Напоминания за 30/14/7/3 дней, быстрый пересчёт</li>
                <li>Ревизия франшизы и покрытий по факту эксплуатации</li>
                <li>Учёт истории убытков при подборе условий</li>
              </ul>
              <button onClick={() => setQuizOpen(true)} className="mt-4 px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm font-medium">Пересчитать продление</button>
            </div>
          </div>
          <div className="text-[11px] text-gray-500 mt-4">*Партнёрские бонусы не являются скидкой на страховой тариф и предоставляются сторонними организациями.</div>
        </div>
      </section>

      {/* PERKS SECTION + MODAL TRIGGER */}
      <section className="bg-emerald-50 border-y">
        <div className="max-w-6xl mx-auto px-4 py-14">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h2 className="text-2xl md:text-3xl font-bold">Получите бонус от партнёров</h2>
              <p className="text-gray-700 mt-2">После расчёта КАСКО — шанс выиграть полезный бонус. Денежные скидки на страховой тариф не разыгрываем (юридически корректно).</p>
              <div className="mt-4 flex gap-3">
                <button onClick={() => setWheelOpen(true)} className="px-5 py-3 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700">Испытать удачу</button>
                <button onClick={() => setQuizOpen(true)} className="px-5 py-3 rounded-xl border border-emerald-600 text-emerald-700 font-medium hover:bg-emerald-50">Сначала расчёт</button>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="p-5 bg-white rounded-2xl shadow-sm border">
                <div className="font-semibold">Примеры бонусов</div>
                <ul className="list-disc list-inside text-sm text-gray-600 mt-2 space-y-1">
                  <li>Бесплатная мойка</li>
                  <li>Шиномонтаж −15%</li>
                  <li>10 л топлива</li>
                </ul>
                <div className="text-xs text-gray-500 mt-2">Бонусы — от партнёров. Денежные скидки на страховой тариф не разыгрываются.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="max-w-6xl mx-auto px-4 py-14">
        <h2 className="text-2xl md:text-3xl font-bold">Частые вопросы</h2>
        <div className="mt-6 grid md:grid-cols-2 gap-6">
          {[{
            q: "Что такое франшиза и зачем она?",
            a: "Франшиза — сумма участия клиента в убытке. Чем больше франшиза, тем ниже стоимость полиса. Подберём размер без потери важного покрытия.",
          }, {
            q: "Можно ли оформить в рассрочку?",
            a: "Да, возможны варианты по карте/рассрочке партнёров. Уточню при расчёте.",
          }, {
            q: "Покрывает ли КАСКО угон и тотал?",
            a: "Да, при соответствующих условиям полиса. Объясню риски и ограничения простым языком.",
          }, {
            q: "Что делать при ДТП?",
            a: "Сохраните спокойствие, зафиксируйте место, вызовите службы при необходимости, свяжитесь со мной — подскажу шаги и список документов.",
          }].map((i, idx) => (
            <div key={idx} className="p-5 bg-white rounded-2xl shadow-sm border">
              <div className="font-semibold">{i.q}</div>
              <div className="text-sm text-gray-600 mt-2">{i.a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT + FOOTER */}
      <section className="bg-emerald-900 text-emerald-50">
        <div className="max-w-6xl mx-auto px-4 py-14 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Готов рассчитать для вас КАСКО прямо сейчас</h2>
            <p className="mt-2 text-emerald-100">Алматы, ул. [адрес]. Абай Садыкбаев, директор управления «Сентрас Иншуранс». Лицензия № [номер].</p>
            <div className="mt-5 flex flex-col sm:flex-row gap-3">
              <a href="https://wa.me/77000000000" target="_blank" rel="noreferrer" className="px-6 py-3 rounded-2xl bg-white text-emerald-900 font-semibold hover:bg-emerald-100">Написать в WhatsApp</a>
              <a href="tel:+7-700-000-00-00" className="px-6 py-3 rounded-2xl border border-emerald-200 text-white font-semibold hover:bg-emerald-800">Позвонить</a>
            </div>
          </div>
          <div className="bg-white/10 rounded-2xl p-6">
            <div className="font-semibold">Что нужно для расчёта</div>
            <ul className="list-disc list-inside text-emerald-100 text-sm mt-2 space-y-1">
              <li>Марка/модель и год выпуска</li>
              <li>Где храните авто ночью</li>
              <li>Возраст и стаж водителя</li>
              <li>Желаемая франшиза (можно «без»)</li>
              <li>Контакт для связи (WhatsApp/телефон)</li>
            </ul>
          </div>
        </div>
        <footer className="border-t border-emerald-800">
          <div className="max-w-6xl mx-auto px-4 py-6 text-xs text-emerald-200 flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
              <div>© {new Date().getFullYear()} Сентрас Иншуранс — КАСКО Алматы</div>
              <div className="flex gap-4">
                <a href="#" className="hover:text-white/90">Политика конфиденциальности</a>
                <a href="#" className="hover:text-white/90">Согласие на обработку ПД</a>
                <button onClick={() => setQuizOpen(true)} className="hover:text-white/90">Быстрый расчёт</button>
              </div>
            </div>
            <div className="text-[11px] text-emerald-200/80">
              Информация на сайте носит справочный характер и не является публичной офертой. Итоговые условия страхования содержатся в договоре и правилах страхования. Продажи осуществляются лицензированными сотрудниками/агентами АО «Сентрас Иншуранс».
            </div>
          </div>
        </footer>
      </section>

      {/* QUIZ MODAL */}
      {quizOpen && <QuizModal setQuizOpen={setQuizOpen} form={form} setForm={setForm} submitQuiz={submitQuiz} yearOptions={yearOptions} />}

      {/* WHEEL MODAL */}
      {wheelOpen && <WheelModal setWheelOpen={setWheelOpen} spinning={spinning} setSpinning={setSpinning} selectedPerk={selectedPerk} setSelectedPerk={setSelectedPerk} spinWheel={spinWheel} />}
    </div>
  );
}

function QuizModal({ setQuizOpen, form, setForm, submitQuiz, yearOptions }) {
  return (
    <div className="fixed inset-0 z-40 bg-black/40 flex items-center justify-center p-4" role="dialog" aria-modal>
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b flex items-center justify-between">
          <div className="font-semibold">Квиз • Расчёт КАСКО</div>
          <button onClick={() => setQuizOpen(false)} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>
        <form onSubmit={submitQuiz} className="p-6 grid md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="text-sm font-medium">Марка и модель *</label>
            <input value={form.makeModel} onChange={e=>setForm({...form, makeModel:e.target.value})} className="mt-1 w-full rounded-xl border p-3" placeholder="Toyota Camry" />
          </div>
          <div>
            <label className="text-sm font-medium">Год выпуска *</label>
            <select value={form.year} onChange={e=>setForm({...form, year:e.target.value})} className="mt-1 w-full rounded-xl border p-3">
              <option value="">Выберите год</option>
              {yearOptions.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium">Где храните ночью? *</label>
            <select value={form.storage} onChange={e=>setForm({...form, storage:e.target.value})} className="mt-1 w-full rounded-xl border p-3">
              <option value="">Выберите</option>
              <option>Гараж</option>
              <option>Охраняемая стоянка</option>
              <option>Двор</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium">Возраст водителя *</label>
            <input value={form.age} onChange={e=>setForm({...form, age:e.target.value})} className="mt-1 w-full rounded-xl border p-3" placeholder="Напр., 32" />
          </div>
          <div>
            <label className="text-sm font-medium">Стаж вождения (лет) *</label>
            <input value={form.experience} onChange={e=>setForm({...form, experience:e.target.value})} className="mt-1 w-full rounded-xl border p-3" placeholder="Напр., 8" />
          </div>
          <div>
            <label className="text-sm font-medium">Франшиза</label>
            <select value={form.franchise} onChange={e=>setForm({...form, franchise:e.target.value})} className="mt-1 w-full rounded-xl border p-3">
              <option>Без франшизы</option>
              <option>10%</option>
              <option>20%</option>
              <option>Не знаю — подскажите</option>
            </select>
            <div className="text-xs text-gray-500 mt-1">Франшиза помогает снизить стоимость полиса. Подберём оптимально.</div>
          </div>
          <div className="md:col-span-2">
            <label className="text-sm font-medium">Контакт для результата (WhatsApp/телефон) *</label>
            <input value={form.contact} onChange={e=>setForm({...form, contact:e.target.value})} className="mt-1 w-full rounded-xl border p-3" placeholder="+7 7xx xxx xx xx" />
          </div>
          <div className="md:col-span-2 flex items-center gap-2 text-xs text-gray-500">
            <input id="pd" type="checkbox" className="rounded" required />
            <label htmlFor="pd">Соглашаюсь на обработку персональных данных и получение консультации</label>
          </div>
          <div className="md:col-span-2 flex gap-3">
            <button type="submit" className="px-5 py-3 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700">Получить расчёт</button>
            <button type="button" onClick={() => setQuizOpen(false)} className="px-5 py-3 rounded-xl border">Отмена</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function WheelModal({ setWheelOpen, spinning, setSpinning, selectedPerk, setSelectedPerk, spinWheel }) {
  return (
    <div className="fixed inset-0 z-40 bg-black/40 flex items-center justify-center p-4" role="dialog" aria-modal>
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b flex items-center justify-between">
          <div className="font-semibold">Мини-колесо бонусов</div>
          <button onClick={() => setWheelOpen(false)} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>
        <div className="p-6">
          <div className="text-sm text-gray-600">Бонусы предоставляются партнёрами. Денежные скидки на страховой тариф не разыгрываются.</div>
          <div className="mt-6 flex flex-col items-center gap-4">
            <div className={`h-40 w-40 rounded-full border-8 border-emerald-200 flex items-center justify-center text-center px-4 transition-transform duration-700 ${spinning ? 'rotate-[720deg]' : ''}`}>
              {selectedPerk ? (
                <div>
                  <div className="text-xs text-gray-500">Ваш бонус</div>
                  <div className="font-semibold">{selectedPerk.title}</div>
                  <div className="text-xs text-gray-500">{selectedPerk.desc}</div>
                </div>
              ) : (
                <div className="text-sm">Нажмите «Крутить»</div>
              )}
            </div>
            <div className="flex gap-3">
              <button onClick={spinWheel} className="px-5 py-3 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700">Крутить</button>
              <button onClick={() => setWheelOpen(false)} className="px-5 py-3 rounded-xl border">Готово</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
