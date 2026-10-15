# Compliar marketing website

This is a static HTML, CSS and JavaScript site. No build or dependency
installation is required.

From the repository root, start a local preview:

```sh
python3 -m http.server 3000 --bind 0.0.0.0
```

Open <http://localhost:3000/> or <http://localhost:3000/pricing/>.

After changing `site.css`, run the following before publishing so browsers
fetch the stylesheet that matches the updated pages:

```sh
python3 scripts/version-stylesheet.py
```
