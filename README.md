# POST Requests & CRUD Operations - Activity 04 - Discovery Challenge

Welcome to your comprehensive introduction to POST, PUT, and DELETE requests! This template helps you master CRUD operations (Create, Read, Update, Delete) using the JSONPlaceholder API.

## 🎯 Learning Objectives

By completing this activity, you will:
- Master POST requests for creating new data
- Understand form data conversion to JSON
- Implement PUT requests for updating existing data
- Practice DELETE operations with confirmation
- Handle form validation and error states
- Build user-friendly forms with loading indicators

## 🚀 Getting Started

### ⚡ Quick Start (See Results in 30 Seconds!)

**IMPORTANT: This template includes WORKING CODE! You can see CRUD operations in action immediately:**

1. **Navigate to this folder** in your terminal/command prompt
2. **Start a local server** (choose one):
   ```bash
   # Mac/Linux:
   python3 -m http.server 8001

   # Windows:
   python -m http.server 8001

   # Alternative using Node.js:
   npx http-server -p 8001
   ```
3. **Open your browser** to: http://localhost:8001
4. **Test the working features:**
   - "CREATE Post" tab - create posts with example buttons
   - "CREATE User" tab - create new users
   - "CREATE Comment" tab - add comments to posts
   - "MANAGE Data" tab - update and delete posts

### 🎯 What's Already Working

**70% of the code is implemented for you:**
- ✅ POST request for creating posts (fully working with examples)
- ✅ POST request for creating users (fully working)
- ✅ POST request for adding comments (fully working)
- ✅ Tabbed interface for organizing operations (fully working)
- ✅ Network logging for monitoring requests (fully working)
- ⚠️ PUT request for updating posts (TODO for you)
- ⚠️ DELETE request with confirmation (TODO for you)
- ⚠️ Form validation enhancements (TODO for you)
- ⚠️ File upload simulation (extension challenge)

### 📝 Your Learning Path

1. **First, test the working POST requests** to see how data is sent to APIs
2. **Study the form-to-JSON conversion** in the working examples
3. **Then complete the UPDATE and DELETE TODOs** following the patterns
4. **Finally, add validation and extensions** to make it production-ready

## 📋 Tasks to Complete

### TODO 1: Update Post Function (Medium)
Complete the `updatePost()` function to modify existing posts with PUT requests.

**API Endpoint:** `PUT https://jsonplaceholder.typicode.com/posts/{id}`

**Success Criteria:**
- Load existing post data when user enters post ID
- Populate form fields with current data
- Send PUT request with updated data
- Show success message with updated post details
- Handle errors for invalid post IDs

**Learning Focus:** PUT requests replace entire resources with new data

### TODO 2: Delete Post Function (Medium)
Complete the `deletePost()` function to remove posts with confirmation.

**API Endpoint:** `DELETE https://jsonplaceholder.typicode.com/posts/{id}`

**Success Criteria:**
- Show confirmation dialog before deletion
- Send DELETE request only after confirmation
- Display success message with deleted post ID
- Handle cancellation gracefully
- Error handling for non-existent posts

**Learning Focus:** DELETE operations should always require confirmation

### TODO 3: Form Validation (Easy)
Add client-side validation to all forms before sending requests.

**Requirements:**
- Title must be at least 3 characters
- Body/content cannot be empty
- Email must be valid format (for user creation)
- Post ID must be a number (for update/delete)
- Show validation errors next to form fields

**Learning Focus:** Validate data client-side before sending to API

### TODO 4: Loading States (Easy)
Enhance user feedback during API operations.

**Features to implement:**
- Disable buttons during API calls
- Show spinner or "Loading..." text
- Change button text (e.g., "Creating..." instead of "Create Post")
- Re-enable button after response
- Handle timeout scenarios (>5 seconds)

**Learning Focus:** Provide clear feedback for asynchronous operations

### TODO 5: File Upload Simulation (Challenge)
Simulate file upload with POST request using base64 encoding.

**Requirements:**
- Add file input to create post form
- Convert image to base64 string
- Include image data in POST request body
- Display preview of uploaded image
- Validate file type (only images allowed)
- Limit file size (max 2MB)

