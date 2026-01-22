"""
Tests for utility functions
"""

import pytest
from src.utils import greet, add, multiply


class TestGreet:
    """Tests for greet function"""
    
    def test_greet_returns_message(self):
        """Test that greet returns a greeting message"""
        assert greet("Alice") == "Hello, Alice!"
    
    def test_greet_empty_string_raises_error(self):
        """Test that empty string raises ValueError"""
        with pytest.raises(ValueError, match="Name must be a non-empty string"):
            greet("")
    
    def test_greet_none_raises_error(self):
        """Test that None raises ValueError"""
        with pytest.raises(ValueError):
            greet(None)
    
    def test_greet_number_raises_error(self):
        """Test that number raises ValueError"""
        with pytest.raises(ValueError):
            greet(123)


class TestAdd:
    """Tests for add function"""
    
    def test_add_positive_numbers(self):
        """Test adding positive numbers"""
        assert add(2, 3) == 5
    
    def test_add_negative_numbers(self):
        """Test adding negative numbers"""
        assert add(-1, -1) == -2
    
    def test_add_mixed_signs(self):
        """Test adding mixed sign numbers"""
        assert add(-1, 1) == 0
    
    def test_add_floats(self):
        """Test adding floating point numbers"""
        assert add(1.5, 2.5) == 4.0
    
    def test_add_zero(self):
        """Test adding zero"""
        assert add(0, 0) == 0
    
    def test_add_string_raises_error(self):
        """Test that string raises TypeError"""
        with pytest.raises(TypeError, match="Both arguments must be numbers"):
            add("1", 2)


class TestMultiply:
    """Tests for multiply function"""
    
    def test_multiply_positive_numbers(self):
        """Test multiplying positive numbers"""
        assert multiply(3, 4) == 12
    
    def test_multiply_by_zero(self):
        """Test multiplying by zero"""
        assert multiply(5, 0) == 0
    
    def test_multiply_negative_numbers(self):
        """Test multiplying negative numbers"""
        assert multiply(-2, -3) == 6
    
    def test_multiply_floats(self):
        """Test multiplying floats"""
        assert multiply(2.5, 4.0) == 10.0
    
    def test_multiply_invalid_type_raises_error(self):
        """Test that invalid type raises TypeError"""
        with pytest.raises(TypeError):
            multiply(1, "2")
