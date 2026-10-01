#!/usr/bin/env python3
"""
Simple local development server for Wanderlust Travel Diary.
Serves static files with correct MIME types and CORS headers.
"""

import http.server
import socketserver
import webbrowser
import os
import sys

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        # Enable CORS headers for ThreeJS textures
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-store, must-revalidate')
        super().end_headers()

def main():
    port = PORT
    # Try finding an open port if 8080 is busy
    for attempt_port in range(port, port + 20):
        try:
            with socketserver.TCPServer(("", attempt_port), Handler) as httpd:
                url = f"http://localhost:{attempt_port}"
                print("\n" + "="*60)
                print(f"🌍 Wanderlust Travel Diary running at:")
                print(f"   👉 {url}")
                print("="*60)
                print("Press Ctrl+C to stop the server.\n")

                if len(sys.argv) > 1 and sys.argv[1] == '--open':
                    webbrowser.open(url)

                httpd.serve_forever()
                break
        except OSError:
            continue

if __name__ == '__main__':
    main()
