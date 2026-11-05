export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  kind: "subscription" | "account";
  badge: string;
  paymentMethods: string[];
  features: string[];
};

export const products: Product[] = [
  {
    id: "claude-pro",
    name: "Claude Pro",
    price: 1990,
    kind: "subscription",
    badge: "Лидер продаж",
    paymentMethods: ["СБП", "Крипто"],
    description: "Готовая подписка на Claude Pro с быстрым доступом и поддержкой по настройке.",
    features: ["Доступ в течение 1 месяца", "Подключение без задержек", "Поддержка по установке"],
  },
  {
    id: "claude-max",
    name: "Claude Max",
    price: 11000,
    kind: "subscription",
    badge: "Топовый план",
    paymentMethods: ["СБП", "Крипто"],
    description: "Расширенный тариф Claude Max для высоких нагрузок, профессиональной работы и долгого доступа.",
    features: ["Больше лимитов", "Удобно для работы", "Доступ на длительный срок"],
  },
  {
    id: "gpt-plus",
    name: "ChatGPT Plus",
    price: 1490,
    kind: "subscription",
    badge: "Популярно",
    paymentMethods: ["СБП", "Крипто"],
    description: "Подписка на GPT Plus для комфортной работы с AI, генерации задач и автоматизации.",
    features: ["Рабочий аккаунт", "Поддержка быстрого входа", "Подходит для работы"],
  },
  {
    id: "midjourney-rapid",
    name: "Midjourney / Image Pack",
    price: 2990,
    kind: "account",
    badge: "Готовый набор",
    paymentMethods: ["СБП", "Крипто"],
    description: "Готовый доступ к инструментам генерации изображений и AI-асистента для креативных задач.",
    features: ["Готовые данные доступа", "Оптимально для дизайна", "Быстрая выдача"],
  },
  {
    id: "copilot-team",
    name: "AI Team Pack",
    price: 2490,
    kind: "account",
    badge: "Для бизнеса",
    paymentMethods: ["СБП", "Крипто"],
    description: "Командный набор для работы с AI-инструментами в бизнес-задачах и коммерческих процессах.",
    features: ["Подходит для команды", "Пакет доступов", "Быстрая настройка"],
  },
];
