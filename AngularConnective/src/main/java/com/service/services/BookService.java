package com.service.services;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.service.dto.BookDto;
import com.service.entity.BookEntity;
import com.service.repository.BookRepo;

@Service
public class BookService {
	
	@Autowired
	BookRepo bookRepo;
	
	@Autowired
	ModelMapper modelMapper;
	
	public List<BookDto> getAllBooks() {
		List<BookEntity> bookEntities= bookRepo.findAll();
		return bookEntities.stream()
				.map(bookentity->modelMapper.map(bookentity, BookDto.class))
				.collect(Collectors.toList());
	}

	public BookDto addBook(BookDto bookDto) {
		BookEntity bookEntity = bookRepo.save(modelMapper.map(bookDto,BookEntity.class));
		if(bookEntity==null) {
			return new BookDto();
		}
		return modelMapper.map(bookEntity,BookDto.class);
	}

	public boolean deleteBook(int bookId) {
		boolean isDeleted;
		try {
			bookRepo.deleteById(bookId);
			isDeleted=true;
		}catch (IllegalArgumentException e) {
			isDeleted=false;
		}
		return isDeleted;
	}

	public BookDto updateBook(int bookId,BookDto bookDto) {
		if(bookId==bookDto.getId()){
			BookEntity bookEntity = bookRepo.save(modelMapper.map(bookDto,BookEntity.class));
			if(bookEntity==null) {
				return new BookDto();
			}
			return modelMapper.map(bookEntity,BookDto.class);
		}
		return new BookDto();
	}
	
}
