package com.service.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "book")
public class BookEntity {
	@Id @GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;
	
	private String title;
		
	private String gener;


	
	public BookEntity() { }
	
	public BookEntity(String title,String gener) {
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

	@Override
	public String toString() {
		return "BookEntity [id=" + id + ", title=" + title + ", gener=" + gener + "]";
	}
	
	
	
	
}
