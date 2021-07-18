import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "@moai/core";
import { useState } from "react";

const defaultValue = "GoodBye";
const InputTesting = () => {
	const [value, setValue] = useState<string>("");
	return (
		<div>
			<Input value={value} setValue={setValue} aria-label="input" />
			<div>{value}</div>
			<button onClick={() => setValue(defaultValue)}>Change</button>
		</div>
	);
};

describe("Testing Input Controlled Props", () => {
	test("div value should change after Input value change", async () => {
		const inputText = "Hello";
		render(<InputTesting />);

		const inputElement = screen.getByLabelText("input") as HTMLInputElement;

		userEvent.type(inputElement, inputText);
		expect(inputElement).toHaveValue(inputText);
		expect(screen.getByText(inputText)).toBeTruthy();
	});

	test("Input's text should be changed when props.value is changed", async () => {
		render(<InputTesting />);

		const inputElement = screen.getByLabelText("input") as HTMLInputElement;
		const buttonElement = screen.getByRole("button", { name: "Change" });

		userEvent.click(buttonElement);
		expect(screen.getByText(defaultValue)).toBeDefined();
		expect(inputElement).toHaveValue(defaultValue);
	});
});

describe("Testing Input Uncontrolled Props", () => {
	test("props.defaultValue should be displayed before Input's text change", async () => {
		const defaultValue = "Foo";
		render(
			<Input defaultValue={defaultValue} aria-label="default-input" />
		);

		const inputElement = screen.getByLabelText(
			"default-input"
		) as HTMLInputElement;

		expect(inputElement).toHaveValue(defaultValue);
	});

	test("props.defaultValue should be replace when Input's text change", async () => {
		const inputValue = "Hello";
		render(<Input defaultValue="Foo" aria-label="default-input" />);

		const inputElement = screen.getByLabelText(
			"default-input"
		) as HTMLInputElement;

		fireEvent.change(inputElement, { target: { value: inputValue } });
		expect(inputElement).toHaveValue(inputValue);
	});
});
