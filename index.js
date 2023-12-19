function egcd(a, b) {
    let x = 0, y = 1, u = 1, v = 0;

    while (a !== 0) {
        const q = Math.floor(b / a);
        const r = b % a;
        const m = x - u * q;
        const n = y - v * q;

        b = a;
        a = r;
        x = u;
        y = v;
        u = m;
        v = n;
    }

    const gcd = b;

    return [gcd, x, y];
}

function mInv(a, m) {
    const [gcd, x] = egcd(a, m);

    if (gcd !== 1) {
        return null;
    } else {
        return (x % m + m) % m;
    }
}

function enkripsi(text, key) {
    return [...text.toUpperCase().replace(/ /g, '')].map(
        t => String.fromCharCode(((key[0] * (t.charCodeAt(0) - 'A'.charCodeAt(0)) + key[1]) % 26) + 'A'.charCodeAt(0))
    ).join('');
}

function denkripsi(cipher, key) {
    const aInv = mInv(key[0], 26);
    
    if (aInv === null) {
        throw new Error('Key Error');
    }

    return [...cipher].map(
        c => String.fromCharCode(((aInv * (c.charCodeAt(0) - 'A'.charCodeAt(0) - key[1])) % 26 + 26) % 26 + 'A'.charCodeAt(0))
    ).join('');
}

function result() {
    const text = 'cryptography';
    const key = [3, 5];

    const encText = enkripsi(text, key);

    console.log('Deskripsi: ', denkripsi(encText, key));

    console.log('Enkripsi: ', encText)

    
}

if (typeof require !== 'undefined' && require.main === module) {
    result();
}