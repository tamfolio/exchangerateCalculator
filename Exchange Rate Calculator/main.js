const currency_one = document.getElementById('currency-one');
const amount_one = document.getElementById('amount-one');
const currency_two = document.getElementById('currency-two');
const amount_two = document.getElementById('amount-two');

const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');

//Fetch Exchange rates and update the DOM

function calculate() {
    const currency_oneValue = currency_one.value;
    const currency_twoValue = currency_two.value;

    fetch(`https://v6.exchangerate-api.com/v6/3b5f9aa78dcf7a5bfdd80aab/latest/${currency_oneValue}`)
        .then(res => res.json())
        .then(data => {
            //console.log(data);
            const rate = data.conversion_rates[currency_twoValue];

            //console.log(rate);
            rateEl.innerText = `1 ${currency_oneValue} = ${rate} ${currency_twoValue}`;

            amount_two.value = (amount_one.value * rate).toFixed(2);
        });
}

//Event Listeners
currency_one.addEventListener('change', calculate);
amount_one.addEventListener('input', calculate);
currency_two.addEventListener('change', calculate);
amount_two.addEventListener('input', calculate);
swap.addEventListener('click', () => {
    const temp = currency_one.value;
    currency_two.value = temp;
    calculate();
})

calculate();