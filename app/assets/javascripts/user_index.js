$(function() {
  var search_list = $("#user-search-result");
  var member_list = $("#chat-group-users")

  function appendSearchUserResult(user) {
    var html = `<div class="chat-group-user clearfix", id=chat-group-user-${user.user_id}>
  			    <p class="chat-group-user__name">${user.user_name}</p>
  			    <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.user_id}" data-user-name="${user.user_name}">追加</a>
  			   </div>
  			   `
  	  search_list.append(html);
      $(document).ready(function() {
        $(`#chat-group-user-${user.user_id}`).on("click",".chat-group-user__btn--add", function() {
          appendChatMember(user);
          $("#user-search-result").empty();
        });
      });
  }

  function appendChatMember(user){
    var html_member =`<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${user.user_id}'>
    					  <input name='group[user_ids][]' type='hidden' value='${user.user_id}'>
    					  <p class='chat-group-user__name'>${user.user_name}</p>
    					  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn' id='chat-member-${user.user_id}'' data-user-id="${user.user_id}" data-user-name="${user.user_name}">削除</a>
  			   		</div>`
  	  member_list.append(html_member);
      $(document).ready(function() {
        $(`#chat-group-user-${user.user_id}`).on("click",".chat-group-user__btn--remove", function() {
          $(`#chat-group-user-${user.user_id}`).remove();
        });
      });
  }

  $('.chat-group-user').on("click",".chat-group-user__btn--remove", function(){
    var id =  $(this).data("user-id");
    $(`#chat-group-user-${id}`).remove();
  });


  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
      if (input == "" ) {
        $("#user-search-result").empty();
    	  return;
      }

    var num = document.getElementById("chat-group-users").childElementCount;
    var usersName = []
      for (i=1; i<=num; i++){
      var users = $(`#chat-member-${i}`).data('user-name');
      usersName.push(users);
      }
    $("#user-search-result").empty();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input, users_name: usersName},
      dataType: 'json'
    })

    .done(function(users) {
	    $("#user-search-result").empty();
        users.forEach(function(user){
        appendSearchUserResult(user);
    	  })
    })
    .fail(function() {
      alert('errorが発生しました');
    });
  });
});
