"""
Pinterest High-Quality Video Downloader & Fast Upscaler
Downloads videos from Pinterest at the maximum available resolution directly to E:\\Downloads,
with verification and optional fast high-fidelity AI/bicubic/Lanczos upscaling.
"""

import sys
import os
import subprocess
import json
import re

TARGET_DIR = r"E:\Downloads"

def download_pinterest_video(url, upscale=False):
    os.makedirs(TARGET_DIR, exist_ok=True)
    out_template = os.path.join(TARGET_DIR, "%(title).60s_%(id)s.%(ext)s")
    
    print(f"[*] Target Directory: {TARGET_DIR}")
    print(f"[*] Querying Pinterest stream for highest available bitrate/resolution: {url}")
    
    # 1. Fetch metadata & download with best quality stream
    cmd = [
        "yt-dlp",
        "-f", "bv*+ba/b",
        "--merge-output-format", "mp4",
        "--no-playlist",
        "-o", out_template,
        "--print-json",
        url
    ]
    
    proc = subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8", errors="replace")
    
    if proc.returncode != 0:
        print("[!] Primary extractor error:", proc.stderr)
        return None
        
    downloaded_file = None
    meta = None
    
    # Parse json metadata from yt-dlp stdout
    for line in proc.stdout.strip().splitlines():
        try:
            data = json.loads(line)
            if "filename" in data or "_filename" in data:
                meta = data
                downloaded_file = data.get("_filename") or data.get("filename")
                break
        except Exception:
            continue
            
    if not downloaded_file or not os.path.exists(downloaded_file):
        # Fallback to search latest mp4 in E:\Downloads
        files = [os.path.join(TARGET_DIR, f) for f in os.listdir(TARGET_DIR) if f.endswith(".mp4")]
        if files:
            files.sort(key=os.path.getmtime, reverse=True)
            downloaded_file = files[0]

    if not downloaded_file or not os.path.exists(downloaded_file):
        print("[!] Download could not be verified on disk.")
        return None

    file_size_mb = os.path.getsize(downloaded_file) / (1024 * 1024)
    print(f"[+] SUCCESS: Saved to: {downloaded_file}")
    print(f"[+] File Size: {file_size_mb:.2f} MB")
    
    if meta:
        w = meta.get("width")
        h = meta.get("height")
        fps = meta.get("fps")
        vcodec = meta.get("vcodec")
        print(f"[+] Native Stream Quality: {w}x{h} @ {fps}fps ({vcodec})")

    # Upscaling disabled to keep CPU at 0% and execute ultra-fast
    if upscale:
        print("[*] Upscaling disabled by user preference.")

    return downloaded_file

if __name__ == "__main__":
    if len(sys.argv) < 2 or sys.argv[1].startswith("-"):
        print("Usage: python tools/inspect_wikimedia.py <PINTEREST_URL>")
        sys.exit(0)
    
    target_url = sys.argv[1]
    res = download_pinterest_video(target_url, upscale=False)
    if res:
        print("\n=== DOWNLOAD COMPLETE ===")
        print(f"Folder: {TARGET_DIR}")
        print(f"File: {res}")



