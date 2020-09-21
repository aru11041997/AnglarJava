package com.service.api;

import java.net.URI;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.service.dto.BookDto;
import com.service.services.BookService;

@RestController
@RequestMapping("/book")
@CrossOrigin(origins = "http://localhost:4200")
public class BookApiController {
	
	@Autowired
	BookService bookService;
	
	@GetMapping
	public ResponseEntity<List<BookDto>> getAllBooks() {
		List<BookDto> bookDTOs=bookService.getAllBooks();
		return ResponseEntity.ok(bookDTOs);
	}
	
	
	@PostMapping("/addBook")
	public ResponseEntity<Void> addBook(@RequestBody BookDto bookDto){
		System.out.println(bookDto);
		BookDto bookDto2 = bookService.addBook(bookDto);
		if(bookDto2==null) {
			return ResponseEntity.badRequest().build();
		}
		URI location=ServletUriComponentsBuilder.fromCurrentRequest().path("{/id}").buildAndExpand(bookDto2.getId()).toUri();
		return ResponseEntity.created(location).build();
	}
	
	@DeleteMapping("/{bookId}")
	public ResponseEntity<Void> deleteBook(@PathVariable int bookId){
		boolean isDeleted=bookService.deleteBook(bookId);
		if(!isDeleted)
			return ResponseEntity.badRequest().build();
		
		return ResponseEntity.noContent().build();
	}
	
	@PutMapping("/{bookId}")
	public ResponseEntity<Void> updateBook(@PathVariable int bookId, @RequestBody BookDto bookDto){
		BookDto bookEntity=bookService.updateBook(bookId,bookDto);
		if(bookEntity==null) {
			return ResponseEntity.badRequest().build();
		}
		return ResponseEntity.ok().build();
	}
}
