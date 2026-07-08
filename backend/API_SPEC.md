# Med Design Backend API Specification

## Base URL

```
http://localhost:3001/api
```

## Authentication

All protected endpoints require a Bearer token in the Authorization header:

```
Authorization: Bearer <jwt_token>
```

---

## Authentication Endpoints

### Register User

**POST** `/auth/register`

Creates a new user account.

**Request Body:**

```json
{
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "password": "securepassword123"
}
```

**Response:** `200 OK`

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "isAdmin": false
  }
}
```

### Login User

**POST** `/auth/login`

Authenticates user and returns access token.

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Response:** `200 OK`

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "isAdmin": false
  }
}
```

---

## Projects Endpoints

### Get All Projects

**GET** `/projects`

Returns all projects.

**Query Parameters:**
- None

**Response:** `200 OK`

```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "Website Redesign",
    "description": "Complete redesign of company website",
    "image": "https://example.com/image.jpg",
    "tags": ["web design", "branding"],
    "link": "https://example.com",
    "details": "Detailed project information...",
    "challenge": "The challenge we faced...",
    "solution": "How we solved it...",
    "results": "The results achieved...",
    "images": ["image1.jpg", "image2.jpg"],
    "createdAt": "2024-06-15T10:30:00Z",
    "updatedAt": "2024-06-15T10:30:00Z"
  }
]
```

### Get Single Project

**GET** `/projects/:id`

Returns a single project by ID.

**Response:** `200 OK`

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Website Redesign",
  "description": "Complete redesign of company website",
  "image": "https://example.com/image.jpg",
  "tags": ["web design", "branding"],
  "link": "https://example.com",
  "details": "Detailed project information...",
  "challenge": "The challenge we faced...",
  "solution": "How we solved it...",
  "results": "The results achieved...",
  "images": ["image1.jpg", "image2.jpg"],
  "createdAt": "2024-06-15T10:30:00Z",
  "updatedAt": "2024-06-15T10:30:00Z"
}
```

**Error Response:** `404 Not Found`

```json
{
  "statusCode": 404,
  "message": "Project with ID {id} not found"
}
```

### Create Project

**POST** `/projects`

Creates a new project. **Requires Admin**.

**Request Body:**

```json
{
  "title": "Website Redesign",
  "description": "Complete redesign of company website",
  "image": "https://example.com/image.jpg",
  "tags": ["web design", "branding"],
  "link": "https://example.com",
  "details": "Detailed project information...",
  "challenge": "The challenge we faced...",
  "solution": "How we solved it...",
  "results": "The results achieved...",
  "images": ["image1.jpg", "image2.jpg"]
}
```

**Response:** `201 Created`

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Website Redesign",
  "description": "Complete redesign of company website",
  "image": "https://example.com/image.jpg",
  "tags": ["web design", "branding"],
  "link": "https://example.com",
  "details": "Detailed project information...",
  "challenge": "The challenge we faced...",
  "solution": "How we solved it...",
  "results": "The results achieved...",
  "images": ["image1.jpg", "image2.jpg"],
  "createdAt": "2024-06-15T10:30:00Z",
  "updatedAt": "2024-06-15T10:30:00Z"
}
```

### Update Project

**PUT** `/projects/:id`

Updates an existing project. **Requires Admin**.

**Request Body:**

```json
{
  "title": "Updated Project Title",
  "description": "Updated description"
}
```

**Response:** `200 OK`

### Delete Project

**DELETE** `/projects/:id`

Deletes a project. **Requires Admin**.

**Response:** `200 OK`

---

## Services Endpoints

### Get All Services

**GET** `/services`

Returns all active services.

**Response:** `200 OK`

```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Web Design",
    "description": "Professional web design services",
    "icon": "🎨",
    "image": "https://example.com/service.jpg",
    "features": ["Responsive Design", "Modern UI", "Fast Loading"],
    "price": 5000,
    "isActive": true,
    "createdAt": "2024-06-15T10:30:00Z",
    "updatedAt": "2024-06-15T10:30:00Z"
  }
]
```

### Get Single Service

**GET** `/services/:id`

**Response:** `200 OK`

### Create Service

**POST** `/services`

Creates a new service. **Requires Admin**.

**Request Body:**

```json
{
  "name": "Web Design",
  "description": "Professional web design services",
  "icon": "🎨",
  "image": "https://example.com/service.jpg",
  "features": ["Responsive Design", "Modern UI", "Fast Loading"],
  "price": 5000,
  "isActive": true
}
```

**Response:** `201 Created`

### Update Service

**PUT** `/services/:id`

Updates a service. **Requires Admin**.

### Delete Service

**DELETE** `/services/:id`

Deletes a service. **Requires Admin**.

---

## Team Endpoints

### Get All Team Members

**GET** `/team`

Returns all team members.

**Response:** `200 OK`

```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "John Doe",
    "position": "Lead Designer",
    "bio": "Experienced designer with 10 years of experience",
    "image": "https://example.com/john.jpg",
    "email": "john@example.com",
    "expertise": ["UI Design", "Branding", "Web Design"],
    "linkedinUrl": "https://linkedin.com/in/johndoe",
    "twitterUrl": "https://twitter.com/johndoe",
    "portfolioUrl": "https://johndoe.com",
    "createdAt": "2024-06-15T10:30:00Z",
    "updatedAt": "2024-06-15T10:30:00Z"
  }
]
```

