package com.Incubyte.Sweet_Shop_Backend.Service;

import com.Incubyte.Sweet_Shop_Backend.Model.Sweet;
import java.util.List;

public interface SweetService {

    // Add a new sweet
    Sweet addSweet(Sweet sweet);

    // Update sweet by ID
    Sweet updateSweet(Long id, Sweet sweet);

    // Delete sweet by ID
    void deleteSweet(Long id);

    // Get single sweet
    Sweet getSweet(Long id);

    // Get all sweets
    List<Sweet> getAllSweets();

    // Search sweets
    List<Sweet> search(String name, String category, Double minPrice, Double maxPrice);

    // Purchase (reduce quantity)
    Sweet purchaseSweet(Long id, int quantity);

    // Restock (increase quantity)
    Sweet restockSweet(Long id, int quantity);
}