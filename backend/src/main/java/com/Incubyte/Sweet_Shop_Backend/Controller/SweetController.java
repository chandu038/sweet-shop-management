package com.Incubyte.Sweet_Shop_Backend.Controller;

import com.Incubyte.Sweet_Shop_Backend.Model.Sweet;
import com.Incubyte.Sweet_Shop_Backend.Service.SweetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/sweets")
public class SweetController {

    @Autowired
    private SweetService sweetService;
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Sweet addSweet(@RequestBody Sweet sweet) {
        return sweetService.addSweet(sweet);
    }

    @PutMapping("/{id}")
    public Sweet updateSweet(@PathVariable Long id, @RequestBody Sweet sweet) {
        return sweetService.updateSweet(id, sweet);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteSweet(@PathVariable Long id) {
        sweetService.deleteSweet(id);
        return ResponseEntity.ok(Map.of("message", "Sweet deleted successfully"));
    }

    @GetMapping("/{id}")
    public Sweet getSweet(@PathVariable Long id) {
        return sweetService.getSweet(id);
    }

    @GetMapping
    public List<Sweet> getAllSweets() {
        return sweetService.getAllSweets();
    }

    @GetMapping("/search")
    public List<Sweet> search(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice
    ) {
        return sweetService.search(name, category, minPrice, maxPrice);
    }

    @PostMapping("/{id}/purchase")
    public Sweet purchaseSweet(@PathVariable Long id, @RequestParam int quantity) {
        return sweetService.purchaseSweet(id, quantity);
    }

    @PostMapping("/{id}/restock")
    @PreAuthorize("hasRole('ADMIN')")
    public Sweet restockSweet(@PathVariable Long id, @RequestParam int quantity) {
        return sweetService.restockSweet(id, quantity);
    }
}