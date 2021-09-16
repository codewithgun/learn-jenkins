function sum(a: number, b: number): number {
	return a + b;
}

// Jest Testing Framework
// https://jestjs.io/docs/

// We can scope beforeAll, beforeEach in describe() block
// The setup will apply only for test cases in the describe() block
// Example:
// describe('Block scoped test setup', () => {
// 	beforeAll(() => {});
// 	beforeEach(() => {});
// 	afterAll(() => {});
// 	afterEach(() => {});

// 	test('beforeAll will error if no test in describe() block', () => {});
// });

// For One-Time Setup
beforeAll(() => {
	// console.log('Run before test cases start');
});

afterAll(() => {
	// console.log('Run after all test case finished');
});
// End

// Repeating Setup for Each Test
beforeEach(() => {
	// console.log('Run before each test');
});

afterEach(() => {
	// console.log('Run after each test');
});
// End

describe('Truthiness', () => {
	test('null, undefined', () => {
		const n = null;
		expect(n).toBeNull();
		expect(n).toBeFalsy();

		const u = undefined;
		expect(u).toBeUndefined();
		expect(u).toBeFalsy();

		expect(n).not.toBeTruthy();
	});
});

describe('Number', () => {
	test('test number equality', () => {
		const zero = 0;
		expect(zero).toBeGreaterThan(-1);
		expect(zero).toBe(0);
		expect(zero).toBeLessThan(1);
		expect(zero).toBeGreaterThanOrEqual(0);
		expect(zero).toBeLessThanOrEqual(0);
	});

	test('adding floating point numbers', () => {
		const value = 0.1 + 0.2;
		// expect(value).toBe(0.3); //This won't work because of rounding error
		expect(value).toBeCloseTo(0.3); // This works.
	});

	test('adds 1 + 2 equals 3', () => {
		expect(sum(1, 2)).toBe(3);
	});

	test('adds 1 + 2 not equals 4', () => {
		expect(sum(1, 2)).not.toBe(4);
	});
});

describe('String', () => {
	test('there is no I in team', () => {
		expect('team').not.toMatch(/I/);
	});

	test('but there is a "stop" in Christoph', () => {
		expect('Christoph').toMatch(/stop/);
	});
});

describe('Array or iterable', () => {
	const shoppingList = ['diapers', 'kleenex', 'trash bags', 'paper towels', 'milk'];

	test('the shopping list has milk on it', () => {
		expect(shoppingList).toContain('milk');
		expect(new Set(shoppingList)).toContain('milk');
	});
});

describe('Exception', () => {
	function compileAndroidCode() {
		throw new Error('you are using the wrong JDK');
	}

	test('compiling android goes as expected', () => {
		expect(() => compileAndroidCode()).toThrow();
		expect(() => compileAndroidCode()).toThrow(Error);

		// You can also use the exact error message or a regexp
		expect(() => compileAndroidCode()).toThrow('you are using the wrong JDK');
		expect(() => compileAndroidCode()).toThrow(/JDK/);
	});
});
