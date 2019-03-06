$(function(){
	function buildHTML(message){
    var html = `<div class=message>
                  <div class=upper-message>
    			          <div class=upper-message__user-name>${message.user_name}</div>
    			          <div class=upper-message__date>${message.created_at}</div>
    			        </div>
    			        <div class=lower-meesage>
    			          <p class=lower-message__content>${message.content}</p>
    			        </div>
                </div>
                `
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')

    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html)
      //$('.form__message').val('')
      $("#new_message")[0].reset();
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
    })
    .fail(function(){
      alert('error');
    })
    .always(function(){
      $("#new_message_btn").prop('disabled', false);
    })
  })
    // var speed = 400; // ミリ秒で記述
    // var href= $(this).attr("action");
    // var target = $(href == "#" || href == "" ? 'html' : href);
    // var position = target.offset().top;
    // $('message,html').animate({scrollTop: 2000}, speed, 'swing');
    // return false;
  //})
})