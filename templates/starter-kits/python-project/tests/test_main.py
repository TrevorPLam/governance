"""
Tests for main module
"""

from src.main import main


def test_main_runs_without_error(capsys):
    """Test that main function runs without error"""
    main()
    captured = capsys.readouterr()
    assert "Hello, World!" in captured.out
    assert "Application running successfully!" in captured.out