**Learning Focus:** Files are sent as base64 strings in JSON requests

## 🛠 API Reference

### JSONPlaceholder API Documentation
- **Base URL:** `https://jsonplaceholder.typicode.com`
- **No authentication required** - Perfect for learning!
- **CORS enabled** for browser requests
- **Free forever** with no rate limits

### Key Endpoints

```javascript
// Create new post
POST https://jsonplaceholder.typicode.com/posts
Body: { title, body, userId }

// Create new user
POST https://jsonplaceholder.typicode.com/users
Body: { name, username, email, phone, website }

// Add comment to post
POST https://jsonplaceholder.typicode.com/comments
Body: { postId, name, email, body }

// Update existing post
PUT https://jsonplaceholder.typicode.com/posts/{id}
Body: { id, title, body, userId }

// Delete post
DELETE https://jsonplaceholder.typicode.com/posts/{id}

// Get post for editing
GET https://jsonplaceholder.typicode.com/posts/{id}
```

### Request Format

**POST Request Example:**
```javascript
fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    title: 'My New Post',
    body: 'This is the content',
    userId: 1
  })
})
```

**PUT Request Example:**
```javascript
fetch('https://jsonplaceholder.typicode.com/posts/1', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    id: 1,
    title: 'Updated Title',
    body: 'Updated content',
    userId: 1
  })
})
```

**DELETE Request Example:**
```javascript
fetch('https://jsonplaceholder.typicode.com/posts/1', {
  method: 'DELETE'
})
```

### Response Format

**Success Response (POST/PUT):**
```json
{
  "id": 101,
  "title": "My New Post",
  "body": "This is the content",
  "userId": 1
}
```

**Success Response (DELETE):**
```json
{}
```
Note: JSONPlaceholder returns empty object for successful deletions

## 🎨 Features Included

### Working POST Examples
The template includes **three fully working POST implementations:**

**Pokemon Theme:**
```javascript
{
  title: "My Epic Pokemon Team Battle",
  body: "Just had an amazing battle with Pikachu, Charmander, and Squirtle!",
  userId: 1
}
```

**Recipe Theme:**
```javascript
{
  title: "Perfect Chocolate Chip Cookies Recipe",
  body: "The secret is browning the butter first...",
  userId: 1
}
```

**Travel Theme:**
```javascript
{
  title: "Amazing Weekend in Tokyo",
  body: "Visited Senso-ji Temple, tried authentic ramen...",
  userId: 1
}
```

### User Interface Features
- **Tabbed interface** for organizing different operations
- **Example buttons** for quick data entry
- **Network activity log** showing all API requests
- **Response display** with formatted JSON
- **Loading indicators** during API calls
- **Error messages** with helpful troubleshooting

## 🧪 Testing Your Work

### Manual Testing Checklist
- [ ] Create a new post using example buttons
- [ ] Create a post with custom data
- [ ] Create a new user with valid email
- [ ] Add a comment to any post (1-100)
- [ ] Load an existing post by ID
- [ ] Update a post's title and content
- [ ] Delete a post with confirmation
- [ ] Cancel a deletion
- [ ] Handle validation errors gracefully
- [ ] Check network log shows all requests

### Debugging Tips
1. **Open Developer Tools** (F12)
2. **Network tab** shows actual HTTP requests:
   - Method (POST, PUT, DELETE)
   - Request headers
   - Request body (JSON)
   - Response status code
   - Response body
3. **Console tab** shows error messages and logs
4. **Use console.log()** to debug form data conversion

### Common Issues & Solutions

**Issue:** "Headers is not a constructor"
**Solution:** Make sure headers object is plain: `{ 'Content-Type': 'application/json' }`

**Issue:** POST request returns 404
**Solution:** Check the endpoint URL - should not have trailing slash

**Issue:** Request body is empty
**Solution:** Ensure you're using `JSON.stringify()` on the body object

**Issue:** Server returns 400 Bad Request
**Solution:** Verify your JSON format and Content-Type header

## 🎓 Extension Challenges

