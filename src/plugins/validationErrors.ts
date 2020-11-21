
export default function (this:Vue,data:any,ref='form'){
  
    if (data.hasOwnProperty('errors')) {
        const err:any = {};
        
        for (const key in data.errors) {
            if (data.errors.hasOwnProperty(key)) {
               err[key]= data.errors[key];     
            }
        }


        var x:any;
        x = this.$refs[ref];
        x.setErrors(err);
        
    }

}