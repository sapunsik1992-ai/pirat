import Link from "next/link";

const orders = [
  { id: "#1042", customer: "@alex", product: "Claude Pro", amount: "1990 ₽", status: "Новый" },
  { id: "#1043", customer: "@maria", product: "ChatGPT Plus", amount: "1490 ₽", status: "Оплачен" },
  { id: "#1044", customer: "@dima", product: "AI Team Pack", amount: "2490 ₽", status: "Выдан" },
];

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-12 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">Админ</p>
            <h1 className="mt-2 text-3xl font-bold">Управление заказами</h1>
          </div>
          <Link href="/" className="rounded-full border border-white/10 px-4 py-2 text-sm hover:bg-white/5">
            На сайт
          </Link>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900">
          <table className="min-w-full text-left text-sm text-slate-200">
            <thead className="border-b border-white/10 bg-slate-800/80 text-xs uppercase tracking-[0.15em] text-slate-400">
              <tr>
                <th className="px-4 py-3">Заказ</th>
                <th className="px-4 py-3">Клиент</th>
                <th className="px-4 py-3">Товар</th>
                <th className="px-4 py-3">Сумма</th>
                <th className="px-4 py-3">Статус</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-white/10 last:border-0">
                  <td className="px-4 py-4 font-medium">{order.id}</td>
                  <td className="px-4 py-4">{order.customer}</td>
                  <td className="px-4 py-4">{order.product}</td>
                  <td className="px-4 py-4">{order.amount}</td>
                  <td className="px-4 py-4">
                    <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-1 text-xs text-cyan-200">
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
