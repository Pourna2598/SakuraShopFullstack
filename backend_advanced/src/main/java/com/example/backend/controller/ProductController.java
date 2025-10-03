package com.example.backend.controller;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.example.backend.model.Product;
import com.example.backend.repository.ProductRepository;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductRepository repository;

    public ProductController(ProductRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Product> getAllProducts() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) {
        return repository.findById(id).orElse(null);
    }
}
