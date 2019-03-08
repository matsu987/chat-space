if @new_messages.present?
  json.array!    @new_messages.each do |message|
	  json.content     message.content
	  json.image       message.image
	  json.id          message.id
	  json.user_name   message.user.name
	  json.created_at  message.created_at.strftime("%Y/%m/%d %H:%M")
  end
end
