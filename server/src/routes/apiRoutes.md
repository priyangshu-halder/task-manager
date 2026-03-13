# Project Management API Routes 

## Base URL Structure
```
/api/v1
```

## API Route Design Principles
- RESTful conventions
- Resource nesting where logical (max 2 levels)
- Consistent naming (kebab-case for URLs, snake_case for params)
- Pagination for list endpoints
- Filtering, sorting, and searching capabilities

---

## 1. Authentication & Authorization Routes

### Auth
```
POST   /auth/register                    # Register new user
POST   /auth/login                       # Login (returns JWT)
POST   /auth/logout                      # Logout (invalidate token)
POST   /auth/refresh                     # Refresh JWT token
POST   /auth/forgot-password             # Request password reset
POST   /auth/reset-password              # Reset password with token
GET    /auth/verify-email/:token         # Verify email address
POST   /auth/resend-verification         # Resend verification email
```

---

## 2. User Routes

### Users
```
GET    /users                            # List all users (admin, with filters)
GET    /users/:userId                    # Get user by ID
GET    /users/me                         # Get current user profile
PUT    /users/me                         # Update current user profile
PATCH  /users/me/avatar                  # Update user avatar
PATCH  /users/me/password                # Change password
DELETE /users/:userId                    # Delete user (admin only)

# User preferences
GET    /users/me/preferences             # Get user preferences
PUT    /users/me/preferences             # Update preferences

# User activity
GET    /users/:userId/activity           # Get user activity log
GET    /users/me/notifications           # Get user notifications
PATCH  /users/me/notifications/:notificationId/read  # Mark as read
DELETE /users/me/notifications/:notificationId       # Delete notification
```

---

## 3. Organization/Workspace Routes

### Organizations
```
GET    /organizations                    # List user's organizations
POST   /organizations                    # Create organization
GET    /organizations/:orgId             # Get organization details
PUT    /organizations/:orgId             # Update organization
DELETE /organizations/:orgId             # Delete organization

# Organization members
GET    /organizations/:orgId/members     # List members
POST   /organizations/:orgId/members     # Invite member
GET    /organizations/:orgId/members/:userId           # Get member details
PATCH  /organizations/:orgId/members/:userId/role     # Update member role
DELETE /organizations/:orgId/members/:userId           # Remove member

# Organization invitations
GET    /organizations/:orgId/invitations              # List pending invitations
POST   /organizations/:orgId/invitations              # Send invitation
DELETE /organizations/:orgId/invitations/:invitationId # Revoke invitation
POST   /invitations/:token/accept                      # Accept invitation

# Organization settings
GET    /organizations/:orgId/settings    # Get settings
PUT    /organizations/:orgId/settings    # Update settings
```

---

## 4. Client Routes

### Clients
```
GET    /organizations/:orgId/clients     # List all clients for an org
POST   /organizations/:orgId/clients     # Create client in an org
GET    /clients/:clientId                # Get client details
PUT    /clients/:clientId                # Update client
DELETE /clients/:clientId                # Delete client

# Client projects
GET    /clients/:clientId/projects       # List client projects
```

---

## 5. Project Routes

### Projects
```
GET    /organizations/:orgId/projects    # List all projects in org
POST   /organizations/:orgId/projects    # Create project
GET    /projects/:projectId              # Get project details
PUT    /projects/:projectId              # Update project
PATCH  /projects/:projectId/status       # Update project status
DELETE /projects/:projectId              # Delete project (soft delete)
POST   /projects/:projectId/archive      # Archive project
POST   /projects/:projectId/restore      # Restore archived project

# Project team members
GET    /projects/:projectId/members      # List project members
POST   /projects/:projectId/members      # Add member to project
PATCH  /projects/:projectId/members/:userId/role  # Update member role
DELETE /projects/:projectId/members/:userId       # Remove member

# Project statistics & reports
GET    /projects/:projectId/stats        # Get project statistics
GET    /projects/:projectId/progress     # Get project progress
GET    /projects/:projectId/timeline     # Get project timeline

# Project settings
GET    /projects/:projectId/settings     # Get project settings
PUT    /projects/:projectId/settings     # Update settings
```

---

## 6. Task Routes

