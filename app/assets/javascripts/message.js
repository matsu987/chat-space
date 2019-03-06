$(function(){
	function buildHTML(message){
    var image = ""
    image = `<img class="lower-meesage__image" src="${message.image.url}">`
    var html = `<div class=message>
                  <div class=upper-message>
    			          <div class=upper-message__user-name>${message.user_name}</div>
    			          <div class=upper-message__date>${message.created_at}</div>
    			        </div>
    			        <div class=lower-meesage>
    			          <p class=lower-message__content>${message.content}</p>
                    ${image}
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
})