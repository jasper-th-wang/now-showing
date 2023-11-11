[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=12839330&assignment_repo_type=AssignmentRepo)
Assignment Requirements: Pagination in JavaScript with YTS API

**Objective:**
The objective of this assignment is to create a web page that fetches and paginates a list of movies from the YTS API. The pagination should display 10 movies at a time, emphasize the current page using CSS, and include buttons for navigating to the first, last, previous, and next pages.


**Demo** 
![](https://cdn.discordapp.com/attachments/1149469347123830804/1171470962689069128/screencapture-file-C-Courses-comp1537-f23-Assignment2-index-html-2023-11-07-07_25_27.png?ex=655ccc5a&is=654a575a&hm=3cf8df226fdd42b8c665729c33eb4cdff94ba7554047044def26b3ac25df21af&)

Demo page - [https://resplendent-zabaione-22d5b1.netlify.app/]

**Instructions:**

1. **Setup:**
   - Create an HTML page with the necessary structure.
   - Include the appropriate JavaScript and CSS files.

2. **YTS API Integration:**
   - Utilize the YTS API (https://yts.mx/api) to fetch a list of movies.
   - You may use the following endpoint to fetch movies: `https://yts.mx/api/v2/list_movies.json`

3. **Pagination Logic:**
   - Implement JavaScript code to paginate the fetched movie data.
   - Display 10 movies per page.
   - Initially, display the first 10 movies.

4. **Pagination Controls:**
   - Implement pagination controls as described below:
     - Previous Page: A "Previous" button to navigate to the previous page. If there are no previous pages, disable/hide this button.
     - First Page: A "First" button to navigate to the first page.
     - Next Page: A "Next" button to navigate to the next page. If there are no more pages, disable/hide this button.
     - Last Page: A "Last" button to navigate to the last page.
     - Page Numbers: Display a maximum of 10 page number buttons, including the current page. Emphasize the current page number using CSS.

5. **Styling:**
   - Use CSS to style the pagination controls and the current page.
   - Emphasize the current page number so that it's visually distinct from other page numbers.

6. **Event Handling:**
   - Implement event handlers for each pagination control button (e.g., click events for Next, Previous, First, Last, and page number buttons).

7. **Display:**
   - Display movie data on the web page.
   - Update the displayed movies when the user interacts with the pagination controls.

8. **Documentation:**
   - Provide comments in your JavaScript code to explain the purpose of each function or block of code.


**Grading Criteria:**

The assignment will be graded based on the following criteria:

- Successful integration with the YTS API.
- Correct implementation of pagination controls.
- Proper styling and emphasis on the current page number.
- Functional and responsive pagination that allows users to navigate through the movie list.
- Code quality and documentation.
- Error handling for API requests.

**Note:**
Make sure to test your implementation thoroughly and ensure that it works as expected. You can refer to the YTS API documentation for more details on how to fetch movie data. Good luck with your assignment!