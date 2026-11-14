@echo off
cd /d "%~dp0"
echo Open http://127.0.0.1:8765 in your browser.
echo Keep this window open. Press Ctrl+C to stop.
where py >nul 2>nul
if not errorlevel 1 (
  py -3 -m http.server 8765 --bind 127.0.0.1 --directory dist
) else (
  python -m http.server 8765 --bind 127.0.0.1 --directory dist
)
pause
