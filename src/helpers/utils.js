/* eslint-disable no-nested-ternary */
export const displayDate = (timestamp) => {
  const date = new Date(timestamp);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'
  ];

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  // return day + ' ' + monthNames[monthIndex] + ' ' + year;
  return `${monthNames[monthIndex]} ${day}, ${year}`;
};

export const displayMoney = (n) => {
  // Convert input to number and handle invalid inputs
  const num = Number(n);
  if (isNaN(num)) return '0.00';

  const format = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EGP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });

  return format.format(num);
};

export const calculateTotal = (arr) => {
  if (!arr || arr?.length === 0) return 0;

  const total = arr.reduce((acc, val) => acc + val, 0);

  return total.toFixed(2);
};

export const displayActionMessage = (msg, status = 'info') => {
  const div = document.createElement('div');
  const span = document.createElement('span');

  div.className = `toast ${status === 'info'
    ? 'toast-info'
    : status === 'success'
      ? 'toast-success'
      : 'toast-error'
    // eslint-disable-next-line indent
    }`;
  span.className = 'toast-msg';
  span.textContent = msg;
  div.appendChild(span);


  if (document.querySelector('.toast')) {
    document.body.removeChild(document.querySelector('.toast'));
    document.body.appendChild(div);
  } else {
    document.body.appendChild(div);
  }

  setTimeout(() => {
    try {
      document.body.removeChild(div);
    } catch (e) {
      console.log(e);
    }
  }, 3000);
};
