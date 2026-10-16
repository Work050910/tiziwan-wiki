import http.server, socketserver, os, sys

PORT = 3888
DIRECTORY = 'out'

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def do_GET(self):
        # Auto append /index.html if requesting clean path that is a dir
        path = self.path.split('?')[0].split('#')[0]
        full_path = os.path.join(DIRECTORY, path.lstrip('/'))
        if os.path.isdir(full_path) and not path.endswith('/'):
            self.send_response(301)
            self.send_header('Location', path + '/')
            self.end_headers()
            return
        super().do_GET()

if __name__ == '__main__':
    with socketserver.TCPServer(('127.0.0.1', PORT), Handler) as httpd:
        print(f'Serving tiziwan.wiki strictly on http://127.0.0.1:{PORT}')
        httpd.serve_forever()