### Tasks
```
GET    /projects/:projectId/tasks        # List all tasks in project
POST   /projects/:projectId/tasks        # Create task
GET    /tasks/:taskId                    # Get task details
PUT    /tasks/:taskId                    # Update task
PATCH  /tasks/:taskId/status             # Update task status
PATCH  /tasks/:taskId/priority           # Update task priority
PATCH  /tasks/:taskId/assign             # Assign task to user
DELETE /tasks/:taskId                    # Delete task

# Task relationships
GET    /tasks/:taskId/subtasks           # Get subtasks
POST   /tasks/:taskId/subtasks           # Create subtask
GET    /tasks/:taskId/dependencies       # Get task dependencies
POST   /tasks/:taskId/dependencies       # Add dependency
DELETE /tasks/:taskId/dependencies/:dependencyTaskId # Remove dependency

# Task time tracking
POST   /tasks/:taskId/time-entries       # Log time entry
GET    /tasks/:taskId/time-entries       # Get time entries
PUT    /tasks/:taskId/time-entries/:entryId    # Update time entry
DELETE /tasks/:taskId/time-entries/:entryId    # Delete time entry

# Task across multiple projects (shared tasks)
GET    /tasks/:taskId/projects           # Get all projects this task belongs to
POST   /tasks/:taskId/projects/:projectId # Add task to another project
DELETE /tasks/:taskId/projects/:projectId # Remove task from project

# Kanban board operations
GET    /projects/:projectId/board        # Get kanban board view
PATCH  /tasks/:taskId/move               # Move task (position/column)

# Global User Data (Cross-Project)
GET    /users/me/tasks                   # Get user's tasks across all projects
GET    /users/me/time-entries            # Get user's timesheet across all tasks

# Bulk Operations
PATCH  /tasks/bulk                       # Bulk update tasks (status, assignee, sprint)
DELETE /tasks/bulk                       # Bulk delete tasks
```

---

## 7. Sprint Routes

### Sprints
```
GET    /projects/:projectId/sprints      # List sprints
POST   /projects/:projectId/sprints      # Create sprint
GET    /sprints/:sprintId                # Get sprint details
PUT    /sprints/:sprintId                # Update sprint
DELETE /sprints/:sprintId                # Delete sprint

# Sprint management
POST   /sprints/:sprintId/start          # Start sprint
POST   /sprints/:sprintId/complete       # Complete sprint
GET    /sprints/:sprintId/tasks          # Get tasks in sprint
POST   /sprints/:sprintId/tasks          # Add task to sprint
DELETE /sprints/:sprintId/tasks/:taskId  # Remove task from sprint

# Sprint reports
GET    /sprints/:sprintId/burndown       # Get burndown chart data
GET    /sprints/:sprintId/velocity       # Get velocity metrics
GET    /sprints/:sprintId/report         # Get sprint report
```

---

## 8. Comment Routes

### Comments
```
GET    /tasks/:taskId/comments           # List comments
POST   /tasks/:taskId/comments           # Create comment
GET    /comments/:commentId              # Get comment details
PUT    /comments/:commentId              # Update comment
DELETE /comments/:commentId              # Delete comment

# Comment reactions
POST   /comments/:commentId/reactions    # Add reaction
DELETE /comments/:commentId/reactions/:reactionType # Remove reaction

# Mentions
GET    /users/me/mentions                # Get user mentions across all comments
```

---

## 9. File/Attachment Routes

### Project Files
```
GET    /projects/:projectId/files        # List project files
POST   /projects/:projectId/files        # Upload file to project
GET    /files/:fileId                    # Get file metadata
GET    /files/:fileId/download           # Download file
PUT    /files/:fileId                    # Update file metadata
DELETE /files/:fileId                    # Delete file

# Task Files
GET    /tasks/:taskId/files              # List task files
POST   /tasks/:taskId/files              # Upload file to task
```

---

## 10. Activity Log / Audit Trail Routes

### Activity Logs
```
GET    /projects/:projectId/activity     # Get project activity
GET    /tasks/:taskId/activity           # Get task activity
GET    /organizations/:orgId/activity    # Get organization activity
GET    /users/me/activity                # Get user's activity across all projects

# Filters: ?entity_type=task&action=created&user_id=123&from=2024-01-01&to=2024-12-31
```

---

## 11. Search & Filter Routes

### Global Search
```
GET    /search                           # Global search across organization
GET    /search/tasks                     # Search tasks
GET    /search/projects                  # Search projects
GET    /search/users                     # Search users
GET    /search/files                     # Search files
```

