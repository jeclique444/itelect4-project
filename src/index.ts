// Import the interfaces we made para magamit sa main file
import type { User, Course, Submission, StringOrNumber } from "../types/index";

// ===== BASIC TYPES / PRIMITIVES =====
// Eto yung mga pangunahing types na ginagamit natin sa TS
const projectName: string = "itelect4-project";      // pangalan ng project ko
const currentYear: number = 2026;                    // current AY
const isFullStack: boolean = true;                   // check if full stack to
const nothing: null = null;                          // intentionally empty
const notSet: undefined = undefined;                 // wala pang value

// Function na may parameters at return type
function greet(name: string, year: number): string {
  return `Welcome to ${name} -- AY ${year}!`;
}

// Void function - walang ibabalik na value
function logMessage(message: string): void {
  console.log(message);
}

logMessage(greet(projectName, currentYear));

// ===== SPECIAL TYPES =====
// any - parang walang type checking (di raw maganda gamitin to)
let anything: any = "hello";
anything = 42;      // no error kahit magbago type
anything = true;    // okay lang din

// unknown - mas safe version ng any (need i-check muna yung type)
let userInput: unknown = "test";
if (typeof userInput === "string") {
  console.log(userInput.toUpperCase()); // alam na ni TS na string to
}

// never - function na hindi talaga nag-rereturn (either throw or infinite loop)
function throwError(message: string): never {
  throw new Error(message);
}

// ===== GAMITIN NATIN YUNG INTERFACES =====
// Gumawa tayo ng student object gamit yung User interface
const student: User = {
  id: 1,
  name: "Juan dela Cruz",
  email: "juan@example.com",
  role: "student",
  isActive: true,
};

// At yung Course interface naman para sa course object
const course: Course = {
  code: "ITELECT4",
  title: "IT Elective 4",
  units: 3,
  semester: "1st Semester 2026-2027",
};

console.log(student);
console.log(course);

// ===== TYPE NARROWING =====
// Dito nakikita ni TS kung anong exact type yung ginagamit
function processInput(input: StringOrNumber): string {
  if (typeof input === "string") {
    return input.toUpperCase();  // alam ni TS na string to
  }
  return input.toFixed(2);       // alam ni TS na number to
}

function formatDate(value: string | Date): string {
  if (value instanceof Date) {
    return value.toLocaleDateString();  // alam ni TS na Date to
  }
  return value;  // alam ni TS na string to
}

console.log(processInput("hello"));    // HELLO
console.log(processInput(3.14159));    // 3.14
console.log(formatDate(new Date()));   // display date