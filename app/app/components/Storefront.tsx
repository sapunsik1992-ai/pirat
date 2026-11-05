"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { products, type Product } from "@/app/data/products";

const CART_STORAGE_KEY = "aishop-cart";

type CartItem = Product & {
  quantity: number;
};

const formatPrice = (value: number) =>
  new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  }).format(value);

export function Storefront({ mode = "catalog" }: { mode?: "catalog" | "cart" | "checkout" }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [submitDone, setSubmitDone] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(CART_STORAGE_KEY);
      if (raw) {
        setCart(JSON.parse(raw));
      }
    } catch {
      // ignore
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart, isLoaded]);

  const addToCart = (product: Product) => {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...current, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((current) => current.filter((item) => item.id !== productId));
  };

  const changeQuantity = (productId: string, delta: number) => {
    setCart((current) =>
      current
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart],
  );
  const fee = subtotal > 0 ? 149 : 0;
  const total = subtotal + fee;

  if (mode === "catalog") {
    return (
      <div className="min-h-screen bg-slate-950 text-white">
        <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/85 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">AI Market</p>
              <h1 className="text-xl font-semibold">Цифровые подписки и аккаунты</h1>
            </div>

            <nav className="flex items-center gap-4 text-sm text-slate-300">
              <Link href="/" className="hover:text-white">Каталог</Link>
              <Link href="/cart" className="hover:text-white">Корзина</Link>
              <Link href="/checkout" className="rounded-full bg-cyan-500 px-4 py-2 font-medium text-slate-950 hover:bg-cyan-400">
                Оплатить
              </Link>
            </nav>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <section className="grid gap-8 rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/60 p-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="mb-4 inline-flex rounded-full border border-cyan-400/40 bg-cyan-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-cyan-300">
                MVP marketplace
              </p>
              <h2 className="max-w-xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Готовые AI-подписки и доступы для клиентов
              </h2>
              <p className="mt-5 max-w-xl text-base text-slate-300">
                Простая площадка для продажи цифровых товаров: подписки на Claude, ChatGPT,
                AI-пакеты, готовые аккаунты и рабочие наборы для бизнеса.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/checkout" className="rounded-full bg-cyan-500 px-6 py-3 font-medium text-slate-950 shadow-lg shadow-cyan-500/20 hover:bg-cyan-400">
                  Купить сейчас
                </Link>
                <Link href="/cart" className="rounded-full border border-white/15 px-6 py-3 font-medium text-white hover:bg-white/5">
                  Корзина ({cart.reduce((sum, item) => sum + item.quantity, 0)})
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-6">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Преимущества</p>
              <ul className="mt-5 space-y-4 text-sm text-slate-300">
                <li className="rounded-xl border border-white/10 bg-white/5 p-3">⚡ Быстрая выдача доступа после оплаты</li>
                <li className="rounded-xl border border-white/10 bg-white/5 p-3">💸 Оплата онлайн и фиксированные цены</li>
                <li className="rounded-xl border border-white/10 bg-white/5 p-3">📦 Удобная админка для заказов и статусов</li>
              </ul>
            </div>
          </section>

          <section className="mt-12">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">Каталог</p>
                <h3 className="mt-2 text-3xl font-semibold">Популярные товары</h3>
              </div>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-300">
                {products.length} товаров
              </span>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {products.map((product) => (
                <article key={product.id} className="rounded-3xl border border-white/10 bg-slate-900 p-5 shadow-xl shadow-slate-950/40">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="rounded-full border border-cyan-500/40 bg-cyan-500/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-300">
                      {product.badge}
                    </span>
                    <span className="text-sm text-slate-400">{product.kind === "subscription" ? "Подписка" : "Аккаунт"}</span>
                  </div>
                  <h4 className="text-2xl font-semibold text-white">{product.name}</h4>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{product.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {product.paymentMethods.map((method) => (
                      <span key={method} className="rounded-full border border-white/10 bg-slate-800 px-2 py-1 text-[10px] uppercase tracking-[0.15em] text-slate-300">
                        {method}
                      </span>
                    ))}
                  </div>
                  <ul className="mt-4 space-y-2 text-sm text-slate-300">
                    {product.features.map((feature) => (
                      <li key={feature}>• {feature}</li>
                    ))}
                  </ul>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-3xl font-bold text-white">{formatPrice(product.price)}</span>
                    <button
                      type="button"
                      onClick={() => addToCart(product)}
                      className="rounded-full bg-cyan-500 px-4 py-2 font-medium text-slate-950 hover:bg-cyan-400"
                    >
                      В корзину
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-14">
            <div className="grid gap-4 md:grid-cols-3">
              {[
                { title: "Быстрая выдача", text: "Доступ отправляется сразу после оплаты" },
                { title: "Проверенный сервис", text: "Простой процесс оформления и сопровождения" },
                { title: "Много способов оплаты", text: "СБП, крипто и удобный ручной сценарий" },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/10 bg-slate-900 p-5">
                  <p className="text-lg font-semibold text-white">{item.title}</p>
                  <p className="mt-2 text-sm text-slate-300">{item.text}</p>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    );
  }

  if (mode === "cart") {
    return (
      <div className="min-h-screen bg-slate-950 px-4 py-12 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">Корзина</p>
              <h2 className="mt-2 text-3xl font-bold">Ваш заказ</h2>
            </div>
            <Link href="/" className="rounded-full border border-white/10 px-4 py-2 text-sm hover:bg-white/5">
              Вернуться в каталог
            </Link>
          </div>

          {!isLoaded ? (
            <div className="rounded-2xl border border-white/10 bg-slate-900 p-6 text-slate-300">Загрузка корзины...</div>
          ) : cart.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/15 bg-slate-900 p-10 text-center">
              <p className="text-lg text-slate-200">Корзина пока пустая</p>
              <p className="mt-2 text-slate-400">Добавьте хотя бы один товар, чтобы оформить заказ.</p>
              <Link href="/" className="mt-6 inline-block rounded-full bg-cyan-500 px-5 py-3 font-medium text-slate-950">
                Перейти к товарам
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-slate-900 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xl font-semibold">{item.name}</p>
                      <p className="mt-1 text-sm text-slate-400">{item.kind === "subscription" ? "Подписка" : "Готовый доступ"}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center rounded-full border border-white/10 bg-slate-800">
                        <button type="button" onClick={() => changeQuantity(item.id, -1)} className="px-3 py-2 text-xl text-slate-200 hover:bg-white/5">−</button>
                        <span className="min-w-10 text-center text-sm font-medium">{item.quantity}</span>
                        <button type="button" onClick={() => changeQuantity(item.id, 1)} className="px-3 py-2 text-xl text-slate-200 hover:bg-white/5">+</button>
                      </div>
                      <p className="min-w-[100px] text-right font-semibold">{formatPrice(item.price * item.quantity)}</p>
                      <button type="button" onClick={() => removeFromCart(item.id)} className="text-sm text-rose-400 hover:text-rose-300">Удалить</button>
                    </div>
                  </div>
                ))}
              </div>

              <aside className="rounded-2xl border border-cyan-500/20 bg-slate-900 p-6">
                <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Итого</p>
                <div className="mt-6 space-y-3 text-sm text-slate-300">
                  <div className="flex justify-between"><span>Товаров</span><span>{cart.reduce((sum, item) => sum + item.quantity, 0)}</span></div>
                  <div className="flex justify-between"><span>Сумма</span><span>{formatPrice(subtotal)}</span></div>
                  <div className="flex justify-between"><span>Комиссия</span><span>{formatPrice(fee)}</span></div>
                  <div className="flex justify-between border-t border-white/10 pt-3 text-base font-semibold text-white"><span>К оплате</span><span>{formatPrice(total)}</span></div>
                </div>
                <Link href="/checkout" className="mt-6 block rounded-full bg-cyan-500 px-5 py-3 text-center font-medium text-slate-950 hover:bg-cyan-400">
                  Перейти к оплате
                </Link>
              </aside>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-12 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">Оформление</p>
            <h2 className="mt-2 text-3xl font-bold">Проверка заказа</h2>
          </div>
          <Link href="/cart" className="rounded-full border border-white/10 px-4 py-2 text-sm hover:bg-white/5">
            Назад в корзину
          </Link>
        </div>

        {cart.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/15 bg-slate-900 p-10 text-center">
            <p className="text-lg text-slate-200">Нечего оплачивать</p>
            <Link href="/" className="mt-6 inline-block rounded-full bg-cyan-500 px-5 py-3 font-medium text-slate-950">
              Вернуться в каталог
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                setSubmitDone(true);
              }}
              className="rounded-2xl border border-white/10 bg-slate-900 p-6"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2 text-sm text-slate-300 sm:col-span-2">
                  <span>Имя</span>
                  <input defaultValue="Клиент" className="w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-3 text-white outline-none ring-0" />
                </label>
                <label className="space-y-2 text-sm text-slate-300">
                  <span>Telegram</span>
                  <input placeholder="@nickname" className="w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-3 text-white outline-none ring-0" />
                </label>
                <label className="space-y-2 text-sm text-slate-300">
                  <span>Email</span>
                  <input type="email" placeholder="mail@example.com" className="w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-3 text-white outline-none ring-0" />
                </label>
                <label className="space-y-2 text-sm text-slate-300 sm:col-span-2">
                  <span>Комментарий</span>
                  <textarea rows={4} placeholder="Если нужен доступ сразу после оплаты, напишите удобный способ связи." className="w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-3 text-white outline-none ring-0" />
                </label>
              </div>

              <div className="mt-6 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-4 text-sm text-cyan-100">
                Платёжная система будет подключена позже. Этот блок показывает рабочий сценарий оформления заказа.
              </div>

              <button type="submit" className="mt-6 w-full rounded-full bg-cyan-500 px-6 py-3 font-medium text-slate-950 hover:bg-cyan-400">
                Подтвердить заказ
              </button>

              {submitDone ? (
                <div className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
                  Заказ оформлен. После подключения оплаты клиент получит подтверждение и уведомление владельцу.
                </div>
              ) : null}
            </form>

            <aside className="rounded-2xl border border-white/10 bg-slate-900 p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Итог</p>
              <div className="mt-5 space-y-3 text-sm text-slate-300">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between gap-2">
                    <span>{item.name} × {item.quantity}</span>
                    <span>{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 border-t border-white/10 pt-4 space-y-3 text-sm">
                <div className="flex justify-between"><span>Сумма</span><span>{formatPrice(subtotal)}</span></div>
                <div className="flex justify-between"><span>Комиссия</span><span>{formatPrice(fee)}</span></div>
                <div className="flex justify-between text-base font-semibold text-white"><span>К оплате</span><span>{formatPrice(total)}</span></div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
