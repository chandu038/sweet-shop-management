package com.Incubyte.Sweet_Shop_Backend.Service;

import com.Incubyte.Sweet_Shop_Backend.Model.Sweet;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertThrows;

public class SweetServiceTest {
    // SweetService Red //
    @Test
    void addSweet_shouldFail_whenNameIsNull() {
        Sweet sweet = new Sweet(null, null, "Indian", 20.0, 5);

        assertThrows(IllegalArgumentException.class, () ->
                SweetService.addSweet(sweet)
        );
    }

}
