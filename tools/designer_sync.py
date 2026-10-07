#!/usr/bin/env python3
"""
Designer Sync CLI - Shining Technologies Creative Workspace Engine.
One-stop tool to sync brand kits, harvest assets, and audit folder integrity.
"""

import sys
import argparse
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

def run_brand_sync():
    from extract_brand_kit import main as brand_main
    brand_main()

def run_web_harvest():
    from harvest_web_assets import main as web_main
    web_main()

def run_audit():
    print("=== Shining Technologies: Workspace Audit ===")
    companies = [
        "01 UNN Movers and Logistics",
        "02 Shining Services",
        "03 Darwin Tree Removal"
    ]
    st_companies_dir = BASE_DIR / "Shining Technologies" / "04 Companies"
    
    for c in companies:
        c_path = st_companies_dir / c
        print(f"\n📂 {c}:")
        if not c_path.exists():
            print("  ❌ Company folder missing!")
            continue
        
        for sub in ["01 Brand Kit", "02 Company Profile", "03 Reels", "04 Statics", "05 Web Assets"]:
            sub_path = c_path / sub
            if sub_path.exists():
                count = sum(1 for _ in sub_path.rglob("*") if _.is_file())
                print(f"  ✅ {sub}: {count} files")
            else:
                print(f"  ⚠️ {sub}: Missing")
    
    mother_path = BASE_DIR / "Shining Technologies"
    print("\n🏢 Shining Technologies (Mother Company):")
    for m_sub in ["01 Brand Kit", "02 Company Profile & Decks", "03 Internal Products"]:
        p = mother_path / m_sub
        if p.exists():
            count = sum(1 for _ in p.rglob("*") if _.is_file())
            print(f"  ✅ {m_sub}: {count} files")

def main():
    parser = argparse.ArgumentParser(description="Designer Workspace Sync CLI")
    parser.add_argument("--brand-kits", action="store_true", help="Sync brand kits and color tokens")
    parser.add_argument("--web-assets", action="store_true", help="Catalog web images and snapshots")
    parser.add_argument("--audit", action="store_true", help="Run workspace health and file audit")
    parser.add_argument("--all", action="store_true", help="Run full sync and audit")

    if len(sys.argv) == 1:
        parser.print_help()
        sys.exit(0)

    args = parser.parse_args()

    if args.all or args.brand_kits:
        run_brand_sync()
    if args.all or args.web_assets:
        run_web_harvest()
    if args.all or args.audit:
        run_audit()

if __name__ == "__main__":
    main()
