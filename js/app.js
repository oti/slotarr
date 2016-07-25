(function(w, d, undefined){
  'use strict';

  var model = {
    elems: {
      text: d.querySelector('#text'),
      panel: d.querySelector('#panel'),
      apply: d.querySelector("#apply")
    },
    original_arr: [],
    length: 0,
    shuffle_cnt: 3,
    shuffle_arr: []
  };

  // 0~lengthまでのランダムな数字を返す
  var get_shuffle_idx = function(length){
    return Math.floor(Math.random() * length);
  };

  // 取得した文字列を配列にして返す
  var set_target_array = function(value){
    model.original_arr = model.elems.text.value.split(' ');
    model.length = model.original_arr.length;
  };

  // 元の配列をシャッフルした配列を作る
  var set_shuffle_arr = function(){
    var m_arr = model.original_arr;
    var s_cnt = model.shuffle_cnt;
    var length = model.length;
    var s_arr = model.shuffle_arr;
    var idx = get_shuffle_idx;

    for(var i=0; i<s_cnt; i++){
      s_arr.push(m_arr[idx(length)]);
    }
  };

  // シャッフルした配列を文字列にしてターゲットに入れる
  var set_text = function(){
    model.elems.panel.textContent = model.shuffle_arr.join(' / ');
  };

  var clear_shuffle_arr = function(){
    model.shuffle_arr = [];
  };

  var applyHandler = function() {
    clear_shuffle_arr();
    set_target_array(model.elems.text.value);
    set_shuffle_arr();
    set_text();
  };

  model.elems.apply.addEventListener('click', applyHandler, false);


})(window, document, undefined);