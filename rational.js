function gcd(n, d) {
//	console.log(`${n}/${d}`);
	if (n == 0n || n == 0) {
		return d;
	}
//	console.log(`${n} is not 0`);
	if (d == 0n || d == 0) {
		return n;
	}
//	console.log(`${d} is not 0`);
	if (n > d) {
		return gcd(d, n % d);
	} else {
		return gcd(n, d % n);
	}
}

const big_abs = (n) => (n < 0n) ? -n : n;

class Rational {
	constructor(n, d = 1n) {
		if (d == 0n) {
			throw new Error("denominator zero!");
		}
//		this.n = n;
//		this.d = d;
		const the_gcd = BigInt(gcd(big_abs(n), big_abs(d)));
		this.n = BigInt(n) / the_gcd;
		this.d = BigInt(d) / the_gcd;
	}

	plus(rhs) {
		if (rhs instanceof Rational) {
			let common = gcd(this.d, rhs.d);
			let this_denom = this.d / common;
			let rhs_denom = rhs.d / common;
			return new Rational(this.n * rhs_denom + rhs.n * this_denom, this_denom * rhs.d);
		} else {
			return new Rational(this.n + rhs, this.d);
		}
	}

	negate() {
		return new Rational(-this.n, this.d);
	}

	minus(rhs) {
		if (rhs instanceof Rational) {
			return this.plus(rhs.negate());
		} else {
			return new Rational(this.n - rhs, this.d);
		}
	}

	times(rhs) {
		if (rhs instanceof Rational) {
			return new Rational(this.n * rhs.n, this.d * rhs.d);
		} else {
			const common = gcd(this.d, Math.abs(rhs));
			return new Rational(this.n * rhs / common, this.d / common);
		}
	}

	power(rhs) {
		return new Rational(this.n ** BigInt(rhs), this.d ** BigInt(rhs));
	}

	num() {
		return Number(this.n) / Number(this.d);
	}

	percent() {
		return Number(this.n * 100n) / Number(this.d);
	}
}
