(function() {


  var msgIndex, key;
  var botui = new BotUI('chat');


  //初期メッセージ
  botui.message.bot({
    content: 'はるです、こんにちは！'
  });
  botui.message.bot({
    delay: 1000,  //メッセージの表示タイミングをずらす
    content: '私に関する質問に答えます！'
  });


  function init() {
    botui.message.bot({
      delay: 1500,  //メッセージの表示タイミングをずらす
      content: '私に関する質問に答えます！'
    });
    // .then(function() {

    //   //キーワードの入力
    //   //「return」を記述して、ユーザーからの入力待ち状態にする
    //   return botui.action.text({
    //     delay: 1000,
    //     action: {
    //       placeholder: '例：好きな食べ物は？'
    //     }
    //   });
    // }).then(function(res) {

    //   //入力されたキーワードを取得する
    //   key = res.value;

    //   botui.message.add(key,{
    //     loading: true
    //   }).then(function (index) {

    //     // 質問に対する答えをanswer_messageに格納する
    //     var answer_message =  question_to_answer(key);

    //     // 答えを表示する
    //     botui.message.update(index, {
    //       loading: false,
    //       content: answer_message
    //     }).then(function() {
    //       return botui.message.bot({
    //         delay: 1500,
    //         content: 'まだ続けますか？'
    //       })
    //     }).then(function() {
    
    //       //「はい」「いいえ」のボタンを表示
    //       return botui.action.button({
    //         delay: 1000,
    //         action: [{
    //           icon: 'circle-thin',
    //           text: 'はい',
    //           value: true
    //         }, {
    //           icon: 'close',
    //           text: 'いいえ',
    //           value: false
    //         }]
    //       });
    //     }).then(function(res) {
    
    //       //「続ける」か「終了」するかの条件分岐処理
    //       res.value ? init() : end();
    //     });;
    //   });

    // });
  }

  $('#submit').on('click', function() {
    console.log($('#question_input').val());
    key = $('#question_input').val();
    botui.message.add({
      delay: 100,
      human: true,
      content: key
    });
    botui.message.add({
      loading: true
    }).then(function (index) {
      // 質問に対する答えをanswer_messageに格納する
      var answer_message =  question_to_answer(key);

      botui.message.remove(index, {

      });
      // 答えを表示する
      botui.message.add({
        type: 'html',
        loading: false,
        content: answer_message
      });
      });
  });


  // コマンド
  let command = [
    ['help', '困ってる？']
  ];
  // 質問と答えの対応表を定義
  let QAdata = [
    ['食べ物', '好きな食べ物はなんでも！<br>嫌いな食べ物はセロリ！'],
    ['血液型', '血液型はB型だよ！'],
    ['身長', '身長は165cmだよ！']
  ];

  // 質問に対する答えを返却する関数
  function question_to_answer(question){

    for(var i=0; i < command.length; i++){
      if ( question.indexOf(command[i][0]) != -1) {
        return command[i][1];
        }
    }

    for(var i=0; i < QAdata.length; i++){
      if ( question.indexOf(QAdata[i][0]) != -1) {
        return QAdata[i][1];
        }
    }

    return "ひみつだよ。";
  }


  //プログラムを終了する処理
  function end() {
    botui.message.bot({
      content: 'ご利用ありがとうございました！'
    })
  }

})();