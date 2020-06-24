const currency = function(num) {
   if (typeof num !== 'number') throw new TypeError('num must be number');
   var n = 0;  //n: length of decimal
   var x = 3   //x: length of sections
   var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
   return num.toFixed(Math.max(0, n)).replace(new RegExp(re, 'g'), '$&,');
}

export default currency;