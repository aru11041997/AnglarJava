package com.service.dto;

public class BookDto {
	private Integer id;
	
	private String title;
		
	private String gener;


	
	public BookDto() { }
	
	public BookDto(String title,String gener) {
		this.title=title;
		this.gener=gener;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getGener() {
		return gener;
	}

	public void setGener(String gener) {
		this.gener = gener;
	}
}
