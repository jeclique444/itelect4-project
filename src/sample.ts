// Import ko muna yung User interface para magamit sa function
import type { User } from "../types/index";

// ===== CONVERTED JS TO TS =====
// Eto yung sinabi ni sir na i-convert natin from JavaScript to TypeScript
// Nilagyan ko na ng mga types para walang errors pag nag-compile

function getUser(id: number): User & { score: number } {
  // Gumawa ng user object with matching fields sa interface + additional score
  return {
    id: id,
    name: "Juan dela Cruz",
    email: "juan@example.com",
    role: "tutee",     // tutee ang mas accurate kasi ang student is general term
    isActive: true,      // active naman si user
    score: 95.5,         // mataas na score to ah
  };
}

function calculateGrade(score: number, maxScore: number): string {
  // Compute percentage para malaman yung grade
  const percentage: number = (score / maxScore) * 100;
  
  // Dito nagche-check kung anong grade based sa percentage
  if (percentage >= 90) return "A";   // pasok na pasok
  if (percentage >= 80) return "B";   // okay na rin
  if (percentage >= 70) return "C";   // passing grade
  return "F";                          // bagsak :(
}

function formatCourse(name: string, units: number, semester: string): string {
  // Format ng course info para ma-display ng maayos
  return `${name} (${units} units) - ${semester}`;
}

// Eto yung magdi-display ng results
const user = getUser(1);           // kunin yung user data
console.log(user);                 // ipakita yung buong user object
console.log(calculateGrade(85, 100)); // compute grade ni user
console.log(formatCourse("IT Elective 4", 3, "1st Semester")); // display course details