---

## 12. Dashboard & Analytics Routes

### Dashboards
```
GET    /organizations/:orgId/dashboard   # Organization dashboard data
GET    /projects/:projectId/dashboard    # Project dashboard data
GET    /users/me/dashboard               # User personal dashboard

# Analytics
GET    /organizations/:orgId/analytics/overview        # Overview metrics
GET    /projects/:projectId/analytics/productivity     # Productivity metrics
GET    /projects/:projectId/analytics/time-tracking    # Time tracking analytics
GET    /organizations/:orgId/analytics/reports         # Custom reports
```

---

## 13. Notification Routes

### Notifications
```
GET    /notifications                    # List user notifications (paginated)
GET    /notifications/unread-count       # Get unread count
PATCH  /notifications/:notificationId/read    # Mark as read
PATCH  /notifications/read-all          # Mark all as read
DELETE /notifications/:notificationId   # Delete notification

# Notification preferences
GET    /users/me/notification-settings   # Get notification preferences
PUT    /users/me/notification-settings   # Update preferences
```

---

## 14. Label/Tag Routes

### Labels
```
GET    /projects/:projectId/labels       # List project labels
POST   /projects/:projectId/labels       # Create label
PUT    /labels/:labelId                  # Update label
DELETE /labels/:labelId                  # Delete label

# Task labels
POST   /tasks/:taskId/labels             # Add label to task
DELETE /tasks/:taskId/labels/:labelId    # Remove label from task
```

---

## 15. Webhook Routes (for integrations)

### Webhooks
```
GET    /organizations/:orgId/webhooks    # List webhooks
POST   /organizations/:orgId/webhooks    # Create webhook
GET    /webhooks/:webhookId              # Get webhook
PUT    /webhooks/:webhookId              # Update webhook
DELETE /webhooks/:webhookId              # Delete webhook
POST   /webhooks/:webhookId/test         # Test webhook
```

---

## Common Query Parameters

### Pagination
```
?page=1&limit=20
?offset=0&limit=20
```

### Filtering
```
?status=active,in_progress
?priority=high
?assigned_to=userId
?created_by=userId
?start_date=2024-01-01&end_date=2024-12-31
```

### Sorting
```
?sort_by=created_at&order=desc
?sort_by=priority&order=asc
```

### Search
```
?search=keyword
?q=query
```

### Include Related Data
```
?include=assignee,comments,files
?expand=project,sprint
```

---

## Response Format Standards

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "pagination": {
      "current_page": 1,
      "total_pages": 10,
      "total_items": 200,
      "items_per_page": 20
    }
  }
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [
      {
        "field": "email",
        "message": "Email is required"
      }
    ]
  }
}
```

---

## HTTP Status Codes

- `200 OK` - Successful GET, PUT, PATCH
- `201 Created` - Successful POST
- `204 No Content` - Successful DELETE
- `400 Bad Request` - Validation error
- `401 Unauthorized` - Authentication required
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `409 Conflict` - Resource conflict
- `422 Unprocessable Entity` - Semantic errors
- `429 Too Many Requests` - Rate limit exceeded
- `500 Internal Server Error` - Server error

---

## Rate Limiting Headers

```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640995200
```

---

## Versioning Strategy

- URL versioning: `/api/v1/`, `/api/v2/`
- Maintain backward compatibility within major versions
- Deprecation notices via headers: `X-API-Deprecated: true`

---

## Security Considerations

1. **Authentication**: JWT tokens in Authorization header
   ```
   Authorization: Bearer <token>
   ```

2. **CORS**: Properly configured for frontend domains

3. **Input Validation**: All inputs validated and sanitized

4. **File Upload**: 
   - Maximum file size limits
   - Allowed file type restrictions
   - Virus scanning recommended
   - Store files in S3/cloud storage with signed URLs

5. **Rate Limiting**: Implement per-user/IP rate limits

6. **SQL Injection Prevention**: Use parameterized queries/ORM

7. **XSS Prevention**: Sanitize user-generated content

8. **HTTPS Only**: All endpoints must use HTTPS in production

9. **Resource Enumeration Prevention**: Return `404 Not Found` instead of `403 Forbidden` when a user attempts to access a resource ID they do not have permissions for, to obscure the existence of private resources.