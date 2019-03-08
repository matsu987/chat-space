$(function() {
  function buildSendMessageHTML(message){
    var image = message.image.url ? `<img class="lower-meesage__image" src="${message.image.url}">` : "" ;
    var html = `<div class=message data-id=${message.id}>
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

  function update() {
    var messageId = $('.message:last-of-type').data('id');
    $.ajax({
      url: `/groups/${groupId}/messages`,
      dataType: 'json',
      type: 'GET',
      data: {message_id: messageId }
    })

    .done(function(message) {
      if (message.length != null){
        message.forEach(function(message) {
          $('.messages').append(buildSendMessageHTML(message));
          $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
        })
      }
    })
    .fail(function(){
      alert('error');
    })
  }

  var path = location.pathname ;
  var groupId = $('.main-header__left-box__current-group:last').data('id');
  if (path == `/groups/${groupId}/messages`) {
    setInterval(update, 5000);
  }
});
