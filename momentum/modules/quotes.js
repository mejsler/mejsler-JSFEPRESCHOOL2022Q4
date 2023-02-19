const author = document.querySelector('.author'),
  changeQuote = document.querySelector('.change-quote'),
  quote = document.querySelector('.quote');

export async function getQuotes() {
  const quotes = './assets/quotes.json',
    res = await fetch(quotes),
    data = await res.json(),
    randomNumber = Math.floor(Math.random() * 89 + 1);
  if (
    localStorage.getItem('language') &&
    localStorage.getItem('language') === 'ru'
  ) {
    quote.textContent = data['quotes'][randomNumber]['quote'][1];
    author.textContent = data['quotes'][randomNumber]['author'][1];
  } else {
    quote.textContent = data['quotes'][randomNumber]['quote'][0];
    author.textContent = data['quotes'][randomNumber]['author'][0];
  }
}

getQuotes();

changeQuote.addEventListener('click', getQuotes);
