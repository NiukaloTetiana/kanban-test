# Kanban Board

This app allows users to load and manage issues from GitHub repositories by
entering the repo URL. Issues are categorized into three columns: **ToDo**,
**InProgress**, and **Done**. You can drag and drop issues between columns to
organize them. Your changes are saved locally in your browser, so even if you
switch repositories or refresh the page, your adjustments will remain intact.

![Kanban Board](./public/1.webp)

---

## 🛠️ Functionality

- **Enter the Repository URL**:

  - In the input field at the top of the page, enter the GitHub repository URL
    (e.g., `https://github.com/facebook/react`).

- **Load Issues**:

  - Click the **"Load Issues"** button to load issues from the specified
    repository.

- **View and Organize Issues**:

  - Issues will be displayed in three columns:
    - **📝 ToDo**: New issues.
    - **🔨 In Progress**: Open issues with assignees.
    - **✅ Done**: Closed issues.

- **Drag-and-Drop**:

  - Users can drag and drop issues from one column to another to reorganize
    them.

- **State Persistence**:

  - The app stores the issue positions in **Local Storage**. When the user
    switches between repositories or reloads the page, the changes will be
    saved.

- **Profile and Repo Links**:
  - Below the input field, there are links to the repository owner's profile and
    the repository itself.

---

## 📚 About the Project

[**Technical Task**](https://github.com/incodellc/github-kanban-test-task)

---

## ⚙️ Technologies Used

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-%23764AEC.svg?style=for-the-badge&logo=redux&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Chakra UI](https://img.shields.io/badge/chakra%20ui-%23614E84.svg?style=for-the-badge&logo=chakra-ui&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)

- **@hello-pangea/dnd:** for drag-and-drop functionality
- **Local Storage:** for storing issue positions between sessions
- **ESLint** and **Prettier:** for code quality

---

## 🏁 Getting Started

### 📦 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/github-issues-dashboard.git

   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the app locally:

   ```bash
   npm run dev
   ```

---

## 🧪 Testing

The project includes unit tests to ensure reliability and stability.

### 🚀 Running Tests

To run the test suite, use the following command:

```bash
npm test
```

### 🛠️ Testing Tools

![Vitest](https://img.shields.io/badge/Vitest-%23F24E1E.svg?style=for-the-badge&logo=vitest&logoColor=white)
![React Testing Library](https://img.shields.io/badge/React%20Testing%20Library-%23F7DF1E.svg?style=for-the-badge&logo=react&logoColor=black)

- **@testing-library/jest-dom** – provides additional matchers for testing the
  DOM.
- **MSW (Mock Service Worker)** – used to mock API requests.

### 🔍 What is Tested?

✔ **Component Rendering** – Ensuring that UI components render correctly.

✔ **User Interactions** – Simulating events like clicks, drags, and inputs.

✔ **API Calls** – Mocking GitHub API requests and verifying responses.

✔ **State Management** – Testing Redux actions and reducers.

---

Feel free to contribute or provide feedback on how to improve the board. I
welcome any suggestions for future enhancements or features!🎉
