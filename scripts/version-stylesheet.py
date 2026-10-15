"""Keep static pages linked to the stylesheet content they were published with."""

import hashlib
import re
from pathlib import Path

root = Path(__file__).resolve().parent.parent
version = hashlib.sha256((root / "site.css").read_bytes()).hexdigest()[:12]
changed = 0
for page in root.rglob("*.html"):
    content = page.read_text(encoding="utf-8")
    updated = re.sub(
        r'href="/site\.css(?:\?v=[^"]*)?"',
        f'href="/site.css?v={version}"',
        content,
    )
    if updated != content:
        page.write_text(updated, encoding="utf-8")
        changed += 1
print(f"Stylesheet {version}: updated {changed} pages")
