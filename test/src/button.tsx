import { render } from "@testing-library/react";
import { Button } from "@moai/core";

describe("Button", () => {
	beforeEach(() => {
		jest.spyOn(console, "error").mockImplementation(() => void 0);
	});
	test("throws if has no content", () => {
		expect(() => {
			render(<Button />);
		}).toThrowError('must have either "icon" or "children"');
	});
});
