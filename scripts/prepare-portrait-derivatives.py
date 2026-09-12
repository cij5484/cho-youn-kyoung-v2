"""Regenerate display-sized derivatives; never replace the authentic source files."""
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[1]
assets = root / "src/about/assets"
sources = sorted(assets.glob("portrait-[0-9][0-9].webp")) + [root / "src/home/assets/artist-portrait-960.webp"]
assert len(sources) == 12
target = assets / "thumbnails"
target.mkdir(exist_ok=True)
before_pixels = after_pixels = before_bytes = after_bytes = 0
for source in sources:
    with Image.open(source) as image:
        aspect = image.width / image.height
        before_pixels += image.width * image.height
        before_bytes += source.stat().st_size
        image.thumbnail((480, 480), Image.Resampling.LANCZOS)
        output = target / source.name
        image.save(output, "WEBP", quality=86, method=6)
        with Image.open(output) as saved:
            assert max(saved.size) <= 480 and min(saved.size) > 0
            assert abs(saved.width / saved.height - aspect) < .004
            after_pixels += saved.width * saved.height
        after_bytes += output.stat().st_size
with Image.open(assets / "portrait-35.webp") as image:
    image.thumbnail((768, 2400), Image.Resampling.LANCZOS)
    output = assets / "portrait-hero-mobile.webp"
    image.save(output, "WEBP", quality=88, method=6)
    with Image.open(output) as saved:
        assert saved.width == 768
        print(f"Mobile hero: {saved.width}x{saved.height}, {output.stat().st_size} bytes")
print(f"12 portraits: pixels {before_pixels:,} -> {after_pixels:,}; bytes {before_bytes:,} -> {after_bytes:,}")
