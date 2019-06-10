import moment from 'moment';

const numberFormat = (number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(number));
}

const dateFormat = (date) => {
  return moment(Date.parse(date)).format('ddd MMM DD YYYY')
}

const html = (bid) => {
  return `
    <div>
      <h1>Please review your invoice</h1>
      <div><b>Bill to:</b> ${bid.bill_to}</div>
      <div><b>Date ordered:</b> ${dateFormat(bid.date_ordered)}</div>
      <div><b>Date promised:</b> ${dateFormat(bid.date_promised)}</div>
      <div><b>Description:</b> ${bid.description}</div>
      <h3>Bid good for 30 days</h3>
      <div><b>Description:</b> ${bid.description}</div>
      <div><b>Total materials and labor:</b> ${numberFormat(bid.total_materials_and_labor)}</div>
      <div><b>Extras:</b> ${bid.extras}</div>
      <div><b>Total for extras:</b> ${numberFormat(bid.total_for_extras)}</div>
      <div><b>Grand total:</b> ${numberFormat(bid.grand_total)}</div>
    </div>
  `;
}

const text = (bid) => {
  return `
    Please review your invoice\n
    Bill to: ${bid.bill_to}\n
    Date ordered: ${dateFormat(bid.date_ordered)}\n
    Date promised: ${dateFormat(bid.date_promised)}\n
    Description: ${bid.description}\n
    Total materials and labor: ${numberFormat(bid.total_materials_and_labor)}\n
    Extras: ${bid.extras}\n
    Total for extras: ${numberFormat(bid.total_for_extras)}\n
    Grand total: ${numberFormat(bid.grand_total)}\n
  `;
}

export default {
  html,
  text,
}
