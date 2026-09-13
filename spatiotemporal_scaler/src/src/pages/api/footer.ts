export async function GET() {
  const remoteUrl = 'https://cf268321.cloudfree.jp/13jellies/asset/html/footer.html';

  try {
    const res = await fetch(remoteUrl);
    const ab = await res.arrayBuffer();
    const buf = new Uint8Array(ab);

    const tryEncodings = ['utf-8', 'utf8', 'shift_jis', 'shift-jis', 'euc-jp', 'iso-2022-jp'];
    let text = null;

    for (const enc of tryEncodings) {
      try {
        // TextDecoder supports many encodings in modern Node builds
        const dec = new TextDecoder(enc);
        text = dec.decode(buf);
        // crude sanity check
        if (text && text.includes('<footer')) break;
      } catch (e) {
        // try next
      }
    }

    if (!text) {
      // fallback to utf-8 decode
      text = new TextDecoder('utf-8').decode(buf);
    }

    // Normalize meta charset to UTF-8 so browser renders consistently
    text = text.replace(/<meta[^>]*charset=["']?[^>"'> ]+[^>]*>/i, '<meta charset="utf-8">');

    return new Response(text, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8'
      }
    });
  } catch (err) {
    return new Response(`<footer>Footer proxy error: ${String(err && err.message ? err.message : err)}</footer>`, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
      status: 502
    });
  }
}
