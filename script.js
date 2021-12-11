const url = 'https://v6.exchangerate-api.com/v6/dbbd21f4750abacc6de832aa/latest/USD';
const dropList = document.querySelectorAll('.drop-list select');
      fromCurrency = document.querySelector('.from select');
      toCurrency = document.querySelector('.to select');
      
getBtn = document.querySelector('form button');
for (let i = 0; i < dropList.length; i++) {
    for(currency_code in country_code){
        let selected;
        if(i == 0) {
            selected = currency_code == 'USD' ? 'selected' : '';
        }else if(i == 1){
            selected = currency_code == 'UZS' ? 'selected' : ''
        }
        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`
        dropList[i].insertAdjacentHTML('beforeend', optionTag)
    }
    dropList[i].addEventListener('change', e => {
        loadFlag(e.target)
    })
    function loadFlag(element){
        for(code in country_code){
            if(code == element.value){
                let imgTag = element.parentElement.querySelector('img')
                imgTag.src = `https://www.countryflagicons.com/FLAT/64/${country_code[code]}.png`
            }
        }
    }
}
window.addEventListener('load', () => {
    getExchangeRate()
});

const exchaIcon = document.querySelector('.icon');
exchaIcon.addEventListener('click', () => {
    let tempCode = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = tempCode;
    loadFlag(fromCurrency);
    loadFlag(toCurrency)
    getExchangeRate()
})

getBtn.addEventListener('click', e => {
    e.preventDefault()
    getExchangeRate()
})

function getExchangeRate() {
    const amount = document.querySelector('.amount input');
    let amountVal = amount.value;
    if(amountVal == '' || amountVal == '0' || amountVal == '00' || amountVal == '000' || amountVal == '000' || amountVal == ' ' || amountVal == '  ') {
        amount.value = '1'
        amountVal = 1
    }
    const apiKey = 'dbbd21f4750abacc6de832aa'
    let url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency.value}`;
    fetch(url).then(res => res.json()).then(result => {
        let exchangeRate = result.conversion_rates[toCurrency.value]
        let totalExchangeRates = (amountVal * exchangeRate).toFixed(1)
        const totalExchangeRateTxt = document.querySelector('.exchange-rate')
        totalExchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExchangeRates} ${toCurrency.value}`
    }).catch(() => {
        totalExchangeRateTxt.innerText = 'Nimadir xato'
    })

}
