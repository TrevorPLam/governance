#!/usr/bin/env python3
"""
Governance Validation Script

Validates that the project meets governance requirements.
"""

import os
import sys
from pathlib import Path

REQUIRED_FILES = [
    '.repo/repo.manifest.yaml',
    '.repo/README.md',
    'pyproject.toml',
    'README.md',
    'src/__init__.py',
]

def main():
    """Main validation function"""
    errors = 0
    
    print("🔍 Validating governance compliance...\n")
    
    print("Checking required files...")
    for file in REQUIRED_FILES:
        if Path(file).exists():
            print(f"  ✓ {file}")
        else:
            print(f"  ✗ {file} - MISSING")
            errors += 1
    
    print("\n" + "=" * 50)
    if errors == 0:
        print("✅ All governance checks passed!")
        sys.exit(0)
    else:
        print(f"❌ {errors} governance check(s) failed!")
        sys.exit(1)

if __name__ == "__main__":
    main()
