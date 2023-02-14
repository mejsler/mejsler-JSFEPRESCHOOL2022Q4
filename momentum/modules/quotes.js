const author = document.querySelector('.author'),
      quote = document.querySelector('.quote'),
      changeQuote = document.querySelector('.change-quote');

export async function getQuotes() {
  const quotes = './assets/quotes.json',
        res = await fetch(quotes),
        data = await res.json(),
        randomNumber = Math.floor(Math.random() * (99 - 1 + 1) + 1);
        quote.textContent = data['quotes'][randomNumber]['quote'];
        author.textContent = data['quotes'][randomNumber]['author'];
}

getQuotes();

changeQuote.addEventListener('click', getQuotes)