Ready to level up? Try these bonus features:

### Beginner Extensions
- **Draft saving:** Use localStorage to save form data as user types
- **Character counter:** Show remaining characters for title/body fields
- **Post preview:** Display formatted preview before creating post
- **Clear form:** Add reset button to clear all form fields
- **Timestamp display:** Show creation time for each post created

### Intermediate Extensions
- **Batch operations:** Create multiple posts at once from array
- **Search before create:** Check if similar post exists before creating
- **Edit history:** Track all changes made to a post
- **User profiles:** Fetch and display user info when creating posts
- **Comment threading:** Add replies to comments

### Advanced Extensions
- **Optimistic UI updates:** Show post immediately, then sync with server
- **Retry logic:** Automatically retry failed requests 3 times
- **Request queue:** Queue multiple operations when offline, sync when online
- **Rich text editor:** Add formatting options (bold, italic, links)
- **Image upload:** Implement actual image upload with preview
- **Markdown support:** Parse markdown in post body for display

### Creative Extensions
- **Social features:** Add likes, shares, bookmarks
- **Post templates:** Pre-defined templates for common post types
- **Tag system:** Add and filter by tags
- **Post scheduling:** Schedule posts for future publication
- **Analytics:** Track post views, engagement metrics

## 📚 Additional Resources

### API Learning
- [JSONPlaceholder Documentation](https://jsonplaceholder.typicode.com/)
- [HTTP Methods Explained](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)
- [POST vs PUT vs PATCH](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST)
- [RESTful API Design Best Practices](https://restfulapi.net/)

### JavaScript Concepts
- **Fetch API:** Learn POST, PUT, DELETE methods
- **Form Handling:** Convert form data to JSON
- **Async Operations:** Handle asynchronous API calls
- **Error Handling:** Manage network and validation errors
- **JSON Stringify:** Convert JavaScript objects to JSON strings

### Key Concepts to Master

**POST Requests:**
- Used to CREATE new resources
- Sends data in request body
- Returns created resource with ID
- Should be idempotent

**PUT Requests:**
- Used to UPDATE existing resources
- Replaces entire resource
- Requires resource ID in URL
- Should send complete object

**DELETE Requests:**
- Used to REMOVE resources
- Requires resource ID in URL
- Minimal request body
- Should always confirm with user

**Form to JSON Conversion:**
```javascript
// FormData approach
const formData = new FormData(formElement);
const data = Object.fromEntries(formData);

// Manual approach
const data = {
  title: document.getElementById('title').value,
  body: document.getElementById('body').value,
  userId: parseInt(document.getElementById('userId').value)
};

// Convert to JSON string
const jsonBody = JSON.stringify(data);
```

## 🏆 Success Criteria

Your project is complete when:
- ✅ All 5 TODO functions are implemented
- ✅ POST requests create new posts, users, and comments
- ✅ PUT requests update existing posts
- ✅ DELETE requests remove posts with confirmation
- ✅ Form validation prevents invalid submissions
- ✅ Loading states provide clear feedback
- ✅ Error handling is comprehensive
- ✅ Network log tracks all API activity
- ✅ Code is clean with proper comments

## 🎉 Congratulations!

Once you complete this project, you'll have:
- Mastered all major HTTP methods (GET, POST, PUT, DELETE)
- Built full CRUD functionality from scratch
- Learned proper form handling and validation
- Implemented user-friendly loading and error states
- Gained confidence working with RESTful APIs

This is a major milestone! You now understand the complete lifecycle of data management in web applications. These skills will directly apply to real-world projects with databases and authentication.

### What's Next?

After completing this activity, you'll be ready to:
- Build full-stack applications with real databases
- Implement authentication systems
- Create admin dashboards with CRUD operations
- Work with complex API integrations
- Deploy production-ready web applications

---

**Need Help?**
- Check the working POST examples to understand the pattern
- Use browser DevTools Network tab to debug requests
- Review TODO comments in script.js for guidance
- Test one operation at a time (POST → PUT → DELETE)
- Verify request headers and body format in Network tab

Happy coding! 🚀✨