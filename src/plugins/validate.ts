import Vue from 'vue';
import { ValidationProvider,ValidationObserver, extend } from 'vee-validate';

// Add a rule.
extend('secret', {
  validate: value => value === 'example',
  message: 'This is not the magic word'
});


//https://logaretm.github.io/vee-validate/advanced/rules-object-expression.html#cross-field-validation
extend('greaterThan', {
  params: ['target'],
  validate(value, arg:any) {
   const {target} = arg
    return value > target;
  },
  message: '{_field_} value must be gratter then {target}'
});

extend('smallerThan', {
  params: ['target'],
  validate(value, arg:any) {
   const {target} = arg
    return value < target;
  },
  message: '{_field_} value must be samller then {target}'
});

extend('equalBy', {
  params: ['target'],
  validate(value, arg:any) {
   const {target} = arg
    return value === target;
  },
  message: '{_field_} value must be equal by {target}'
});

import * as rules from 'vee-validate/dist/rules';
const R:any = rules
Object.keys(rules).forEach((rule:any) => {
  extend(rule, R[rule]);
});

// Register it globally
Vue.component('vp', ValidationProvider);
// Register it globally
Vue.component('vo', ValidationObserver);