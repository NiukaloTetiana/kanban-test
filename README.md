# Kanban Board

This app allows users to load and manage issues from GitHub repositories by
entering the repo URL. Issues are categorized into three columns: ToDo, In
Progress, and Done. You can drag and drop issues between columns to organize
them. Your changes are saved locally in your browser. So even if you switch
repositories or refresh the page, your adjustments will remain intact.

![Kanban Board](./public/1.webp)

## Functionality

- **Enter the Repository URL**:

  - In the input field at the top of the page, enter the GitHub repository URL
    (e.g., `https://github.com/facebook/react`).

- **Load Issues**:

  - Click the **"Load issues"** button to load issues from the specified
    repository.

- **View and Organize Issues**:

  - Issues will be displayed in three columns:
    - **ToDo**: New issues.
    - **In Progress**: Open issues with assignees.
    - **Done**: Closed issues.

- **Drag-and-Drop**:

  - User can drag and drop issues from one column to another to reorganize them.

- **State Persistence**:

  - The app will store the issue positions in Local Storage. When user switch
    between repositories or reload the page, changes will be saved.

- **Profile and Repo Links**:

  - Below the input field, there are links to the repository owner's profile and
    the repository itself.

## About the Project

[**Technical Task**](https://github.com/incodellc/github-kanban-test-task)

## Technologies Used

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
<!-- - **React Testing Library** for unit testing -->

## Getting Started

### Installation

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

Feel free to contribute or provide feedback on how to improve the board! I
welcome any suggestions for future enhancements or features!
