function formatPrice(priceData) {
  const formattedPrice = priceData.price.toLocaleString('de-DE', { minimumFractionDigits: 4 });
  return `💰 *${priceData.name} (${priceData.symbol})*\nPreis: *${formattedPrice} €*`;
}

function formatPriceAlert(alert) {
  const formattedPrice = `*${alert.price.toLocaleString('de-DE', { minimumFractionDigits: 4 })} €*`;
  const formattedMilestone = alert.milestone.toLocaleString('de-DE', { minimumFractionDigits: 4 });

  return alert.isPump
    ? `🚀 *${alert.token.name} PUMP ALERT* 🚀\n` +
      `Preis ist über ${formattedMilestone} € gestiegen!\n` +
      `Aktueller Preis: ${formattedPrice}`
    : `📉 *${alert.token.name} DUMP ALERT* 📉\n` +
      `Preis ist unter ${formattedMilestone} € gefallen!\n` +
      `Aktueller Preis: ${formattedPrice}`;
}

module.exports = { formatPrice, formatPriceAlert };