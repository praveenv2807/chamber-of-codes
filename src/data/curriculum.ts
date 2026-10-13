export interface RoundQuestion {
  id: number;
  category: string;
  name: string;
  questionText: string;
  options: { key: string; text: string }[];
  expectedAnswer: string;
  hint: string;
  codeSnippet?: string;
}

export interface PotionStyle {
  name: string;
  liquidColor: string;
  glowColor: string;
  bottleShape:
    | "flask"
    | "spherical"
    | "vial"
    | "polygon"
    | "beaker"
    | "cauldron_vial"
    | "crystal";
  sparkleColor: string;
  particleHex: string;
}

export interface RoundConfig {
  roundNumber: number;
  title: string;
  character: string;
  characterRole: string;
  themeColor: string;
  puzzleImage: string;
  movieSceneTitle: string;
  locationName: string;
  nextWorldName: string;
  worldVideoBg: string;
  potion: PotionStyle;
  questions: RoundQuestion[];
}

export const ROUNDS_DATA: RoundConfig[] = [
  // ========================================================
  // ROUND 1
  // ========================================================
  {
    roundNumber: 1,
    title: "The Hogwarts Letters & Arrival",
    character: "Hermione Granger",
    characterRole: "Wand Mentor",
    themeColor: "from-amber-600/30 via-red-950/60 to-slate-950",
    puzzleImage: "/puzzles/image%201.jpeg",
    movieSceneTitle: "Harry Potter Movie Scene: Trial Phase 1",
    locationName: "King's Cross & Privet Drive",
    nextWorldName: "The Great Hall Banquet of Hogwarts",
    worldVideoBg:
      "https://assets.mixkit.co/videos/preview/mixkit-clouds-and-sun-in-a-sunset-sky-40439-large.mp4",
    potion: {
      name: "Alohomora Elixir",
      liquidColor: "from-amber-400 via-amber-500 to-yellow-600",
      glowColor: "rgba(245, 158, 11, 0.8)",
      bottleShape: "flask",
      sparkleColor: "#fef08a",
      particleHex: "#f59e0b",
    },
    questions: [
      {
        id: 1,
        category: "Computer Basics",
        name: "Brain of Computer",
        questionText:
          "Which hardware component acts as the 'Brain' of the computer?",
        options: [
          { key: "A", text: "Monitor" },
          { key: "B", text: "CPU (Central Processing Unit)" },
          { key: "C", text: "Keyboard" },
          { key: "D", text: "Hard Disk" },
        ],
        expectedAnswer: "B",
        hint: "It executes instructions and performs all calculations!",
      },
      {
        id: 2,
        category: "C Basics",
        name: "Main Function",
        questionText:
          "Which mandatory function does the C compiler look for to begin program execution?",
        options: [
          { key: "A", text: "start()" },
          { key: "B", text: "run()" },
          { key: "C", text: "main()" },
          { key: "D", text: "print()" },
        ],
        expectedAnswer: "C",
        hint: "Every standard C program starts inside int main().",
      },
      {
        id: 3,
        category: "Computer Units",
        name: "Bits in a Byte",
        questionText: "How many bits make up exactly 1 Byte?",
        options: [
          { key: "A", text: "4 bits" },
          { key: "B", text: "8 bits" },
          { key: "C", text: "16 bits" },
          { key: "D", text: "32 bits" },
        ],
        expectedAnswer: "B",
        hint: "One Byte consists of 8 binary bits.",
      },
      {
        id: 4,
        category: "C Arithmetic",
        name: "Order of Operations",
        questionText: "What will be printed by this C statement?",
        codeSnippet: 'int x = 2 + 3 * 2;\nprintf("%d", x);',
        options: [
          { key: "A", text: "10" },
          { key: "B", text: "8" },
          { key: "C", text: "12" },
          { key: "D", text: "7" },
        ],
        expectedAnswer: "B",
        hint: "Multiplication happens first: 3 * 2 = 6, then 2 + 6 = 8.",
      },
      {
        id: 5,
        category: "Hardware",
        name: "Output Device",
        questionText: "Which of the following is an OUTPUT device?",
        options: [
          { key: "A", text: "Monitor" },
          { key: "B", text: "Keyboard" },
          { key: "C", text: "Mouse" },
          { key: "D", text: "Scanner" },
        ],
        expectedAnswer: "A",
        hint: "It displays visual output directly to you.",
      },
      {
        id: 6,
        category: "C Basics",
        name: "Console Printing",
        questionText:
          "Which library function in C prints formatted text to the screen?",
        options: [
          { key: "A", text: "scanf()" },
          { key: "B", text: "output()" },
          { key: "C", text: "printf()" },
          { key: "D", text: "display()" },
        ],
        expectedAnswer: "C",
        hint: "It lives inside stdio.h and is called printf.",
      },
    ],
  },

  // ========================================================
  // ROUND 2
  // ========================================================
  {
    roundNumber: 2,
    title: "The Hogwarts Secrets & Magic",
    character: "Ron Weasley",
    characterRole: "Brave Tactician",
    themeColor: "from-amber-500/30 via-slate-950 to-orange-950",
    puzzleImage: "/puzzles/image%202.jpg",
    movieSceneTitle: "Harry Potter Movie Scene: Trial Phase 2",
    locationName: "The Great Hall of Hogwarts Castle",
    nextWorldName: "Hogwarts Castle Over The Black Lake",
    worldVideoBg:
      "https://assets.mixkit.co/videos/preview/mixkit-bright-sun-over-a-calm-sea-at-sunset-41619-large.mp4",
    potion: {
      name: "Lumos Draught",
      liquidColor: "from-cyan-400 via-blue-500 to-indigo-700",
      glowColor: "rgba(6, 182, 212, 0.8)",
      bottleShape: "spherical",
      sparkleColor: "#a5f3fc",
      particleHex: "#06b6d4",
    },
    questions: [
      {
        id: 7,
        category: "Memory",
        name: "Temporary RAM",
        questionText:
          "Which memory loses all stored data when the power is turned off?",
        options: [
          { key: "A", text: "Hard Disk" },
          { key: "B", text: "ROM" },
          { key: "C", text: "RAM" },
          { key: "D", text: "Flash Drive" },
        ],
        expectedAnswer: "C",
        hint: "Random Access Memory is volatile!",
      },
      {
        id: 8,
        category: "C Variables",
        name: "Integer Keyword",
        questionText: "Which keyword is used to declare a whole number in C?",
        options: [
          { key: "A", text: "num" },
          { key: "B", text: "int" },
          { key: "C", text: "float" },
          { key: "D", text: "char" },
        ],
        expectedAnswer: "B",
        hint: "Short for integer, e.g. int rollNo = 101;",
      },
      {
        id: 9,
        category: "C Increment",
        name: "Increment Operator",
        questionText: "What will this output print?",
        codeSnippet: 'int a = 5;\na++;\nprintf("%d", a);',
        options: [
          { key: "A", text: "5" },
          { key: "B", text: "6" },
          { key: "C", text: "7" },
          { key: "D", text: "4" },
        ],
        expectedAnswer: "B",
        hint: "a++ adds 1 to 5, resulting in 6.",
      },
      {
        id: 10,
        category: "C Basics",
        name: "Character Literal",
        questionText: "Which quotation marks surround a single char in C?",
        options: [
          { key: "A", text: "Single Quotes ( 'A' )" },
          { key: "B", text: 'Double Quotes ( "A" )' },
          { key: "C", text: "Square Brackets ( [A] )" },
          { key: "D", text: "Angle Brackets ( <A> )" },
        ],
        expectedAnswer: "A",
        hint: "Characters use single quotes like 'Z'.",
      },
      {
        id: 11,
        category: "Hardware",
        name: "Permanent Storage",
        questionText:
          "Which component stores your operating system and files permanently?",
        options: [
          { key: "A", text: "Hard Disk / SSD" },
          { key: "B", text: "RAM" },
          { key: "C", text: "Cache" },
          { key: "D", text: "Registers" },
        ],
        expectedAnswer: "A",
        hint: "Non-volatile storage like an SSD or HDD.",
      },
      {
        id: 12,
        category: "C Arithmetic",
        name: "Remainder Modulo",
        questionText: "What does the % operator calculate in C?",
        options: [
          { key: "A", text: "Percentage" },
          { key: "B", text: "Remainder of division" },
          { key: "C", text: "Power of a number" },
          { key: "D", text: "Square root" },
        ],
        expectedAnswer: "B",
        hint: "For example, 7 % 3 gives 1.",
      },
    ],
  },

  // ========================================================
  // ROUND 3
  // ========================================================
  {
    roundNumber: 3,
    title: "The Quidditch & Flight Grounds",
    character: "Remus Lupin",
    characterRole: "Defense Professor",
    themeColor: "from-blue-600/30 via-indigo-950/60 to-slate-950",
    puzzleImage: "/puzzles/image%203.jpg",
    movieSceneTitle: "Harry Potter Movie Scene: Trial Phase 3",
    locationName: "Castle Grounds & Pitch",
    nextWorldName: "Gryffindor Tower Fireplace Common Room",
    worldVideoBg:
      "https://assets.mixkit.co/videos/preview/mixkit-clouds-and-sun-in-a-golden-sunset-41618-large.mp4",
    potion: {
      name: "Expecto Patronum Phial",
      liquidColor: "from-sky-300 via-blue-400 to-teal-500",
      glowColor: "rgba(56, 189, 248, 0.9)",
      bottleShape: "crystal",
      sparkleColor: "#ffffff",
      particleHex: "#38bdf8",
    },
    questions: [
      {
        id: 13,
        category: "C Operators",
        name: "Equality Comparison",
        questionText: "Which operator in C tests if two values are EQUAL?",
        options: [
          { key: "A", text: "=" },
          { key: "B", text: "==" },
          { key: "C", text: "===" },
          { key: "D", text: "!=" },
        ],
        expectedAnswer: "B",
        hint: "Single '=' assigns; double '==' tests for equality.",
      },
      {
        id: 14,
        category: "C Relational",
        name: "True Condition",
        questionText:
          "What integer value represents TRUE in standard C conditions?",
        codeSnippet: 'int c = (5 > 2);\nprintf("%d", c);',
        options: [
          { key: "A", text: "1" },
          { key: "B", text: "0" },
          { key: "C", text: "-1" },
          { key: "D", text: "10" },
        ],
        expectedAnswer: "A",
        hint: "True is represented by 1 in C conditions.",
      },
      {
        id: 15,
        category: "Operating Systems",
        name: "Operating System Example",
        questionText: "Which of the following is an Operating System?",
        options: [
          { key: "A", text: "Microsoft Windows" },
          { key: "B", text: "Microsoft Word" },
          { key: "C", text: "Google Chrome" },
          { key: "D", text: "VLC Player" },
        ],
        expectedAnswer: "A",
        hint: "It manages the PC hardware and runs user software.",
      },
      {
        id: 16,
        category: "C Relational",
        name: "False Condition",
        questionText: "What will be printed by this false check?",
        codeSnippet: 'int r = (10 < 3);\nprintf("%d", r);',
        options: [
          { key: "A", text: "1" },
          { key: "B", text: "0" },
          { key: "C", text: "Error" },
          { key: "D", text: "10" },
        ],
        expectedAnswer: "B",
        hint: "10 is not less than 3, so condition is false 0.",
      },
      {
        id: 17,
        category: "Hardware",
        name: "Input Device",
        questionText: "Which of the following is an INPUT device?",
        options: [
          { key: "A", text: "Keyboard" },
          { key: "B", text: "Printer" },
          { key: "C", text: "Speaker" },
          { key: "D", text: "Monitor" },
        ],
        expectedAnswer: "A",
        hint: "You use it to type input characters into the PC.",
      },
      {
        id: 18,
        category: "C Syntax",
        name: "Statement Terminator",
        questionText: "Every statement in C must terminate with which symbol?",
        options: [
          { key: "A", text: "Colon ( : )" },
          { key: "B", text: "Semicolon ( ; )" },
          { key: "C", text: "Dot ( . )" },
          { key: "D", text: "Comma ( , )" },
        ],
        expectedAnswer: "B",
        hint: "Missing this ';' character triggers a syntax error.",
      },
    ],
  },

  // ========================================================
  // ROUND 4: HOGWARTS LETTERS AT PRIVET DRIVE
  // ========================================================
  {
    roundNumber: 4,
    title: "The Storm of Hogwarts Letters",
    character: "Albus Dumbledore",
    characterRole: "Grand Headmaster",
    themeColor: "from-red-600/30 via-amber-950/60 to-black",
    puzzleImage: "/puzzles/image%204.jpg",
    movieSceneTitle:
      "Harry Potter Movie Scene: The Hogwarts Acceptance Letters Storm",
    locationName: "4 Privet Drive Living Room",
    nextWorldName: "Diagon Alley & Ollivanders Vault",
    worldVideoBg:
      "https://assets.mixkit.co/videos/preview/mixkit-dramatic-golden-sunset-clouds-time-lapse-40438-large.mp4",
    potion: {
      name: "Phoenix Fire Essence",
      liquidColor: "from-orange-500 via-rose-600 to-amber-700",
      glowColor: "rgba(244, 63, 94, 0.9)",
      bottleShape: "cauldron_vial",
      sparkleColor: "#fed7aa",
      particleHex: "#f43f5e",
    },
    questions: [
      {
        id: 19,
        category: "C Logical",
        name: "Logical AND Symbol",
        questionText: "Which operator represents Logical AND in C?",
        options: [
          { key: "A", text: "&&" },
          { key: "B", text: "&" },
          { key: "C", text: "AND" },
          { key: "D", text: "||" },
        ],
        expectedAnswer: "A",
        hint: "Double ampersand '&&' means logical AND.",
      },
      {
        id: 20,
        category: "C Logical",
        name: "Logical OR Symbol",
        questionText: "Which operator represents Logical OR in C?",
        options: [
          { key: "A", text: "OR" },
          { key: "B", text: "||" },
          { key: "C", text: "++" },
          { key: "D", text: "==" },
        ],
        expectedAnswer: "B",
        hint: "Two vertical pipe symbols '||' represent logical OR.",
      },
      {
        id: 21,
        category: "Web & Internet",
        name: "Web Browser",
        questionText: "Which program is used to view internet websites?",
        options: [
          { key: "A", text: "Google Chrome" },
          { key: "B", text: "Notepad" },
          { key: "C", text: "Calculator" },
          { key: "D", text: "Paint" },
        ],
        expectedAnswer: "A",
        hint: "It navigates URLs and displays web pages.",
      },
      {
        id: 22,
        category: "C Logical",
        name: "Logical NOT Result",
        questionText: "What does !1 evaluate to in C?",
        codeSnippet: 'int res = !1;\nprintf("%d", res);',
        options: [
          { key: "A", text: "1" },
          { key: "B", text: "0" },
          { key: "C", text: "-1" },
          { key: "D", text: "2" },
        ],
        expectedAnswer: "B",
        hint: "NOT turns true 1 into false 0.",
      },
      {
        id: 23,
        category: "Computer History",
        name: "Father of Computer",
        questionText: "Who is celebrated as the 'Father of the Computer'?",
        options: [
          { key: "A", text: "Charles Babbage" },
          { key: "B", text: "Alan Turing" },
          { key: "C", text: "Bill Gates" },
          { key: "D", text: "Steve Jobs" },
        ],
        expectedAnswer: "A",
        hint: "He designed the Analytical Engine in the 1830s.",
      },
      {
        id: 24,
        category: "C Data Types",
        name: "Floating Point",
        questionText: "Which C keyword stores decimal numbers like 3.14?",
        options: [
          { key: "A", text: "int" },
          { key: "B", text: "char" },
          { key: "C", text: "float" },
          { key: "D", text: "void" },
        ],
        expectedAnswer: "C",
        hint: "The float keyword stores floating-point fractions.",
      },
    ],
  },

  // ========================================================
  // ROUND 5
  // ========================================================
  {
    roundNumber: 5,
    title: "Diagon Alley & Wand Vaults",
    character: "Sirius Black",
    characterRole: "Grim Protector",
    themeColor: "from-purple-900/30 via-slate-950 to-indigo-950",
    puzzleImage: "/puzzles/image%205.jpg",
    movieSceneTitle: "Harry Potter Movie Scene: Trial Phase 5",
    locationName: "Diagon Alley & Ollivanders Vault",
    nextWorldName: "Slytherin Dungeon Potion Chambers",
    worldVideoBg:
      "https://assets.mixkit.co/videos/preview/mixkit-sun-bursting-through-clouds-at-sunset-41617-large.mp4",
    potion: {
      name: "Felix Felicis (Liquid Luck)",
      liquidColor: "from-yellow-300 via-amber-400 to-orange-500",
      glowColor: "rgba(251, 191, 36, 0.95)",
      bottleShape: "polygon",
      sparkleColor: "#ffffff",
      particleHex: "#fbbf24",
    },
    questions: [
      {
        id: 25,
        category: "Data Sizes",
        name: "Char Memory Size",
        questionText: "What is the size of a standard char variable in C?",
        options: [
          { key: "A", text: "1 Byte" },
          { key: "B", text: "2 Bytes" },
          { key: "C", text: "4 Bytes" },
          { key: "D", text: "8 Bytes" },
        ],
        expectedAnswer: "A",
        hint: "A standard character is guaranteed to be 1 byte.",
      },
      {
        id: 26,
        category: "Binary",
        name: "Base of Binary",
        questionText: "What is the base of the binary numeral system?",
        options: [
          { key: "A", text: "Base 2" },
          { key: "B", text: "Base 8" },
          { key: "C", text: "Base 10" },
          { key: "D", text: "Base 16" },
        ],
        expectedAnswer: "A",
        hint: "Binary uses 2 digits: 0 and 1.",
      },
      {
        id: 27,
        category: "C Decrement",
        name: "Decrement by One",
        questionText: "What will this output print?",
        codeSnippet: 'int k = 10;\nk--;\nprintf("%d", k);',
        options: [
          { key: "A", text: "10" },
          { key: "B", text: "9" },
          { key: "C", text: "11" },
          { key: "D", text: "8" },
        ],
        expectedAnswer: "B",
        hint: "k-- subtracts 1: 10 - 1 = 9.",
      },
      {
        id: 28,
        category: "C Basics",
        name: "Reading Keyboard Input",
        questionText: "Which function reads formatted keyboard input in C?",
        options: [
          { key: "A", text: "get()" },
          { key: "B", text: "input()" },
          { key: "C", text: "scanf()" },
          { key: "D", text: "read()" },
        ],
        expectedAnswer: "C",
        hint: "scanf with %d is used for input.",
      },
      {
        id: 29,
        category: "Programming",
        name: "Creator of C",
        questionText: "Who developed the C programming language?",
        options: [
          { key: "A", text: "Dennis Ritchie" },
          { key: "B", text: "Guido van Rossum" },
          { key: "C", text: "James Gosling" },
          { key: "D", text: "Bjarne Stroustrup" },
        ],
        expectedAnswer: "A",
        hint: "Dennis Ritchie created C at Bell Labs.",
      },
      {
        id: 30,
        category: "Networking",
        name: "WWW Full Form",
        questionText: "What does 'WWW' stand for?",
        options: [
          { key: "A", text: "World Wide Web" },
          { key: "B", text: "Whole World Web" },
          { key: "C", text: "World Web Wide" },
          { key: "D", text: "Wide World Web" },
        ],
        expectedAnswer: "A",
        hint: "Created by Tim Berners-Lee.",
      },
    ],
  },

  // ========================================================
  // ROUND 6
  // ========================================================
  {
    roundNumber: 6,
    title: "Professor Snape's Potions Chamber",
    character: "Severus Snape",
    characterRole: "Potion Master",
    themeColor: "from-emerald-950/50 via-green-950/30 to-black",
    puzzleImage: "/puzzles/image%206.jpg",
    movieSceneTitle: "Harry Potter Movie Scene: Trial Phase 6",
    locationName: "Slytherin Dungeon Potion Chambers",
    nextWorldName: "The Astronomy Tower Palace Grounds",
    worldVideoBg:
      "https://assets.mixkit.co/videos/preview/mixkit-clouds-and-blue-sky-at-sunset-40437-large.mp4",
    potion: {
      name: "Sectumsempra Serum",
      liquidColor: "from-emerald-400 via-green-500 to-teal-800",
      glowColor: "rgba(16, 185, 129, 0.9)",
      bottleShape: "vial",
      sparkleColor: "#a7f3d0",
      particleHex: "#10b981",
    },
    questions: [
      {
        id: 31,
        category: "C Arithmetic",
        name: "Compound Multiply",
        questionText: "What is the final value of x?",
        codeSnippet: 'int x = 4;\nx *= 2;\nprintf("%d", x);',
        options: [
          { key: "A", text: "6" },
          { key: "B", text: "8" },
          { key: "C", text: "4" },
          { key: "D", text: "2" },
        ],
        expectedAnswer: "B",
        hint: "x *= 2 means x = x * 2 so 4 * 2 = 8.",
      },
      {
        id: 32,
        category: "C Basics",
        name: "Integer Specifier",
        questionText: "Which format specifier is used in printf for integers?",
        options: [
          { key: "A", text: "%d" },
          { key: "B", text: "%c" },
          { key: "C", text: "%f" },
          { key: "D", text: "%s" },
        ],
        expectedAnswer: "A",
        hint: "%d stands for decimal integer.",
      },
      {
        id: 33,
        category: "Memory",
        name: "ROM Full Form",
        questionText: "What does ROM stand for?",
        options: [
          { key: "A", text: "Read Only Memory" },
          { key: "B", text: "Random Only Memory" },
          { key: "C", text: "Real Operational Memory" },
          { key: "D", text: "Run Order Memory" },
        ],
        expectedAnswer: "A",
        hint: "Its contents are permanent and non-volatile.",
      },
      {
        id: 34,
        category: "C Header",
        name: "Header Extension",
        questionText: "What is the file extension of a C header file?",
        options: [
          { key: "A", text: ".c" },
          { key: "B", text: ".h" },
          { key: "C", text: ".exe" },
          { key: "D", text: ".txt" },
        ],
        expectedAnswer: "B",
        hint: "Like stdio.h and stdlib.h.",
      },
      {
        id: 35,
        category: "C Arithmetic",
        name: "Integer Division",
        questionText: "What will 7 / 2 output in C integer arithmetic?",
        codeSnippet: 'int ans = 7 / 2;\nprintf("%d", ans);',
        options: [
          { key: "A", text: "3.5" },
          { key: "B", text: "3" },
          { key: "C", text: "4" },
          { key: "D", text: "1" },
        ],
        expectedAnswer: "B",
        hint: "C drops the .5 decimal part so 7 / 2 = 3.",
      },
      {
        id: 36,
        category: "Storage",
        name: "1 Kilobyte in Bytes",
        questionText: "How many Bytes make up 1 Kilobyte (KB)?",
        options: [
          { key: "A", text: "1000 Bytes" },
          { key: "B", text: "1024 Bytes" },
          { key: "C", text: "512 Bytes" },
          { key: "D", text: "2048 Bytes" },
        ],
        expectedAnswer: "B",
        hint: "In powers of 2, 2^10 = 1024 Bytes.",
      },
    ],
  },

  // ========================================================
  // ROUND 7
  // ========================================================
  {
    roundNumber: 7,
    title: "The Battle of Hogwarts Castle",
    character: "Harry Potter",
    characterRole: "Chosen Coder",
    themeColor: "from-amber-500/30 via-purple-950/50 to-slate-950",
    puzzleImage: "/puzzles/image%207.jpg",
    movieSceneTitle: "Harry Potter Movie Scene: The Final Battle & Victory",
    locationName: "The Grand Hogwarts Castle Grounds",
    nextWorldName: "The Grand Chamber of Hogwarts Champions",
    worldVideoBg:
      "https://assets.mixkit.co/videos/preview/mixkit-sun-setting-over-the-ocean-horizon-41620-large.mp4",
    potion: {
      name: "Amortentia & Resurrection Draught",
      liquidColor: "from-fuchsia-500 via-purple-600 to-indigo-900",
      glowColor: "rgba(217, 70, 239, 0.95)",
      bottleShape: "beaker",
      sparkleColor: "#f5d0fe",
      particleHex: "#d946ef",
    },
    questions: [
      {
        id: 37,
        category: "C Comments",
        name: "Single Line Comment",
        questionText: "Which symbol denotes a single-line comment in C?",
        options: [
          { key: "A", text: "//" },
          { key: "B", text: "/* */" },
          { key: "C", text: "#" },
          { key: "D", text: "<!-- -->" },
        ],
        expectedAnswer: "A",
        hint: "Two forward slashes // start a single-line comment.",
      },
      {
        id: 38,
        category: "C Arithmetic",
        name: "Parentheses Math",
        questionText: "What will this output print?",
        codeSnippet: 'int r = (2 + 3) * 4;\nprintf("%d", r);',
        options: [
          { key: "A", text: "20" },
          { key: "B", text: "14" },
          { key: "C", text: "24" },
          { key: "D", text: "10" },
        ],
        expectedAnswer: "A",
        hint: "2 + 3 = 5, then 5 * 4 = 20.",
      },
      {
        id: 39,
        category: "Operating Systems",
        name: "Open Source OS",
        questionText:
          "Which of the following is a famous open-source Operating System?",
        options: [
          { key: "A", text: "Linux" },
          { key: "B", text: "MS Word" },
          { key: "C", text: "Excel" },
          { key: "D", text: "PowerPoint" },
        ],
        expectedAnswer: "A",
        hint: "Created by Linus Torvalds with the penguin mascot.",
      },
      {
        id: 40,
        category: "C Relational",
        name: "Not Equal Operator",
        questionText: "What will this comparison output?",
        codeSnippet: 'int res = (4 != 2);\nprintf("%d", res);',
        options: [
          { key: "A", text: "1 (True)" },
          { key: "B", text: "0 (False)" },
          { key: "C", text: "2" },
          { key: "D", text: "4" },
        ],
        expectedAnswer: "A",
        hint: "4 is not equal to 2, so the condition is True 1.",
      },
      {
        id: 41,
        category: "Hardware",
        name: "USB Full Form",
        questionText: "What does USB stand for?",
        options: [
          { key: "A", text: "Universal Serial Bus" },
          { key: "B", text: "United Serial Bus" },
          { key: "C", text: "Universal System Bus" },
          { key: "D", text: "Uniform Service Bus" },
        ],
        expectedAnswer: "A",
        hint: "Standard peripheral interface on PCs and laptops.",
      },
      {
        id: 42,
        category: "C Grand Seal",
        name: "Final Seal",
        questionText: "What is the remainder of 10 % 3?",
        codeSnippet: 'int rem = 10 % 3;\nprintf("%d", rem);',
        options: [
          { key: "A", text: "1" },
          { key: "B", text: "3" },
          { key: "C", text: "0" },
          { key: "D", text: "2" },
        ],
        expectedAnswer: "A",
        hint: "10 = 3 * 3 + 1, so remainder is 1.",
      },
    ],
  },
];
