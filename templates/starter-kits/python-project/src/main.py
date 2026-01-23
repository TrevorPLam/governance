"""
Main application module

This is a simple Python application demonstrating
project structure with governance compliance.
"""

from typing import Optional
from .utils import greet, add, multiply


def main() -> None:
    """Main application entry point."""
    print(greet("World"))
    
    result = add(5, 3)
    print(f"5 + 3 = {result}")
    
    result = multiply(4, 7)
    print(f"4 * 7 = {result}")
    
    print("Application running successfully!")


if __name__ == "__main__":
    main()
