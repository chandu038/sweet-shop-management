package com.Incubyte.Sweet_Shop_Backend.Service;

import com.Incubyte.Sweet_Shop_Backend.Model.Sweet;
import com.Incubyte.Sweet_Shop_Backend.Repo.SweetRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SweetServiceImpl implements SweetService {

    @Autowired
    private SweetRepo repo;

    @Override
    public Sweet addSweet(Sweet sweet) {
        return repo.save(sweet);
    }

    @Override
    public Sweet updateSweet(Long id, Sweet sweet) {
        Sweet existing = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Sweet not found"));

        existing.setName(sweet.getName());
        existing.setCategory(sweet.getCategory());
        existing.setPrice(sweet.getPrice());
        existing.setQuantity(sweet.getQuantity());

        return repo.save(existing);
    }

    @Override
    public void deleteSweet(Long id) {
        Sweet sweet = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Sweet not found"));
        repo.delete(sweet);
    }

    @Override
    public Sweet getSweet(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Sweet not found"));
    }

    @Override
    public List<Sweet> getAllSweets() {
        return repo.findAll();
    }

    @Override
    public List<Sweet> search(String name, String category, Double minPrice, Double maxPrice) {
        return repo.findAll().stream()
                .filter(s -> (name == null || s.getName().equalsIgnoreCase(name)))
                .filter(s -> (category == null || s.getCategory().equalsIgnoreCase(category)))
                .filter(s -> (minPrice == null || s.getPrice() >= minPrice))
                .filter(s -> (maxPrice == null || s.getPrice() <= maxPrice))
                .toList();
    }

    @Override
    public Sweet purchaseSweet(Long id, int quantity) {
        Sweet sweet = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Sweet not found"));

        if (sweet.getQuantity() < quantity)
            throw new RuntimeException("Not enough stock");

        sweet.setQuantity(sweet.getQuantity() - quantity);
        return repo.save(sweet);
    }

    @Override
    public Sweet restockSweet(Long id, int quantity) {
        Sweet sweet = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Sweet not found"));

        sweet.setQuantity(sweet.getQuantity() + quantity);
        return repo.save(sweet);
    }
}
