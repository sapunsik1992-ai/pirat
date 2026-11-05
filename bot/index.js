require("dotenv").config();
const { Telegraf } = require("telegraf");

const bot = new Telegraf(process.env.BOT_TOKEN || "");
const adminChatId = Number(process.env.ADMIN_CHAT_ID || 0);
const supportLink = process.env.SUPPORT_LINK || "https://t.me/yourusername";
const shopLink = process.env.SHOP_LINK || "https://your-site.com";

bot.start((ctx) => {
  const text = [
    "👋 Добро пожаловать!",
    "",
    "Это бот для уведомлений и поддержки магазина AI-подписок.",
    "",
    `🛒 Магазин: ${shopLink}`,
    `💬 Поддержка: ${supportLink}`,
    "",
    "Используйте /status чтобы увидеть статус сервиса.",
  ].join("\n");

  ctx.reply(text);
});

bot.command("status", async (ctx) => {
  const text = [
    "✅ Бот запущен",
    "",
    "Статус: готов к уведомлениям о заказах, оплатах и поддержке.",
    `Администратор: ${adminChatId || "не настроен"}`,
  ].join("\n");

  await ctx.reply(text);
});

bot.command("admin", async (ctx) => {
  if (!adminChatId || Number(ctx.chat.id) !== adminChatId) {
    await ctx.reply("❌ У вас нет доступа к админ-командам.");
    return;
  }

  await ctx.reply("🛠 Админ-режим активен. Можно принимать уведомления о новых заказах.");
});

bot.on("text", async (ctx) => {
  const text = ctx.message.text || "";
  if (text.startsWith("/")) return;

  if (!adminChatId || Number(ctx.chat.id) !== adminChatId) {
    await ctx.reply("Спасибо за сообщение. Для поддержки напишите в Telegram: " + supportLink);
    return;
  }

  await ctx.reply("Сообщение принято. Продолжайте работу в админ-панели.");
});

function sendOrderNotification({ customer, product, amount, orderId }) {
  if (!adminChatId) {
    return;
  }

  const message = [
    "💰 Новый заказ",
    "",
    `Заказ: ${orderId}`,
    `Клиент: ${customer}`,
    `Товар: ${product}`,
    `Сумма: ${amount}`,
    "",
    "Проверьте админку и выдайте доступ покупателю.",
  ].join("\n");

  bot.telegram.sendMessage(adminChatId, message);
}

bot.launch();

console.log("Telegram bot is running...");

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

module.exports = { sendOrderNotification };
