$(function() {
  var search_list = $("#user-search-result");
  var member_list = $("#chat-group-users")

  function appendUser(user) {
  var html = `<div class="chat-group-user clearfix">
			    <p class="chat-group-user__name">${user.user_name}</p>
			    <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.user_id}" data-user-name="${user.user_name}">追加</a>
			   </div>
			   `
	search_list.append(html);
  }

  function appendMember(user){
  var html_member =`<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-id'>
  					  <input name='group[user_ids][]' type='hidden' value='${user.user_id}'>
  					  <p class='chat-group-user__name'>${user.user_name}</p>
  					  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
			   		</div>`
	  member_list.append(html_member);
  }

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
      if (input == "") {
	    $("#user-search-result").empty();
    	  return;
      }
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(users) {
	  $("#user-search-result").empty();
       users.forEach(function(user){
         appendUser(user);

        $(".chat-group-user").on("click",".chat-group-user__btn--add",function() {
          appendMember(user);
  		  $("#user-search-result").empty();

  		  $(".chat-group-user").on("click",".chat-group-user__btn--remove",function() {
  		    $(".chat-group-user").empty();
  		  });
    	});
      });
    })
    .fail(function() {
      alert('errorが発生しました');
    })
  });
});