// ===== MGA INTERFACES / SHAPES NG OBJECTS =====
// Dito ko nilalagay yung mga blueprint ng objects na gagamitin ko sa buong project
// Para organized at alam ni TS yung expected structure ng data

export interface User {
  id: string | number;        // pwedeng string or number yung ID (flexible)
  name: string;               // buong pangalan ni user
  email: string;              // email address
  role: "student" | "admin" | "instructor"; // limited roles lang para consistent
  isActive: boolean;          // active/inactive status
}

export interface Course {
  code: string;               // subject code like "ITELECT4"
  title: string;              // buong pangalan ng subject
  units: number;              // ilang units
  semester: string;           // anong sem to
}

export interface Submission {
  id: number;                 // unique ID ng submission
  studentId: number;          // sino yung nag-submit (reference sa User)
  courseCode: string;         // anong subject to (reference sa Course)
  repoUrl: string;            // link ng GitHub repo
  submittedAt: Date;          // kung kelan na-submit
  score?: number;             // optional to - pwedeng wala pang score
}

// ===== TYPE ALIASES =====
// Parang nicknames para sa mga types - mas madali gamitin

export type ID = number | string;              // pwedeng number or string
export type StringOrNumber = string | number;  // either string or number
export type Status = "pending" | "active" | "inactive"; // limited status values

// ===== INTERSECTION TYPES =====
// Pinagsamang types - lahat ng properties dapat meron

export type StudentWithCourse = User & {
  enrolledCourse: Course;   // may enrolled course dapat
  gpa: number;              // may grade point average
};