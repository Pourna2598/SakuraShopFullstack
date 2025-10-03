package com.example.backend.controller;

import org.springframework.web.bind.annotation.*;
import java.util.*;
import com.example.backend.model.CartItem;
import com.example.backend.model.Product;
import com.example.backend.repository.CartRepository;
import com.example.backend.repository.ProductRepository;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private final CartRepository cartRepo;
    private final ProductRepository productRepo;

    public CartController(CartRepository cartRepo, ProductRepository productRepo) {
        this.cartRepo = cartRepo;
        this.productRepo = productRepo;
    }

    @GetMapping
    public Map<String, Object> getCart() {
        List<CartItem> items = cartRepo.findAll();

        // Add product details + calculate total
        double total = 0.0;
        List<Map<String, Object>> detailedItems = new ArrayList<>();

        for (CartItem ci : items) {
            Product p = productRepo.findById(ci.getProductId()).orElse(null);
            if (p != null) {
                Map<String, Object> itemMap = new HashMap<>();
                itemMap.put("id", ci.getId());
                itemMap.put("productId", p.getId());
                itemMap.put("name", p.getName());
                itemMap.put("price", p.getPrice());
                itemMap.put("quantity", ci.getQuantity());
                itemMap.put("subtotal", p.getPrice() * ci.getQuantity());
                total += p.getPrice() * ci.getQuantity();
                detailedItems.add(itemMap);
            }
        }

        Map<String, Object> response = new HashMap<>();
        response.put("items", detailedItems);
        response.put("total", total);
        return response;
    }

    @PostMapping
    public CartItem addToCart(@RequestBody CartItem item) {
        return cartRepo.save(item);
    }

    @DeleteMapping("/{id}")
    public void removeFromCart(@PathVariable Long id) {
        cartRepo.deleteById(id);
    }
}