### Get Single Team Member

**GET** `/team/:id`

**Response:** `200 OK`

### Create Team Member

**POST** `/team`

Creates a new team member. **Requires Admin**.

**Request Body:**

```json
{
  "name": "John Doe",
  "position": "Lead Designer",
  "bio": "Experienced designer with 10 years of experience",
  "image": "https://example.com/john.jpg",
  "email": "john@example.com",
  "expertise": ["UI Design", "Branding", "Web Design"],
  "linkedinUrl": "https://linkedin.com/in/johndoe",
  "twitterUrl": "https://twitter.com/johndoe",
  "portfolioUrl": "https://johndoe.com"
}
```

**Response:** `201 Created`

### Update Team Member

**PUT** `/team/:id`

Updates a team member. **Requires Admin**.

### Delete Team Member

**DELETE** `/team/:id`

Deletes a team member. **Requires Admin**.

---

## Blog Endpoints

### Get Published Blog Posts

**GET** `/blog`

Returns all published blog posts.

**Response:** `200 OK`

```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "The Future of Web Design",
    "content": "Long form blog content...",
    "excerpt": "Short summary of the blog post...",
    "slug": "the-future-of-web-design",
    "image": "https://example.com/blog.jpg",
    "tags": ["web design", "trends"],
    "status": "published",
    "views": 150,
    "createdAt": "2024-06-15T10:30:00Z",
    "updatedAt": "2024-06-15T10:30:00Z",
    "publishedAt": "2024-06-15T10:30:00Z"
  }
]
```

### Get All Blog Posts (Admin Only)

**GET** `/blog/all`

Returns all blog posts including drafts and archived. **Requires Admin**.

### Get Blog Post by ID

**GET** `/blog/:id`

Returns a single blog post and increments view count.

### Get Blog Post by Slug

**GET** `/blog/slug/:slug`

Returns a blog post by slug and increments view count.

### Create Blog Post

**POST** `/blog`

Creates a new blog post. **Requires Admin**.

**Request Body:**

```json
{
  "title": "The Future of Web Design",
  "content": "Long form blog content...",
  "excerpt": "Short summary of the blog post...",
  "slug": "the-future-of-web-design",
  "image": "https://example.com/blog.jpg",
  "tags": ["web design", "trends"],
  "status": "draft"
}
```

**Response:** `201 Created`

### Update Blog Post

**PUT** `/blog/:id`

Updates a blog post. **Requires Admin**.

### Delete Blog Post

**DELETE** `/blog/:id`

Deletes a blog post. **Requires Admin**.

---

## Contact Endpoints

### Submit Contact Message

**POST** `/contact`

Submits a contact form message.

**Request Body:**

```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "+251 9 1234 5678",
  "message": "I'm interested in your services",
  "interests": ["Web Design", "Branding"],
  "budget": 100000,
  "referralSource": "Google Search"
}
```

**Response:** `201 Created`

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "+251 9 1234 5678",
  "message": "I'm interested in your services",
  "interests": ["Web Design", "Branding"],
  "budget": 100000,
  "referralSource": "Google Search",
  "status": "new",
  "response": null,
  "createdAt": "2024-06-15T10:30:00Z",
  "userId": null
}
```

### Get All Contact Messages (Admin Only)

**GET** `/contact`

Returns all contact messages. **Requires Admin**.

**Response:** `200 OK`

### Get Single Contact Message (Admin Only)

**GET** `/contact/:id`

Returns a single message. **Requires Admin**.

### Update Message Status (Admin Only)

**PATCH** `/contact/:id/status`

Updates message status. **Requires Admin**.

**Request Body:**

```json
{
  "status": "read"
}
```

Valid statuses: `new`, `read`, `responded`, `closed`

**Response:** `200 OK`

### Respond to Message (Admin Only)

**PATCH** `/contact/:id/respond`

Sends a response to the message. **Requires Admin**.

**Request Body:**

```json
{
  "response": "Thank you for reaching out. We'll contact you soon."
}
```

**Response:** `200 OK`

### Delete Contact Message (Admin Only)

**DELETE** `/contact/:id`

Deletes a message. **Requires Admin**.

---

## Health Check

### Health Check

**GET** `/health`

Returns API health status.

**Response:** `200 OK`

```json
{
  "status": "ok",
  "timestamp": "2024-06-15T10:30:00.000Z"
}
```

---

## Error Responses

### 400 Bad Request

```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "error": "Bad Request"
}
```

### 401 Unauthorized

```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

### 403 Forbidden

```json
{
  "statusCode": 403,
  "message": "Admin access required"
}
```

### 404 Not Found

```json
{
  "statusCode": 404,
  "message": "Resource not found"
}
```

### 500 Internal Server Error

```json
{
  "statusCode": 500,
  "message": "Internal server error"
}
```

---

## Rate Limiting

Currently not implemented. Will be added in production deployment.

## Pagination

Currently not implemented. Will be added for endpoints returning large datasets.

## Versioning

API Version: 1.0.0

Future versions will use `/api/v2`, `/api/v3`, etc.
