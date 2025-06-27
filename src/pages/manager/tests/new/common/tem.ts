import { z } from "zod";

const schema = z.array(z.object({
	name: z.string(),
	age: z.number().int().positive(),
}));

const data = [
	{ name: "Bob", age: 0 },
	{ name: "Charlie", age: 35 },
	{ name: "Alice", age: -4 },
];

const validateData = (data: unknown) => {
	try {
		schema.parse(data);
		console.log("Data is valid");
	} catch (e) {
		if (e instanceof z.ZodError) {
			console.error("Validation errors:", e.errors.map(err => `${err.path.join('.')} - ${err.message}`));
		} else {
			console.error("Unexpected error:", e);
		}
	}
}

validateData(data);