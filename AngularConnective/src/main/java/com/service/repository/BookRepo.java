package com.service.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.service.entity.BookEntity;

public interface BookRepo extends JpaRepository<BookEntity, Integer> {

}
