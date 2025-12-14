package com.Incubyte.Sweet_Shop_Backend.Service;

import com.Incubyte.Sweet_Shop_Backend.Model.Sweet;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class SweetServiceTest {
    
    @Mock
    private SweetService sweetService;

    @Test
    void addSweet_shouldFail_whenNameIsNull() {
        Sweet sweet = new Sweet(null, null, "Indian", 20.0, 5);

        when(sweetService.addSweet(any(Sweet.class)))
            .thenThrow(new IllegalArgumentException("Sweet name cannot be null"));

        assertThrows(IllegalArgumentException.class, () ->
                sweetService.addSweet(sweet)
        );
    }
}