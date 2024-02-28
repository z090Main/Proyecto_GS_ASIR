const $filterForm = $('#filter-form');
const $brand = $('#brand');
const $priceMin = $('#min');
const $priceMax = $('#max');
const $valuation = $('#valuation');

//Capture and send events 
$filterForm.submit( event =>{
    event.preventDefault();
    socket.emit('filter value', $brand.val(), $priceMax.val(), $priceMin.val(), $valuation.val())
});