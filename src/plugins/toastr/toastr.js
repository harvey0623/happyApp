import toastr from './index.js';

const mytoastr = {
   add(option) {
      if (option.msg === undefined) throw new Error('必須要有msg屬性');
      return toastr.Add(option);
   },
   remove(toastrObj) {
      toastr.remove(toastrObj);
   }
}

export default mytoastr;