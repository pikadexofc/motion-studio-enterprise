#!/usr/bin/env python3
"""
Web Asset Harvester & Cataloguer for Creative Designers.
Catalogs all images in 05 Web Assets and prepares design metadata.
"""

import os
import json
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

COMPANIES = [
    "01 UNN Movers and Logistics",
    "02 Shining Services",
    "03 Darwin Tree Removal"
]

IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".svg", ".gif"}

def catalog_company_web_assets(company_rel_path: str):
    web_dir = BASE_DIR / "Shining Technologies" / "04 Companies" / company_rel_path / "05 Web Assets"
    if not web_dir.exists():
        return
    
    catalog = []
    for file in web_dir.rglob("*"):
        if file.is_file() and file.suffix.lower() in IMAGE_EXTENSIONS:
            catalog.append({
                "filename": file.name,
                "relative_path": str(file.relative_to(web_dir)).replace("\\", "/"),
                "extension": file.suffix.lower(),
                "size_kb": round(file.stat().st_size / 1024, 2)
            })
    
    catalog_file = web_dir / "asset_catalog.json"
    with open(catalog_file, "w", encoding="utf-8") as f:
        json.dump({
            "company": company_rel_path,
            "total_web_images": len(catalog),
            "assets": catalog
        }, f, indent=2)
    
    summary_file = web_dir / "README.md"
    rows = "\n".join([f"| `{a['filename']}` | `{a['extension']}` | {a['size_kb']} KB |" for a in catalog[:30]])
    with open(summary_file, "w", encoding="utf-8") as f:
        f.write(f"""# Web Assets Catalog: {company_rel_path}

**Total Harvested Graphics & Photos:** {len(catalog)}

| Asset File | Format | File Size |
|---|---|---|
{rows}

{"*...and more assets cataloged in asset_catalog.json*" if len(catalog) > 30 else ""}
""")
    print(f"[{company_rel_path}] Cataloged {len(catalog)} web images -> {catalog_file.name}")

def main():
    print("=== Shining Technologies: Web Asset Harvester ===")
    for c in COMPANIES:
        catalog_company_web_assets(c)
    print("Web asset catalogs generated successfully!")

if __name__ == "__main__":
    main()
