/**
 * Created by yu on 2017/2/15.
 */
require('./test.less');
var a = require('./a');
require('./index');
import es6 from './b';

var oApp = document.getElementById('app');

oApp.innerHTML = "新增内容" + a + es6.a +es6.b;
