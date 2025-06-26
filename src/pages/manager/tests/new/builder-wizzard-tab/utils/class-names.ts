import { cn } from "../../../../../../app/cn";
import { DifficultyType } from "./base-schema";

const borderColorClass: Record<DifficultyType, string> = {
	Intern: cn("border-blue-200"),
	Junior: cn("border-green-200"),
	Middle: cn("border-yellow-200"),
	Senior: cn("border-orange-200"),
	Lead: cn("border-red-200"),
	Expert: cn("border-purple-200"),
};

const bgColorClass: Record<DifficultyType, string> = {
	Intern: cn("bg-blue-100"),
	Junior: cn("bg-green-100"),
	Middle: cn("bg-yellow-100"),
	Senior: cn("bg-orange-100"),
	Lead: cn("bg-red-100"),
	Expert: cn("bg-purple-100"),
};

const textColorClass: Record<DifficultyType, string> = {
	Intern: cn("text-blue-800"),
	Junior: cn("text-green-800"),
	Middle: cn("text-yellow-800"),
	Senior: cn("text-orange-800"),
	Lead: cn("text-red-800"),
	Expert: cn("text-purple-800"),
};

const outerBgColorClass: Record<DifficultyType, string> = {
	Intern: cn("bg-blue-50"),
	Junior: cn("bg-green-50"),
	Middle: cn("bg-yellow-50"),
	Senior: cn("bg-orange-50"),
	Lead: cn("bg-red-50"),
	Expert: cn("bg-purple-50"),
};

class DifficultyClassNameBuilder {
	private classes: string[] = [];
	private difficulty: DifficultyType;

	constructor(difficulty: DifficultyType) {
		this.difficulty = difficulty;
	}

	border() {
		this.classes.push(borderColorClass[this.difficulty] || cn("border-gray-200"));
		return this;
	}

	background() {
		this.classes.push(bgColorClass[this.difficulty] || cn("bg-gray-100"));
		return this;
	}

	text() {
		this.classes.push(textColorClass[this.difficulty] || cn("text-gray-800"));
		return this;
	}

	outerBackground() {
		this.classes.push(outerBgColorClass[this.difficulty] || cn("bg-gray-50"));
		return this;
	}

	build() {
		return cn(this.classes);
	}
}

export function difficultyClassNames(difficulty: DifficultyType) {
	return new DifficultyClassNameBuilder(difficulty);
}

export function getDifficultyClassNames(difficulty: DifficultyType) {
	return {
		border: borderColorClass[difficulty] || cn("border-gray-200"),
		background: bgColorClass[difficulty] || cn("bg-gray-100"),
		text: textColorClass[difficulty] || cn("text-gray-800"),
		outerBackground: outerBgColorClass[difficulty] || cn("bg-gray-50"),
	};
}

export const difficultyColorMap: Record<DifficultyType, string> = {
	Intern: 'blue',
	Junior: 'green',
	Middle: 'yellow',
	Senior: 'orange',
	Lead: 'red',
	Expert: 'purple',
};