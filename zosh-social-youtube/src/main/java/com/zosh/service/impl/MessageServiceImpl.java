package com.zosh.service.impl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zosh.models.Chat;
import com.zosh.models.Message;
import com.zosh.models.User;
import com.zosh.repository.ChatRepository;
import com.zosh.repository.MessageRepository;
import com.zosh.service.ChatService;
import com.zosh.service.MessageService;
import com.zosh.service.UserService;

@Service
public class MessageServiceImpl implements MessageService{

	@Autowired
	private MessageRepository messageRepository;
	
	@Autowired
	private ChatRepository chatRepository;
	
	@Autowired
	private ChatService chatService;
	
	@Override
	public Message createMessage(User user, Integer chatId, Message req) throws Exception {
		
		Chat chat = chatService.findChatById(chatId);
		Message message = new Message();

		message.setChat(chat);
		message.setContent(req.getContent());
		message.setImage(req.getImage());
		message.setUser(user);
		message.setTimestamp(LocalDateTime.now());
		
		Message savedMessage = messageRepository.save(message);
		chat.getMessages().add(savedMessage);
		chatRepository.save(chat);
		return savedMessage;
	}

	@Override
	public List<Message> findChatsMessages(Integer chatId) throws Exception {
		
		Chat chat = chatService.findChatById(chatId);
		return messageRepository.findByChatId(chatId);
	}

}
